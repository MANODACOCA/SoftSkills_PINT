import axios from 'axios';

const API_URL = 'http://localhost:3000/cursos';


export const list_cursos = async () => {
    try {
        const response = await axios.get(`${API_URL}/list`);
        return response.data;
    } catch (error) {
        console.error('Erro ao ir buscar lista de Curso!');
        throw error;
    }
}

export const get_cursos = async (id) => {
    console.log(id);
    try {
        console.log(id);
        const response = await axios.get(`${API_URL}/get/${id}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar Curso!');
        throw error;
    }
};

export const create_cursos = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/create`, data);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar Curso!');
        throw error;
    }
};

export const update_cursos = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/update/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar Curso!');
        throw error;
    }
};

export const delete_cursos = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/delete/${id}`);
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

        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Erro ao procurar cursos disponiveis para inscricao!');
        throw error;
    }
};

export const getCourseDestaqueAssincrono = async () => {
    try {
        const response = await axios.get(`${API_URL}/curso-destaque/assincrono`);
        return response.data;
    } catch (error) {
        console.error('Erro ao procurar curso de destaque sincrono!');
        throw error;
    }
};

export const getCourseDestaqueSincrono = async () => {
    try {
        const response = await axios.get(`${API_URL}/curso-destaque/sincrono`);
        return response.data;
    } catch (error) {
        console.error('Erro ao procurar curso de destaque assincrono!');
        throw error;
    }
};

export const getCousesWithMoreFormandos = async () => {
    try {
        const response = await axios.get(`${API_URL}/curso-destaque/topcurso`);
        return response.data;
    } catch (error) {
        console.error('Erro ao procurar curso com mais formandos!');
        throw error;
    }
};


export const getCompletedCourses = async (userId, tipologia = null) => {
    try {
        const params = tipologia !== 'todos' ? { tipologia } : {};
        const response = await axios.get(`${API_URL}/users/${userId}/completed-courses`, { params });
        return response.data;
    } catch (error) {
        console.error('Erro ao procurar cursos terminados!');
        throw error;
    }
};

export const getEnrolledCourses = async (userId, tipologia = 'todos') => {
    try {
        const params = tipologia !== 'todos' ? { tipologia } : {};
        const response = await axios.get(`${API_URL}/users/${userId}/enrolled-courses`, { params });
        return response.data;
    } catch (error) {
        console.error('Erro ao procurar cursos inscritos!');
        throw error;
    }
};

//POR ACABAR!!! FALTA TABELA FAVORITOS
export const getFavoriteCourses = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/users/${userId}/favorite-courses`);
        return response.data;
    } catch (error) {
        console.error('Erro ao procurar cursos favoritos!');
        throw error;
    }

}

export const getCourseForYou = async () => {
    try {
        const response = await axios.get(`${API_URL}/cursos-destaque/top8foryou`);
        return response.data;
    } catch (error) {
        console.error('Erro ao procurar cursos ForYou!');
        throw error;
    }
}

export const getCourseNews = async () => {
    try {
        const response = await axios.get(`${API_URL}/cursos-destaque/top8news`);
        return response.data;
    } catch (error) {
        console.error('Erro ao procurar cursos News!');
        throw error;
    }
}

export const getCoursePopular = async () => {
    try {
        const response = await axios.get(`${API_URL}/cursos-destaque/top8popular`);
        return response.data;
    } catch (error) {
        console.error('Erro ao procurar cursos Popular!');
        throw error;
    }
}


export const getCourseAdminLista = async () => {
    try {
        const response = await axios.get(`${API_URL}/all-info`);
        return response.data;
    } catch(error) {
        console.error('Erro ao carregar cursos para lista Admin!');
        throw error;
    }
}