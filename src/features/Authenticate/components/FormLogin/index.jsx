import { Button, Text, useColorMode } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { InputField } from '~/components/Form-field';
import { EyesClose, EyesOpen } from '~/components/Icons';
import {
  AUTHENTICATE_FORM_TYPE,
  COLOR_MODE_TYPE,
  EMAIL_REGEX,
  PASSWORD_REGEX_FULL,
} from '~/constants';
import { AuthServices } from '~/services';
import { login } from '../../authSlice';

const schema = yup
  .object({
    email: yup.string().required('Enter email').matches(EMAIL_REGEX, 'Please enter valid email'),
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

const FormLogin = ({
  initialRef,
  handleCloseModal = () => {},
  setLoading = () => {},
  setHistoryForm = () => {},
  setIsLevel = () => {},
}) => {
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
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [pwdType, setPwdType] = useState(true);

  const onSubmit = async (data) => {
    setLoading(true);
    await AuthServices.login((_data) => {
      dispatch(login(_data));
      handleCloseModal();

      if (location.state?.from === '/privateRoute' && location.state.to) {
        return navigate(location.state.to);
      }
    }, data);
    setLoading(false);
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
        label="Email"
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

      <Text
        fontWeight="600"
        fontSize="1.2rem"
        mt="9px"
        display="inline-block"
        cursor="pointer"
        _hover={{ textDecoration: 'underline' }}
        onClick={() => {
          setIsLevel(true);
          setHistoryForm((prev) => [...prev, AUTHENTICATE_FORM_TYPE.forgotPassword]);
        }}
      >
        Forgot password?
      </Text>
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
