import { Button } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { default as axios } from '~/app/api';
import { CodeField, InputField, PasswordField } from '~/components/Form-field';
import {
  API_CODE,
  API_PATH,
  CODE_GMAIL_LENGTH,
  EMAIL_REGEX,
  PASSWORD_REGEX_FULL,
} from '~/constants';
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

const FormForgotPassword = ({ initialRef, handleCloseModal = () => {}, setLoading = () => {} }) => {
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

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const { code } = await axios.post(API_PATH.users.forgotPassword, {
        email: data.email,
        newPassword: data.password,
        code: data.code,
      });
      // auto login with new password
      if (+code === API_CODE.success) {
        const { accessToken, refreshToken, user } = await axios.post(API_PATH.users.login, {
          email: data.email,
          password: data.password,
        });

        if (accessToken && refreshToken) {
          dispatch(
            login({ userInfo: { ...user }, accessToken: accessToken, refreshToken: refreshToken })
          );
          handleCloseModal();
        }
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
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
        isValid={EMAIL_REGEX.test(watchEmail)}
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

export default FormForgotPassword;
