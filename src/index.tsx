import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { AppProviders } from 'providers';

if (process.env.NODE_ENV === 'development') {
  const { server } = require('./server/browser');
  server.start({ onUnhandledRequest: 'bypass' });
}

createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <AppProviders>
    <App />
  </AppProviders>
  // </React.StrictMode>
);
