import { formatDayMonthYear } from "../shared_functions/FunctionsUtils";

export const columnsUtilizadores = [
  { label: 'Nº', key: 'id_utilizador'},
  { label: 'Nome Utilizador', key: 'nome_utilizador'},
  { label: 'Email', key: 'email' },
  { label: 'Telemovel', render: (item) => {
    if(item.telemovel){
      return item.telemovel;
    } else return '----';
  }},  
  { label: 'Data Nascimento', render: (item) => {
    if(item.data_nasc != null){
      return formatDayMonthYear(item.data_nasc);
    } else return '----';
  }},
  { label: 'Género', render: (item) =>{
    if(item.genero == 1) return 'Masculino';
    if(item.genero == 2) return 'Feminino';
    else return '----';
  }},
  { label: 'País', render: (item) => {
    if(item.pais) {
      return item.pais;
    } else return '----';
  }},
  { label: 'Morada', render: (item) => {
    if(item.morada) {
      return item.morada;
    } else return '----';
  }},
  { label: 'Roles', 
    render: (item) => { 
      const roles = [];
      if(item.isformando) roles.push('Formando');
      if(item.isformador) roles.push('Formador');
      if(item.isgestor_administrador) roles.push('Administrador');
      return roles.join('/ ');
    } 
  },
];

