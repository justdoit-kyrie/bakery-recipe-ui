import { Box, Circle, Flex, Input, Text, Tooltip, useColorMode } from '@chakra-ui/react';
import Tippy from '@tippyjs/react';
import { motion } from 'framer-motion';
import _ from 'lodash';
import { AutoComplete } from 'primereact/autocomplete';
import React, { useEffect, useRef, useState } from 'react';
import { AiOutlineClose, AiOutlinePlusCircle } from 'react-icons/ai';
import { BsPatchCheck, BsTrash2Fill } from 'react-icons/bs';
import { COLOR_MODE_TYPE, INGREDIENTS_REGEX } from '~/constants';
import { optionTemplate } from '../FormUpload/templates';
import { Wrapper } from './style';

const MOCK_DATA = {
  categories: [
    { id: 0, name: 'category1' },
    { id: 1, name: 'category2' },
    { id: 2, name: 'category3' },
  ],
  action: {
    add: 'add',
    remove: 'remove',
  },
};

const IngredientsField = ({ value, setValue, isReset }) => {
  const { action } = MOCK_DATA;
  const { colorMode } = useColorMode();

  const [hasMore, setHasMore] = useState([]);
  const [result, setResult] = useState(value);
  const [categories, setCategories] = useState([]);
  const [filteredValue, setFilteredValue] = useState(null);
  const [hasError, setHasError] = useState([]);

  // handle remove || add again category when been chosen
  const actionType = useRef();
  const currentItem = useRef();

  const searchIngredients = (event) => {
    setTimeout(() => {
      let _filteredIngredients;
      if (!event.query.trim().length) {
        _filteredIngredients = [...categories];
      } else {
        _filteredIngredients = categories.filter((item) => {
          return item.name.toLowerCase().includes(event.query.toLowerCase());
        });
      }

      setFilteredValue(_filteredIngredients);
    }, 250);
  };

  useEffect(() => {
    if (isReset.current) {
      setHasMore([]);
      setResult(value);
      setCategories(MOCK_DATA.categories);
    }
  }, [isReset.current]);

  useEffect(() => {
    isReset.current = false;
    setValue(result);
    if (actionType.current) {
      switch (actionType.current) {
        case action.add:
          setCategories((prev) => prev.filter((x) => !result.some((v) => v.name.id === x.id)));
          break;
        case action.remove:
          setCategories((prev) => _.sortBy([...prev, currentItem.current.name], ['name']));
          break;
      }
    }
  }, [result]);

  useEffect(() => {
    setCategories(MOCK_DATA.categories);
  }, []);

  const handleChange = (idx, event, field = 'name') => {
    const cloneList = [...hasMore];
    cloneList[idx][field] = event.target.value;
    if (!INGREDIENTS_REGEX.test(event.target.value)) {
      setHasError((prev) => {
        if (!prev.some((v) => v.id === cloneList[idx].id))
          return [...prev, { id: cloneList[idx].id, value: true }];
        return prev;
      });
    } else {
      setHasError((prev) => prev.filter((v) => v.id !== cloneList[idx].id));
    }
    setHasMore(cloneList);
  };

  const handleBlur = (item) => {
    if (item.value && item.name && !hasError.some((v) => v.id === item.id)) {
      setResult((prev) => [...prev, { name: item.name, value: item.value }]);
      setHasMore((prev) => prev.filter((v) => v.id !== item.id));
    }
  };

  const renderSelectIField = () =>
    hasMore.map((item, idx) => (
      <Flex
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { type: 'spring', duration: 1 } }}
        exit={{ opacity: 0, transition: { type: 'spring', duration: 0.25 } }}
        key={idx}
        gap="2rem"
        w="100%"
        p="1rem 5rem 1rem 2rem"
        borderBottom="1px solid rgba(22, 24, 35, 0.12)"
        position="relative"
        sx={{
          '& > *': {
            flex: 1,
          },
          '.ingredient-trash': {
            opacity: 0,
          },

          '&:hover .ingredient-trash': {
            opacity: 1,
          },
        }}
      >
        <Wrapper>
          <AutoComplete
            value={item.name}
            label="what's type do you make?"
            placeholder="Select categories"
            appendTo="self"
            suggestions={filteredValue}
            completeMethod={searchIngredients}
            itemTemplate={optionTemplate}
            dropdown
            field="name"
            forceSelection
            onChange={(e) => handleChange(idx, e)}
            onBlur={() => {
              actionType.current = action.add;
              handleBlur(item);
            }}
          />
        </Wrapper>

        <Tooltip
          label={hasError.some((v) => v.id === item.id) ? 'Please provide valid ingredients' : ''}
          placement="auto"
          fontSize="1.4rem"
          bg="red.400"
          p="0 1rem"
          hasArrow
          textAlign="center"
        >
          <Input
            value={item.value}
            fontSize="1.6rem"
            color={colorMode === COLOR_MODE_TYPE.light ? 'textColor.400' : 'darkTextColor.400'}
            h="auto"
            backgroundColor="rgba(22, 24, 35, 0.06)"
            border="1px solid rgba(22, 24, 35, 0.12)"
            lineHeight="100%"
            placeholder="quantity"
            borderColor={
              hasError.some((v) => v.id === item.id) ? 'rgb(255, 76, 58)' : 'rgba(22, 24, 35, 0.12)'
            }
            focusBorderColor="none"
            sx={{
              caretColor: 'rgba(254, 44, 85, 1.0)',
              '&[aria-invalid=true],&[data-invalid]': {
                boxShadow: 'none',
              },
              '&[data-focus-visible], &:focus-visible': {
                boxShadow: 'none',
              },
              '&[type=password]::-ms-reveal,&[type=password]::-ms-clear': {
                display: 'none',
              },

              '&:focus-within + .ingredient-trash': {
                opacity: 1,
              },
            }}
            _hover={{}}
            onChange={(e) => handleChange(idx, e, 'value')}
            onBlur={() => {
              actionType.current = action.add;
              handleBlur(item);
            }}
          />
        </Tooltip>

        {/* remove button */}
        <Tippy content="Delete item" delay={[0, 200]}>
          <Circle
            className="ingredient-trash"
            p=".5rem"
            bg="rgba(22, 24, 35, 0.03);"
            position="absolute"
            top="50%"
            transform="translateY(-50%)"
            right="1rem"
            cursor="pointer"
            transition="all 0.25s ease"
            _hover={{ bg: 'rgba(0,0,0,0.06)' }}
            onClick={() => {
              setHasMore((prev) => prev.filter((v) => v.id !== item.id));
              setHasError((prev) => prev.filter((v) => v.id !== item.id));
            }}
          >
            <AiOutlineClose fontSize="1.4rem" color="rgba(22, 24, 35, 0.37)" />
          </Circle>
        </Tippy>
      </Flex>
    ));

  const renderResultList = () =>
    result.map((item, idx) => (
      <Flex
        key={idx}
        justify="space-between"
        align="center"
        w="100%"
        p="0.5rem 6rem 0.5rem 2rem"
        borderBottom="1px solid rgba(22, 24, 35, 0.12)"
        position="relative"
        sx={{
          '.ingredient-trash': {
            opacity: 0,
          },

          '&:hover .ingredient-trash': {
            opacity: 1,
          },
        }}
      >
        <Flex direction="column">
          <Text as="h4" className="text">
            {item.name.name}
          </Text>
          <Text as="p" fontSize="1.2rem">
            {item.value}
          </Text>
        </Flex>

        <BsPatchCheck fontSize="2rem" color="rgb(11, 224, 155)" />

        <Tippy content="Delete item" delay={[0, 200]}>
          <Circle
            className="ingredient-trash"
            p=".5rem"
            bg="rgba(22, 24, 35, 0.03);"
            position="absolute"
            top="50%"
            transform="translateY(-50%)"
            right="1rem"
            cursor="pointer"
            transition="all 0.25s ease"
            _hover={{ bg: 'rgba(0,0,0,0.06)' }}
            onClick={() => {
              actionType.current = action.remove;
              currentItem.current = result[idx];
              setResult((prev) => {
                prev.splice(idx, 1);
                return [...prev];
              });
            }}
          >
            <BsTrash2Fill fontSize="2rem" />
          </Circle>
        </Tippy>
      </Flex>
    ));

  return (
    <Box>
      <Text className="text" mb="0.5rem">
        Ingredients
      </Text>

      <Flex
        justify="flex-start"
        align="flex-start"
        direction="column"
        border="1px solid rgba(22, 24, 35, 0.12)"
        borderRadius="8px"
      >
        {/* list add */}
        {renderResultList()}

        {/* select field */}
        {renderSelectIField()}

        <Flex
          w="100%"
          p="1rem 2rem"
          align="center"
          gap="1.5rem"
          cursor="pointer"
          _hover={{ bg: 'rgba(0,0,0,0.06)' }}
          onClick={() =>
            setHasMore((prev) => [
              ...prev,
              {
                id: prev[prev.length - 1] ? prev[prev.length - 1].id + 1 : 0,
                name: '',
                value: '',
              },
            ])
          }
        >
          <AiOutlinePlusCircle fontSize="2rem" color="rgba(22, 24, 35, 1.0)" />
          <Text className="text" fontWeight={500}>
            Add an existed ingredients
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

IngredientsField.defaultProps = {
  setValue: () => {},
};

export default IngredientsField;
