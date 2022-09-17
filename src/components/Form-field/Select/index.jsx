import { Flex, Text } from '@chakra-ui/react';
import { Dropdown } from 'primereact/dropdown';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Wrapper } from './styles';

const SelectField = ({
  name,
  control,
  label = name,
  showLabel = true,
  filter = true,
  showClear = true,
  itemTemplate,
  ...passProps
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Flex direction="column">
          {label && showLabel && (
            <Text className="text" mb="4px">
              {label}
            </Text>
          )}
          <Wrapper>
            <Dropdown
              {...field}
              appendTo="self"
              filter={filter}
              showClear={showClear}
              itemTemplate={(option) => itemTemplate(option, field.value)}
              {...passProps}
            />
          </Wrapper>
        </Flex>
      )}
    />
  );
};

export default SelectField;
