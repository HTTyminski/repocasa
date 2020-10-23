import React from 'react';

import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';

import './config/ReactotronConfig';

import { ThemeProvider } from 'styled-components';

import Routes from './routes';
import history from './services/history';

import { store, persistor } from './store';

import GlobalStyle from './styles/global';
import { theme } from './theme';

import { SidebarProvider } from './components/SideBar/SidebarContext';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <SidebarProvider>
            <Router history={history}>
              <Routes />
              <GlobalStyle />
              <ToastContainer autoClose={3300} />
            </Router>
          </SidebarProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
