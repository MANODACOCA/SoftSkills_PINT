import { checkUserBloqueado } from "../api/utilizador_axios";

export const checkUserBlocked = async () => {
    const token = localStorage.getItem("token");
    if (!token) return false;
    try {
        await checkUserBloqueado(token);

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
