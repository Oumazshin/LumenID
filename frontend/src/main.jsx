import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Global styles (tailwind + theme) must be imported at the application entrypoint.
import './styles/index.css';

// This finds the <div id="root"></div> in your index.html
const rootElement = document.getElementById('root');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);