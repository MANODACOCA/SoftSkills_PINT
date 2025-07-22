import axios from 'axios';

const API_URL = 'https://softskills-api.onrender.com/utilizador';


export const list_utilizador = async (search = "") => {
    try {
        let url = `${API_URL}/list`;

        if (search) {
            url += `?search=${encodeURIComponent(search)}`;
        }
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Erro ao ir buscar lista de Utilizador!');
        throw error;
    }
}

export const get_utilizador = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/get/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar Utilizador!');
        throw error;
    }
};

export const create_utilizador = async (nome_utilizador, email) => {
    try {
        const data = { nome_utilizador, email };
        const response = await axios.post(`${API_URL}/create`, data);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar Utilizador!');
        throw error;
    }
};

export const update_utilizador = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/update/${id}`, data);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar Utilizador!');
        throw error;
    }
};

export const alterarImgPerfil = async (id, file) => {
    try {
        const formData = new FormData();
        formData.append('imagem', file);

        const response = await axios.post(`${API_URL}/alterar-imgperfil/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar imagem de utilizador:', error?.response?.data || error.message);
        throw error;
    }
};

export const delete_utilizador = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao excluir Utilizador!');
        throw error;
    }
};

export const login = async (email, password) => {
    try {
        const data = { email, password };
        const response = await axios.post(`${API_URL}/login`, data);

        return response.data;
    } catch (error) {
        console.log('Erro ao efetuar login', error);
        throw error;
    }
};


export const alterarPassword = async (email, novaPassword) => {
    try {
        const data = { email, novaPassword };
        const response = await axios.post(`${API_URL}/alterar-password`, data);

        return response.data;
    } catch (error) {
        if (error.response && error.response.data && error.response.data.message) {
            throw new Error(error.response.data.message);
        } else {
            throw new Error('Erro ao alterar a password.', error);
        }
    }
};

export const esqueceuPassword = async (email) => {
    try {
        const data = { email };
        const response = await axios.post(`${API_URL}/esqueceu-password`, data);

        return response.data;
    } catch (error) {
        console.log('Erro ao efetuar esquecer password.', error);
        throw error;
    }
};

export const verificarCodigo = async (email, codigo) => {
    try {
        const data = { email, codigo };
        const response = await axios.post(`${API_URL}/verificar-codigo`, data);

        return response.data;
    } catch (error) {
        console.error('Erro ao validar codigo 2FA.', error);
        throw error;
    }
};

export const resendCodigo = async (email) => {
    try {
        const data = { email };
        const response = await axios.post(`${API_URL}/resend-codigo`, data);

        return response.data;
    } catch (error) {
        console.error('Erro ao reenviar codigo 2FA.', error);
        throw error;
    }
};

export const utilizadores_contagem = async () => {
    try {
        const response = await axios.get(`${API_URL}/count`);
        return response.data;
    } catch (error) {
        console.error('Erro ao contar o numero de utilizadores', error);
        throw error;
    }
}

export const checkUserBloqueado = async (token) => {
    try {
        const response = await axios.get(`${API_URL}/verificar-utilizador-block`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao verificar estado do utilizador", error);
        throw error;
    }
};