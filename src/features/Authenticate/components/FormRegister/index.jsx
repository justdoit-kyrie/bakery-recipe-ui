import { Button } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { CodeField, InputField, PasswordField } from '~/components/Form-field';
import {
  API_CODE,
  API_PATH,
  AUTHENTICATE_FORM_TYPE,
  CODE_GMAIL_LENGTH,
  EMAIL_REGEX,
  PASSWORD_REGEX_FULL,
} from '~/constants';
import { register } from '../../authSlice';
import { default as axios } from '~/app/api';

const schema = yup
  .object({
    email: yup
      .string()
      .required('Email is a required field')
      .matches(EMAIL_REGEX, 'Enter a valid email address'),
    password: yup.string().required('Password is a required field').matches(PASSWORD_REGEX_FULL),
    code: yup.string().length(CODE_GMAIL_LENGTH, 'Enter 6-digit code'),
  })
  .required();

const defaultValues = {
  userName: 'string',
  email: '',
  password: '',
  code: '',
};

const FormRegister = ({ initialRef, setType, setLoading }) => {
  const {
    control,
    handleSubmit,
    getValues,
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
    // call api & set data to redux
    try {
      setLoading(true);
      const { code, user } = await axios.post(API_PATH.users.register, {
        ...data,
        userName: data.email.split('@')[0],
      });
      if (+code === API_CODE.success) {
        dispatch(register({ userInfo: user }));
        typeof setType === 'function' && setType(AUTHENTICATE_FORM_TYPE.getInfo);
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const subscription = watch(() => {});
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        initialRef={initialRef}
        name="email"
        placeholder="Email"
        control={control}
        errors={errors}
      />

      <PasswordField control={control} errors={errors} watchPassword={watchPassword} />

      <CodeField
        control={control}
        errors={errors}
        isValid={EMAIL_REGEX.test(watchEmail)}
        getValues={getValues}
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
        Next
      </Button>
    </form>
  );
};

FormRegister.defaultProps = {
  setType: () => {},
};

export default FormRegister;
