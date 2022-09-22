import { Avatar, Box, Button, Flex, Text } from '@chakra-ui/react';
import _ from 'lodash';
import React, { useContext, useState } from 'react';
import { withTranslation } from 'react-i18next';
import { AiOutlineUser } from 'react-icons/ai';
import { BsBell, BsBellFill, BsThreeDotsVertical } from 'react-icons/bs';
import { FaRegKeyboard } from 'react-icons/fa';
import { HiUpload } from 'react-icons/hi';
import { IoLogOutOutline } from 'react-icons/io5';
import { MdDarkMode, MdLanguage, MdLightMode } from 'react-icons/md';
import { VscColorMode } from 'react-icons/vsc';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { ModalContext } from '~/app/context';
import i18n from '~/app/i18n';

import { COLOR_MODE_TYPE, LANGUAGES, ROUTES_PATH } from '~/constants';
import { AuthenticateModal } from '~/features';
import { selectUserInfo } from '~/features/Authenticate/authSlice';
import { BellIcon, Logo } from '../Icons';
import PopperMenu from './components/PopperMenu';
import Search from './components/Search';

const MOCK_DATA = (t) => ({
  public: [
    {
      icon: MdLanguage,
      label: _.invert(LANGUAGES)[i18n.language],
      children: {
        label: t('header.action.menu.item-1'),
        data: [
          {
            type: LANGUAGES.code,
            value: LANGUAGES.English,
            label: 'English',
          },
          {
            type: LANGUAGES.code,
            value: LANGUAGES['Tiếng Việt (Việt Nam)'],
            label: 'Tiếng Việt (Việt Nam)',
          },
        ],
      },
    },
    {
      icon: VscColorMode,
      label: t('header.action.menu.item-2.label'),
      children: {
        label: t('header.action.menu.item-2.label'),
        data: [
          {
            type: COLOR_MODE_TYPE.code,
            value: COLOR_MODE_TYPE.dark,
            icon: MdDarkMode,
            label: t('header.action.menu.item-2.children.0'),
          },
          {
            type: COLOR_MODE_TYPE.code,
            value: COLOR_MODE_TYPE.light,
            icon: MdLightMode,
            label: t('header.action.menu.item-2.children.1'),
          },
        ],
      },
    },
    {
      to: '*',
      icon: FaRegKeyboard,
      label: t('header.action.menu.item-3'),
    },
  ],
  private: [
    {
      to: '/profile/@123',
      icon: AiOutlineUser,
      label: 'View profile',
    },
    {
      icon: MdLanguage,
      label: _.invert(LANGUAGES)[i18n.language],
      children: {
        label: t('header.action.menu.item-1'),
        data: [
          {
            type: LANGUAGES.code,
            value: LANGUAGES.English,
            label: 'English',
          },
          {
            type: LANGUAGES.code,
            value: LANGUAGES['Tiếng Việt (Việt Nam)'],
            label: 'Tiếng Việt (Việt Nam)',
          },
        ],
      },
    },
    {
      icon: VscColorMode,
      label: t('header.action.menu.item-2.label'),
      children: {
        label: t('header.action.menu.item-2.label'),
        data: [
          {
            type: COLOR_MODE_TYPE.code,
            value: COLOR_MODE_TYPE.dark,
            icon: MdDarkMode,
            label: t('header.action.menu.item-2.children.0'),
          },
          {
            type: COLOR_MODE_TYPE.code,
            value: COLOR_MODE_TYPE.light,
            icon: MdLightMode,
            label: t('header.action.menu.item-2.children.1'),
          },
        ],
      },
    },
    {
      to: '*',
      icon: FaRegKeyboard,
      label: t('header.action.menu.item-3'),
    },
    {
      borderTop: '1px solid rgba(22, 24, 35, 0.12)',
      icon: IoLogOutOutline,
      label: 'Log out',
    },
  ],
});

const Header = ({ t }) => {
  const { onOpen, isOpen, onClose } = useContext(ModalContext);
  const userInfo = useSelector(selectUserInfo);
  const { pathname } = useLocation();

  const [isBellClicked, setIsBellClicked] = useState(false);

  const renderCustomContent = () => (
    <Flex direction="column" minH="40rem" maxH="64rem" minW="37.6rem">
      <Text
        fontFamily="sofiaPro"
        fontWeight={700}
        fontSize="2.4rem"
        lineHeight="28px"
        p="0 1.6rem"
        pt="1.6rem"
        mb="1.6rem"
      >
        Notifications
      </Text>
      <Box flex="1" position="relative">
        {/*  have notification */}
        {/* <Flex
          direction="column"
          position="absolute"
          inset="0"
          w="100%"
          h="100%"
          overflow="auto"
        ></Flex> */}

        {/* not have notification */}
        <Flex
          direction="column"
          justify="center"
          align="center"
          position="absolute"
          inset="0"
          w="100%"
          h="100%"
          overflowY="auto"
        >
          <BellIcon />
          <Text mt="2rem" className="text">
            All activity
          </Text>
          <Text mt="1.2rem" fontSize="1.4rem" lineHeight="17px" color="textColor.300">
            Notifications about your account will appear here.
          </Text>
        </Flex>
      </Box>
    </Flex>
  );

  return (
    <Box className="container">
      {isOpen && <AuthenticateModal isOpen={isOpen} onClose={onClose} />}
      <Box display="flex" justifyContent="space-between" alignItems="center" p="0.5rem 0">
        <Link to={ROUTES_PATH.home}>
          <Logo width="11.8rem" height="5rem" />
        </Link>

        {/* search */}
        <Search />

        {/* actions */}
        <Box display="flex" gap="1.6rem" alignItems="center">
          <Link to={ROUTES_PATH.upload} state={{ from: pathname }}>
            <Button
              leftIcon={<HiUpload />}
              variant="outline-default"
              sx={{
                '& .chakra-button__icon': {
                  mr: '8px',
                },
              }}
            >
              {t('header.action.btn-1')}
            </Button>
          </Link>
          {userInfo ? (
            <>
              <PopperMenu
                trigger="click"
                appendTo="parent"
                hideOnClick="toggle"
                delay={[0, 200]}
                renderCustomContent={renderCustomContent}
              >
                <div
                  style={{
                    minWidth: '32px',
                    minHeight: '3.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={() => setIsBellClicked(!isBellClicked)}
                >
                  {isBellClicked ? <BsBellFill fontSize="2.2rem" /> : <BsBell fontSize="2.2rem" />}
                </div>
              </PopperMenu>
              <PopperMenu data={MOCK_DATA(t).private}>
                <Avatar
                  w="32px"
                  h="32px"
                  src={userInfo.avatar}
                  name={`${userInfo?.firstName} ${userInfo?.lastName}`}
                />
              </PopperMenu>
            </>
          ) : (
            <>
              <Button onClick={onOpen}>{t('header.action.btn-2')}</Button>
              <PopperMenu data={MOCK_DATA(t).public}>
                <Box fontSize="2rem" p="0 1rem" cursor="pointer">
                  <BsThreeDotsVertical />
                </Box>
              </PopperMenu>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default withTranslation()(Header);
