import axios from 'axios';

const API_URL = 'http://localhost:3000/notificacoes_comentarios_post';


export const list_notificacoes_comentarios_post = async () => {
  try{
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  }catch (error){
    console.error('Erro ao ir buscar lista de Notificacoes Comentarios Post!');
    throw error;
  }
}

export const get_notificacoes_comentarios_post  = async (id) => {
    try{
        const response = await axios.get(`${API_URL}/get/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao buscar Notificacoes Comentarios Post!');
        throw error;
    }
};

export const create_notificacoes_comentarios_post = async (data) => {
    try{
        const response = await axios.post(`${API_URL}/create`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao criar Notificacoes Comentarios Post!');
        throw error;
    }
};

export const update_notificacoes_comentarios_post = async (id, data) => {
    try{
        const response = await axios.put(`${API_URL}/update/${id}`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao atualizar Notificacoes Comentarios Post!');
        throw error;
    }
};

export const delete_notificacoes_comentarios_post = async (id) => {
    try{
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao excluir Notificacoes Comentarios Post!');
        throw error;
    }
};



//encontra o imagem e nome de post por id
export const find_notificacoes_comentarios_post = async () => {
    try {
        const response = await axios.get(`${API_URL}/find_notificacoes_post`)
        return response.data
    } catch (error) {
        console.error('Erro ao encontrar Notificacao de post!');
        throw error;
    }
}