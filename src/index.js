import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.min.css'; //core css
import 'primereact/resources/themes/lara-light-indigo/theme.css'; //theme
import '../node_modules/normalize.css/normalize.css';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import React, { Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';

import { persistor, store } from '~/app/store';
import { theme } from '~/app/theme';
import { Loading, Toast } from '~/components';
import App from './app';
import './app/i18n';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider resetCSS theme={theme}>
          <Router>
            <Suspense fallback={<Loading />}>
              <Toast />
              <ColorModeScript initialColorMode={theme.config.initialColorMode} />
              <App />
            </Suspense>
          </Router>
        </ChakraProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
