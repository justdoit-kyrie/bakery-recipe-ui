import { Square } from '@chakra-ui/react';
import Tippy from '@tippyjs/react';
import React from 'react';
import { AiOutlineBars } from 'react-icons/ai';
import { FiGrid } from 'react-icons/fi';
import { MY_POST_DISPLAY } from '~/constants';

const LayoutButton = ({ displayType, setDisplayType }) => {
  return (
    <>
      <Tippy content="grid layout">
        <Square
          sx={{
            border:
              displayType === MY_POST_DISPLAY.grid ? 'none' : '1px solid rgba(22, 24, 35, 0.12)',
            bg: displayType === MY_POST_DISPLAY.grid && '#e6e6e6',
            color: displayType === MY_POST_DISPLAY.grid && 'primeColor.darkPurple',
          }}
          cursor="pointer"
          size="2.4rem"
          onClick={() => setDisplayType(MY_POST_DISPLAY.grid)}
        >
          <FiGrid />
        </Square>
      </Tippy>

      <Tippy content="list layout">
        <Square
          sx={{
            border:
              displayType === MY_POST_DISPLAY.list ? 'none' : '1px solid rgba(22, 24, 35, 0.12)',
            bg: displayType === MY_POST_DISPLAY.list && '#e6e6e6',
            color: displayType === MY_POST_DISPLAY.list && 'primeColor.darkPurple',
          }}
          cursor="pointer"
          size="2.4rem"
          onClick={() => setDisplayType(MY_POST_DISPLAY.list)}
        >
          <AiOutlineBars />
        </Square>
      </Tippy>
    </>
  );
};

export default LayoutButton;
