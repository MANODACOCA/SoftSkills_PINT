export const columnsForum = [
  { label: 'Nº', key: 'id_utilizador'},
  { label: 'Nome Utilizador', key: 'nome_utilizador'},
  { label: 'Email', key: 'email' },
  { label: 'Telemovel', key: 'telemovel' },  
  { label: 'Data Nascimento', render: (item) => formatDayMonthYear(item.data_nasc) },
  { label: 'Género', render: (item) =>{
    if(item.genero == 1) return 'Masculino';
    if(item.genero == 2) return 'Feminino';
    else return '-';
    } 
  },
  { label: 'País', key: 'pais' },
  { label: 'Morada', key: 'morada' },
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
