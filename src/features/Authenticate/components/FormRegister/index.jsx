import { Box, Button, Flex, Text, useColorMode } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiCheck } from 'react-icons/bi';
import * as yup from 'yup';
import { InputField, SelectField } from '~/components/Form-field';
import { EyesClose, EyesOpen } from '~/components/Icons';
import {
  AUTHENTICATE_FORM_TYPE,
  COLOR_MODE_TYPE,
  DOB_DAY,
  DOB_MONTH,
  DOB_YEAR,
  EMAIL_REGEX,
  PASSWORD_REGEX_FULL,
  PASSWORD_REGEX_WITHOUT_LENGTH,
} from '~/constants';
import { getFullYear } from '~/utils';
import { optionTemplate, selectedValueTemplate } from './templates';

const schema = yup
  .object({
    email: yup
      .string()
      .required('Email is a required field')
      .matches(EMAIL_REGEX, 'Enter a valid email address'),
    password: yup.string().required('Password is a required field').matches(PASSWORD_REGEX_FULL),
    day: yup.number().required(),
    month: yup.string().required(),
    year: yup.number().required(),
  })
  .required();

const defaultValues = {
  email: '',
  password: '',
  day: null,
  month: null,
  year: null,
};

const FormRegister = ({ initialRef, setType }) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues,
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });
  const watchPassword = watch('password');

  const { colorMode } = useColorMode();
  const [pwdType, setPwdType] = useState(true);
  const [isFocus, setIsFocus] = useState(false);

  const onSubmit = (data) => {
    console.log({ data });
    typeof setType === 'function' && setType(AUTHENTICATE_FORM_TYPE.getInfo);
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
      <Box>
        <Text className="text" mb="4px">
          When’s your birthday?
        </Text>
        <Flex justify="flex-start" align="flex-start" gap="8px">
          <SelectField
            name="day"
            options={DOB_DAY}
            placeholder="Day"
            filterPlaceholder="Enter day"
            control={control}
            errors={errors}
            valueTemplate={selectedValueTemplate}
            itemTemplate={optionTemplate}
            filter={false}
            showClear={false}
          />
          <SelectField
            name="month"
            options={DOB_MONTH}
            placeholder="Month"
            filterPlaceholder="Enter Month"
            control={control}
            errors={errors}
            valueTemplate={selectedValueTemplate}
            itemTemplate={optionTemplate}
            filter={false}
            showClear={false}
          />
          <SelectField
            name="year"
            options={getFullYear(DOB_YEAR[0], DOB_YEAR[1])}
            placeholder="Year"
            filterPlaceholder="Enter Year"
            control={control}
            errors={errors}
            valueTemplate={selectedValueTemplate}
            itemTemplate={optionTemplate}
            filter={false}
            showClear={false}
          />
        </Flex>
        <Text color="rgba(22, 24, 35, 0.5)" fontSize="1.4rem" lineHeight="20px" mt="4px">
          Your birthday won't be shown publicly.
        </Text>
      </Box>

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

      <Button
        as={motion.button}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        size="lg"
        mt="2.1rem"
        variant={!isValid ? 'disabled' : 'primary'}
      >
        Next
      </Button>
    </form>
  );
};

export default FormRegister;
