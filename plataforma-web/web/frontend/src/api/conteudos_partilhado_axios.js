import axios from 'axios';

const API_URL = 'https://softskills-api.onrender.com/conteudos_partilhado';


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

export const filtrarConteudosPartilhados = async (filtros = {}) => {
  try {
    console.log('Filtros enviados para o backend:', filtros); // Adicione este log
    
    const params = new URLSearchParams();
    if (filtros.id_topico) params.append('id_topico', filtros.id_topico);
    if (filtros.id_area) params.append('id_area', filtros.id_area);
    if (filtros.id_categoria) params.append('id_categoria', filtros.id_categoria);

    const response = await axios.get(`${API_URL}/filtros`, { params });
    console.log('Resposta do backend:', response.data); // Adicione este log
    
    return response.data;
  } catch (error) {
    console.error('Erro ao filtrar conteúdos:', error);
    throw error;
  }
};

// Métodos auxiliares para os filtros (versão melhorada)
export const getAreas = async (idCategoria = null) => {
  try {
    const params = new URLSearchParams();
    if (idCategoria) params.append('id_categoria', idCategoria);
    
    const response = await axios.get(`http://localhost:3000/area/list`, { params });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar áreas:', error);
    throw error;
  }
};

export const getTopicos = async (idArea = null) => {
  try {
    const params = new URLSearchParams();
    if (idArea) params.append('id_area', idArea);
    
    const response = await axios.get(`http://localhost:3000/topico/list`, { params });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar tópicos:', error);
    throw error;
  }
};

export const getCategorias = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/categoria/list`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    throw error;
  }
};



export const forum_contagem = async () => {
    try{
        const response = await axios.get(`${API_URL}/count`);
        return response.data;
    } catch(error) {
        console.error('Erro ao contar o numero de topicos no forum criados', error);
        throw error;
    }
}