import { Flex, Text } from '@chakra-ui/react';
import { AutoComplete } from 'primereact/autocomplete';
import { Dropdown } from 'primereact/dropdown';
import React from 'react';
import { Controller } from 'react-hook-form';
import { SELECT_TYPE } from '~/constants';
import { Wrapper } from './styles';
import { optionTemplate, selectedValueTemplate } from './templates';

const SelectField = ({
  name,
  control,
  errors,
  label = name,
  showError = true,
  showLabel = true,
  type = SELECT_TYPE.single,
  filter = true,
  showClear = true,
  itemTemplate = optionTemplate,
  valueTemplate = selectedValueTemplate,
  ...passProps
}) => {
  const isError = !!errors[name];

  const renderSelectField = (field) => {
    switch (type) {
      case SELECT_TYPE.multi:
        return;
      case SELECT_TYPE.autoCompleted:
        return <AutoComplete {...field} appendTo="self" forceSelection dropdown {...passProps} />;
      default:
        return (
          <Dropdown
            {...field}
            appendTo="self"
            filter={filter}
            showClear={showClear}
            itemTemplate={(option) => itemTemplate(option, field.value)}
            valueTemplate={valueTemplate}
            {...passProps}
          />
        );
    }
  };

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

          <Wrapper isError={isError}>{renderSelectField(field)}</Wrapper>

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

export default SelectField;
