import axios from 'axios';

const API_URL = 'https://softskills-api.onrender.com/pedidos-forum';


export const list_pedidos_forum = async () => {
  try{
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  }catch (error){
    console.error('Erro ao ir buscar lista de pedidos de forúm!');
    throw error;
  }
}

export const create_pedido_forum = async (data) => {
    try{
        const response = await axios.post(`${API_URL}/create`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao criar pedido de forúm!');
        throw error;
    }
};

export const delete_pedido_forum = async (id) => {
    try{
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao excluir pedido de forúm!');
        throw error;
    }
};
