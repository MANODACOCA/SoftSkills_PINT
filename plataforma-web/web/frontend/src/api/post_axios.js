import axios from 'axios';

const API_URL_POSTS = 'https://softskills-api.onrender.com/posts';
const API_URL_LIKES = 'https://softskills-api.onrender.com/likes-post';


export const list_post = async () => {
    try {
        const response = await axios.get(`${API_URL_POSTS}/list`);
        return response.data;
    } catch (error) {
        console.error('Erro ao ir buscar lista de Post!');
        throw error;
    }
}

export const get_post = async (id) => {
    try {
        const response = await axios.get(`${API_URL_POSTS}/get/posts?id_conteudos_partilhado=${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar Post!');
        throw error;
    }
};

export const create_post = async (formData, config) => {
    try {
        const response = await axios.post(`${API_URL_POSTS}/create`, formData, config);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar Post!');
        throw error;
    }
};

export const update_post = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL_POSTS}/update/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar Post!');
        throw error;
    }
};

export const delete_post = async (id) => {
    try {
        const response = await axios.delete(`${API_URL_POSTS}/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao excluir Post!');
        throw error;
    }
};

export const put_like = async (id_post, id_utilizador) => {
    try {
        console.log("wdawdwa", id_post)
         axios.put(`${API_URL_POSTS}/addLike/${id_post}`);
        const response = await axios.post(`${API_URL_LIKES}/create`, {
            id_post: id_post,
            id_utilizador: id_utilizador,
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao adicionar like no Post!');
        throw error;
    }
};

export const delete_like = async (id_post, id_utilizador) => {
    try {
         axios.put(`${API_URL_POSTS}/deleteLike/${id_post}`);
        const response = await axios.delete(`${API_URL_LIKES}/delete`, {
            data: {
                id_post: id_post,
                id_utilizador: id_utilizador,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao eliminar like no Post!');
        throw error;
    }
};

export const jaDeuLike = async (id_post, id_utilizador) => {
    try {
        const response = await axios.get(`${API_URL_LIKES}/get/${id_post}/${id_utilizador}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao eliminar like no Post!');
        throw error;
    }
};
