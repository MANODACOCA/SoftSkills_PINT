import axios from 'axios';

const API_URL = 'https://softskills-api.onrender.com/comentario';


export const list_comentario = async () => {
  try {
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar lista de Comentários!');
    throw error;
  }
};

export const get_comentarios_by_post = async (id_post) => {
  try {
    const response = await axios.get(`${API_URL}/get/comentarios`, {
      params: { id_post }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar Comentários do post!');
    throw error;
  }
};

export const create_comentario = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/create`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar Comentário!');
    throw error;
  }
};

export const update_comentario = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/update/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar Comentário!');
    throw error;
  }
};

export const delete_comentario = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao excluir Comentário!');
    throw error;
  }
};

export const like_comentario = async (id) => {
  try {
    const response = await axios.put(`${API_URL}/addLike/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao dar like no Comentário!');
    throw error;
  }
};

export const unlike_comentario = async (id) => {
  try {
    const response = await axios.put(`${API_URL}/deleteLike/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao remover like do Comentário!');
    throw error;
  }
};
