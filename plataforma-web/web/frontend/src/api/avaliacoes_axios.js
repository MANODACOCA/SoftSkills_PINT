import axios from 'axios';

const API_URL = 'http://localhost:3000/'+ avaliacoes;


export const list_avaliacoes = async () => {
  try{
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  }catch (error){
    console.error('Erro ao ir buscar lista de Avaliacao!');
    throw error;
  }
}

export const get_avaliacoes  = async (id) => {
    try{
        const response = await axios.get(`${API_URL}/get/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao buscar Avaliacao!');
        throw error;
    }
};

export const create_avaliacoes = async (data) => {
    try{
        const response = await axios.post(`${API_URL}/create`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao criar Avaliacao!');
        throw error;
    }
};

export const update_avaliacoes = async (id, data) => {
    try{
        const response = await axios.put(`${API_URL}/update/${id}`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao atualizar Avaliacao!');
        throw error;
    }
};


export const delete_avaliacoes = async (id) => {
    try{
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao excluir Avaliacao!');
        throw error;
    }
};
