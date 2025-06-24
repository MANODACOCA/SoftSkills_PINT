import axios from 'axios';

const API_URL = 'http://localhost:3000/material_apoio';


export const list_material_apoio = async () => {
  try{
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  }catch (error){
    console.error('Erro ao ir buscar lista de Material de Apoio!');
    throw error;
  }
}

export const get_material_apoio  = async (id) => {
    try{
        const response = await axios.get(`${API_URL}/get/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao buscar Material de Apoio!');
        throw error;
    }
};

export const create_material_apoio = async (data) => {
    try{
        console.log(data);
        const response = await axios.post(`${API_URL}/create`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao criar Material de Apoio!');
        throw error;
    }
};

export const update_material_apoio = async (id, data) => {
    try{
        const response = await axios.put(`${API_URL}/update/${id}`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao atualizar Material de Apoio!');
        throw error;
    }
};

export const delete_material_apoio = async (id) => {
    try{
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao excluir Material de Apoio!');
        throw error;
    }
};

export const get_material_apoio_curso = async (cursoID) => {
    try{
        const response = await axios.get(`${API_URL}/material-apoio/${cursoID}`);
        return response.data;
    }catch(error){
        console.error('Erro ao excluir Material de Apoio!');
        throw error;
    }
}