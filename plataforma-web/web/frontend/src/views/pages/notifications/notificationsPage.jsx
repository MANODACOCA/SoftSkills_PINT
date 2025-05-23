import React, { useRef, useEffect, useState } from 'react';
import NotificationRow from "../../components/notification_row/notification_row";
import { delete_notificacoes_curso, find_notificacao_curso, list_notificacoes_curso } from '../../../api/notificacoes_curso_axios';
import { delete_notificacoes_post, find_notificacao_post, list_notificacoes_post } from '../../../api/notificacoes_post_axios';


const NotificationPage = () => {
    const [notificacoes, setNotificacoes] = useState([]);
    const [tipoFiltro, setTipoFiltro] = useState('todas');
    const [ordenacao, setOrdenacao] = useState('recente');

    const fetchAllNotifications = async () => {
        try {
            const cursos = await find_notificacao_curso();
            const posts = await find_notificacao_post();

            const cursosComTipo = cursos.map(n => ({
                ...n,
                tipo: 'curso',
                id: n.id_notificacao_cursos
            }));

            const postsComTipo = posts.map(n => ({
                ...n,
                tipo: 'post',
                id: n.id_notificacao_post
            }));

            const todas = [...cursosComTipo, ...postsComTipo];

            todas.sort((a, b) => new Date(b.data_hora_notificacaocurso || b.data_hora_notificacaocp) - new Date(a.data_hora_notificacaocurso || a.data_hora_notificacaocp));

            setNotificacoes(todas);
        } catch (error) {
            console.error('Erro ao carregar notificações:', error);
        }
    };

    const HandleDelete = async (id, tipo) => {
        const confirm = window.confirm('Tem a certeza que pretende eleminar');

        if (!confirm) return;
        console.log("Tentando eliminar:", id, tipo);
        try {
            if (tipo == 'curso') {
                await delete_notificacoes_curso(id);
            } else if (tipo == 'post') {
                console.log(id);
                await delete_notificacoes_post(id);
            }
            fetchAllNotifications();
            console.log('Eliminado com sucesso!');
        } catch (error) {
            console.log('Erro ao eliminar notificação!');
        }
    }

    const  getNotificacaoFiltradas = () => {
        let filtradas = [...notificacoes];

        if (tipoFiltro != 'todas') {
            filtradas = filtradas.filter(n => n.tipo == tipoFiltro);
        }
        
        filtradas.sort((a,b) => {
            const dataA = new Date(a.data_hora_notificacaocurso || a.data_hora_notificacaocp);
            const dataB = new Date(b.data_hora_notificacaocurso || b.data_hora_notificacaocp);

            if(ordenacao == 'antigo') return dataA - dataB;
            return dataB - dataA;
        });

        return filtradas;
    }

    useEffect(() => {
        fetchAllNotifications();
    }, []);

    return (
        <div className='m-2'>
            <div className='d-flex justify-content-between mb-2'>
                <h1>Notificações</h1>
            </div>
            <div className='d-flex mb-5 justify-content-between'>
                    <div className="d-flex align-items-center gap-1 filtro">
                        <label htmlFor="">Tipo:</label>
                        <select name="filtra" id="filtra" className="form-select w-100" value={tipoFiltro} onChange={(e) => setTipoFiltro(e.target.value)}>
                            <option value="todas">Todas</option>
                            <option value="curso">Curso</option>
                            <option value="post">Forum</option>
                        </select>
                    </div>
                    <div className="d-flex align-items-center gap-1 filtro">
                        <label htmlFor="">Ordenar:</label>
                        <select name="ordena" id="ordena" className="form-select w-100" value={ordenacao} onChange={(e) => setOrdenacao(e.target.value)}>
                            <option value="recente">Mais Recente</option>
                            <option value="antigo">Mais Antigas</option>
                        </select>
                    </div>
                </div>
            {getNotificacaoFiltradas().map((notification, index) => (
                <div key={index}>
                    <NotificationRow notification={notification} onDelete={() => HandleDelete(notification.id, notification.tipo)} />
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default NotificationPage;