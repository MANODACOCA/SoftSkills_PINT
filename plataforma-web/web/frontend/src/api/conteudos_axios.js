import axios from 'axios';

const API_URL = 'https://softskills-api.onrender.com/conteudos';

const ONE_HUNDRED_MB = 100 * 1024 * 1024; 

export const list_conteudos = async () => {
  try{
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  }catch (error){
    console.error('Erro ao ir buscar lista de conteudos!');
    throw error;
  }
}

export const get_conteudos  = async (id) => {
    try{
        const response = await axios.get(`${API_URL}/get/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao buscar conteudos!');
        throw error;
    }
};

export const create_conteudos = async ({
    id_aula, id_curso, nome_conteudo, id_formato, ficheiro, conteudo
}) => {
    try{
        const fd = new FormData();
        fd.append('id_aula', id_aula);
        fd.append('id_curso', id_curso);
        fd.append('nome_conteudo', nome_conteudo);
        fd.append('id_formato', id_formato);

        if(ficheiro){
            fd.append('ficheiro', ficheiro);
        }else{
            fd.append('conteudo', conteudo);
        }

        const response = await axios.post(`${API_URL}/create`, fd,
            {
                maxBodyLength: ONE_HUNDRED_MB
            }
        );
        return response.data;
    }catch(error){
        console.error('Erro ao criar conteudos!');
        throw error;
    }
};

export const update_conteudos = async (id, data) => {
    try{
        const response = await axios.put(`${API_URL}/update/${id}`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao atualizar conteudos!');
        throw error;
    }
};

export const delete_conteudos = async (id) => {
    try{
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao excluir conteudos!');
        throw error;
    }
};


