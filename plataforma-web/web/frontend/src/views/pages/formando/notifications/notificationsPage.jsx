import React, { useRef, useEffect, useState } from 'react';
import NotificationRow from "../../../components/notification_row/notification_row";
import { delete_notificacoes_curso, find_notificacao_curso } from '../../../../api/notificacoes_curso_axios';
import { delete_notificacoes_comentarios_post, find_notificacoes_comentarios_post  } from '../../../../api/notificacoes_comentarios_post_axios';


const NotificationPage = () => {
    const [notificacoes, setNotificacoes] = useState([]);
    const [ordenacao, setOrdenacao] = useState('recente');

    const fetchAllNotifications = async () => {
        try {
            const cursos = await find_notificacao_curso();
            setNotificacoes(cursos);
        } catch (error) {
            console.error('Erro ao carregar notificações:', error);
        }
    };

    const HandleDelete = async (id) => {
        const confirm = window.confirm('Tem a certeza que pretende eleminar');

        if (!confirm) return;
        console.log("Tentando eliminar:", id);
        try {
            await delete_notificacoes_curso(id);
            fetchAllNotifications();
            console.log('Eliminado com sucesso!');
        } catch (error) {
            console.log('Erro ao eliminar notificação!');
        }
    }

    useEffect(() => {
        fetchAllNotifications();
    }, []);

    return (
        <div className='m-2'>
            <div className='d-flex justify-content-between mb-2'>
                <h1>Notificações</h1>
                <div className="d-flex align-items-center gap-1 filtro">
                    <label htmlFor="">Ordenar:</label>
                    <select name="ordena" id="ordena" className="form-select w-100" value={ordenacao} onChange={(e) => setOrdenacao(e.target.value)}>
                        <option value="recente">Mais Recente</option>
                        <option value="antigo">Mais Antigas</option>
                    </select>
                </div>
            </div>
            {notificacoes.map((notification, index) => (
                <div key={index}>
                    <NotificationRow notification={notification} onDelete={() => HandleDelete(notification.id)} />
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default NotificationPage;