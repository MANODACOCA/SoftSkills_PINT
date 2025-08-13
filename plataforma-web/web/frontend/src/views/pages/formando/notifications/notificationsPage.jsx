import React, { useRef, useEffect, useState, useContext } from 'react';
import NotificationRow from "../../../components/notification_row/notification_row";
import { delete_notificacoes_curso, find_notificacao_curso } from '../../../../api/notificacoes_curso_axios';
import { useUser } from '../../../../utils/useUser';
import { Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { use } from 'react';
import { NotificationsContext } from './notificationsContext';

const NotificationPage = () => {
    const { user } = useUser();
    const { setTotalNotificacoes } = useContext(NotificationsContext);
    const [notificacoes, setNotificacoes] = useState([]);
    const [ordenacao, setOrdenacao] = useState('recente');
    const [loading, setLoading] = useState(false);

    const fetchAllNotifications = async (ord = ordenacao) => {
        try {
            setLoading(true);
            const id = user.id_utilizador;
            const cursos = await find_notificacao_curso(id, ord);
            setNotificacoes(cursos);
            setTotalNotificacoes(cursos.length);
        } catch (error) {
            console.error('Erro ao carregar notificações:', error);
        } finally {
            setLoading(false);
        }
    };

    const HandleDelete = async (id) => {
        try {
            await delete_notificacoes_curso(id);
            fetchAllNotifications();
            Swal.fire({
                icon: "success",
                title: "Notificação apagada com sucesso!",
                timer: 1500,
                showConfirmButton: false
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Erro",
                text: "Não foi possível apagar notificação",
                timer: 1500,
                showConfirmButton: false,
            });
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        if (user && user.id_utilizador) {
            fetchAllNotifications(ordenacao);
        }
    }, [user, ordenacao]);


    if (loading) {
        return <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
        </div>;
    }


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
            {
                notificacoes.length === 0 && (
                    <div className="text-center mt-5">Não existem notificações neste momento.</div>
                )
            }
            {notificacoes.map((notification, index) => (
                <div key={index}>
                    <NotificationRow notification={notification} onDelete={() => HandleDelete(notification.id_notificacao_cursos)} />
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default NotificationPage;