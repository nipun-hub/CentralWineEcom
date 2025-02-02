import App from './App.jsx'
import './index.css'
import 'antd/dist/reset.css';
import ReactDOM from 'react-dom/client';
import React from 'react'
import 'react-toastify/dist/ReactToastify.css';


import { ThemeContextProvider } from './context/ThemeContext';
import { MetaDataContextProvider } from "./context/MetaDataContext.jsx";
import { Provider } from 'react-redux';
import { store } from './app/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>

      <ThemeContextProvider>
        <MetaDataContextProvider>
          <App />
        </MetaDataContextProvider>
      </ThemeContextProvider>
    </Provider>
  // </React.StrictMode>,
);