import { useState } from "react";
import { NotificationsContext } from "./notificationsContext";

export const NotificationsProvider = ({ children }) => {
    const [totalNotificacoes, setTotalNotificacoes] = useState(0);

    return (
        <NotificationsContext.Provider value={{ totalNotificacoes, setTotalNotificacoes }}>
            {children}
        </NotificationsContext.Provider>
    );
};
