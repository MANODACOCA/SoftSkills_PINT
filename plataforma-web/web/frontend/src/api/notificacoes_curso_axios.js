import axios from 'axios';

const API_URL = 'https://softskills-api.onrender.com/notificacoes_curso';


export const list_notificacoes_curso = async () => {
  try{
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  }catch (error){
    console.error('Erro ao ir buscar lista de Notificacao de Curso!');
    throw error;
  }
}

export const get_notificacoes_curso  = async (id) => {
    try{
        const response = await axios.get(`${API_URL}/get/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao buscar Notificacao de Curso!');
        throw error;
    }
};

export const create_notificacoes_curso = async (data) => {
    try{
        const response = await axios.post(`${API_URL}/create`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao criar Notificacao de Curso!');
        throw error;
    }
};

export const update_notificacoes_curso = async (id, data) => {
    try{
        const response = await axios.put(`${API_URL}/update/${id}`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao atualizar Notificacao de Curso!');
        throw error;
    }
};

export const delete_notificacoes_curso = async (id) => {
    try{
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao excluir Notificacao de Curso!');
        throw error;
    }
};


//encontra o imagem e nome de curso por id
export const find_notificacao_curso = async () => {
    try {
        const response = await axios.get(`${API_URL}/find_notificacoes_curso`)
        return response.data
    } catch (error) {
        console.error('Erro ao encontrar Notificacao de Curso!');
        throw error;
    }
}