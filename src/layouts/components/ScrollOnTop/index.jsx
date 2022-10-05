import { Circle, keyframes, usePrefersReducedMotion } from '@chakra-ui/react';
import Tippy from '@tippyjs/react';
import { motion } from 'framer-motion';
import React from 'react';
import { HiOutlineChevronDoubleUp } from 'react-icons/hi';
import 'tippy.js/dist/tippy.css';

const translate = keyframes`
  0% { transform: translateY(0); }
  100% { transform: translateY(50%); }
`;

const ScrollOnTop = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const animation = prefersReducedMotion ? undefined : `${translate} infinite 0.75s ease alternate`;

  return (
    <Tippy content="Scroll to top" delay={[0, 100]}>
      <Circle
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        position="fixed"
        right="5rem"
        bottom="10rem"
        zIndex="999"
        size="4rem"
        bg="#fff"
        border="1px solid rgb(0 0 0 / 12%)"
        cursor="pointer"
        animation={animation}
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }}
      >
        <HiOutlineChevronDoubleUp />
      </Circle>
    </Tippy>
  );
};

export default ScrollOnTop;
