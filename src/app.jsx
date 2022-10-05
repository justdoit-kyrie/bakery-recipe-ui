import { useDisclosure } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { useLocation } from 'react-router-dom';

import { ModalContext } from './app/context';
import { getAppRoutes } from './utils';

function App() {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const location = useLocation();
  const APPRoutes = getAppRoutes();

  return (
    <ModalContext.Provider value={{ onOpen, isOpen, onClose }}>
      <AnimatePresence exitBeforeEnter>
        <APPRoutes location={location} key={location.pathname} />
      </AnimatePresence>
    </ModalContext.Provider>
  );
}

export default App;
