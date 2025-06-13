import HeaderFormando from './Header_Formando';
import HeaderAdmin from './Header_Admin';
import HeaderFormador from './Header_Formador';

import { useUser } from '../../../../utils/userContext';

const HeaderGeral = (props) => {
  const { activeRole } = useUser();

  switch (activeRole) {
    case 'formador': 
      return <HeaderFormador {...props} />;
    case 'admin':
      return <HeaderAdmin {...props} />;
    case 'formando': 
      return <HeaderFormando {...props} />;  
  }
};

export default HeaderGeral; 