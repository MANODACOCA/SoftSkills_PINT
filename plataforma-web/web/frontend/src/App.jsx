import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

//components login
import Login from './views/components/login_comp/login/Login';
import NewPassword from './views/components/login_comp/newPassword/newPassword';
import TwoFA from './views/components/login_comp/twofa/twofa';
import ForgotPassword from './views/components/login_comp/forgot_password/forgotPassword';

//pages
import LoginPage from './views/pages/login_basePage/login_basePage';
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

 //#region{/*CONTEUDO DO LOGIN*/}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route element={<LoginPage />}>
          <Route path="/login" element={<Login />} />
          <Route path="/login/new-password" element={<NewPassword />} />
          <Route path="/login/verificacao-identidade" element={<TwoFA />} />
          <Route path="/login/esqueceu-password" element={<ForgotPassword />} />
          <Route path="/login/nova-conta" element={<NewPassword />} />
        </Route>
 //#region{/*CONTEUDO DO LOGIN*/}

 //#region{/*CONTEUDO DA PAGINA */}
        <Route element={<BaseLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/notificacoes" element={<NotificationPage />} />
          <Route path="/cursos/inscritos" element={<EnrolledCourses />} />
          <Route path="/cursos/terminados" element={<CompletedCourses />} />
          <Route path="/cursos/favoritos" element={<FavoriteCourses />} />
          <Route path="/forum" element={<Forum />} />
        </Route>
//#endregion{/*CONTEUDO DA PAGINA */}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router >
  );
};

export default App;
