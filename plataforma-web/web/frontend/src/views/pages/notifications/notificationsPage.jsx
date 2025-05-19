import React, { useRef, useEffect, useState } from 'react';
import NotificationRow from "../../components/notification_row/notification_row";
import { delete_notificacoes_curso, find_notificacao_curso, list_notificacoes_curso } from '../../../api/notificacoes_curso_axios';
import { delete_notificacoes_post, find_notificacao_post, list_notificacoes_post } from '../../../api/notificacoes_post_axios';


const NotificationPage = () => {
    const [not_cursos, setNotCursos] = useState([]);
    const [not_post, setNotPost] = useState([]);
    const [notificacoes, setNotificacoes] = useState([]);

    const fetchAllNotifications = async () => {
        try {
            const cursos = await find_notificacao_curso();
            const posts = await find_notificacao_post();

            const cursosComTipo = cursos.map(n => ({ ...n, tipo: 'curso' }));
            const postsComTipo = posts.map(n => ({ ...n, tipo: 'post' }));

            const todas = [...cursosComTipo, ...postsComTipo];

            todas.sort((a, b) => new Date(b.data_hora_notificacaocurso || b.data_hora_notificacaocp) - new Date(a.data_hora_notificacaocurso || a.data_hora_notificacaocp));

            setNotificacoes(todas);
        } catch (error) {
            console.error('Erro ao carregar notificações:', error);
        }
    };

    const HandleDelete = async (id, tipo) => {
        const confirm = window.confirm('Tem a certeza que pretende eleminar');

        if(!confirm) return;
        console.log(id);
        try {
            if (tipo == 'curso'){
                await delete_notificacoes_curso(id);
                setNotCursos([]);
                not_cursos();
            } else if (tipo == 'post') {
                await delete_notificacoes_post(id);
                setNotPost([]);
                not_post();
            }
            console.log('Eliminado com sucesso!');
        } catch(error) {
            console.log('Erro ao eliminar notificação!');
        }
    }

    useEffect(() => {
        fetchAllNotifications();
    }, []);

    return(
        <div className='p-4'>
            <div className='d-flex justify-content-between mb-5'>
                <h1>Notificações</h1>
                <div className='d-flex gap-4 w-25'>
                    <div className="d-flex align-items-center gap-1 w-50">
                        <label htmlFor="">Tipo:</label>
                        <select name="" id="" className="form-select w-100">
                            <option value="">Curso</option>
                            <option value="">Forum</option>
                        </select>
                    </div>
                    <div className="d-flex align-items-center gap-1 w-50">
                        <label htmlFor="">Ordenar:</label>
                        <select name="" id="" className="form-select w-100">
                            <option value="">Mais Recente</option>
                            <option value="">Mais Antigas</option>
                            <option value="">Curso</option>
                            <option value="">Forum</option>
                        </select>
                    </div>    
                </div>
            </div>
            {notificacoes.map((notification, index) => (
                <div key={index}>
                    <NotificationRow notification={notification} onDelete={() => HandleDelete(notification.id_notificacao_curso || notification.id_notificacao_post, notification.tipo)} />
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default NotificationPage;