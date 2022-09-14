import { Box, useColorMode } from '@chakra-ui/react';
import React from 'react';
import { COLOR_MODE_TYPE } from '~/constants';

const Wrapper = ({ children }) => {
  const { colorMode } = useColorMode();
  return (
    <Box
      bg={colorMode === COLOR_MODE_TYPE.light ? 'rgb(255, 255, 255)' : 'gray.800'}
      minW="22.3rem"
      p="8px 0"
      boxShadow="rgb(0 0 0 / 12%) 0px 4px 16px"
      borderRadius="8px"
    >
      {children}
    </Box>
  );
};

export default Wrapper;
