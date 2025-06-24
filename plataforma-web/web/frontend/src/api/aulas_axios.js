import axios from 'axios';

const API_URL = 'https://softskills-api.onrender.com/aulas';

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
        console.log(data);
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


export const getAulasAndMateriaApoioForCurso = async (cursoId) => {
    try {
        const response = await axios.get(`${API_URL}/aulas/mat-apoio/${cursoId}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao procurar detalhes das aulas e do material de apoio:', error);
        throw error;
    }
};

export const getAulas_Curso = async (cursoID) => {
    try{
        const response = await axios.get(`${API_URL}/aulas/${cursoID}`);
        return response.data;
    } catch(error) {
        console.error('Erro ao procurar detalhes das aulas:', error);
        throw error;
    }
};