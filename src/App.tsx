
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AIToolsPage from '@/pages/AIToolsPage';
import ImageProcessingTool from '@/components/ImageProcessingTool';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AIToolsPage />} />
        <Route path="/ai-tools" element={<AIToolsPage />} />
        <Route path="/ai-tools-image" element={<ImageProcessingTool />} />
        <Route path="*" element={<AIToolsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
