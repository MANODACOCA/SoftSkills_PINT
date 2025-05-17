import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


//pages
import BaseLayout from './views/pages/base/BaseLayout';
import NotFoundPage from './views/pages/page_not_found/PageNotFound';
import HomePage from './views/pages/home/homepage'
import EnrolledCourses from './views/pages/enrolled_courses/EnrolledCourses';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/cursos/inscritos" element={<EnrolledCourses />}/>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router >
  );
};

export default App;
