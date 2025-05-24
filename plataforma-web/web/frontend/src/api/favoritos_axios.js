import axios from 'axios';

const API_URL = 'http://localhost:3000/favoritos';


export const list_favoritos = async () => {
  try{
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  }catch (error){
    console.error('Erro ao ir buscar lista de Favoritos!');
    throw error;
  }
}

export const get_favoritos  = async (id) => {
    try{
        const response = await axios.get(`${API_URL}/get/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao buscar Favoritos!');
        throw error;
    }
};

export const create_favoritos = async (data) => {
    try{
        const response = await axios.post(`${API_URL}/create`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao criar Favoritos!');
        throw error;
    }
};

export const update_favoritos = async (id, data) => {
    try{
        const response = await axios.put(`${API_URL}/update/${id}`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao atualizar Favoritos!');
        throw error;
    }
};

export const delete_favoritos = async (id) => {
    try{
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao excluir Favoritos!');
        throw error;
    }
};
