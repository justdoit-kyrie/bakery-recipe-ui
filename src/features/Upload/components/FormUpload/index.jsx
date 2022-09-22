import { Box, Button, Flex } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { EditorField, ImageField, InputField, SelectField } from '~/components/Form-field';
import { CONTENT_POST_LENGTH } from '~/constants';
import { useDebounce } from '~/hooks';
import IngredientsField from '../Ingredients';
import { optionTemplate, selectedValueTemplate } from './templates';

const schema = yup
  .object({
    title: yup.string().required('Title is a required field'),
    content: yup
      .string()
      .required('Content is a required field')
      .min(CONTENT_POST_LENGTH, `Content must be have ${CONTENT_POST_LENGTH} characters`),
    type: yup.object().required('Type is a required field'),
  })
  .required();

const defaultValues = {
  title: '',
  type: undefined,
  content: '',
};

const MOCK_DATA = {
  categories: [
    { id: 0, name: 'category1' },
    { id: 1, name: 'category2' },
    { id: 2, name: 'category3' },
  ],
};

const FormUpload = ({ initialRef }) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const type = watch('type');
  const debounceType = useDebounce(type, 800);

  const [banner, setBanner] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesSearch, setCategoriesSearch] = useState([]);

  const isCustomValid = useMemo(() => isValid && ingredients.length > 0, [ingredients, isValid]);

  const onSubmit = (data) => {
    // auto get first image in the content post
    if (!banner) {
      const content = data.content;
      const positionStart = content.indexOf('<img src="');
      const positionEnd = content.indexOf('">');
      const image = content.substring(positionStart, positionEnd).replace('<img src="', '');

      console.log({ image });
    }
    // call api
    console.log({ data: { ...data, banner: banner, ingredients } });
  };

  useEffect(() => {
    // call api get list categories
    setCategories(MOCK_DATA.categories);
  }, []);

  useEffect(() => {
    const subscription = watch(() => {});
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (typeof debounceType === 'string' && debounceType) {
      // call api search categories
      setCategoriesSearch([{ id: 0, name: 'test' }]);
      document.querySelector('.p-dropdown-trigger').click();
    } else {
      setCategoriesSearch([]);
    }
  }, [debounceType]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', height: '100%' }}>
      <Flex
        h="100%"
        gap="2.5rem"
        sx={{
          '& > *': {
            width: 'calc(50% - 2.5rem)',
          },
        }}
      >
        {/* react-quill  */}
        <Box>
          <EditorField name="content" control={control} errors={errors} />
        </Box>

        {/* others-field */}
        <Box position="relative">
          <Flex
            direction="column"
            gap="2rem"
            position="absolute"
            inset="0"
            overflowY="auto"
            p="2rem 1rem"
          >
            <InputField
              initialRef={initialRef}
              name="title"
              label="Title"
              placeholder="Enter Title"
              control={control}
              errors={errors}
            />

            <ImageField
              name="image"
              label="cover"
              setImageUrl={setBanner}
              textHelper={[
                'Accepted file types: jpeg, jpg, png, gif, tiff',
                'This cover can get be taken of the content',
              ]}
            />

            <Box w="50%">
              <SelectField
                name="type"
                options={categoriesSearch.length > 0 ? categoriesSearch : categories}
                label="what's type do you make?"
                placeholder="Select categories"
                optionLabel="name"
                filterBy="name"
                filter={categoriesSearch.length > 0 ? false : true}
                itemTemplate={optionTemplate}
                valueTemplate={selectedValueTemplate}
                editable
                control={control}
                errors={errors}
                showOnFocus
              />
            </Box>

            {/* ingredients */}
            <IngredientsField setValue={setIngredients} />

            <Flex gap="1.6rem" sx={{ '& > *': { w: 'calc(36% - 1.6rem)' } }} h="48px">
              <Button
                as={motion.button}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                size="lg"
                h="100%"
                variant="outline-default"
              >
                Cancel
              </Button>
              <Button
                as={motion.button}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                size="lg"
                h="100%"
                variant={!isCustomValid ? 'disabled' : 'primary'}
              >
                Post
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Flex>
    </form>
  );
};

export default FormUpload;
