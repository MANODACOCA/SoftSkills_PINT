import axios from 'axios';

const API_URL = 'https://softskills-api.onrender.com/denuncia';


export const list_denuncia = async () => {
  try{
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  }catch (error){
    console.error('Erro ao ir buscar lista de Denuncia!');
    throw error;
  }
}

export const get_denuncia  = async (id) => {
    try{
        const response = await axios.get(`${API_URL}/get/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao buscar Denuncia!');
        throw error;
    }
};

export const create_denuncia = async (data) => {
    try{
        const response = await axios.post(`${API_URL}/create`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao criar Denuncia!');
        throw error;
    }
};

export const update_denuncia = async (id, data) => {
    try{
        const response = await axios.put(`${API_URL}/update/${id}`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao atualizar Denuncia!');
        throw error;
    }
};

export const delete_denuncia = async (id) => {
    try{
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao excluir Denuncia!');
        throw error;
    }
};


