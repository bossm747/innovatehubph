
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App';
import './index.css';
import { QueryProvider } from '@/providers/QueryProvider';
import { Toaster } from "@/components/ui/toaster";

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

const root = createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryProvider>
        <App />
        <Toaster />
      </QueryProvider>
    </BrowserRouter>
  </React.StrictMode>
);
