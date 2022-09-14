import { Button, Text, useColorMode } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { InputField } from '~/components/Form-field';
import { EyesClose, EyesOpen } from '~/components/Icons';
import { COLOR_MODE_TYPE, EMAIL_REGEX, PASSWORD_REGEX_FULL } from '~/constants';

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
  })
  .required();

const defaultValues = {
  email: '',
  password: '',
};

const FormLogin = ({ initialRef }) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const watchEmail = watch('email');
  const watchPassword = watch('password');

  const { colorMode } = useColorMode();
  const [pwdType, setPwdType] = useState(true);

  const onSubmit = (data) => {
    // call api
    console.log({ data });
  };

  const handleTogglePwd = () => setPwdType(!pwdType);

  useEffect(() => {
    const subscription = watch(() => {});
    return () => subscription.unsubscribe();
  }, [watch]);

  const isValid = useMemo(() => !!watchEmail && !!watchPassword, [watchEmail, watchPassword]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputField
        initialRef={initialRef}
        name="email"
        placeholder="Email"
        control={control}
        errors={errors}
      />
      <InputField
        type={pwdType ? 'password' : 'text'}
        name="password"
        placeholder="Password"
        control={control}
        errors={errors}
        rightIcon={{
          // field icon truyền function và func đó return html
          icon: pwdType ? EyesClose : EyesOpen,
          w: '2rem',
          h: '2rem',
          color: colorMode === COLOR_MODE_TYPE.dark && 'rgba(233, 234,216, 1)',
          onClick: handleTogglePwd,
        }}
      />

      <Link to="*">
        <Text
          fontWeight="600"
          fontSize="1.2rem"
          mt="9px"
          _hover={{ textDecoration: 'underline' }}
          display="inline-block"
        >
          Forgot password?
        </Text>
      </Link>
      <Button
        as={motion.button}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        size="lg"
        mt="2.1rem"
        variant={!isValid ? 'disabled' : 'primary'}
      >
        Log in
      </Button>
    </form>
  );
};

export default FormLogin;
