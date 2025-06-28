import axios from 'axios';

import {getAuthHeader} from '../utils/getToken';

const API_URL = 'https://softskills-api.onrender.com/cursos';


export const list_cursos = async () => {
    try {
        const response = await axios.get(`${API_URL}/list`, getAuthHeader());
        return response.data;
    } catch (error) {
        console.error('Erro ao ir buscar lista de Curso!');
        throw error;
    }
}

export const get_cursos = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/get/${id}`, getAuthHeader());
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar Curso!');
        throw error;
    }
};

export const create_cursos = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/create`, data, getAuthHeader());
        return response.data;
    } catch (error) {
        console.error('Erro ao criar Curso!');
        throw error;
    }
};

export const update_cursos = async (id, data) => {
    console.log(data);
    try {
        const response = await axios.put(`${API_URL}/update/${id}`, data, getAuthHeader());
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar Curso!');
        throw error;
    }
};

export const delete_cursos = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/delete/${id}`, getAuthHeader());
        return response.data;
    } catch (error) {
        console.error('Erro ao excluir Curso!');
        throw error;
    }
};

/*------------------------------------------------------------------------------------------------*/

export const getCursosDisponiveisParaInscricao = async (tipo = "todos", id_curso = null, search = "", id_topico = []) => {
    try {
        let url = `${API_URL}/cursos-disponiveis-inscricao?tipo=${tipo}`;

        if (id_curso !== null && id_curso !== undefined) {
            url += `&id_curso=${id_curso}`;
        }

        if (search) {
            url += `&search=${encodeURIComponent(search)}`
        }

        if (id_topico && Array.isArray(id_topico) && id_topico.length > 0) {
            url += `&idstopicos=${id_topico.map(encodeURIComponent).join(',')}`;
        }

        const response = await axios.get(url, getAuthHeader());
        return response.data;
    } catch (error) {
        console.error('Erro ao procurar cursos disponiveis para inscricao!');
        throw error;
    }
};

export const getCourseDestaqueAssincrono = async () => {
    try {
        const response = await axios.get(`${API_URL}/curso-destaque/assincrono`, getAuthHeader());
        return response.data;
    } catch (error) {
        console.error('Erro ao procurar curso de destaque sincrono!');
        throw error;
    }
};

export const getCourseDestaqueSincrono = async () => {
    try {
        const response = await axios.get(`${API_URL}/curso-destaque/sincrono`, getAuthHeader());
        return response.data;
    } catch (error) {
        console.error('Erro ao procurar curso de destaque assincrono!');
        throw error;
    }
};

export const getCousesWithMoreFormandos = async () => {
    try {
        const response = await axios.get(`${API_URL}/curso-destaque/topcurso`, getAuthHeader());
        return response.data;
    } catch (error) {
        console.error('Erro ao procurar curso com mais formandos!');
        throw error;
    }
};


export const getCompletedCourses = async (userId, tipologia = null) => {
    try {
        const params = tipologia !== 'todos' ? { tipologia } : {};
        const response = await axios.get(`${API_URL}/users/${userId}/completed-courses`, getAuthHeader({ params }));
        return response.data;
    } catch (error) {
        console.error('Erro ao procurar cursos terminados!');
        throw error;
    }
};

export const getEnrolledCourses = async (userId, tipologia = 'todos') => {
    try {
        const params = tipologia !== 'todos' ? { tipologia } : {};
        const response = await axios.get(`${API_URL}/users/${userId}/enrolled-courses`, getAuthHeader({ params }));
        return response.data;
    } catch (error) {
        console.error('Erro ao procurar cursos inscritos!');
        throw error;
    }
};

//POR ACABAR!!! FALTA TABELA FAVORITOS
export const getFavoriteCourses = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/users/${userId}/favorite-courses`, getAuthHeader());
        return response.data;
    } catch (error) {
        console.error('Erro ao procurar cursos favoritos!');
        throw error;
    }

}

export const getCourseForYou = async () => {
    try {
        const response = await axios.get(`${API_URL}/cursos-destaque/top8foryou`, getAuthHeader());
        return response.data;
    } catch (error) {
        console.error('Erro ao procurar cursos ForYou!');
        throw error;
    }
}

export const getCourseNews = async () => {
    try {
        const response = await axios.get(`${API_URL}/cursos-destaque/top8news`, getAuthHeader());
        return response.data;
    } catch (error) {
        console.error('Erro ao procurar cursos News!');
        throw error;
    }
}

export const getCoursePopular = async () => {
    try {
        const response = await axios.get(`${API_URL}/cursos-destaque/top8popular`, getAuthHeader());
        return response.data;
    } catch (error) {
        console.error('Erro ao procurar cursos Popular!');
        throw error;
    }
}


export const getCourseAdminLista = async () => {
    try {
        const response = await axios.get(`${API_URL}/all-info`, getAuthHeader());
        return response.data;
    } catch(error) {
        console.error('Erro ao carregar cursos para lista Admin!');
        throw error;
    }
}

export const verificar_acesso_curso = async (userId, cursoId) => {
    try {
        const response = await axios.get(`${API_URL}/verificar/${userId}/${cursoId}`, getAuthHeader());
        return response.data;
    } catch (error) {
        console.error('Erro ao verificar acesso ao curso:', error);
        throw error;
    }
}

export const cursos_contagem = async () => {
    try{
        const response = await axios.get(`${API_URL}/count`, getAuthHeader());
        return response.data;
    } catch(error) {
        console.error('Erro ao contar o numero de cursos', error);
        throw error;
    }
}