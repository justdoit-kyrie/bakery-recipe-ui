import { Box, Text, useColorMode } from '@chakra-ui/react';
import React, { useState } from 'react';
import { BiCheck } from 'react-icons/bi';

import { EyesClose, EyesOpen } from '~/components/Icons';
import { COLOR_MODE_TYPE, PASSWORD_REGEX_WITHOUT_LENGTH } from '~/constants';
import InputField from '../Input';

const PasswordField = ({ control, errors, watchPassword, name, placeholder }) => {
  const { colorMode } = useColorMode();

  const [pwdType, setPwdType] = useState(true);
  const [isFocus, setIsFocus] = useState(false);

  const handleTogglePwd = (e) => {
    e.stopPropagation();
    setPwdType(!pwdType);
  };

  return (
    <>
      <InputField
        type={pwdType ? 'password' : 'text'}
        name={name}
        placeholder={placeholder}
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
    </>
  );
};

PasswordField.defaultProps = {
  name: 'password',
  placeholder: 'Password',
};

export default PasswordField;
