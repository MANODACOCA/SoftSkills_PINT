import axios from "axios";
const API_URL = 'https://softskills-api.onrender.com/utilizador';

export const checkUserBlocked = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return false;

    await axios.get(`${API_URL}/verificar-utilizador-block`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    return false;
  } catch (error) {
    if(error.response?.status === 403) {
        //localStorage.removeItem('token');
        alert("A sua conta foi bloqueada. Sessão terminada.");
        //window.location.href = "/login";
        return true;
    }

    console.error("Erro ao verificar estado do utilizador", error);
    return false;
  }
};
