import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

//components login
import Login from './views/components/login_comp/login/Login';
import NewPassword from './views/components/login_comp/newPassword/newPassword';
import TwoFA from './views/components/login_comp/twofa/twofa';
import ForgotPassword from './views/components/login_comp/forgot_password/forgotPassword';
import CreateAccout from './views/components/login_comp/create_account/createAccount';

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
import CursosPage from './views/pages/courses/CursosPage';
import Post from './views/pages/forum/post/post';
import CPlusPlusPage from './views/pages/forum/post/post';
import CourseRegistration from './views/pages/course_registration/CourseRegistration';
import EditProfile from './views/pages/profile/profile';
import ClassPage from './views/pages/class_page/ClassPage';

function App() {
  return (
    <Router>
      <Routes>

 //#region{/*CONTEUDO DO LOGIN*/}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route element={<LoginPage />}>
          <Route path="/login" element={<Login />} />
          <Route path="/login/nova-password" element={<NewPassword />} />
          <Route path="/login/verificacao-identidade" element={<TwoFA />} />
          <Route path="/login/esqueceu-password" element={<ForgotPassword />} />
          <Route path="/login/criar-conta" element={<CreateAccout />} />
        </Route>
 //#region{/*CONTEUDO DO LOGIN*/}

 //#region{/*CONTEUDO DA PAGINA */}
        <Route element={<BaseLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/notificacoes" element={<NotificationPage />} />
           <Route path="/cursos" element={<CursosPage/>}/>
          <Route path="my/cursos/inscritos" element={<EnrolledCourses />}/>
          <Route path="my/cursos/terminados" element={<CompletedCourses />}/>
          <Route path="/cursos/favoritos" element={<FavoriteCourses />}/>
          <Route path="/forum" element={<Forum />}/>
          <Route path="/posts" element={<Post />}/>
          <Route path="/cursos/:id" element={<CourseRegistration />}/>
          <Route path="/perfil/editar" element={<EditProfile />}/>
          <Route path="/aula/:aulaId" element={<ClassPage/>}/>
        </Route>
//#endregion{/*CONTEUDO DA PAGINA */}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router >
  );
};

export default App;
