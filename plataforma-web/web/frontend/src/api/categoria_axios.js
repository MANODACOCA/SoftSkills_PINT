import axios from 'axios';

const API_URL = `http://localhost:3000/categoria`;


export const list_categoria = async () => {
  try{
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  }catch (error){
    console.error('Erro ao ir buscar lista de Categoria!');
    throw error;
  }
}


export const get_categoria  = async (id) => {
    try{
        const response = await axios.get(`${API_URL}/get/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao buscar Categoria!');
        throw error;
    }
};

export const create_categoria = async (data) => {
    try{
        const response = await axios.post(`${API_URL}/create`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao criar Categoria!');
        throw error;
    }
};

//atualiza filme por id
export const update_categoria = async (id, data) => {
    try{
        const response = await axios.put(`${API_URL}/update/${id}`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao atualizar Categoria!');
        throw error;
    }
};

//elimina filme por id
export const delete_categoria = async (id) => {
    try{
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao excluir Categoria!');
        throw error;
    }
};
