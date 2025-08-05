import axios from 'axios';

const API_URL = 'https://softskills-api.onrender.com/certificados';


export const list_certificados = async () => {
  try{
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  }catch (error){
    console.error('Erro ao ir buscar lista de Certificados!');
    throw error;
  }
}

export const get_certificados  = async (id) => {
    try{
        const response = await axios.get(`${API_URL}/get/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao buscar Certificados!');
        throw error;
    }
};

export const create_certificados = async (data) => {
    try{
        const response = await axios.post(`${API_URL}/create`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao criar Certificados!');
        throw error;
    }
};

export const update_certificados = async (id, data) => {
    try{
        const response = await axios.put(`${API_URL}/update/${id}`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao atualizar Certificados!');
        throw error;
    }
};

export const delete_certificados = async (id) => {
    try{
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao excluir Certificados!');
        throw error;
    }
};
