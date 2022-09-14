import { Box } from '@chakra-ui/react';
import React from 'react';
import { RotatingTriangles } from 'react-loader-spinner';

const Loading = () => {
  return (
    <Box
      w="100%"
      h="100%"
      bg="rgba(0,0,0,0.2)"
      position="absolute"
      top="0"
      left="0"
      right="0"
      display="flex"
      justifyContent="center"
      alignItems="center"
      zIndex={999}
    >
      <RotatingTriangles
        visible={true}
        height="80"
        width="80"
        ariaLabel="rotating-triangels-loading"
        wrapperStyle={{}}
        wrapperClass="rotating-triangels-wrapper"
      />
    </Box>
  );
};

export default Loading;
