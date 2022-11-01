import { Box, Flex, Text } from '@chakra-ui/react';
import React, { Fragment } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { FaRegListAlt } from 'react-icons/fa';
import { FiLogOut, FiSettings } from 'react-icons/fi';
import { GoReport } from 'react-icons/go';
import { IoDocumentOutline } from 'react-icons/io5';
import { MdFastfood } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import { Logo } from '~/components/Icons';
import { ROUTES_PATH } from '~/constants';

const MOCK_DATA = [
  {
    to: ROUTES_PATH.admin.users,
    icon: AiOutlineUser,
    label: 'Users',
  },
  {
    to: ROUTES_PATH.admin.posts,
    icon: IoDocumentOutline,
    label: 'Posts',
  },
  {
    to: ROUTES_PATH.admin.reports,
    icon: GoReport,
    label: 'Reports',
  },
  {
    to: ROUTES_PATH.admin.ingredients,
    icon: MdFastfood,
    label: 'Ingredients',
  },
  {
    to: ROUTES_PATH.admin.categories,
    icon: FaRegListAlt,
    label: 'Categories',
  },
  {
    to: '/settings',
    icon: FiSettings,
    label: 'Settings',
  },
  {
    to: '',
    icon: FiLogOut,
    label: 'Logout',
    onClick: () => {},
  },
];

const Sidebar = () => {
  return (
    <Box w="100%" h="100%">
      <Box borderBottom="1px solid rgb(22,24,35,0.12)" p="2rem 5rem">
        <Logo width="11.8rem" height="5rem" />
      </Box>
      <Flex direction="column" w="100%" h="calc(100% - 91px)" p="3rem" justify="space-between">
        <Flex direction="column">
          {MOCK_DATA.slice(0, MOCK_DATA.length - 2).map((item, idx) => (
            <NavLink
              to={item.to}
              key={idx}
              style={({ isActive }) =>
                isActive
                  ? { backgroundColor: 'rgb(254, 44, 85)', color: '#fff', borderRadius: '8px' }
                  : { color: 'rgba(22, 24, 35, 1.0)' }
              }
            >
              <Flex align="center" gap="1rem" p="1.3rem 2rem" fontSize="1.6rem">
                <item.icon />
                <Text fontWeight={500}>{item.label}</Text>
              </Flex>
            </NavLink>
          ))}
        </Flex>

        <Flex direction="column">
          {MOCK_DATA.slice(MOCK_DATA.length - 2).map((item, idx) => {
            let Comp = NavLink;
            let passProps =
              typeof item.onClick !== 'function'
                ? {
                    to: item.to,

                    style: ({ isActive }) =>
                      isActive
                        ? {
                            backgroundColor: 'rgb(254, 44, 85)',
                            color: '#fff',
                            borderRadius: '8px',
                          }
                        : {},
                  }
                : {};
            if (typeof item.onClick === 'function') Comp = Fragment;
            return (
              <Comp key={idx} {...passProps}>
                <Flex align="center" gap="1rem" p="1.3rem 2rem" fontSize="1.6rem" cursor="pointer">
                  <item.icon />
                  <Text fontWeight={500}>{item.label}</Text>
                </Flex>
              </Comp>
            );
          })}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Sidebar;
