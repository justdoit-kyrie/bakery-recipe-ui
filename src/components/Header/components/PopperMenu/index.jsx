/* eslint-disable no-unused-vars */
import { Box, Text, useColorMode } from '@chakra-ui/react';
import Tippy from '@tippyjs/react/headless';
import _ from 'lodash';
import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaRegKeyboard } from 'react-icons/fa';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { MdDarkMode, MdLanguage, MdLightMode } from 'react-icons/md';
import { VscColorMode } from 'react-icons/vsc';
import i18n from '~/app/i18n';

import { CustomButton, PopperWrapper } from '~/components';
import { COLOR_MODE_TYPE, LANGUAGES } from '~/constants';

const MOCK_DATA = (t) => [
  {
    icon: MdLanguage,
    label: 'Language',
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
];

const PopperMenu = ({ t }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  const [language, setLanguage] = useState(i18n.language);
  const [historyList, setHistoryList] = useState([{ data: MOCK_DATA(t) }]);
  const currentMenu = historyList[historyList.length - 1];

  const handleChangeStepMenu = (item) => {
    if (item.children) {
      setHistoryList((prev) => [...prev, item.children]);
    }
  };

  const handleBack = () => setHistoryList((prev) => prev.slice(0, prev.length - 1));

  const renderContent = () =>
    currentMenu.data.map((item, idx) => {
      const { label, type, icon, ...passProps } = item;

      return (
        <CustomButton
          {...passProps}
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
                {
                  i18n.changeLanguage(item.value);
                  setLanguage(item.value);
                }
                break;
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
          </PopperWrapper>
        </div>
      )}
      onHide={() => setHistoryList((prev) => prev.slice(0, 1))}
    >
      <Box fontSize="2rem" p="0 1rem" cursor="pointer">
        <BsThreeDotsVertical />
      </Box>
    </Tippy>
  );
};

export default withTranslation()(PopperMenu);
