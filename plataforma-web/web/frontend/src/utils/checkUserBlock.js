import axios from "axios";
const API_URL = 'https://softskills-api.onrender.com';

export const checkUserBlocked = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return false;

    const res = await axios.get(`${API_URL}/verificar-utilizador-block`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (res.status === 403) {
      localStorage.removeItem("token");
      window.location.href = "/login";
      alert("A sua conta foi bloqueada. Sessão terminada.");
      return true;
    }

    return false;
  } catch (err) {
    console.error("Erro ao verificar estado do utilizador", err);
    return false;
  }
};
