import axios from 'axios';

const API_URL = 'https://softskills-api.onrender.com/conteudos_partilhado';


export const list_conteudos_partilhado = async (ordenar = "Mais Recentes", search = "") => {
try{
        let url = `${API_URL}/list?ordenar=${ordenar}`;

        if (search) {
            url += `&search=${encodeURIComponent(search)}`
        }

        const response = await axios.get(url);
        return response.data;
    } catch (error){
        console.error('Erro ao procurar foruns!');
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

export const forum_contagem = async () => {
    try{
        const response = await axios.get(`${API_URL}/count`);
        return response.data;
    } catch(error) {
        console.error('Erro ao contar o numero de topicos no forum criados', error);
        throw error;
    }
}