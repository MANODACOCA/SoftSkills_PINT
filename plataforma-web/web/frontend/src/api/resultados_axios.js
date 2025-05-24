import axios from 'axios';

const API_URL = 'http://localhost:3000/resultados';


export const list_resultados = async () => {
  try{
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  }catch (error){
    console.error('Erro ao ir buscar lista de Resultado!');
    throw error;
  }
}

export const get_resultados  = async (id) => {
    try{
        const response = await axios.get(`${API_URL}/get/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao buscar Resultado!');
        throw error;
    }
};

export const create_resultados = async (data) => {
    try{
        const response = await axios.post(`${API_URL}/create`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao criar Resultado!');
        throw error;
    }
};

export const update_resultados = async (id, data) => {
    try{
        const response = await axios.put(`${API_URL}/update/${id}`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao atualizar Resultado!');
        throw error;
    }
};

export const delete_resultados = async (id) => {
    try{
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao excluir Resultado!');
        throw error;
    }
};
