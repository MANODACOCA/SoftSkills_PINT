import axios from 'axios';

const API_URL = 'http://localhost:3000/aulas';

export const list_aulas = async () => {
    try {
        const response = await axios.get(`${API_URL}/list`);
        return response.data;
    } catch (error) {
        console.error('Erro ao ir buscar lista de Aula!');
        throw error;
    }
}

export const get_aulas = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/get/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar Aula!');
        throw error;
    }
};

export const create_aulas = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/create`, data);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar Aula!');
        throw error;
    }
};

export const update_aulas = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/update/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar Aula!');
        throw error;
    }
};

export const delete_aulas = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao excluir Aula!');
        throw error;
    }
};


export const getClassWithCourse = async (userId, cursoId) => {
    try {
        const response = await axios.get(`${API_URL}/verificar/${userId}/${cursoId}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao procurar detalhes da aula e curso:', error);
        throw error;
    }
};


export const verificar_acesso_aula = async (userId, cursoId) => {
    try {
        const response = await axios.get(`${API_URL}/verificar/${userId}/${cursoId}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao procurar aulas:', error);
        throw error;
    }
}