import { Box, Button, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { TailSpin } from 'react-loader-spinner';
import { toast } from 'react-toastify';
import { default as axios } from '~/app/api';
import { API_CODE, API_PATH } from '~/constants';
import InputField from '../Input';

const CodeField = ({ control, errors, isValid, getValues }) => {
  const [loading, setLoading] = useState(false);

  const handleSendCode = async () => {
    try {
      setLoading(true);
      const email = getValues('email');
      const { code, message } = await axios.get(API_PATH.users.sendEmail, {
        params: { email },
      });
      if (+code === API_CODE.success) {
        toast.success(message);
      }
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  return (
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
          mb={errors?.code ? '2rem' : 0}
          size="lg"
          borderRadius="0 4px 4px 0"
          minH="4.7rem"
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
  );
};

export default CodeField;
