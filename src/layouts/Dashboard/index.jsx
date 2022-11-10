import { Avatar, Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Search } from '~/components';
import { selectUserInfo } from '~/features/Authenticate/authSlice';
import Sidebar from './components/Sidebar';

const DashboardLayout = ({ children }) => {
  const location = useLocation();
  const userInfo = useSelector(selectUserInfo);

  return (
    <Flex w="100vw" h="100vh">
      {/* sidebar */}
      <Flex flex="0.3" direction="column" maxW="30rem" borderRight="1px solid rgb(22,24,35,0.12)">
        <Sidebar />
      </Flex>
      <Box flex="1" w="100%" h="100%">
        <Flex justify="space-between" p="2.2rem 3rem" borderBottom="1px solid rgba(22,24,35,0.12)">
          <Text textTransform="capitalize" fontWeight={600} fontSize="2.6rem">
            {location.pathname.replace('/', '')}
          </Text>
          <Flex align="center" gap="2rem">
            <Search />

            <Flex align="center" gap="1.5rem">
              <Box>
                <Text textTransform="capitalize" className="text">
                  {`${userInfo?.firstName} ${userInfo?.lastName}`}
                </Text>
                <Text textTransform="capitalize" fontSize="1.2rem" color="textColor.300">
                  {userInfo?.email}
                </Text>
              </Box>
              <Avatar
                src={userInfo?.avartar}
                name={`${userInfo?.firstName} ${userInfo?.lastName}`}
                w="4rem"
                h="4rem"
              />
            </Flex>
          </Flex>
        </Flex>
        <Box p="3rem" h="calc(100% - 91px)" bg="#F2F7FA">
          {children}
        </Box>
      </Box>
    </Flex>
  );
};

export default DashboardLayout;
