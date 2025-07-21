import axios from 'axios';

const API_URL = 'https://softskills-api.onrender.com/pedidos-upgrade-user';


export const list_pedidos_upgrade = async () => {
    try {
        const response = await axios.get(`${API_URL}/list`);
        return response.data;
    } catch (error) {
        console.error('Erro ao ir buscar lista de pedidos de upgrade de cargo!');
        throw error;
    }
}

export const get_pedidos_upgrade = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/get/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar pedido de upgrade de cargo!');
        throw error;
    }
};

export const create_pedidos_upgrade = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/create`, { id_formando: data });
        return response.data;
    } catch (error) {
        console.error('Erro ao criar pedido de upgrade de cargo!');
        throw error;
    }
};

export const cancel_pedidos_upgrade = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/cancel/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao excluir pedido de upgrade de cargo!');
        throw error;
    }
};

export const delete_pedidos_upgrade = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao excluir pedido de upgrade de cargo!');
        throw error;
    }
};
