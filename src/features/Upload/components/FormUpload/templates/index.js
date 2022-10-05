import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { GoCheck } from 'react-icons/go';

export const selectedValueTemplate = (option, props) => {
  if (option) {
    return <Text fontSize="1.6rem">{option?.name}</Text>;
  }

  return <Text>{props.placeholder}</Text>;
};

export const optionTemplate = (option, selectedValue, field = 'productName') => {
  return (
    <Flex align="center" gap="0.5rem" fontSize="1.6rem">
      <Text>{option?.[field]}</Text>
      {selectedValue?.[field] === option?.[field] && <GoCheck fontSize="1.8rem" />}
    </Flex>
  );
};
