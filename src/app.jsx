import { useDisclosure } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { ModalContext } from './app/context';
import { getAppRoutes } from './utils';

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation();
  const APPRoutes = getAppRoutes();

  const authenticateValue = useMemo(() => ({ onOpen, isOpen, onClose }), [isOpen]);

  return (
    <ModalContext.Provider value={authenticateValue}>
      <AnimatePresence exitBeforeEnter>
        <APPRoutes location={location} key={location?.pathname} />
      </AnimatePresence>
    </ModalContext.Provider>
  );
}

export default App;
