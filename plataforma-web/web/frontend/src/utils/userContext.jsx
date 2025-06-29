import { createContext, useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { get_utilizador } from '../api/utilizador_axios';
import { getUserIdFromToken } from '../views/components/shared_functions/FunctionsUtils';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [activeRole, setActiveRoleState] = useState(() => {
    return localStorage.getItem('activeRole') || 'formando';
  });
  const prevActiveRole = useRef(activeRole);

  const navigate = useNavigate();
  const location = useLocation();
  const firstRender = useRef(true);

  const setActiveRole = (role) => {
    localStorage.setItem('activeRole', role);
    setActiveRoleState(role);
  };

  const loadUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setUser(null);
      setRoles([]);
      setActiveRole('formando');
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

      const storedRole = localStorage.getItem('activeRole');
      if (userRoles.includes(storedRole)) {
        setActiveRole(storedRole);
      } else if (userRoles.includes('formando')) {
        setActiveRole('formando');
      } else if (userRoles.includes('formador')) {
        setActiveRole('formador');
      } else {
        setActiveRole('admin');
      }
    } catch (err) {
      console.error("Erro ao carregar utilizador:", err);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      prevActiveRole.current = activeRole;
      return;
    }

    if (prevActiveRole.current !== activeRole) {
      if (activeRole === 'formando') {
        navigate('/home');
      } else if (activeRole === 'formador') {
        navigate('/formador/home');
      } else if (activeRole === 'admin') {
        navigate('/admin/home');
      }
    }

    prevActiveRole.current = activeRole;
  }, [activeRole, navigate]);

  return (
    <UserContext.Provider value={{ user, setUser, roles, activeRole, setActiveRole, refreshUser: loadUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };
