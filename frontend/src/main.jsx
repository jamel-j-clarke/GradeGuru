import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App.jsx';
import './css/main.css';
import CssBaseline from '@mui/material/CssBaseline';
import { StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <StyledEngineProvider>
        <CssBaseline>
          <App />
        </CssBaseline>
      </StyledEngineProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
