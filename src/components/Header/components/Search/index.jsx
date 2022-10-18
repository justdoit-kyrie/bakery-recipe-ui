import { Box, Input, Text, useColorMode } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoIosCloseCircle } from 'react-icons/io';
import { ColorRing } from 'react-loader-spinner';
import { COLOR_MODE_TYPE } from '~/constants';
import { useDebounce } from '~/hooks';

const Search = () => {
  const { colorMode } = useColorMode();

  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isFocus, setIsFocus] = useState(false);

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

  const searchBtnColor = () => {
    if (searchValue) {
      if (colorMode === COLOR_MODE_TYPE.light) {
        return 'textColor.400';
      }
      return 'darkTextColor.400';
    }
    if (colorMode === COLOR_MODE_TYPE.light) {
      return 'textColor.200';
    }
    return 'rgba(233, 234,216, 0.6)';
  };

  return (
    <Box
      display="flex"
      h="40px"
      w={isFocus ? '250px' : '150px'}
      bg={
        colorMode === COLOR_MODE_TYPE.light ? 'rgba(22, 24, 35, 0.06)' : 'rgba(233, 234,216, 17%)'
      }
      borderRadius="92px"
      transition="all 0.25s linear"
    >
      <Box flex="1" position="relative">
        {!isFocus && (
          <>
            <Text
              as={motion.p}
              position="absolute"
              top="50%"
              left="15px"
              transform="translateY(-50%)"
              color={colorMode === COLOR_MODE_TYPE.light ? 'textColor.200' : 'darkTextColor.400'}
            >
              <FiSearch fontSize="16px" />
            </Text>
            <Text
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%,-50%)"
              color={colorMode === COLOR_MODE_TYPE.light ? 'textColor.200' : 'darkTextColor.400'}
              lineHeight="1"
              fontSize="16px"
            >
              Tìm kiếm
            </Text>
          </>
        )}

        <Input
          color="textColor.400"
          value={searchValue}
          type="text"
          placeholder={isFocus ? 'Tìm kiếm' : ' '}
          border="none"
          bg="transparent"
          w="100%"
          h="100%"
          pl="20px"
          pr="32px"
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
          onFocus={() => setIsFocus(true)}
          onBlur={() => {
            if (!searchValue) setIsFocus(false);
          }}
        />

        {/* close btn */}
        {searchValue && !loading && (
          <Box
            position="absolute"
            top="50%"
            transform="translateY(-50%)"
            right="10px"
            zIndex={10}
            onClick={() => {
              setSearchValue('');
              setIsFocus(false);
            }}
          >
            <IoIosCloseCircle
              fontSize="18px"
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
          <Box position="absolute" top="50%" transform="translateY(-50%)" right="10px" zIndex={10}>
            <ColorRing
              visible
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

      {isFocus && (
        <Box
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { type: 'spring', duration: 0.5, delay: 0.25 } }}
          color={searchBtnColor()}
          minW="0px"
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
      )}
    </Box>
  );
};

export default Search;
