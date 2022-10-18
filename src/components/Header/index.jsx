/* eslint-disable no-unused-vars */
import { Avatar, Button, Flex, Image, useColorMode } from '@chakra-ui/react';
import { useContext, useEffect, useMemo, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { IoLogOutOutline } from 'react-icons/io5';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import { VscColorMode } from 'react-icons/vsc';
import { useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ModalContext } from '~/app/context';

import LOGO from '~/assets/images/logo.png';
import {
  AUTHENTICATE_FORM_TYPE,
  COLOR_MODE_TYPE,
  HOME_FEATURES,
  LOGOUT_TYPE,
  ROUTES_PATH,
} from '~/constants';
import { AuthenticateModal } from '~/features';
import { selectUserInfo } from '~/features/Authenticate/authSlice';
import { useCallbackPrompt } from '~/hooks';
import PopperMenu from './components/PopperMenu';
import Search from './components/Search';

const MOCK_DATA = {
  nav: [
    { to: ROUTES_PATH.common.home, label: 'Home' },
    {
      to: ROUTES_PATH.user.collections.replace(':category', HOME_FEATURES.reviewing),
      label: 'Review',
    },
    { to: ROUTES_PATH.user.planning, label: 'Kế Hoạch' },
  ],
  menu: (colorMode) => ({
    private: [
      {
        to: '/profile/@123',
        icon: AiOutlineUser,
        label: 'Xem thông tin',
      },
      {
        icon: VscColorMode,
        label: 'Chủ đề',
        children: {
          label: 'Chủ đề',
          data: [
            {
              type: COLOR_MODE_TYPE.code,
              value: COLOR_MODE_TYPE.dark,
              icon: MdDarkMode,
              label: 'Tối',
            },
            {
              type: COLOR_MODE_TYPE.code,
              value: COLOR_MODE_TYPE.light,
              icon: MdLightMode,
              label: 'Sáng',
            },
          ],
        },
      },
      {
        type: LOGOUT_TYPE,
        icon: IoLogOutOutline,
        borderTop: `1px solid ${
          colorMode === COLOR_MODE_TYPE.light ? 'rgba(22, 24, 35, 0.12)' : ''
        }`,
        label: 'Đăng xuất',
      },
    ],
  }),
};

const Header = () => {
  const { isOpen, onOpen, onClose } = useContext(ModalContext);
  const { colorMode } = useColorMode();
  const userInfo = useSelector(selectUserInfo);
  const location = useLocation();

  const [type, setType] = useState(AUTHENTICATE_FORM_TYPE.login);

  const condition = useMemo(() => {
    if (location?.state?.from === '/privateRoute') {
      return false;
    }
    return location.pathname === ROUTES_PATH.common.home ? (userInfo ? false : true) : false;
  }, [location.state]);

  const { isShow, onConfirm, onCancel } = useCallbackPrompt(condition);

  useEffect(() => {
    if (userInfo && isShow) {
      onConfirm();
    }
  }, [userInfo]);

  useEffect(() => {
    // reset default form && block navigation status
    if (!isShow && !isOpen) {
      setType(AUTHENTICATE_FORM_TYPE.login);
    }
  }, [isShow, isOpen]);

  return (
    <>
      {(isShow || isOpen) && (
        <AuthenticateModal
          isOpen={isOpen}
          isShow={isShow}
          onClose={onClose}
          onCancel={onCancel}
          defaultType={type}
        />
      )}

      <Flex justify="space-between" className="container" py="10px">
        <Flex align="center" gap="34px">
          <Link to={ROUTES_PATH.common.home}>
            <Image src={LOGO} alt="logo" />
          </Link>

          <Flex align="baseline" justify="flex-start" gap="40px">
            {MOCK_DATA.nav.map((item, idx) => (
              <NavLink
                to={item.to}
                key={idx}
                style={({ isActive }) =>
                  isActive
                    ? {
                        color:
                          colorMode === COLOR_MODE_TYPE.light
                            ? 'rgba(22, 24, 35, 1.0)'
                            : 'rgba(233, 234,216, 1)',
                        fontWeight: 600,
                        fontSize: '16px',
                      }
                    : {
                        color:
                          colorMode === COLOR_MODE_TYPE.light
                            ? 'rgba(22, 24, 35, 0.5)'
                            : 'rgba(233, 234,216, 0.5)',
                        fontSize: '16px',
                      }
                }
              >
                {item.label}
              </NavLink>
            ))}
          </Flex>
        </Flex>

        <Flex align="center" gap="20px">
          <Search />

          {userInfo ? (
            <PopperMenu data={MOCK_DATA.menu(colorMode).private}>
              <Avatar
                w="40px"
                h="40px"
                src={userInfo.avatar}
                name={`${userInfo.firstName} ${userInfo.lastName}`}
              />
            </PopperMenu>
          ) : (
            <>
              <Button
                variant="outline-default"
                sx={{
                  '& .chakra-button__icon': {
                    mr: '8px',
                  },
                }}
                onClick={() => {
                  setType(AUTHENTICATE_FORM_TYPE.login);
                  onOpen();
                }}
              >
                Đăng nhập
              </Button>

              <Button
                variant="outline-default"
                sx={{
                  '& .chakra-button__icon': {
                    mr: '8px',
                  },
                }}
                onClick={() => {
                  setType(AUTHENTICATE_FORM_TYPE.register);
                  onOpen();
                }}
              >
                Đăng ký
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default Header;
