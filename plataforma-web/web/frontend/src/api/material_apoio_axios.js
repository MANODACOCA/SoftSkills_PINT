import axios from 'axios';

const API_URL = 'https://softskills-api.onrender.com/material_apoio';

const ONE_HUNDRED_MB = 100 * 1024 * 1024;

export const list_material_apoio = async () => {
  try{
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  }catch (error){
    console.error('Erro ao ir buscar lista de Material de Apoio!');
    throw error;
  }
}

export const get_material_apoio  = async (id) => {
    try{
        const response = await axios.get(`${API_URL}/get/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao buscar Material de Apoio!');
        throw error;
    }
};

export const create_material_apoio = async ({
    id_curso, id_formato, nome_material, ficheiro, conteudo
}) => {
    try{
        const fd = new FormData();
        fd.append('id_curso', id_curso);
        fd.append('id_formato', id_formato);
        fd.append('nome_material', nome_material);

        if (ficheiro) {
            fd.append('ficheiro', ficheiro);      
        } else {
            fd.append('conteudo', conteudo);      
        } 

        const response = await axios.post(`${API_URL}/create`, fd,
            {
                maxBodyLength: ONE_HUNDRED_MB
            }
        );
        return response.data;
    }catch(error){
        console.error('Erro ao criar Material de Apoio!');
        throw error;
    }
};

export const update_material_apoio = async (id,
    { id_curso, id_formato, nome_material, ficheiro, conteudo }
) => {
    try{
        let payload = null;
        let headers = {};

        if(ficheiro){
            const fd = new FormData();
            if (id_curso !== undefined) fd.append('id_curso', id_curso);
            if (id_formato !== undefined) fd.append('id_formato', id_formato);
            if (nome_material !== undefined) fd.append('nome_material', nome_material);
            fd.append('ficheiro', ficheiro);          
            payload = fd;
            headers = { maxBodyLength: ONE_HUNDRED_MB };  
        }else{
            payload = { id_curso, id_formato, nome_material, conteudo };
        }
        
        const response = await axios.put(`${API_URL}/update/${id}`, payload, headers);
        return response.data;
    }catch(error){
        console.error('Erro ao atualizar Material de Apoio!');
        throw error;
    }
};

export const delete_material_apoio = async (id) => {
    try{
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    }catch(error){
        console.error('Erro ao excluir Material de Apoio!');
        throw error;
    }
};

export const get_material_apoio_curso = async (cursoID) => {
    try{
        const response = await axios.get(`${API_URL}/material-apoio/${cursoID}`);
        return response.data;
    }catch(error){
        console.error('Erro ao excluir Material de Apoio!');
        throw error;
    }
}