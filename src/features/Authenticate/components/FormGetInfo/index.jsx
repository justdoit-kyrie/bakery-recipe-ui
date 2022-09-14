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

const FormGetInfo = ({ initialRef }) => {
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
    console.log({ data });
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
        variant={!isValid ? 'disabled' : 'primary'}
      >
        Sign up
      </Button>
    </form>
  );
};

export default FormGetInfo;
