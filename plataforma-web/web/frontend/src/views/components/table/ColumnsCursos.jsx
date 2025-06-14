export const columnsCursos = [
  { label: 'Nº', key: 'id'},
  { label: 'Curso', key: 'nome'},
  { label: 'Tipologia', key: 'tipo' },
  { label: 'Datas Curso', key: 'datas' },  
  { label: 'Datas Inscrição', key: 'datas_inscricao' },
  { label: 'Criador/Formador', key: 'formador_criador' },
  { label: 'Duração', key: 'duracao' },
  { label: 'Vagas', key: 'vagas' },
  { label: 'Categoria/Área/Tópico', key: 'cat_area_topico' },
  { label: 'Estado', key: 'estado',
    render: (item) => (
      <span className={`badge bg-${item.estado === 'Concluído' ? 'danger' : 'success'}`}>
        {item.estado}
      </span>
    ),
  },
];