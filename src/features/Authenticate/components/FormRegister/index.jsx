import { Box, Button, Flex, Text, useColorMode } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiCheck } from 'react-icons/bi';
import { TailSpin } from 'react-loader-spinner';
import * as yup from 'yup';
import { InputField, SelectField } from '~/components/Form-field';
import { EyesClose, EyesOpen } from '~/components/Icons';
import {
  AUTHENTICATE_FORM_TYPE,
  CODE_GMAIL_LENGTH,
  COLOR_MODE_TYPE,
  DOB_DAY,
  EMAIL_REGEX,
  PASSWORD_REGEX_FULL,
  PASSWORD_REGEX_WITHOUT_LENGTH,
} from '~/constants';
import { optionTemplate, selectedValueTemplate } from './templates';

const schema = yup
  .object({
    email: yup
      .string()
      .required('Email is a required field')
      .matches(EMAIL_REGEX, 'Enter a valid email address'),
    password: yup.string().required('Password is a required field').matches(PASSWORD_REGEX_FULL),
    role: yup.string().required(),
  })
  .required();

const defaultValues = {
  email: '',
  password: '',
  role: null,
  code: '',
};

const FormRegister = ({ initialRef, setType }) => {
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
  const watchPassword = watch('password');
  const watchCode = watch('code');

  const { colorMode } = useColorMode();
  const [pwdType, setPwdType] = useState(true);
  const [isFocus, setIsFocus] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    // call api & set data to redux
    console.log({ data });
    typeof setType === 'function' && setType(AUTHENTICATE_FORM_TYPE.getInfo);
  };

  const handleSendCode = () => {
    setLoading(true);
    const email = getValues('email');
    // call api send code gmail
    setTimeout(() => {
      console.log({ email });
      setLoading(false);
    }, 1000);
  };

  const handleTogglePwd = (e) => {
    e.stopPropagation();
    setPwdType(!pwdType);
  };

  useEffect(() => {
    const subscription = watch(() => {});
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <SelectField
        name="role"
        options={DOB_DAY}
        label="Who're you?"
        placeholder="Select role"
        control={control}
        errors={errors}
        valueTemplate={selectedValueTemplate}
        itemTemplate={optionTemplate}
        filter={false}
        showClear={false}
      />

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
        showError={false}
        rightIcon={{
          // field icon truyền function và func đó return html
          icon: pwdType ? EyesClose : EyesOpen,
          w: '2rem',
          h: '2rem',
          color: colorMode === COLOR_MODE_TYPE.dark && 'rgba(233, 234,216, 1)',
          onClick: handleTogglePwd,
        }}
        setIsFocus={setIsFocus}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
      />

      {isFocus && (
        <Box display="flex" flexDirection="column" mt="0.5rem">
          <Text as="h4" fontWeight="600" m="4px 0">
            Your password must have:
          </Text>
          <Text as="p" display="flex" alignItems="center" mt="4px">
            <BiCheck
              color={
                watchPassword.length >= 8 && watchPassword.length <= 20
                  ? 'green.400'
                  : 'textColor.200'
              }
            />
            <Text
              as="span"
              ml="4px"
              color={
                watchPassword.length >= 8 && watchPassword.length <= 20
                  ? 'green.400'
                  : `${errors['password'] ? 'red.300' : 'textColor.200'}`
              }
              lineHeight="1"
              fontSize="1.2rem"
              fontWeight="400"
            >
              8 to 20 characters
            </Text>
          </Text>
          <Text as="p" display="flex" alignItems="center" mt="4px">
            <BiCheck
              color={
                watchPassword.match(PASSWORD_REGEX_WITHOUT_LENGTH) ? 'green.400' : 'textColor.200'
              }
            />
            <Text
              as="span"
              ml="4px"
              color={
                watchPassword.match(PASSWORD_REGEX_WITHOUT_LENGTH)
                  ? 'green.400'
                  : `${errors['password'] ? 'red.300' : 'textColor.200'}`
              }
              lineHeight="1"
              fontSize="1.2rem"
              fontWeight="400"
            >
              Lowercase, uppercase, numbers, and special characters
            </Text>
          </Text>
        </Box>
      )}

      <Flex
        align="flex-end"
        sx={{
          '& > :first-of-type': {
            flex: 0.75,
          },
          '& > :last-of-type': {
            flex: 0.25,
          },
        }}
      >
        <InputField
          name="code"
          placeholder="Enter 6-digit code"
          control={control}
          errors={errors}
          borderRadius="4px 0 0 4px"
        />
        <Box cursor={!isValid || loading ? 'not-allowed' : 'pointer'}>
          <Button
            size="lg"
            borderRadius="0 4px 4px 0"
            minH="4.4rem"
            variant={!isValid || loading ? 'disabled' : 'default-primary'}
            border="1px solid rgba(22, 24, 35, 0.12)"
            borderLeft="none"
            rightIcon={
              <TailSpin
                height="20"
                width="20"
                color="rgba(22, 24, 35, 0.34)"
                ariaLabel="tail-spin-loading"
                radius="1"
                visible={loading}
              />
            }
            onClick={handleSendCode}
          >
            Send code
          </Button>
        </Box>
      </Flex>

      <Button
        as={motion.button}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        size="lg"
        mt="2.1rem"
        w="100%"
        variant={watchCode.length !== CODE_GMAIL_LENGTH ? 'disabled' : 'primary'}
      >
        Next
      </Button>
    </form>
  );
};

export default FormRegister;
