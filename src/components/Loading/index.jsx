import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { RotatingTriangles } from 'react-loader-spinner';

const Loading = ({ label, h = 80, w = 80, ...passProps }) => {
  return (
    <Box
      {...passProps}
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
      flexDirection="column"
      zIndex={999}
    >
      <RotatingTriangles
        visible={true}
        height={h}
        width={w}
        ariaLabel="rotating-triangels-loading"
        wrapperStyle={{}}
        wrapperClass="rotating-triangels-wrapper"
      />
      {label && (
        <Text className="text" color="white">
          {label}
        </Text>
      )}
    </Box>
  );
};

export default Loading;
