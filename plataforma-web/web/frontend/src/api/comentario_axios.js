import axios from 'axios';

const API_URL = 'http://localhost:3000/'+ comentario;


export const list_comentario = async () => {
  try{
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  }catch (error){
    console.error('Erro ao ir buscar lista de Comentario!');
    throw error;
  }
}

export const get_comentario  = async (id) => {
    try{
        const response = await axios.get(`${API_URL}/get/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao buscar Comentario!');
        throw error;
    }
};

export const create_comentario = async (data) => {
    try{
        const response = await axios.post(`${API_URL}/create`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao criar Comentario!');
        throw error;
    }
};

export const update_comentario = async (id, data) => {
    try{
        const response = await axios.put(`${API_URL}/update/${id}`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao atualizar Comentario!');
        throw error;
    }
};


export const delete_comentario = async (id) => {
    try{
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao excluir Comentario!');
        throw error;
    }
};
