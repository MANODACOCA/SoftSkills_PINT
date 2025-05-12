import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


//pages
import BaseLayout from './views/pages/base/BaseLayout';
import NotFoundPage from './views/pages/page_not_found/PageNotFound';
import HomePage from './views/pages/home/homepage'

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router >
  );
}

export default App;
