import axios from 'axios';

const API_URL = 'https://softskills-api.onrender.com/inscricoes';


export const list_inscricoes = async () => {
    try {
        const response = await axios.get(`${API_URL}/list`);
        return response.data;
    } catch (error) {
        console.error('Erro ao ir buscar lista de Inscricoes!');
        throw error;
    }
}

export const get_inscricoes = async (id_formando, id_curso) => {
    try {
        const response = await axios.get(`${API_URL}/get`, {
            params: {
                id_formando,
                id_curso
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar Inscricoes!');
        throw error;
    }
};

export const create_inscricoes = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/create`, data);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar Inscricoes!');
        throw error;
    }
};

export const update_inscricoes = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/update/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar Inscricoes!');
        throw error;
    }
};

export const delete_inscricoes = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao excluir Inscricoes!');
        throw error;
    }
};



