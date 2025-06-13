export const columnsCursos = [
  { label: 'ID', key: 'id' },
  { label: 'Curso', key: 'nome' },
  { label: 'Tipologia', key: 'tipo' },
  { label: 'Datas Curso', key: 'datas' },
  { label: 'Criador', key: 'formador' },
  { label: 'Vagas', key: 'vagas' },
  {
    label: 'Estado',
    key: 'estado',
    render: (item) => (
      <span className={`badge bg-${item.estado === 'Concluído' ? 'danger' : 'success'}`}>
        {item.estado}
      </span>
    ),
  },
];