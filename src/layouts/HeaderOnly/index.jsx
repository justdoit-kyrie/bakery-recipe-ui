import { Box, Flex, useColorMode } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { Header } from '~/components';
import { COLOR_MODE_TYPE } from '~/constants';

const HeaderOnlyLayout = ({ children }) => {
  const { colorMode } = useColorMode();

  const [positionHeader, setPositionHeader] = useState();
  const childrenElement = useRef();

  useEffect(() => {
    if (childrenElement.current && childrenElement.current.clientHeight > window.innerHeight) {
      setPositionHeader('fixed');
    }
  }, [childrenElement.current]);

  return (
    <Box w="100vw" h="100vh" bg={colorMode === COLOR_MODE_TYPE.dark && 'gray.800'}>
      <Flex direction="column" className="wrapper" h="100%">
        {/* header */}
        <Box
          boxShadow={`0px 1px 1px ${
            colorMode === COLOR_MODE_TYPE.light ? 'rgb(0 0 0 / 12%)' : 'rgba(233, 234, 216, 17%)'
          }`}
          bg="#fff"
          position={positionHeader}
          top="0"
          left="0"
          right="0"
          zIndex="999"
        >
          <Header />
        </Box>

        {/* content */}
        <Box flex="1" ref={childrenElement}>
          {children}
        </Box>
      </Flex>
    </Box>
  );
};

export default HeaderOnlyLayout;
