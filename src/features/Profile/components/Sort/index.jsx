import { Box, Flex, Square, Text, useColorMode } from '@chakra-ui/react';
import HeadlessTippy from '@tippyjs/react/headless';
import React, { useEffect, useState } from 'react';
import { GoCheck } from 'react-icons/go';
import { HiChevronDown } from 'react-icons/hi';

import { COLOR_MODE_TYPE } from '~/constants';
import LayoutButton from '../LayoutButton';
const MOCK_DATA = {
  sort_by: {
    last: {
      code: 'now',
      label: 'Last viewed',
    },
    date: {
      code: 'created_at',
      label: 'Date created',
    },
    alphabet: {
      code: 'name',
      label: 'Alphabetical',
    },
  },
  order_by: {
    old: {
      code: 1,
      label: 'Oldest first',
    },
    new: {
      code: -1,
      label: 'Newest first',
    },
  },
};
const Sort = ({ displayType, setDisplayType }) => {
  const { sort_by, order_by } = MOCK_DATA;
  const { colorMode } = useColorMode();

  const [sortBy, setSortBy] = useState(sort_by.last.code);
  const [orderBy, setOrderBy] = useState(order_by.new.code);

  useEffect(() => {
    // call api sort
  }, [sortBy, orderBy]);

  const renderContentDropdown = () => (
    <Box
      bg={colorMode === COLOR_MODE_TYPE.light ? 'rgb(255, 255, 255)' : 'gray.800'}
      minW="16.2rem"
      p="8px 0"
      boxShadow="rgb(0 0 0 / 12%) 0px 4px 16px"
      borderRadius="8px"
    >
      <Flex direction="column" align="flex-start" justify="flex-start">
        <Flex direction="column" w="100%">
          <Text p="0 3rem" color="textColor.200" fontWeight="600">
            Sort by
          </Text>

          {Object.entries(sort_by).map(([, value], idx) => (
            <Flex
              key={idx}
              align="center"
              gap="0.5rem"
              minH="2.4rem"
              cursor="pointer"
              onClick={() => setSortBy(value.code)}
              _hover={{
                bg: 'red.400',
                color: '#fff',
              }}
            >
              <Square w="2.4rem" h="2.4rem">
                {sortBy === value.code && <GoCheck />}
              </Square>
              <Text fontSize="1.4rem" fontWeight="400" lineHeight="16px" className="secondary-font">
                {value.label}
              </Text>
            </Flex>
          ))}
        </Flex>

        <Flex
          direction="column"
          w="100%"
          mt="1rem"
          pt="1rem"
          borderTop="1px solid rgba(22, 24, 35, 0.12)"
        >
          <Text p="0 3rem" color="textColor.200" fontWeight="600">
            Order
          </Text>

          {Object.entries(order_by).map(([, value], idx) => (
            <Flex
              key={idx}
              align="center"
              gap="0.5rem"
              minH="2.4rem"
              cursor="pointer"
              onClick={() => setOrderBy(value.code)}
              _hover={{
                bg: 'red.400',
                color: '#fff',
              }}
            >
              <Square w="2.4rem" h="2.4rem">
                {orderBy === value.code && <GoCheck />}
              </Square>
              <Text fontSize="1.4rem" fontWeight="400" lineHeight="16px" className="secondary-font">
                {value.label}
              </Text>
            </Flex>
          ))}
        </Flex>
      </Flex>
    </Box>
  );

  return (
    <Flex justify="flex-end" align="flex-end" gap="1rem">
      <Flex align="center" gap="0.5rem">
        <Text color="textColor.200" fontWeight={600}>
          Sort:
        </Text>

        <HeadlessTippy
          trigger="click"
          interactive
          placement="bottom-end"
          render={(attrs) => (
            <div className="box" tabIndex="-1" {...attrs}>
              {renderContentDropdown()}
            </div>
          )}
        >
          <Flex align="center" userSelect="none" cursor="pointer">
            <Text lineHeight="1">Last viewed</Text>
            <HiChevronDown color="rgba(22, 24, 35, 1.0)" />
          </Flex>
        </HeadlessTippy>
      </Flex>

      <LayoutButton displayType={displayType} setDisplayType={setDisplayType} />
    </Flex>
  );
};

export default Sort;
