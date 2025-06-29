import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../../assets/images/logos/logo.png'
import './NotFound.css';

function NotPermisson() {

  const role = localStorage.getItem('activeRole');
  const token = localStorage.getItem('token');
  let path = '/login'
  let buttonText = 'Voltar para o login';

  if (role === 'admin' && token) {
    path = '/admin/home';
    buttonText = 'Voltar para a home(Admin)'
  } else if (role === 'formador' && token) {
    path = '/formador/home';
    buttonText = 'Voltar para a home(formador)'
  } else if (role === 'formando' && token) {
    path = '/home';
    buttonText = 'Voltar para a home(formando)'
  }


  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="text-center w-75 p-4 bg-white shadow rounded">
        <img src={logo} alt="Logo" className="mb-4" height={80} />
        <h1 className="display-1 text-danger mt-3">403</h1>
        <p className="lead">Página com acesso negado</p>
        <p className="text-muted">
          Talvez tenha se perdido, ou o link não esteja a funcionar. Vamos te levar de volta para a página inicial.
        </p>
        <Link to={path} className="btn btn-primary mt-4">{buttonText}</Link>
      </div>
    </div>
  );
}

export default NotPermisson;
