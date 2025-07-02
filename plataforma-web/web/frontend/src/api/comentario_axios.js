import axios from 'axios';

const API_URL_COMENTARIOS = 'https://softskills-api.onrender.com/comentario';
const API_URL_LIKES = 'https://softskills-api.onrender.com/likes-comentario';

export const list_comentario = async () => {
  try {
    const response = await axios.get(`${API_URL_COMENTARIOS}/list`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar lista de Comentários!');
    throw error;
  }
};

export const get_comentarios_by_post = async (id_post) => {
  try {
    const response = await axios.get(`${API_URL_COMENTARIOS}/get/comentarios`, {
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
    const response = await axios.post(`${API_URL_COMENTARIOS}/create`, formData, {
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
    const response = await axios.put(`${API_URL_COMENTARIOS}/update/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar Comentário!');
    throw error;
  }
};

export const delete_comentario = async (id) => {
  try {
    const response = await axios.delete(`${API_URL_COMENTARIOS}/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao excluir Comentário!');
    throw error;
  }
};

export const like_comentario = async (id) => {
  try {
    axios.put(`${API_URL_LIKES}/addLike/${id}`);
    const response = await axios.put(`${API_URL_COMENTARIOS}/addLike/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao dar like no Comentário!');
    throw error;
  }
};

export const unlike_comentario = async (id) => {
  try {
     axios.put(`${API_URL_LIKES}/deleteLike/${id}`);
    const response = await axios.put(`${API_URL_COMENTARIOS}/deleteLike/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao remover like do Comentário!');
    throw error;
  }
};

export const jaDeuLike = async (id_comentario, id_utilizador) => {
  try {
    const response = await axios.get(`${API_URL_LIKES}/get/${id_comentario}/${id_utilizador}`);
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      return false;
    } else {
      console.error('Erro inesperado ao verificar se deu like no Comentario!', error);
      throw error;
    }
  }
};
