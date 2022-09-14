import { Dropdown } from 'primereact/dropdown';
import React from 'react';
import { Controller } from 'react-hook-form';
import { Wrapper } from './styles';

const SelectField = ({
  name,
  control,
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
        <Wrapper>
          {console.log({field})}
          <Dropdown
            {...field}
            appendTo="self"
            filter={filter}
            showClear={showClear}
            itemTemplate={(option) => itemTemplate(option, field.value)}
            {...passProps}
          />
        </Wrapper>
      )}
    />
  );
};

export default SelectField;
