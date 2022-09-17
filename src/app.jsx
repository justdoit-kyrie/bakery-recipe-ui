import { useDisclosure } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import React, { Fragment } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ModalContext } from './app/context';
import { totalRoutes } from './app/routes';
import { PrivateRoute } from './components';
import { ROUTES_TYPE } from './constants';
import { DefaultLayout } from './layouts';

function App() {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const location = useLocation();

  const renderRoute = () =>
    totalRoutes.map(({ component, layout, path, type }, idx) => {
      const Page = component;
      let Layout = DefaultLayout;
      let WrapperComp = type === ROUTES_TYPE.private ? PrivateRoute : Fragment;

      if (layout === null) Layout = Fragment;
      else if (layout) Layout = layout;

      return (
        <Route
          key={idx}
          path={path}
          element={
            <WrapperComp>
              <Layout>
                <Page />
              </Layout>
            </WrapperComp>
          }
        />
      );
    });

  return (
    <ModalContext.Provider value={{ onOpen, isOpen, onClose }}>
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          {renderRoute()}
        </Routes>
      </AnimatePresence>
    </ModalContext.Provider>
  );
}

export default App;
