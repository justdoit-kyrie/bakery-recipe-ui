import { Box, Flex, useColorMode } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { Footer, Header } from '~/components';
import { COLOR_MODE_TYPE } from '~/constants';
import ScrollOnTop from '../components/ScrollOnTop';

const DefaultLayout = ({ children }) => {
  const { colorMode } = useColorMode();
  const [isShow, setIsShow] = useState(false);
  const [positionHeader, setPositionHeader] = useState();

  const childrenElement = useRef();

  useEffect(() => {
    const handler = () => {
      const scrollPos = window.pageYOffset;
      const windowSize = window.innerHeight;

      const diffPercent = (scrollPos * 100) / windowSize;

      if (diffPercent >= 200) setIsShow(true);
      else setIsShow(false);
    };
    document.addEventListener('scroll', handler);

    return () => {
      window.scrollTo(0, 0);
      document.removeEventListener('scroll', handler);
    };
  }, []);

  useEffect(() => {
    if (childrenElement.current && childrenElement.current.clientHeight > window.innerHeight)
      setPositionHeader('fixed');
  }, [childrenElement.current]);

  return (
    <Box w="100vw" h="100vh" bg={colorMode === COLOR_MODE_TYPE.dark && 'gray.800'}>
      <Flex direction="column" className="wrapper" h="100%">
        {/* Scroll on Top button */}
        <AnimatePresence exitBeforeEnter>{isShow && <ScrollOnTop />}</AnimatePresence>

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

        {/* footer */}
        <Box bg="#fff" boxShadow="rgba(100, 100, 111, 0.2) 0px 7px 29px 0px">
          <Footer />
        </Box>
      </Flex>
    </Box>
  );
};

export default DefaultLayout;
