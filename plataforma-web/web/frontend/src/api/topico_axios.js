import axios from 'axios';

const API_URL = 'https://softskills-api.onrender.com/topico';


export const list_topico = async () => {
  try{
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  }catch (error){
    console.error('Erro ao ir buscar lista de Topico!');
    throw error;
  }
}

export const get_topico  = async (id) => {
    try{
        const response = await axios.get(`${API_URL}/get/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao buscar Topico!');
        throw error;
    }
};

export const create_topico = async (data) => {
    try{
        const response = await axios.post(`${API_URL}/create`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao criar Topico!');
        throw error;
    }
};

export const update_topico = async (id, data) => {
    try{
        const response = await axios.put(`${API_URL}/update/${id}`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao atualizar Topico!');
        throw error;
    }
};

export const delete_topico = async (id) => {
    try{
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao excluir Topico!');
        throw error;
    }
};

/*------------------------------------------------------------------------------------------------*/

export const getCategoriaAreaTopico = async () => {
    try{
        const response = await axios.get(`${API_URL}/categoria_area_topico`);
        return response.data;
    }catch(error){
        console.error('Erro ao obter Categorias/Areas/Topicos');
        throw error;
    }
}