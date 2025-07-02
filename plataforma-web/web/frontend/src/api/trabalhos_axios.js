import axios from 'axios';
import { Form } from 'react-router-dom';

const API_URL = 'https://softskills-api.onrender.com/trabalhos';

const ONE_HUNDRED_MB = 100 * 1024 * 1024;

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
  id_curso_tr,
  id_formato_tr,
  nome_tr,
  descricao_tr,
  data_entrega_tr,
  ficheiro
}) => {
    try{
     const fd = new FormData();
        fd.append('id_curso_tr', id_curso_tr);
        fd.append('id_formato_tr', id_formato_tr);
        fd.append('nome_tr', nome_tr);
        fd.append('descricao_tr', descricao_tr);
        fd.append('data_entrega_tr', data_entrega_tr);

        if (ficheiro) {
        fd.append('ficheiro', ficheiro);
        }

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

export const update_trabalhos = async (id,
    {id_curso_tr, id_formato_tr, nome_tr, descricao_tr, data_entrega_tr, ficheiro}
) => {
    try{
        let payload = null;
        let headers = {};

        if(ficheiro) {
            const fd = new FormData();
            if (id_curso_tr !== undefined) fd.append('id_curso', id_curso_tr);
            if (id_formato_tr !== undefined) fd.append('id_formato', id_formato_tr);
            if (descricao_tr !== undefined) fd.append('nome_material', descricao_tr);
            if (data_entrega_tr !== undefined) fd.append('nome_material', data_entrega_tr);
            if (nome_tr !== undefined) fd.append('nome_material', nome_tr);
            fd.append('ficheiro', ficheiro);          
            payload = fd;
            headers = { maxBodyLength: ONE_HUNDRED_MB }; 
        }else{
            payload = {id_curso_tr, id_formato_tr, descricao_tr, data_entrega_tr, nome_tr};
        }

        const response = await axios.put(`${API_URL}/update/${id}`, payload, headers);
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
