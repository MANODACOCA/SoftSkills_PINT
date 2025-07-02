import React from 'react';
import { daysMonthsYears, formatDayMonthYear } from '../shared_functions/FunctionsUtils';
import './notification_row.css'

const NotificationRow = ({notification, onDelete}) => {
    console.log(notification);
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
            <div>
                {daysMonthsYears(notification.data_hora_notificacaocurso)}
                <div className="d-flex justify-content-end p-2">
                    <button className='btn btn-outline-danger' onClick={onDelete}>
                        <i className='bi bi-trash fs-5'></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NotificationRow;