import axios from 'axios';

const API_URL = 'http://localhost:3000/conteudos_forum';


export const list_conteudos_forum = async () => {
  try{
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  }catch (error){
    console.error('Erro ao ir buscar lista de Conteudos Forum!');
    throw error;
  }
}

export const get_conteudos_forum  = async (id) => {
    try{
        const response = await axios.get(`${API_URL}/get/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao buscar Conteudos Forum!');
        throw error;
    }
};

export const create_conteudos_forum = async (data) => {
    try{
        const response = await axios.post(`${API_URL}/create`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao criar Conteudos Forum!');
        throw error;
    }
};

export const update_conteudos_forum = async (id, data) => {
    try{
        const response = await axios.put(`${API_URL}/update/${id}`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao atualizar Conteudos Forum!');
        throw error;
    }
};

export const delete_conteudos_forum = async (id) => {
    try{
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao excluir Conteudos Forum!');
        throw error;
    }
};
