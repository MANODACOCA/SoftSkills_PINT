import axios from 'axios';

const API_URL = `http://localhost:3000/sincrono`;


export const list_sincrono = async () => {
  try{
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  }catch (error){
    console.error('Erro ao ir buscar lista de Curso Sincrono!');
    throw error;
  }
}


export const get_sincrono  = async (id) => {
    try{
        const response = await axios.get(`${API_URL}/get/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao buscar Curso Sincrono!');
        throw error;
    }
};

export const create_sincrono = async (data) => {
    try{
        const response = await axios.post(`${API_URL}/create`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao criar Curso Sincrono!');
        throw error;
    }
};

//atualiza filme por id
export const update_sincrono = async (id, data) => {
    try{
        const response = await axios.put(`${API_URL}/update/${id}`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao atualizar Curso Sincrono!');
        throw error;
    }
};

//elimina filme por id
export const delete_sincrono = async (id) => {
    try{
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao excluir Curso Sincrono!');
        throw error;
    }
};
