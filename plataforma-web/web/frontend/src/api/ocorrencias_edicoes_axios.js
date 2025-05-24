import axios from 'axios';

const API_URL = 'http://localhost:3000/ocorrencias_edicoes';


export const list_ocorrencias_edicoes = async () => {
  try{
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  }catch (error){
    console.error('Erro ao ir buscar lista de Ocorrencia de edicao!');
    throw error;
  }
}

export const get_ocorrencias_edicoes  = async (id) => {
    try{
        const response = await axios.get(`${API_URL}/get/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao buscar Ocorrencia de edicao!');
        throw error;
    }
};

export const create_ocorrencias_edicoes = async (data) => {
    try{
        const response = await axios.post(`${API_URL}/create`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao criar Ocorrencia de edicao!');
        throw error;
    }
};

export const update_ocorrencias_edicoes = async (id, data) => {
    try{
        const response = await axios.put(`${API_URL}/update/${id}`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao atualizar Ocorrencia de edicao!');
        throw error;
    }
};

export const delete_ocorrencias_edicoes = async (id) => {
    try{
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao excluir Ocorrencia de edicao!');
        throw error;
    }
};
