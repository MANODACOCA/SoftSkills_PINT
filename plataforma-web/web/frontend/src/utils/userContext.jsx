import { createContext, useState, useEffect, useContext } from 'react';
import { get_utilizador } from '../api/utilizador_axios';
import { getUserIdFromToken } from '../views/components/shared_functions/FunctionsUtils';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [activeRole, setActiveRole] = useState('formando');

  const loadUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUser(null);
      setRoles([]);
      return;
    }

    const userId = getUserIdFromToken(token);
    try {
      const userData = await get_utilizador(userId);

      const userRoles = [];
      if (userData.isformando) userRoles.push('formando');
      if (userData.isformador) userRoles.push('formador');
      if (userData.isgestor_administrador) userRoles.push('admin');

      setUser(userData);
      setRoles(userRoles);

      if (userRoles.includes('admin')) setActiveRole('admin');
      else if (userRoles.includes('formador')) setActiveRole('formador');
      else setActiveRole('formando');

    } catch (err) {
      console.error("Erro ao carregar utilizador:", err);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, roles, activeRole, setActiveRole, refreshUser: loadUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
