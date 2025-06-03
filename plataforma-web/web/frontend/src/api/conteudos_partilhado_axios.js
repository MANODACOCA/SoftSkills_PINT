import axios from 'axios';

const API_URL = 'http://localhost:3000/conteudos_partilhado';


export const list_conteudos_partilhado = async () => {
  try{
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  }catch (error){
    console.error('Erro ao ir buscar lista de Conteudo Partilhado!');
    throw error;
  }
}

export const get_conteudos_partilhado  = async (id) => {
    try{
        const response = await axios.get(`${API_URL}/get/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao buscar Conteudo Partilhado!');
        throw error;
    }
};

export const create_conteudos_partilhado = async (data) => {
    try{
        const response = await axios.post(`${API_URL}/create`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao criar Conteudo Partilhado!');
        throw error;
    }
};

export const update_conteudos_partilhado = async (id, data) => {
    try{
        const response = await axios.put(`${API_URL}/update/${id}`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao atualizar Conteudo Partilhado!');
        throw error;
    }
};

export const delete_conteudos_partilhado = async (id) => {
    try{
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao excluir Conteudo Partilhado!');
        throw error;
    }
};

/*------------------------------------------------------------------------------------------------*/

export const getForuns = async (ordenar = "Mais Recentes") => {
    try{
         let url = `${API_URL}/foruns?ordenar=${ordenar}`;
         
        const response = await axios.get(url);
        return response.data;
    } catch (error){
        console.error('Erro ao procurar foruns!');
        throw error;
    }
}
