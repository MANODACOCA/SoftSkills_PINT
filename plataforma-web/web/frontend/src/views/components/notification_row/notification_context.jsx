
import { createContext, useState, useContext, useEffect } from "react";
import { user_notificacao_count } from "../../../api/notificacoes_curso_axios";
import { useUser } from "../../../utils/useUser";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { user } = useUser();
  const [totalNotificacoes, setTotalNotificacoes] = useState(0);

  const fetchCount = async () => {
    if (!user) return;
    try {
      const res = await user_notificacao_count(user.id_utilizador);
      setTotalNotificacoes(res);
    } catch (err) {
      console.error("Erro ao buscar notificações:", err);
    }
  };

  useEffect(() => {
    fetchCount();
  }, [user]);

  return (
    <NotificationContext.Provider value={{ totalNotificacoes, fetchCount }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
