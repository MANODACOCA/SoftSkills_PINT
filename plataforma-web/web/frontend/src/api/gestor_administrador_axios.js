import axios from 'axios';

const API_URL = 'http://localhost:3000/'+ gestor_administrador;


export const list_gestor_administrador = async () => {
  try{
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  }catch (error){
    console.error('Erro ao ir buscar lista de Gestor Administrador!');
    throw error;
  }
}

export const get_gestor_administrador  = async (id) => {
    try{
        const response = await axios.get(`${API_URL}/get/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao buscar Gestor Administrador!');
        throw error;
    }
};

export const create_gestor_administrador = async (data) => {
    try{
        const response = await axios.post(`${API_URL}/create`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao criar Gestor Administrador!');
        throw error;
    }
};

export const update_gestor_administrador = async (id, data) => {
    try{
        const response = await axios.put(`${API_URL}/update/${id}`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao atualizar Gestor Administrador!');
        throw error;
    }
};


export const delete_gestor_administrador = async (id) => {
    try{
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao excluir Gestor Administrador!');
        throw error;
    }
};
