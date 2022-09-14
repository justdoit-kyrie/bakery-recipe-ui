import { Box, Input, useColorMode } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { withTranslation } from 'react-i18next';
import { FiSearch } from 'react-icons/fi';
import { IoIosCloseCircle } from 'react-icons/io';
import { ColorRing } from 'react-loader-spinner';
import { COLOR_MODE_TYPE } from '~/constants';
import { useDebounce } from '~/hooks';

const Search = ({ t }) => {
  const { colorMode } = useColorMode();

  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const debounceValue = useDebounce(searchValue, 800);

  useEffect(() => {
    let id = 0;
    if (debounceValue) {
      setLoading(true);

      // fake call api here
      id = setTimeout(() => {
        setLoading(false);
      }, 500);
    }

    return () => clearTimeout(id);
  }, [debounceValue]);

  return (
    <Box
      display="flex"
      h="4.6rem"
      minW="36.1rem"
      bg={
        colorMode === COLOR_MODE_TYPE.light ? 'rgba(22, 24, 35, 0.06)' : 'rgba(233, 234,216, 17%)'
      }
      borderRadius="92px"
    >
      <Box flex="1" position="relative">
        <Input
          value={searchValue}
          type="text"
          placeholder={t('header.search.placeholder')}
          border="none"
          bg="transparent"
          w="100%"
          h="100%"
          pl="2rem"
          pr="3.2rem"
          fontWeight={400}
          fontSize="16px"
          lineHeight="22px"
          focusBorderColor="none"
          userSelect="none"
          sx={{
            '&': {
              caretColor: 'rgba(254,44,85,1.0)',
            },
          }}
          onChange={(e) => {
            if (!e.target.value.startsWith(' ')) setSearchValue(e.target.value);
          }}
        />

        {/* close btn */}
        {searchValue && !loading && (
          <Box
            position="absolute"
            top="50%"
            transform="translateY(-50%)"
            right="1rem"
            zIndex={10}
            onClick={() => setSearchValue('')}
          >
            <IoIosCloseCircle
              fontSize="1.8rem"
              color={
                colorMode === COLOR_MODE_TYPE.light
                  ? 'rgba(22, 24, 35, 0.34)'
                  : 'rgba(233, 234, 216, 0.5)'
              }
            />
          </Box>
        )}

        {/* loading btn */}
        {loading && (
          <Box position="absolute" top="50%" transform="translateY(-50%)" right="1rem" zIndex={10}>
            <ColorRing
              visible={true}
              height="18"
              width="18"
              ariaLabel="blocks-loading"
              colors={
                colorMode === COLOR_MODE_TYPE.light
                  ? [
                      'rgba(22, 24, 35, 0.34)',
                      'rgba(22, 24, 35, 0.34)',
                      'rgba(22, 24, 35, 0.34)',
                      'rgba(22, 24, 35, 0.34)',
                      'rgba(22, 24, 35, 0.34)',
                    ]
                  : [
                      'rgba(233, 234, 216, 0.5)',
                      'rgba(233, 234, 216, 0.5)',
                      'rgba(233, 234, 216, 0.5)',
                      'rgba(233, 234, 216, 0.5)',
                      'rgba(233, 234, 216, 0.5)',
                    ]
              }
            />
          </Box>
        )}
      </Box>
      <Box
        minW="0rem"
        h="100%"
        w="52px"
        flexShrink={0}
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius="0 92px 92px 0"
        position="relative"
        cursor="pointer"
        sx={{
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            right: '100%',
            bg:
              colorMode === COLOR_MODE_TYPE.light
                ? 'rgba(22, 24, 35, 0.12)'
                : 'rgba(233, 234, 216, 0.20)',
            w: '1px',
            h: '65%',
          },
        }}
        _hover={{
          bg:
            colorMode === COLOR_MODE_TYPE.light
              ? 'rgba(22, 24, 35, 0.03)'
              : 'rgba(233, 234, 216, 0.17)',
        }}
        _active={{
          bg:
            colorMode === COLOR_MODE_TYPE.light
              ? 'rgba(22, 24, 35, 0.06)'
              : 'rgba(233, 234, 216, 0.20)',
        }}
      >
        <FiSearch fontSize="20px" />
      </Box>
    </Box>
  );
};

export default withTranslation()(Search);
