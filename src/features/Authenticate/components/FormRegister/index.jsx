import { Button } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { CodeField, InputField, PasswordField, SelectField } from '~/components/Form-field';
import {
  AUTHENTICATE_FORM_TYPE,
  CODE_GMAIL_LENGTH,
  DOB_DAY,
  EMAIL_REGEX,
  PASSWORD_REGEX_FULL,
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
    code: yup.string().length(CODE_GMAIL_LENGTH, 'Enter 6-digit code'),
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
  const watchEmail = watch('email');
  const watchPassword = watch('password');

  const onSubmit = (data) => {
    // call api & set data to redux
    console.log({ data });
    typeof setType === 'function' && setType(AUTHENTICATE_FORM_TYPE.getInfo);
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

      <PasswordField control={control} errors={errors} watchPassword={watchPassword} />

      <CodeField control={control} errors={errors} isValid={!!watchEmail} getValues={getValues} />

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
