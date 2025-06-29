import FooterFormando from './Footer_Formando';
import FooterFormador from './Footer_Formador';
import FooterAdmin from './Footer_Admin';

import { useUser } from '../../../../utils/useUser';

const Footer = (props) => {
  const { activeRole } = useUser();

  switch (activeRole) {
    case 'formador': 
      return <FooterFormador {...props} />;
    case 'admin':
      return <FooterAdmin {...props} />;
    case 'formando': 
      return <FooterFormando {...props} />;  
  }
};

export default Footer; 