import { formatDayMonthYear, daysMonthsYears } from "../shared_functions/FunctionsUtils";

export const columnsForum = [
  { label: 'Nº', key: 'id_conteudos_partilhado'},
  { label: 'Nome do Tópico', render: (item) => { return item.id_topico; } },
  { label: 'Data Criação', render: (item) => formatDayMonthYear(item.data_criacao_cp) },
  { label: 'Categoria/Area', render: (item) => { 
      const cat_area = [];
      const cat = item.id_topico;
      const area = item.id_topico;
      cat_area.push(cat);
      cat_area.push(area);
      return cat_area.join('/ ');
    }
  },
];