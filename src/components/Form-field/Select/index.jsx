import { Flex, Text } from '@chakra-ui/react';
import { Dropdown } from 'primereact/dropdown';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { SELECT_TYPE } from '~/constants';
import { Wrapper } from './styles';
import { optionTemplate, selectedValueTemplate } from './templates';
import { AutoComplete } from 'primereact/autocomplete';

const SelectField = ({
  name,
  control,
  errors,
  label = name,
  showError,
  showLabel,
  type,
  filter,
  showClear,
  itemTemplate = optionTemplate,
  valueTemplate = selectedValueTemplate,
  ...passProps
}) => {
  const isError = !!errors[name];

  const [filteredValue, setFilteredValue] = useState(null);

  const searchCountry = (event, options) => {
    setTimeout(() => {
      let _filteredCountries;
      if (!event.query.trim().length) {
        _filteredCountries = [...options];
      } else {
        _filteredCountries = options.filter((item) => {
          return item.name.toLowerCase().includes(event.query.toLowerCase());
        });
      }

      setFilteredValue(_filteredCountries);
    }, 250);
  };

  const renderSelectField = (field) => {
    switch (type) {
      case SELECT_TYPE.multi:
        return;
      case SELECT_TYPE.autoCompleted:
        return (
          <AutoComplete
            {...field}
            appendTo="self"
            suggestions={filteredValue}
            completeMethod={(event) => searchCountry(event, passProps.options)}
            itemTemplate={(option) => itemTemplate(option, field.value)}
            {...passProps}
          />
        );
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

SelectField.defaultProps = {
  showLabel: true,
  filter: true,
  showClear: true,
  showError: true,
  type: SELECT_TYPE.single,
};

export default SelectField;
