import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { AppProviders } from 'providers';
import { loadDevTools } from './dev-tools/load';

declare global {
  interface Window {
    __my: any;
    Cypress: any;
    reactQuery: any;
  }
}

if (process.env.NODE_ENV === 'development') {
  const { server } = require('./server/browser');
  server.start({ quiet: true, onUnhandledRequest: 'bypass' });
}

loadDevTools(() => {
  createRoot(document.getElementById('root') as HTMLElement).render(
    <AppProviders>
      <App />
    </AppProviders>
  );
});
