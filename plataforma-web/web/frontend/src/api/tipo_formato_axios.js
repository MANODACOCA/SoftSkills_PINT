import axios from 'axios';

const API_URL = 'https://softskills-api.onrender.com/tipo_formato';


export const list_tipo_formato = async () => {
  try{
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  }catch (error){
    console.error('Erro ao ir buscar lista de Tipo de Formato!');
    throw error;
  }
}

export const get_tipo_formato  = async (id) => {
    try{
        const response = await axios.get(`${API_URL}/get/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao buscar Tipo de Formato!');
        throw error;
    }
};

export const create_tipo_formato = async (data) => {
    try{
        const response = await axios.post(`${API_URL}/create`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao criar Tipo de Formato!');
        throw error;
    }
};

export const update_tipo_formato = async (id, data) => {
    try{
        const response = await axios.put(`${API_URL}/update/${id}`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao atualizar Tipo de Formato!');
        throw error;
    }
};

export const delete_tipo_formato = async (id) => {
    try{
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao excluir Tipo de Formato!');
        throw error;
    }
};
