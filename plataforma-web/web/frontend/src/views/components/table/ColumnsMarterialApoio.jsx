

export const ColumnsMaterialApoio = [
  { label: 'Nº', key: 'id_material_apoio'},
  { label: 'Nome Documento', render: (item) => { return 'Alterar tabela'; } },
  { label: ' Tipo Documento', render: (item) => { return item.id_formato; } },
]