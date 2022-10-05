import { Button, Text, useColorMode } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { default as axios } from '~/app/api';

import { InputField } from '~/components/Form-field';
import { EyesClose, EyesOpen } from '~/components/Icons';
import {
  API_CODE,
  API_PATH,
  AUTHENTICATE_FORM_TYPE,
  COLOR_MODE_TYPE,
  EMAIL_REGEX,
  PASSWORD_REGEX_FULL,
} from '~/constants';
import { login } from '../../authSlice';

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

  const watchEmail = watch('username');
  const watchPassword = watch('password');

  const { colorMode } = useColorMode();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [pwdType, setPwdType] = useState(true);

  const onSubmit = async ({ username, password }) => {
    // còn đang thiếu handle error
    try {
      setLoading(true);
      const apiProps = EMAIL_REGEX.test(username)
        ? {
            email: username,
            password,
          }
        : {
            userName: username,
            password,
          };
      const { code, message, accessToken, refreshToken, user } = await axios.post(
        API_PATH.users.login,
        apiProps
      );

      if (+code === API_CODE.success) {
        dispatch(
          login({ userInfo: { ...user }, accessToken: accessToken, refreshToken: refreshToken })
        );
        handleCloseModal();

        if (location.state?.from === '/privateRoute' && location.state.to) {
          return navigate(location.state.to);
        }
      } else {
        toast.error(message);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
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
