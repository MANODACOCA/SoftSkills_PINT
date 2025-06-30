import { Routes, Route, Navigate } from 'react-router-dom';

import ProtectedRoute from './views/components/rotasProtegidas/rotasProtegidas';
import TokenChecker from './utils/authService.js';
import NotFoundPage from './views/pages/base/page_not_found/PageNotFound';
import NotPermisson from './views/pages/base/page_not_found/PageNotPermisson.jsx';

//components login
import Login from './views/components/login_comp/login/Login';
import NewPassword from './views/components/login_comp/newPassword/newPassword';
import TwoFA from './views/components/login_comp/twofa/twofa';
import ForgotPassword from './views/components/login_comp/forgot_password/forgotPassword';
import CreateAccout from './views/components/login_comp/create_account/createAccount';

//pages

//for all
import LoginPage from './views/pages/login_basePage/login_basePage';
import BaseLayout from './views/pages/base/layout/BaseLayout.jsx';
import NotificationPage from './views/pages/formando/notifications/notificationsPage';
import EditProfile from './views/pages/profile/profile';
import InfoProfile from './views/pages/profile/infoprofile';


//forum
import Forum from './views/pages/forum/conteudos_partilhados/conteudos_partilhados.jsx';
import PostComments from './views/pages/forum/post/coments/comment';
import ForumPosts from './views/pages/forum/post/post';
import ConteudosList from './views/pages/forum/post/conteudos_posts';
import CPlusPlusPage from './views/pages/forum/post/post';

//formando
import HomePage from './views/pages/formando/home/homepage';
import EnrolledCourses from './views/pages/formando/enrolled_courses/EnrolledCourses';
import CompletedCourses from './views/pages/formando/completed_courses/CompletedCourses';
import FavoriteCourses from './views/pages/formando/favorite_courses/FavoriteCourses';
import CursosPage from './views/pages/formando/courses/CursosPage';
import ClassPage from './views/pages/formando/class_page/ClassPage';
import CourseRegistration from './views/pages/formando/course_registration/CourseRegistration';


//formador



//Admin 
import HomePageAdmin from './views/pages/admin/home/HomePageAdmin.jsx';
import CourseTable from './views/pages/admin/course/courseTable.jsx';
import UsersTables from './views/pages/admin/user/UserTable.jsx';
import QueixasTables from './views/pages/admin/forum/queixasTable.jsx';
import ForumTable from './views/pages/admin/forum/forumTable.jsx';
import CreateCourse from './views/pages/admin/course/Criar_Course.jsx';
import EditCourse from './views/pages/admin/course/Editar_Course.jsx';
import HistoryUser from './views/pages/admin/user/Historico_User.jsx';
import CategoriaAreaTopicoTable from './views/pages/admin/categoria_area_topico/CategoriaAreaTopico';



function App() {

  return (
    <>
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

        {/* for all */}
        <Route
          element={
            <ProtectedRoute allowedRoles={['formando', 'formador', 'admin']}>
              <BaseLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/forum" element={<Forum />} />
          <Route path="/forum/:id" element={<ForumPosts />} />
          <Route path="/forum/posts/:postId/comments" element={<PostComments />} />
          <Route path="/forum/posts/:postId/conteudos" element={<ConteudosList />} />
          <Route path='/perfil/info' element={<InfoProfile />} />
          <Route path="/perfil/editar" element={<EditProfile />} />
        </Route>
        {/* for all */}



        {/* formando */}
        <Route
          element={
            <ProtectedRoute allowedRoles={['formando']}>
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
          <Route path="/cursos/:id" element={<CourseRegistration />} />
          <Route path="my/cursos/inscritos/curso/:cursoId" element={<ClassPage />} />
          <Route path="my/cursos/terminados/curso/:cursoId" element={<ClassPage />} />
        </Route>
        {/* formando */}



        {/* formador */}
        <Route
          element={
            <ProtectedRoute allowedRoles={['formador']}>
              <BaseLayout />
            </ProtectedRoute>
          }
        >

        </Route>
        {/* formador */}


        {/* admin */}
        <Route
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <BaseLayout />
            </ProtectedRoute>
          }
        >
          <Route path='/admin/home' element={<HomePageAdmin />} />
          <Route path='/admin/cursos' element={<CourseTable />} />
          <Route path='/admin/utilizadores' element={<UsersTables />} />
          <Route path='/admin/queixas' element={<QueixasTables />} />
          <Route path='/admin/gerirforum' element={<ForumTable />} />
          <Route path='/admin/cursos/criar' element={<CreateCourse />} />
          <Route path='/admin/cursos/editar/:id' element={<EditCourse />} />
          <Route path='/admin/utilizadores/historico/:id' element={<HistoryUser />} />
          <Route path='/admin/categorias' element={<CategoriaAreaTopicoTable />} />

        </Route>
        {/* admin */}

//#endregion{/*CONTEUDO DA PAGINA */}

        <Route path="*" element={<NotFoundPage />} />
        <Route path="/not-permission" element={<NotPermisson />} />
      </Routes >
    </>

  );
};

export default App;
