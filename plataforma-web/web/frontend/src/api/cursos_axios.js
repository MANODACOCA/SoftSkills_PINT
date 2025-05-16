import axios from 'axios';

const API_URL = `http://localhost:3000/cursos`;


export const list_cursos = async () => {
  try{
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  }catch (error){
    console.error('Erro ao ir buscar lista de Curso!');
    throw error;
  }
}


export const get_cursos  = async (id) => {
    try{
        const response = await axios.get(`${API_URL}/get/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao buscar Curso!');
        throw error;
    }
};

export const create_cursos = async (data) => {
    try{
        const response = await axios.post(`${API_URL}/create`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao criar Curso!');
        throw error;
    }
};

export const update_cursos = async (id, data) => {
    try{
        const response = await axios.put(`${API_URL}/update/${id}`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao atualizar Curso!');
        throw error;
    }
};

export const delete_cursos = async (id) => {
    try{
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao excluir Curso!');
        throw error;
    }
};

export const getCourseDestaqueAssincrono = async () => {
    try{
        const response = await axios.get(`${API_URL}/curso-destaque/assincrono`);
        return response.data;
    } catch(error){
        console.error('Erro ao procurar curso de destaque sincrono!');
        throw error;
    }
};

export const getCourseDestaqueSincrono = async () => {
    try{
        const response = await axios.get(`${API_URL}/curso-destaque/sincrono`);
        return response.data;
    } catch(error){
        console.error('Erro ao procurar curso de destaque assincrono!');
        throw error;
    }
};

export const getCousesWithMoreFormandos = async () => {
    try{
        const response = await axios.get(`${API_URL}/curso-destaque/topcurso`);
        return response.data;
    } catch(error){
        console.error('Erro ao procurar curso com mais formandos!');
        throw error;
    }
};

