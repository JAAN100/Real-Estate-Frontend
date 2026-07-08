import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import Header from './components/header'
import './index.css'
import App from './App.jsx'
import {store} from "./redux/store.js";
import {Provider} from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './redux/store.js';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>  
        <BrowserRouter>
            <Header />
            <App />  
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
)
