import React from 'react';
import { useNavigate } from 'react-router-dom';
import { daysMonthsYears } from '../shared_functions/FunctionsUtils';
import { delete_notificacoes_curso } from '../../../api/notificacoes_curso_axios';
import { useNotification } from '../notification_row/notification_context';
import './notification_row.css'


const TAB_RULES = [
    { re: /(material|apoio)/i, tab: 'material' },
    { re: /(aula)/i, tab: 'aulas' },
    { re: /(trabalho)/i, tab: 'eventos' },
    { re: /(atualiza(c|ç)ão|descri(c|ç)ao|curso)/i, tab: 'sobre' },
];

const tabPageCurso = (notificacoes) => {
    const txt = (notificacoes?.conteudo_notif_curso || '')
        .normalize('NFD').replace(/\p{Diacritic}/gu, '')
        .toLowerCase();
    const rule = TAB_RULES.find(r => r.re.test(txt));
    return rule ? rule.tab : 'sobre';
};

const NotificationRow = ({ notification, onDelete, setShow }) => {
    const navigate = useNavigate();
    const { fetchCount } = useNotification();

    const handleOpen = async () => {
        try {
            const tab = tabPageCurso(notification);
            const data_atual = new Date();
            data_atual.setHours(0, 0, 0, 0);
            const inicio_curso = new Date(notification.id_curso_curso.data_inicio_curso);
            inicio_curso.setHours(0, 0, 0, 0);
            const fim_curso = new Date(notification.id_curso_curso.data_fim_curso);
            fim_curso.setHours(23, 59, 59, 999);

            await delete_notificacoes_curso(notification.id_notificacao_cursos);
            fetchCount();
            if (inicio_curso <= data_atual && data_atual <= fim_curso) {
                navigate(`/my/cursos/inscritos/curso/${notification.id_curso_curso.id_curso}?tab=${tab}`);
            } else if (data_atual > fim_curso) {
                navigate(`/my/cursos/terminados/curso/${notification.id_curso_curso.id_curso}?tab=${tab}`);
            } else {
                navigate(`/cursos/${notification.id_curso_curso.id_curso}`);
            }
        } catch (error) {
            console.log('Erro ao entrar na notificaçao');
        }
    }

    return (
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
                    <button className='btn btn-outline-success' onClick={handleOpen}>
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