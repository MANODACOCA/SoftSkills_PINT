import React from 'react';
import { Link } from 'react-router-dom'; 
import logo from '../../../assets/images/logos/logo.png'

function NotFoundPage() {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="text-center w-75 p-4 bg-white shadow rounded">
        <img src={logo} alt="Logo" className="mb-4" height={80}/>
        <h1 className="display-1 text-danger mt-3">404</h1>
        <p className="lead">Página não encontrada</p>
        <p className="text-muted">
          Talvez tenha se perdido, ou o link não esteja a funcionar. Vamos te levar de volta para a página inicial.
        </p>
        <Link to="/" className="btn btn-primary mt-4">Voltar para Home</Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
