/* eslint-disable no-unused-vars */
import { Button, Flex, Text } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { GoCheck } from 'react-icons/go';
import * as yup from 'yup';
import { InputField, SelectField } from '~/components/Form-field';
import { INGREDIENTS_UNIT_TYPE } from '~/constants';

const defaultValues = {
  productName: '',
  price: '',
  unitInStock: '',
  unitType: 0,
  productCategoryId: 1,
};

const schema = yup
  .object({
    productName: yup.string().required(),
    price: yup.number('Enter valid price').required(),
    unitInStock: yup.number('Enter valid unit in stock').required(),
    unitType: yup.number().required(),
  })
  .required();

const FormAddEdit = ({ initialRef, submitBtnRef, initialValue, onSubmit, setIsValid }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialValue ? initialValue : defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const selectedValueTemplate = (option, props) => {
    if (option) {
      return <Text fontSize="1.6rem">{option.name}</Text>;
    }

    return <Text>{props.placeholder}</Text>;
  };

  const optionTemplate = (option, selectedValue) => {
    return (
      <Flex align="center" gap="0.5rem" fontSize="1.6rem">
        <Text>{option.name}</Text>
        {selectedValue === option.id && <GoCheck fontSize="1.8rem" />}
      </Flex>
    );
  };

  useEffect(() => {
    setIsValid(isValid);
  }, [isValid]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
      <InputField
        initialRef={initialRef}
        name="productName"
        label="Name"
        errorBorderColor="rgba(22, 24, 35, 0.12)"
        placeholder="Enter Name"
        control={control}
        errors={errors}
      />
      <InputField
        name="price"
        label="Price"
        errorBorderColor="rgba(22, 24, 35, 0.12)"
        placeholder="Enter Price"
        control={control}
        errors={errors}
      />
      <InputField
        name="unitInStock"
        label="Unit in stock"
        errorBorderColor="rgba(22, 24, 35, 0.12)"
        placeholder="Enter Unit in stock"
        control={control}
        errors={errors}
      />

      <SelectField
        name="unitType"
        label="Unit type"
        placeholder="Unit type"
        control={control}
        errors={errors}
        options={INGREDIENTS_UNIT_TYPE}
        valueTemplate={selectedValueTemplate}
        itemTemplate={optionTemplate}
        filter={false}
        optionValue="value"
        optionLabel="name"
      />

      <Button ref={submitBtnRef} type="submit" display="none"></Button>
    </form>
  );
};

export default FormAddEdit;
