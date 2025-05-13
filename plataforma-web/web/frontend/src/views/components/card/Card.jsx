import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Card.css';
import Img1 from '../../../assets/images/logos/comfundo.png';


const MyCard = () => {
  return (
    <div className="container my-4">
      <div className="card rounded-4" style={{ width: '18rem' }}>
        <img src={Img1} className="card-img-top rounded-top-4" alt="Imagem do card"/>
        <div className="card-body">
          <h5 className="card-title">Título do Card</h5>
          <p className="card-text">
            Este é um exemplo de texto que descreve o conteúdo do card.
          </p>
          <a href="#" className="btn btn-primary">
            Ver mais
          </a>
        </div>
      </div>
    </div>
  );
};

export default MyCard;
