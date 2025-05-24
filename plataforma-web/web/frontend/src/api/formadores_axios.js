import axios from 'axios';

const API_URL = 'http://localhost:3000/formadores';


export const list_formadores = async () => {
  try{
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  }catch (error){
    console.error('Erro ao ir buscar lista de Formador!');
    throw error;
  }
}

export const get_formadores  = async (id) => {
    try{
        const response = await axios.get(`${API_URL}/get/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao buscar Formador!');
        throw error;
    }
};

export const create_formadores = async (data) => {
    try{
        const response = await axios.post(`${API_URL}/create`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao criar Formador!');
        throw error;
    }
};

export const update_formadores = async (id, data) => {
    try{
        const response = await axios.put(`${API_URL}/update/${id}`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao atualizar Formador!');
        throw error;
    }
};

export const delete_formadores = async (id) => {
    try{
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao excluir Formador!');
        throw error;
    }
};
