import React, { useRef, useEffect, useState } from 'react';
import NotificationRow from "../../components/notification_row/notification_row";
import { list_notificacoes_curso } from '../../../api/notificacoes_curso_axios';
import { list_notificacoes_post } from '../../../api/notificacoes_post_axios';


const NotificationPage = () => {
    const [not_cursos, setNotCursos] = useState([]);
    const [not_post, setNotPost] = useState([]);
    const [notificacoes, setNotificacoes] = useState([]);
    
    const fetchNotificationsCursos = async () => {
        try {
            const data = await list_notificacoes_curso();
            setNotCursos(data);
        } catch(error) {
            console.log('Erro ao encontrar notificações curso: ', error);
        }
    }

    const fetchNotificationsPost = async () => {
        try {
            const data = await list_notificacoes_post();
            setNotPost(data);
        } catch(error) {
            console.log('Erro ao encontrar notificações post: ', error);
        }
    }

    const fetchAllNotifications = async () => {
        try {
            const cursos = await list_notificacoes_curso();
            const posts = await list_notificacoes_post();

            const cursosComTipo = cursos.map(n => ({ ...n, tipo: 'curso' }));
            const postsComTipo = posts.map(n => ({ ...n, tipo: 'post' }));

            const todas = [...cursosComTipo, ...postsComTipo];

            todas.sort((a, b) => new Date(b.data_hora_notificacaocurso || b.data_hora) - new Date(a.data_hora_notificacaocurso || a.data_hora));

            setNotificacoes(todas);
        } catch (error) {
            console.error('Erro ao carregar notificações:', error);
        }
    };

    const HandleDelete = (id) => {

    }

    useEffect(() => {
        fetchNotificationsCursos();
        fetchNotificationsPost();
        fetchAllNotifications();
    }, []);

    return(
        <div>
            <div className='d-flex justify-content-between my-5'>
                <h1>Notificações</h1>
                <div className="d-flex align-items-center gap-3">
                    <select name="" id="" className="form-select w-100">
                        <option value="">Mais Recente</option>
                        <option value="">Mais Antigas</option>
                        <option value="">Curso</option>
                        <option value="">Forum</option>
                    </select>
                </div>
            </div>
            {notificacoes.map((notification, index) => (
                <div key={index}>
                    <NotificationRow notification={notification} />
                    <hr />    
                </div>
            ))}
        </div>
    );
}

export default NotificationPage;