import axios from 'axios';

const API_URL = 'http://localhost:3000/'+ s_s_o;


export const list_s_s_o = async () => {
  try{
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  }catch (error){
    console.error('Erro ao ir buscar lista de SSO!');
    throw error;
  }
}

export const get_s_s_o  = async (id) => {
    try{
        const response = await axios.get(`${API_URL}/get/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao buscar SSO!');
        throw error;
    }
};

export const create_s_s_o = async (data) => {
    try{
        const response = await axios.post(`${API_URL}/create`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao criar SSO!');
        throw error;
    }
};

export const update_s_s_o = async (id, data) => {
    try{
        const response = await axios.put(`${API_URL}/update/${id}`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao atualizar SSO!');
        throw error;
    }
};


export const delete_s_s_o = async (id) => {
    try{
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao excluir SSO!');
        throw error;
    }
};
