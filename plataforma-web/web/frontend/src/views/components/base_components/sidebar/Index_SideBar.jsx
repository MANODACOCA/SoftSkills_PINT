import SidebarFormando from './SideBar_Formando';
import SidebarFormador from './SideBar_Formador';
import SidebarAdmin from './SideBar_Admin';

import { useUser } from '../../../../utils/useUser';

const Sidebar = (props) => {
  const { activeRole } = useUser();

  switch (activeRole) {
    case 'formador': 
      return <SidebarFormador {...props} />;
    case 'admin':
      return <SidebarAdmin {...props} />;
    case 'formando': 
      return <SidebarFormando {...props} />;  
  }
};

export default Sidebar; 