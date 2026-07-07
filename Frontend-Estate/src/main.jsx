import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import Header from './components/header'
import './index.css'
import App from './App.jsx'
import {store} from "./redux/store.js";
import {Provider} from "react-redux";
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <Header />
       <App />
    </BrowserRouter>
    </Provider>
  </StrictMode>,
)
