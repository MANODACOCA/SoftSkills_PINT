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

// Funções específicas do fórum
export const getForuns = async (ordenar = "Mais Recentes") => {
  try {
    const response = await axios.get(`${API_URL}/foruns`, {
      params: { ordenar }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar fóruns:', error.response?.data || error.message);
    throw error;
  }
};

/*
export const filtrarConteudosPartilhados = async (filtros = {}) => {
  try {
    // Limpa filtros vazios/nulos e converte números
    const params = {};
    
    if (filtros.id_area) params.id_area = Number(filtros.id_area);
    if (filtros.id_topico) params.id_topico = Number(filtros.id_topico);

    const response = await axios.get(`${API_URL}/filtros`, { params });
    return response.data || []; // Remove .data se sua API não encapsular em {data: ...}
  } catch (error) {
    console.error('Erro ao filtrar conteúdos:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Falha ao filtrar conteúdos');
  }
};

// Funções auxiliares melhoradas
export const getAreas = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/area/list`);
    return (response.data || []).map(area => ({
      id_area: Number(area.id_area),
      nome_area: area.nome_area
    }));
  } catch (error) {
    console.error('Erro ao buscar áreas:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Falha ao buscar áreas');
  }
};

export const getTopicos = async (id_area = null) => {
  try {
    const params = {};
    if (id_area) params.id_area = Number(id_area);

    const response = await axios.get(`http://localhost:3000/topico/list`, { params });
    return (response.data || []).map(topico => ({
      id_topico: Number(topico.id_topico),
      nome_topico: topico.nome_topico,
      id_area: Number(topico.id_area)
    }));
  } catch (error) {
    console.error('Erro ao buscar tópicos:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Falha ao buscar tópicos');
  }
};*/