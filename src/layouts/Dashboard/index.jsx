import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import Sidebar from './components/Sidebar';

const DashboardLayout = ({ children }) => {
  return (
    <Flex w="100vw" h="100vh">
      {/* sidebar */}
      <Flex flex="0.3" direction="column" maxW="30rem" borderRight="1px solid rgb(22,24,35,0.12)">
        <Sidebar />
      </Flex>
      <Box flex="1">{children}</Box>
    </Flex>
  );
};

export default DashboardLayout;
