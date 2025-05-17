import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


//pages
import BaseLayout from './views/pages/base/BaseLayout';
import NotFoundPage from './views/pages/page_not_found/PageNotFound';
import HomePage from './views/pages/home/homepage'
import NotificationPage from './views/pages/notifications/notificationsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/notificacoes" element={<NotificationPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router >
  );
}

export default App;
