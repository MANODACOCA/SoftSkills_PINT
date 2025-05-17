import React from 'react';
import { daysMonthsYears, formatDayMonthYear } from '../shared_functions/FunctionsUtils';
import './notification_row.css'

const NotificationRow = ({notification}) => {

    return(
        <div className="d-flex align-items-center justify-content-between">
            <div className='d-flex gap-4 align-items-center'>
                <img src={notification.curso?.imagem} alt="imagem notificação" width={80} height={80} className='img-not' />
                <div className='d-flex align-items-start flex-column justify-content-center'>
                    <h5>{notification.curso?.nome_curso}</h5>
                    <p>Erro na tabela que contem uma falha de campo para o conteudo da notificaçao</p>
                </div>
            </div>
            
            <div>
                {daysMonthsYears(notification.data_hora_notificacaocurso)}
                <div className="d-flex justify-content-center p-2">
                    <button className='btn btn-outline-danger' onClick={() => HandleDelete()}>
                        <i className='bi bi-trash fs-5'></i>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NotificationRow;