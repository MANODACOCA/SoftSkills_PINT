import axios from 'axios';

const API_URL = 'http://localhost:3000/'+ formandos;


export const list_formandos = async () => {
  try{
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  }catch (error){
    console.error('Erro ao ir buscar lista de Formando!');
    throw error;
  }
}

export const get_formandos  = async (id) => {
    try{
        const response = await axios.get(`${API_URL}/get/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao buscar Formando!');
        throw error;
    }
};

export const create_formandos = async (data) => {
    try{
        const response = await axios.post(`${API_URL}/create`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao criar Formando!');
        throw error;
    }
};

export const update_formandos = async (id, data) => {
    try{
        const response = await axios.put(`${API_URL}/update/${id}`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao atualizar Formando!');
        throw error;
    }
};


export const delete_formandos = async (id) => {
    try{
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao excluir Formando!');
        throw error;
    }
};
