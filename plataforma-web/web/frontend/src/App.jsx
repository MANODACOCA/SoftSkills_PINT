import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


//pages
import SplashPage from './views/pages/splashpage/SplashPage';
import LoginPage from './views/pages/login/login';
import BaseLayout from './views/pages/base/BaseLayout';
import NotFoundPage from './views/pages/page_not_found/PageNotFound';
import HomePage from './views/pages/home/homepage';
import EnrolledCourses from './views/pages/enrolled_courses/EnrolledCourses';
import NotificationPage from './views/pages/notifications/notificationsPage';
import Forum from './views/pages/forum/forum';
import CompletedCourses from './views/pages/completed_courses/CompletedCourses';
import FavoriteCourses from './views/pages/favorite_courses/FavoriteCourses';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/softskills" element={<SplashPage />} />

 //#region{/*  AQUI COMECA O CONTEUDO DA PAGINA */}
        <Route element={<BaseLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/notificacoes" element={<NotificationPage />} />
          <Route path="/cursos/inscritos" element={<EnrolledCourses />}/>
          <Route path="/cursos/terminados" element={<CompletedCourses />}/>
          <Route path="/cursos/favoritos" element={<FavoriteCourses />}/>
          <Route path="/forum" element={<Forum />}/>
        </Route>
//#endregion{/*  AQUI COMECA O CONTEUDO DA PAGINA */}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router >
  );
};

export default App;
