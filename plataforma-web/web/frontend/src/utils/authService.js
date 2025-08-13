import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

export function isTokenExpired(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp;
    return Date.now() >= exp * 1000;
  } catch (e) {
    return true;
  }
}

export function scheduleTokenExpiration(onExpire) {
  const token = localStorage.getItem("token");
  if (!token) {
    onExpire();
    return;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp * 1000;
    const timeUtilExpire = exp - Date.now();

    if (timeUtilExpire <= 0) {
      onExpire();
    } else {
      return setTimeout(() => {
        onExpire();
      }, timeUtilExpire);
    }
  } catch (error) {
    onExpire();
  }
}

const TokenChecker = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const intervaloID = scheduleTokenExpiration(() => {

      const paginaAtual = location.pathname;
      const isLoginPage = paginaAtual.startsWith("/login");
      const isMainPage = paginaAtual.startsWith("/");
      const token = localStorage.getItem("token");

      if (!isLoginPage || !isMainPage) {
        if (token) {
          localStorage.removeItem("token");
          Swal.fire({
            icon: "error",
            title: "Oops... Sessão expirada!",
            text: "Por favor, efetue novamente o login.",
          });
          navigate("/login", { replace: true });
        } else {
          localStorage.removeItem("token");
          navigate("/", { replace: true });
        }

      } else {
        localStorage.removeItem("token");
      }

    });

    return () => clearTimeout(intervaloID);
  }, [navigate]);

  return null;
};

export default TokenChecker;