import { Button } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { InputField } from '~/components/Form-field';

const schema = yup
  .object({
    username: yup.string().required('Email is a required field'),
  })
  .required();

const defaultValues = {
  username: '',
};

const FormGetInfo = ({ initialRef, handleCloseModal }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    // call API & set userInfo into redux
    console.log({ data });
    handleActions();
    if (typeof handleCloseModal === 'function') handleCloseModal();
  };

  const handleActions = () => {
    console.log('inside handle actions');
    // set userInfo into redux
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        initialRef={initialRef}
        label="Create username"
        name="username"
        placeholder="Username"
        control={control}
        errors={errors}
        formHelperText="You can always change this later."
      />

      <Button
        as={motion.button}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        size="lg"
        mt="2.1rem"
        w="100%"
        variant={!isValid ? 'disabled' : 'primary'}
      >
        Sign up
      </Button>

      <Button
        size="lg"
        variant="default"
        mt="1rem"
        w="100%"
        onClick={() => {
          handleActions();
          handleCloseModal();
        }}
      >
        Skip
      </Button>
    </form>
  );
};

export default FormGetInfo;
