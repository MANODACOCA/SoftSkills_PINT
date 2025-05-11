import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


//pages
//import BaseLayout from './views/pages/base/BaseLayout.jsx';
import NotFoundPage from './views/pages/page_not_found/PageNotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
