import axios from 'axios';

const API_URL = 'https://softskills-api.onrender.com/trabalhos';


export const list_trabalhos = async () => {
  try{
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  }catch (error){
    console.error('Erro ao ir buscar lista de trabalhos!');
    throw error;
  }
}

export const get_trabalhos  = async (id) => {
    try{
        const response = await axios.get(`${API_URL}/get/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao buscar trabalhos!');
        throw error;
    }
};

export const create_trabalhos = async ({
    id_curso_tr, id_formato_tr, nome_tr, caminho_tr, descricao_tr, data_entrega_tr
}) => {
    try{
     const fd = new FormData();
        fd.append('id_curso_tr', id_curso_tr);
        fd.append('id_formato_tr', id_formato_tr);
        fd.append('nome_tr', nome_tr);

        const response = await axios.post(`${API_URL}/create`, fd,
            {
                maxBodyLength: ONE_HUNDRED_MB
            }  
        );
        return response.data;
    }catch(error){
        console.error('Erro ao criar trabalhos!');
        throw error;
    }
};

export const update_trabalhos = async (id, data) => {
    try{
        const response = await axios.put(`${API_URL}/update/${id}`, data);
        return response.data;
    }catch(error){
        console.error('Erro ao atualizar trabalhos!');
        throw error;
    }
};

export const delete_trabalhos = async (id) => {
    try{
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao excluir trabalhos!');
        throw error;
    }
};
