import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { EditorField, ImageField, InputField, SelectField } from '~/components/Form-field';
import { CONTENT_POST_LENGTH, EDITOR_EMPTY_STRING, FORM_TYPE, SELECT_TYPE } from '~/constants';
import { useCallbackPrompt, useDebounce } from '~/hooks';
import { getBannerFromContent } from '~/utils';
import DiscardModal from '../Discard';
import IngredientsField from '../Ingredients';
import PreviewModal from '../Preview';
import SaveDraftModal from '../SaveDraft';

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

const MOCK_DATA = {
  categories: [
    { id: 0, name: 'category1' },
    { id: 1, name: 'category2' },
    { id: 2, name: 'category3' },
  ],
};

const FormUpload = ({ defaultValues, handleUmountForm, handleSubmit: _handleSubmit, formType }) => {
  const {
    control,
    handleSubmit,
    getValues,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isDiscardOpen, onOpen: onDiscardOpen, onClose: onDiscardClose } = useDisclosure();

  const content = useDebounce(watch('content'), 800);
  const title = useDebounce(watch('title'), 800);
  const type = useDebounce(watch('type'), 800);

  const [banner, setBanner] = useState(defaultValues.banner);
  const [ingredients, setIngredients] = useState(defaultValues.ingredients);
  const [categories, setCategories] = useState([]);
  const [isSaveDraft, setIsSaveDraft] = useState(false);

  const isReset = useRef(false);
  const isSave = useRef(false);

  const { isShow, onConfirm, onCancel } = useCallbackPrompt(
    formType === FORM_TYPE.edit ? false : isSaveDraft
  );

  // handle unblock button post
  const isCustomValid = useMemo(() => isValid && ingredients.length > 0, [ingredients, isValid]);

  const onSubmit = (data) => {
    // auto get first image in the content post
    let _banner = banner;
    if (!banner) {
      _banner = getBannerFromContent(data.content);
    }
    // call api
    _handleSubmit({ data: { ...data, banner: _banner, ingredients } });
  };

  const handleResetForm = () => {
    isReset.current = true;
    reset(defaultValues);
    setIsSaveDraft(false);
  };

  const _handleUmountForm = () => {
    isSave.current = true;
    let _banner = banner;
    if (!banner) {
      _banner = getBannerFromContent(content);
    }
    handleUmountForm({ title, content, type, banner: _banner, ingredients });
  };

  useEffect(() => {
    // call api get list categories
    setCategories(MOCK_DATA.categories);
  }, []);

  // handle whether show save draft modal
  useEffect(() => {
    !title && !content?.replace(EDITOR_EMPTY_STRING, '') && !type
      ? setIsSaveDraft(false)
      : setIsSaveDraft(true);
  }, [title, content, type]);

  useEffect(() => {
    const subscription = watch(() => {});
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <>
      {isOpen && (
        <PreviewModal
          onClose={onClose}
          isOpen={isOpen}
          title={getValues('title')}
          content={getValues('content')}
        />
      )}

      {isDiscardOpen && (
        <DiscardModal
          onClose={onDiscardClose}
          isOpen={isDiscardOpen}
          isReset={isReset}
          handleResetForm={handleResetForm}
        />
      )}

      {isShow && (
        <SaveDraftModal
          onClose={onCancel}
          isOpen={isShow}
          onConfirm={onConfirm}
          handleUmountForm={_handleUmountForm}
        />
      )}

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
              p="1.6rem 1rem 2rem"
            >
              <InputField
                name="title"
                label="Title"
                placeholder="Enter Title"
                control={control}
                errors={errors}
              />

              <ImageField
                name="image"
                label="cover"
                imageUrl={defaultValues.banner}
                setImageUrl={setBanner}
                textHelper={[
                  'Accepted file types: jpeg, jpg, png, gif, tiff',
                  'This cover can get be taken of the content',
                ]}
                isReset={isReset}
                isSave={isSave}
              />

              <Box w="50%">
                <SelectField
                  type={SELECT_TYPE.autoCompleted}
                  name="type"
                  options={categories}
                  label="what's type do you make?"
                  placeholder="Select categories"
                  dropdown
                  field="name"
                  forceSelection
                  control={control}
                  errors={errors}
                />
              </Box>

              {/* ingredients */}
              <IngredientsField
                value={[...defaultValues.ingredients]}
                setValue={setIngredients}
                isReset={isReset}
              />

              <Flex gap="1.6rem" sx={{ '& > *': { w: 'calc(36% - 1.6rem)' } }} h="48px">
                <Button
                  as={motion.button}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  size="lg"
                  h="100%"
                  variant="outline-default"
                  onClick={onDiscardOpen}
                >
                  Discard
                </Button>

                {getValues('content')?.replace(EDITOR_EMPTY_STRING, '') && (
                  <Button
                    as={motion.button}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    size="lg"
                    h="100%"
                    variant={
                      !getValues('content')?.replace(EDITOR_EMPTY_STRING, '') || !getValues('title')
                        ? 'disabled'
                        : 'preview'
                    }
                    onClick={onOpen}
                  >
                    Preview
                  </Button>
                )}

                <Button
                  as={motion.button}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  size="lg"
                  h="100%"
                  variant={!isCustomValid ? 'disabled' : 'primary'}
                >
                  {formType === FORM_TYPE.add ? 'Post' : 'Save'}
                </Button>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </form>
    </>
  );
};

export default FormUpload;
