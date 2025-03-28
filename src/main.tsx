
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// This will help with hydration issues
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found in the document");
}

// Ensure the DOM is fully loaded before rendering
const renderApp = () => {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

// Check if the DOM is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}
