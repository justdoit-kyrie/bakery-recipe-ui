import { Button } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { InputField } from '~/components/Form-field';

const defaultValues = {
  categoryName: '',
};

const schema = yup
  .object({
    categoryName: yup.string().required(),
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

  useEffect(() => {
    setIsValid(isValid);
  }, [isValid]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
      <InputField
        initialRef={initialRef}
        name="categoryName"
        label="Name"
        showError={false}
        errorBorderColor="rgba(22, 24, 35, 0.12)"
        placeholder="Enter Name"
        control={control}
        errors={errors}
      />

      <Button ref={submitBtnRef} type="submit" display="none"></Button>
    </form>
  );
};

export default FormAddEdit;
