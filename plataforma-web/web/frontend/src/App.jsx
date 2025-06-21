import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import ProtectedRoute from './views/components/rotasProtegidas/rotasProtegidas';
import TokenChecker from './utils/authService.js';

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
import ForumPosts from './views/pages/forum/post/post';
import ConteudosList from './views/pages/forum/post/conteudos_posts';
import CPlusPlusPage from './views/pages/forum/post/post';
import PostComments from './views/pages/forum/post/coments/comment';
import CourseRegistration from './views/pages/course_registration/CourseRegistration';
import EditProfile from './views/pages/profile/profile';
import ClassPage from './views/pages/class_page/ClassPage';
import InfoProfile from './views/pages/profile/infoprofile';

//Admin 
import HomePageAdmin from './views/pages/admin/home/HomePageAdmin.jsx';
import CourseTable from './views/pages/admin/course/courseTable.jsx';
import UsersTables from './views/pages/admin/user/UserTable.jsx';
import QueixasTables from './views/pages/admin/forum/queixasTable.jsx';
import ForumTable from './views/pages/admin/forum/forumTable.jsx';
import CreateCourse from './views/pages/admin/course/Criar_Course.jsx';
import EditCourse from './views/pages/admin/course/Editar_Course.jsx';
function App() {

  return (
    <Router>
      <TokenChecker />
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
        <Route
          element={
            <ProtectedRoute>
              <BaseLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<HomePage />} />
          <Route path="/notificacoes" element={<NotificationPage />} />
          <Route path="/cursos" element={<CursosPage />} />
          <Route path="my/cursos/inscritos" element={<EnrolledCourses />} />
          <Route path="my/cursos/terminados" element={<CompletedCourses />} />
          <Route path="/cursos/favoritos" element={<FavoriteCourses />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/forum/posts/:id" element={<ForumPosts />} />
          <Route path="/forum/posts/:postId/comments" element={<PostComments />} />
          <Route path="/forum/posts/:postId/conteudos" element={<ConteudosList />} />
          <Route path="/cursos/:id" element={<CourseRegistration />} />
          <Route path="/perfil/editar" element={<EditProfile />} />
          <Route path="my/cursos/inscritos/curso/:cursoId/aula/:aulaId" element={<ClassPage />} />
          <Route path="my/cursos/terminados/curso/:cursoId/aula/:aulaId" element={<ClassPage />} />
          <Route path='/perfil/info' element={<InfoProfile />} />
          {/* admin */}
          <Route path='/admin/home' element={<HomePageAdmin />} />
          <Route path='/admin/cursos' element={<CourseTable />} />
          <Route path='/admin/utilizadores' element={<UsersTables />} />
          <Route path='/admin/queixas' element={<QueixasTables />} />
          <Route path='/admin/gerirforum' element={<ForumTable />} />
          <Route path='/admin/cursos/criar' element={<CreateCourse />} />
          <Route path='/admin/cursos/editar/:id' element={<EditCourse />} />
          {/* admin */}
        </Route>
//#endregion{/*CONTEUDO DA PAGINA */}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router >
  );
};

export default App;
