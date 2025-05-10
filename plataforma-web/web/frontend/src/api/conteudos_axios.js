import axios from 'axios';

const API_URL = 'http://localhost:3000/'+ conteudos;


export const list_conteudos = async () => {
  try{
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  }catch (error){
    console.error('Erro ao ir buscar lista de conteudos!');
    throw error;
  }
}

export const get_conteudos  = async (id) => {
    try{
        const response = await axios.get(`${API_URL}/get/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao buscar conteudos!');
        throw error;
    }
};

export const create_conteudos = async (data) => {
    try{
        const response = await axios.post(`${API_URL}/create`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao criar conteudos!');
        throw error;
    }
};

export const update_conteudos = async (id, data) => {
    try{
        const response = await axios.put(`${API_URL}/update/${id}`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao atualizar conteudos!');
        throw error;
    }
};


export const delete_conteudos = async (id) => {
    try{
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao excluir conteudos!');
        throw error;
    }
};
