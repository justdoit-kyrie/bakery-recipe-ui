import { Box, Text, useColorMode } from '@chakra-ui/react';
import Tippy from '@tippyjs/react/headless';
import React, { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { CustomButton, PopperWrapper } from '~/components';
import { COLOR_MODE_TYPE, LANGUAGES, ROUTES_PATH } from '~/constants';
import { logout } from '~/features/Authenticate/authSlice';

/**
 * component PopperMenu
 * @param {i18next-react} t translate
 * @param {React.Component} children
 * @param {[]} data data of dropdown popper
 * @param {function} renderCustomContent opposite prop data -> render content not base on props data
 * @param {any} passProps remaining tippy props
 * @param {i18next-react} tReady not used because have props passProps
x * @returns
 */

// eslint-disable-next-line no-unused-vars
const PopperMenu = ({ t, i18n, tReady, children, data, renderCustomContent, ...passProps }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [historyList, setHistoryList] = useState([{ data }]);
  const currentMenu = historyList[historyList.length - 1];

  useEffect(() => setHistoryList([{ data }]), [data]);

  const handleChangeStepMenu = (item) => {
    if (item.children) {
      setHistoryList((prev) => [...prev, item.children]);
    }
  };

  const handleBack = () => setHistoryList((prev) => prev.slice(0, prev.length - 1));

  const handleLogout = () => {
    dispatch(logout());
    navigate(ROUTES_PATH.common.home);
  };

  const renderContent = () =>
    currentMenu.data.map((item, idx) => {
      const { label, type, icon, ...contentProps } = item;

      return (
        <CustomButton
          {...contentProps}
          key={idx}
          label={label}
          leftIcon={{ icon, fontSize: '1.8rem' }}
          p="1rem 1.6rem"
          cursor="pointer"
          display="flex"
          alignItems="center"
          gap="8px"
          fontSize="1.6rem"
          lineHeight="22px"
          fontWeight={historyList.length > 1 ? '500' : '600'}
          w="100%"
          fontFamily={historyList.length > 1 && 'SofiaPro'}
          _hover={{
            bg:
              colorMode === COLOR_MODE_TYPE.light ? 'rgba(22, 24, 35, 0.03)' : 'darkTextColor.500',
          }}
          onChange={() => {}}
          onClick={() => {
            switch (type) {
              case COLOR_MODE_TYPE.code: {
                if (colorMode !== item.value) {
                  toggleColorMode();
                }
                break;
              }
              case LANGUAGES.code:
                i18n.changeLanguage(item.value);
                window.location.reload();
                break;
              default: {
                handleLogout();
                break;
              }
            }
            handleChangeStepMenu(item);
          }}
        />
      );
    });

  return (
    <Tippy
      interactive
      placement="bottom-end"
      delay={[0, 600]}
      render={(attrs) => (
        <div className="box" tabIndex="-1" {...attrs}>
          <PopperWrapper>
            {typeof renderCustomContent === 'function' ? (
              renderCustomContent()
            ) : (
              <>
                {historyList.length > 1 && (
                  <Box
                    minH="5rem"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    position="relative"
                    w="100%"
                    fontSize="1.6rem"
                    mt="-8px"
                  >
                    <Text
                      as="span"
                      position="absolute"
                      top="50%"
                      transform="translateY(-50%)"
                      left="2rem"
                      fontSize="2.5rem"
                      cursor="pointer"
                      onClick={handleBack}
                    >
                      <HiOutlineChevronLeft />
                    </Text>
                    <Text className="text">{currentMenu.label}</Text>
                  </Box>
                )}

                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-start"
                  alignItems="flex-start"
                >
                  {renderContent()}
                </Box>
              </>
            )}
          </PopperWrapper>
        </div>
      )}
      onHide={() => setHistoryList((prev) => prev.slice(0, 1))}
      {...passProps}
    >
      {children}
    </Tippy>
  );
};

export default withTranslation()(PopperMenu);
