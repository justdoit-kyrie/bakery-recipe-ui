import { Box, Flex, useColorMode } from '@chakra-ui/react';
import React from 'react';
import { Header } from '~/components';
import { COLOR_MODE_TYPE } from '~/constants';

const HeaderOnlyLayout = ({ children }) => {
  const { colorMode } = useColorMode();

  return (
    <Box w="100vw" h="100vh" bg={colorMode === COLOR_MODE_TYPE.dark && 'gray.800'}>
      <Flex direction="column" className="wrapper" h="100%">
        {/* header */}
        <Box
          boxShadow={`0px 1px 1px ${
            colorMode === COLOR_MODE_TYPE.light ? 'rgb(0 0 0 / 12%)' : 'rgba(233, 234, 216, 17%)'
          }`}
        >
          <Header />
        </Box>

        {/* content */}
        <Box mt="2rem" flex="1">
          {children}
        </Box>
      </Flex>
    </Box>
  );
};

export default HeaderOnlyLayout;
