import axios from 'axios';

const API_URL = 'https://softskills-api.onrender.com/pedidos-upgrade-user';


export const list_certificados = async () => {
  try{
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  }catch (error){
    console.error('Erro ao ir buscar lista de pedidos de upgrade de cargo!');
    throw error;
  }
}

export const create_certificados = async (data) => {
    try{
        const response = await axios.post(`${API_URL}/create`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao criar pedido de upgrade de cargo!');
        throw error;
    }
};

export const delete_certificados = async (id) => {
    try{
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao excluir pedido de upgrade de cargo!');
        throw error;
    }
};
