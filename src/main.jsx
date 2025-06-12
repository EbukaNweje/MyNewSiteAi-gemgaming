import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import 'antd/dist/reset.css';
import { App as AntdApp } from 'antd'; 
import '@ant-design/v5-patch-for-react-19';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "./global/Store"; // <-- Use lowercase "store"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AntdApp>
          <App />
        </AntdApp>
      </PersistGate>
    </Provider>
  </StrictMode>,
);
