import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


//pages
import NotFoundPage from './views/pages/page_not_found/PageNotFound';
import BaseLayout from './views/pages/base/BaseLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BaseLayout />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
