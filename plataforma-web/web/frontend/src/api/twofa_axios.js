import axios from 'axios';

const API_URL = 'http://localhost:3000/'+ twofa;


export const list_twofa = async () => {
  try{
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  }catch (error){
    console.error('Erro ao ir buscar lista de TWOFA!');
    throw error;
  }
}

export const get_twofa  = async (id) => {
    try{
        const response = await axios.get(`${API_URL}/get/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao buscar TWOFA!');
        throw error;
    }
};

export const create_twofa = async (data) => {
    try{
        const response = await axios.post(`${API_URL}/create`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao criar TWOFA!');
        throw error;
    }
};

export const update_twofa = async (id, data) => {
    try{
        const response = await axios.put(`${API_URL}/update/${id}`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao atualizar TWOFA!');
        throw error;
    }
};


export const delete_twofa = async (id) => {
    try{
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao excluir TWOFA!');
        throw error;
    }
};
