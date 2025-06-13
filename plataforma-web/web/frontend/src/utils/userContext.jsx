import { createContext, useState, useEffect, useContext } from 'react';
import { get_utilizador } from '../api/utilizador_axios';
import { getUserIdFromToken } from '../views/components/shared_functions/FunctionsUtils';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      const userId = getUserIdFromToken(token);
      try {
        const userData = await get_utilizador(userId);
        setUser(userData);
      } catch (err) {
        console.error("Erro ao carregar utilizador:", err);
      }
    };

    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
