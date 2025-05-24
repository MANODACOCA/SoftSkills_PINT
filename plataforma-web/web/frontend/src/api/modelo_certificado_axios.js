import axios from 'axios';

const API_URL = 'http://localhost:3000/modelo_certificado';


export const list_modelo_certificado = async () => {
  try{
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  }catch (error){
    console.error('Erro ao ir buscar lista de Modelo do Certificado!');
    throw error;
  }
}

export const get_modelo_certificado  = async (id) => {
    try{
        const response = await axios.get(`${API_URL}/get/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao buscar Modelo do Certificado!');
        throw error;
    }
};

export const create_modelo_certificado = async (data) => {
    try{
        const response = await axios.post(`${API_URL}/create`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao criar Modelo do Certificado!');
        throw error;
    }
};

export const update_modelo_certificado = async (id, data) => {
    try{
        const response = await axios.put(`${API_URL}/update/${id}`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao atualizar Modelo do Certificado!');
        throw error;
    }
};

export const delete_modelo_certificado = async (id) => {
    try{
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao excluir Modelo do Certificado!');
        throw error;
    }
};
