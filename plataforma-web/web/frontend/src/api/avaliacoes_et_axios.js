import axios from 'axios';

const API_URL = 'https://softskills-api.onrender.com/avaliacoes_et';


export const list_avaliacoes_et = async () => {
  try{
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  }catch (error){
    console.error('Erro ao ir buscar lista de avaliacao de trabalhos!');
    throw error;
  }
}

export const get_avaliacoes_et = async (id_entrega_trabalho) => {
    try{
        const response = await axios.get(`${API_URL}/get/${id_entrega_trabalho}`);
        return response.data;
    }catch(error){
        console.error('Erro ao buscar avaliacao de trabalho!');
        throw error;
    }
};

export const create_avaliacoes_et = async (data) => {
    try{
        const response = await axios.post(`${API_URL}/create`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao criar avaliacao de trabalho!');
        throw error;
    }
};

export const update_avaliacoes_et = async (id_entrega_trabalho, data) => {
    try{
        const response = await axios.put(`${API_URL}/update/${id_entrega_trabalho}`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao atualizar avaliacao de trabalho!');
        throw error;
    }
};

export const delete_avaliacoes_et = async (id_entrega_trabalho) => {
    try{
        const response = await axios.delete(`${API_URL}/delete/${id_entrega_trabalho}`);
        return response.data;
    }catch(error){
        console.error('Erro ao excluir avaliacao de trabalho!');
        throw error;
    }
};
