import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


//pages
//import BaseLayout from './views/pages/base/BaseLayout.jsx';
import NotFoundPage from './views/pages/page_not_found/PageNotFound';
import Layout from './views/pages/base/BaseLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
