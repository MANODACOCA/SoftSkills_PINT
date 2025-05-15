import axios from 'axios';

const API_URL = `http://localhost:3000/notificacoes_post`;


export const list_notificacoes_post = async () => {
  try{
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  }catch (error){
    console.error('Erro ao ir buscar lista de Notificacao de Post!');
    throw error;
  }
}


export const get_notificacoes_post  = async (id) => {
    try{
        const response = await axios.get(`${API_URL}/get/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao buscar Notificacao de Post!');
        throw error;
    }
};

export const create_notificacoes_post = async (data) => {
    try{
        const response = await axios.post(`${API_URL}/create`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao criar Notificacao de Post!');
        throw error;
    }
};

//atualiza filme por id
export const update_notificacoes_post = async (id, data) => {
    try{
        const response = await axios.put(`${API_URL}/update/${id}`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao atualizar Notificacao de Post!');
        throw error;
    }
};

//elimina filme por id
export const delete_notificacoes_post = async (id) => {
    try{
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao excluir Notificacao de Post!');
        throw error;
    }
};
