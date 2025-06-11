import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import 'antd/dist/reset.css';
import { App as AntdApp } from 'antd'; 
import '@ant-design/v5-patch-for-react-19'
import { persistor, store } from './global/Store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AntdApp>
          <PersistGate loading={null} persistor={persistor}>
            <App />
          </PersistGate>
      </AntdApp>
    </Provider>
  </StrictMode>,
);