import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import { MapProvider } from './core/contexts/MapContext';

import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MapProvider>
      <App />
    </MapProvider>
  </React.StrictMode>
);