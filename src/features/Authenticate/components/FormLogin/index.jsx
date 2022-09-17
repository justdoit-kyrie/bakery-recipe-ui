import { Button, Text, useColorMode } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import { Loading } from '~/components';
import { InputField } from '~/components/Form-field';
import { EyesClose, EyesOpen } from '~/components/Icons';
import { COLOR_MODE_TYPE, PASSWORD_REGEX_FULL } from '~/constants';
import { login, selectAuth, setLoading } from '../../authSlice';

const schema = yup
  .object({
    username: yup.string().required('Enter user name or email'),
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
  username: '',
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

  const watchEmail = watch('username');
  const watchPassword = watch('password');

  const { colorMode } = useColorMode();
  const dispatch = useDispatch();
  const { loading } = useSelector(selectAuth);
  const [pwdType, setPwdType] = useState(true);

  const onSubmit = (data) => {
    // call api
    dispatch(setLoading());
    console.log({ data });
    setTimeout(() => {
      dispatch(login({ userInfo: { ...data }, accessToken: 1, refreshToken: 2 }));
    }, 1000);
  };

  const handleTogglePwd = () => setPwdType(!pwdType);

  useEffect(() => {
    const subscription = watch(() => {});
    return () => subscription.unsubscribe();
  }, [watch]);

  const isValid = useMemo(() => !!watchEmail && !!watchPassword, [watchEmail, watchPassword]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {loading && <Loading />}

      <InputField
        initialRef={initialRef}
        name="username"
        label="Email or username"
        placeholder="Email or Username"
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
        w="100%"
        variant={!isValid ? 'disabled' : 'primary'}
      >
        Log in
      </Button>
    </form>
  );
};

export default FormLogin;
