import { Button, Flex } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';

import { default as axios } from '~/app/api';
import { InputField } from '~/components/Form-field';
import { API_CODE, API_PATH, PHONE_REGEX } from '~/constants';
import { login, selectUserInfo } from '../../authSlice';

const schema = yup
  .object({
    phone: yup
      .string()
      .required('Phone is a required field')
      .matches(PHONE_REGEX, 'Please enter valid phone number'),
    firstName: yup.string().required('FirstName is a required field'),
    lastName: yup.string().required('LastName is a required field'),
  })
  .required();

const defaultValues = {
  phone: '',
  firstName: '',
  lastName: '',
};

const FormGetInfo = ({ initialRef, handleCloseModal = () => {} }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    // call API update user userName & set userInfo into redux
    console.log({ data });

    handleCloseModal();
  };

  const handleActions = async () => {
    const { code, data } = await axios.post(API_PATH.users.login, {
      email: userInfo.email,
      password: userInfo.password,
    });

    if (+code === API_CODE.success) {
      dispatch(login(data));
      handleCloseModal();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex
        gap="2rem"
        sx={{
          '& > *': {
            flex: 1,
          },
        }}
      >
        <InputField
          initialRef={initialRef}
          label="FirstName"
          name="firstName"
          placeholder="FirstName"
          control={control}
          errors={errors}
          formHelperText="You can always change this later."
        />
        <InputField
          label="LastName"
          name="lastName"
          placeholder="LastName"
          control={control}
          errors={errors}
        />
      </Flex>
      <InputField
        label="Phone"
        name="phone"
        placeholder="Phone"
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
