import React from 'react';
import { daysMonthsYears, formatDayMonthYear } from '../shared_functions/FunctionsUtils';
import './notification_row.css'

const NotificationRow = ({notification, onDelete}) => {
    const iscurso = notification.tipo == 'curso';
    return(
        <div className="d-flex align-items-center justify-content-between">
            <div className='d-flex gap-4 align-items-center'>
                <img src={iscurso ? notification.curso?.imagem : notification.utilizador?.imagem} 
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(notification.id_utilizador.nome_utilizador)}&background=random&bold=true`;
                }}
                alt="imagem notificação" width={80} height={80} className='img-not' 
                />
                <div className='d-flex align-items-start flex-column justify-content-center'>
                    <h5>{iscurso ? notification.curso?.nome_curso : notification.utilizador?.nome_utilizador}</h5>
                    <p>Erro na tabela que contem uma falha de campo para o conteudo da notificaçao</p>
                </div>
            </div>
            <div>
                {daysMonthsYears(iscurso ? notification.data_hora_notificacaocurso : notification.data_hora_notificacaocp)}
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