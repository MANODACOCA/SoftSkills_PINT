import axios from 'axios';

const API_URL = `http://localhost:3000/post`;


export const list_post = async () => {
  try{
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  }catch (error){
    console.error('Erro ao ir buscar lista de Post!');
    throw error;
  }
}


export const get_post  = async (id) => {
    try{
        const response = await axios.get(`${API_URL}/get/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao buscar Post!');
        throw error;
    }
};

export const create_post = async (data) => {
    try{
        const response = await axios.post(`${API_URL}/create`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao criar Post!');
        throw error;
    }
};

//atualiza filme por id
export const update_post = async (id, data) => {
    try{
        const response = await axios.put(`${API_URL}/update/${id}`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao atualizar Post!');
        throw error;
    }
};

//elimina filme por id
export const delete_post = async (id) => {
    try{
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao excluir Post!');
        throw error;
    }
};
