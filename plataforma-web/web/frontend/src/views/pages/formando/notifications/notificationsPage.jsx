import React, { useRef, useEffect, useState, useContext } from 'react';
import NotificationRow from "../../../components/notification_row/notification_row";
import { delete_notificacoes_curso, delete_notifications_by_user, find_notificacao_curso } from '../../../../api/notificacoes_curso_axios';
import { useUser } from '../../../../utils/useUser';
import { useNotification } from '../../../components/notification_row/notification_context';
import { Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { use } from 'react';
const NotificationPage = () => {
    const { user } = useUser();
    const { fetchCount } = useNotification();
    const [notificacoes, setNotificacoes] = useState([]);
    const [ordenacao, setOrdenacao] = useState('recente');
    const [loading, setLoading] = useState(false);

    const fetchAllNotifications = async (ord = ordenacao) => {
        try {
            setLoading(true);
            const id = user.id_utilizador;
            const cursos = await find_notificacao_curso(id, ord);
            setNotificacoes(cursos);
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
            fetchCount();
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

    const HandleDeleteAll = async () => {
        try {
            await delete_notifications_by_user(user.id_utilizador);
            fetchAllNotifications();
            fetchCount();
            Swal.fire({
                icon: "success",
                title: "As notificações foram apagadas com sucesso!",
                timer: 1500,
                showConfirmButton: false
            });
        } catch (error) {
            console.log('Erro ao apagar as notificações!');
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
        <div>
            <div className='d-flex justify-content-between mb-4'>
                <div className='d-flex gap-4'>
                    <h1 className='mb-0'>Notificações</h1>
                    {notificacoes.length > 0 &&
                        <button className='btn btn-danger d-flex align-items-center gap-2' onClick={() => HandleDeleteAll()}>
                            <i className='bi bi-trash'></i>
                            <span className="d-none d-md-inline">Apagar todas</span> 
                        </button>     
                    }  
                </div>
                <div className="d-flex align-items-center gap-1 filtro">
                    <label htmlFor="">Ordenar:</label>
                    <select name="ordena" id="ordena" className="form-select w-100" value={ordenacao} onChange={(e) => setOrdenacao(e.target.value)}>
                        <option value="recente">Mais Recente</option>
                        <option value="antigo">Mais Antigas</option>
                    </select>
                </div>
            </div>
            <div>
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
        </div>
    );
}

export default NotificationPage;