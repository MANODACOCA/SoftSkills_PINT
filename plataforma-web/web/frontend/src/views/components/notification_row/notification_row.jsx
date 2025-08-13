import React from 'react';
import { useNavigate } from 'react-router-dom';
import { daysMonthsYears } from '../shared_functions/FunctionsUtils';
import './notification_row.css'

const NotificationRow = ({notification, onDelete}) => {
    console.log(notification);
    const navigate = useNavigate();
    return(
        <div className="d-flex align-items-center justify-content-between">
            <div className='d-flex gap-4 align-items-center'>
                <img src={notification.id_curso_curso?.imagem || `https://ui-avatars.com/api/?name=${encodeURIComponent(notification.id_curso_curso.nome_curso)}&background=random&bold=true`} 
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(notification.id_curso_curso.nome_curso)}&background=random&bold=true`;
                }}
                alt="imagem notificação" width={80} height={80} className='img-not' 
                />
                <div className='d-flex align-items-start flex-column justify-content-center'>
                    <h5>{notification.id_curso_curso?.nome_curso}</h5>
                    <p>{notification.conteudo_notif_curso}</p>
                </div>
            </div>
            <div className='d-flex flex-column align-items-end gap-2'>
                {daysMonthsYears(notification.data_hora_notificacaocurso)}
                <div className="d-flex justify-content-end gap-2">
                    <button className='btn btn-outline-success' onClick={() => navigate(`/cursos/${notification.id_curso_curso.id_curso}`)}>
                        <i className='bi bi-box-arrow-up-right'></i>
                    </button>
                    <button className='btn btn-outline-danger' onClick={onDelete}>
                        <i className='bi bi-trash fs-5'></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NotificationRow;