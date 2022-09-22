import { Flex, Text } from '@chakra-ui/react';
import { Dropdown } from 'primereact/dropdown';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Wrapper } from './styles';
import { optionTemplate, selectedValueTemplate } from './templates';

const SelectField = ({
  name,
  control,
  errors,
  label = name,
  showError,
  showLabel,
  filter,
  showClear,
  itemTemplate = optionTemplate,
  valueTemplate = selectedValueTemplate,
  ...passProps
}) => {
  const isError = !!errors[name];

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

          <Wrapper isError={isError}>
            <Dropdown
              {...field}
              appendTo="self"
              filter={filter}
              showClear={showClear}
              itemTemplate={(option) => itemTemplate(option, field.value)}
              valueTemplate={valueTemplate}
              {...passProps}
            />
          </Wrapper>

          {isError && showError && (
            <Text mt="4px" fontSize="1.2rem" lineHeight="15px" color="rgb(255, 76, 58)">
              {errors[name].message}
            </Text>
          )}
        </Flex>
      )}
    />
  );
};

SelectField.defaultProps = {
  showLabel: true,
  filter: true,
  showClear: true,
  showError: true,
};

export default SelectField;
