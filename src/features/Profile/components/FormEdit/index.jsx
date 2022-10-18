import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { InputField, SelectField } from '~/components/Form-field';
import { optionTemplate, selectedValueTemplate } from './templates';

const defaultValues = {
  username: '',
  firstName: '',
  lastName: '',
  avatar: '',
  gender: undefined,
  address: '',
  phone: '',
};

const schema = yup
  .object({
    username: yup.string().required(),
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    gender: yup.string().required(),
    address: yup.string().required(),
    phone: yup.string().required(),
  })
  .required();

const FormEdit = ({ initialRef, submitBtnRef, initialValue, onSubmit, setIsValid }) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: initialValue ? initialValue : defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    setIsValid(isValid);
  }, [isValid]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Flex
        p="1.6rem 0"
        justify="center"
        align="center"
        position="relative"
        borderBottom="0.5px solid rgba(22, 24, 35, 0.12);"
      >
        <Text className="text" lineHeight="24px" position="absolute" left="0" top="1.6rem">
          Username
        </Text>
        <Box minW="36rem">
          <InputField
            initialRef={initialRef}
            name="username"
            showLabel={false}
            placeholder="User name"
            control={control}
            errors={errors}
          />
        </Box>
      </Flex>

      <Flex
        p="1.6rem 0"
        justify="center"
        align="center"
        position="relative"
        borderBottom="0.5px solid rgba(22, 24, 35, 0.12);"
      >
        <Text className="text" lineHeight="24px" position="absolute" left="0" top="1.6rem">
          Gender
        </Text>
        <Box minW="36rem">
          <SelectField
            name="gender"
            showLabel={false}
            placeholder="Gender"
            control={control}
            errors={errors}
            options={['male', 'female', 'others']}
            valueTemplate={selectedValueTemplate}
            itemTemplate={optionTemplate}
            filter={false}
          />
        </Box>
      </Flex>

      <Flex
        p="1.6rem 0"
        justify="center"
        align="center"
        position="relative"
        borderBottom="0.5px solid rgba(22, 24, 35, 0.12);"
      >
        <Text className="text" lineHeight="24px" position="absolute" left="0" top="1.6rem">
          First name
        </Text>
        <Box minW="36rem">
          <InputField
            name="firstName"
            showError={false}
            errorBorderColor="rgba(22, 24, 35, 0.12)"
            showLabel={false}
            placeholder="Fist name"
            control={control}
            errors={errors}
          />
        </Box>
      </Flex>

      <Flex
        p="1.6rem 0"
        justify="center"
        align="center"
        position="relative"
        borderBottom="0.5px solid rgba(22, 24, 35, 0.12)"
      >
        <Text className="text" lineHeight="24px" position="absolute" left="0" top="1.6rem">
          Last name
        </Text>
        <Box minW="36rem">
          <InputField
            name="lastName"
            showError={false}
            errorBorderColor="rgba(22, 24, 35, 0.12)"
            showLabel={false}
            placeholder="Last name"
            control={control}
            errors={errors}
          />
        </Box>
      </Flex>

      <Flex
        p="1.6rem 0"
        justify="center"
        align="center"
        position="relative"
        borderBottom="0.5px solid rgba(22, 24, 35, 0.12)"
      >
        <Text className="text" lineHeight="24px" position="absolute" left="0" top="1.6rem">
          Address
        </Text>
        <Box minW="36rem">
          <InputField
            name="address"
            showError={false}
            errorBorderColor="rgba(22, 24, 35, 0.12)"
            showLabel={false}
            placeholder="Address"
            control={control}
            errors={errors}
          />
        </Box>
      </Flex>

      <Flex p="1.6rem 0" justify="center" align="center" position="relative">
        <Text className="text" lineHeight="24px" position="absolute" left="0" top="1.6rem">
          Phone
        </Text>
        <Box minW="36rem">
          <InputField
            name="phone"
            showError={false}
            errorBorderColor="rgba(22, 24, 35, 0.12)"
            showLabel={false}
            placeholder="Phone"
            control={control}
            errors={errors}
          />
        </Box>
      </Flex>

      <Button ref={submitBtnRef} type="submit" display="none"></Button>
    </form>
  );
};

export default FormEdit;
