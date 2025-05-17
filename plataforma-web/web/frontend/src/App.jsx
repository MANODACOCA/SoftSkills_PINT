import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';


//pages
import SplashPage from './views/pages/splashpage/SplashPage';
import LoginPage from './views/pages/login/login';
import BaseLayout from './views/pages/base/BaseLayout';
import NotFoundPage from './views/pages/page_not_found/PageNotFound';
import HomePage from './views/pages/home/homepage'

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
        </Route>
//#endregion{/*  AQUI COMECA O CONTEUDO DA PAGINA */}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router >
  );
}

export default App;
