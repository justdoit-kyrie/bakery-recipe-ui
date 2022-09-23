import { Box, Center, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import FormUpload from './components/FormUpload';

const UploadPage = () => {
  const handleUmountForm = (data) => {
    // call api save daft
    console.log({ name: 'draft', data });
  };

  const handleSubmit = (data) => {
    // call api save daft
    console.log({ name: 'submit', data });
  };

  return (
    <Center h="100%">
      <Flex
        direction="column"
        className="container"
        bg="white"
        w="95%"
        h="98%"
        borderRadius="8px"
        boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;"
        p="2.4rem 5.6rem"
      >
        <Text as="h2" fontSize="2.4rem" lineHeight="1.5" fontWeight={600}>
          Upload post
        </Text>

        <Text as="p" fontSize="1.8rem" lineHeight="1.5" color="textColor.200" mt="2px">
          Upload a post to your account
        </Text>

        <Box flex="1" mt="2.4rem">
          <FormUpload handleUmountForm={handleUmountForm} handleSubmit={handleSubmit} />
        </Box>
      </Flex>
    </Center>
  );
};

export default UploadPage;
