import axios from 'axios';

const API_URL = 'https://softskills-api.onrender.com/entrega_trabalhos';


export const list_entrega_trabalhos = async () => {
  try{
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  }catch (error){
    console.error('Erro ao ir buscar lista de entrega trabalhos!');
    throw error;
  }
}

export const get_entrega_trabalhos  = async (id_trabalho, id_formando) => {
    try{
        const response = await axios.get(`${API_URL}/get/${id_trabalho}/${id_formando}`);
        return response.data;
    }catch(error){
        console.error('Erro ao buscar entrega trabalhos!');
        throw error;
    }
};

export const create_entrega_trabalhos = async (data) => {
    try{
        const response = await axios.post(`${API_URL}/create`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao criar entrega trabalhos!');
        throw error;
    }
};

export const update_entrega_trabalhos = async (data) => {
    try{
        const response = await axios.put(`${API_URL}/update`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao atualizar entrega trabalhos!');
        throw error;
    }
};

export const delete_entrega_trabalhos = async (id_trabalho, id_formando) => {
    try{
        const response = await axios.delete(`${API_URL}/delete/${id_trabalho}/${id_formando}`);
        return response.data;
    }catch(error){
        console.error('Erro ao excluir entrega trabalhos!');
        throw error;
    }
};
