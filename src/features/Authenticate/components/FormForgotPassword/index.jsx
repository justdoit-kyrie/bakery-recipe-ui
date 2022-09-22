import { Button } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { CodeField, InputField, PasswordField } from '~/components/Form-field';
import { CODE_GMAIL_LENGTH, EMAIL_REGEX, PASSWORD_REGEX_FULL } from '~/constants';
import { login } from '../../authSlice';

const schema = yup
  .object({
    email: yup
      .string()
      .required('Email is a required field')
      .matches(EMAIL_REGEX, 'Enter a valid email address'),
    password: yup
      .string()
      .required('Password is a required field')
      .matches(
        PASSWORD_REGEX_FULL,
        'At least one lowercase, uppercase, numbers, and special characters'
      ),
    code: yup.string().length(CODE_GMAIL_LENGTH, 'Enter 6-digit code'),
  })
  .required();

const defaultValues = {
  email: '',
  password: '',
  code: '',
};

const FormForgotPassword = ({ initialRef, handleCloseModal, setLoading }) => {
  const {
    control,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const watchEmail = watch('email');
  const watchPassword = watch('password');

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    // call api
    setLoading(true);
    console.log({ data });
    setTimeout(() => {
      dispatch(login({ userInfo: { ...data }, accessToken: 1, refreshToken: 2 }));
      setLoading(false);
      handleCloseModal();
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        initialRef={initialRef}
        name="email"
        label="Enter email address"
        placeholder="Email address"
        control={control}
        errors={errors}
      />

      <PasswordField control={control} errors={errors} watchPassword={watchPassword} />

      <CodeField
        control={control}
        errors={errors}
        getValues={getValues}
        isValid={!!watchEmail}
        setError={setError}
        clearErrors={clearErrors}
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
        Log in
      </Button>
    </form>
  );
};

FormForgotPassword.defaultProps = {
  handleCloseModal: () => {},
  setLoading: () => {},
};

export default FormForgotPassword;
