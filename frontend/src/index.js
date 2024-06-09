import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import GlobalState from "./context/globalContext"
import {AuthContextProvider} from "./context/AuthContext"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <GlobalState>
        <App />
      </GlobalState>
    </AuthContextProvider>
  </React.StrictMode>
);

