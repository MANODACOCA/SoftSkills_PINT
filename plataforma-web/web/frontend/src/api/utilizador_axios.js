import axios from 'axios';

const API_URL = 'http://localhost:3000/utilizador';


export const list_utilizador = async () => {
    try {
        const response = await axios.get(`${API_URL}/list`);
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
        console.log('Erro ao efetuar alteração de nova password.', error);
        throw error;
    }
};

export const esqueceuPassword = async (email) => {
    try {
        const data = { email };
        const response = await axios.post(`${API_URL}/esqueceu-password`, data);

        return response.data;
    } catch (error) {
        console.error('Erro ao enviar solicitação de redefinição de password:', error);
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

