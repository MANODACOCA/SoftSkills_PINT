import Swal from "sweetalert2";
import { checkUserBloqueado } from "../api/utilizador_axios";

export const checkUserBlocked = async () => {
    const token = localStorage.getItem("token");
    if (!token) return false;
    try {
        await checkUserBloqueado(token);

        return false;
    } catch (error) {
        if(error.response?.status === 403) {
            localStorage.removeItem('token');

            const result = await Swal.fire({
                title: 'A sua conta foi bloqueada. Sessão terminada.',
                icon: 'warning',
                showCancelButton: false,
                confirmButtonText: 'ok',
                customClass: {
                    confirmButton: 'btn btn-success me-2',
                },
                buttonsStyling: false
            });
            if(result.isConfirmed){
                window.location.href = "/login";
                enviarEmailUserBloqueado
            }

            return true;
        }

        console.error("Erro ao verificar estado do utilizador", error);
        return false;
    }
};
