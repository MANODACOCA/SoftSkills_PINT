
import React from 'react';
import SidebarFormando from './SideBar_Formando';
import SidebarFormador from './SideBar_Formador';
import SidebarAdmin from './SideBar_Admin';

const Sidebar = ({ role, ...props }) => {
  switch (role) {
    case 'formador':
      return <SidebarFormador {...props} />;
    case 'admin':
      return <SidebarAdmin {...props} />;
    case 'formando':
      return <SidebarFormando {...props} />;  
  }
};

export default Sidebar;