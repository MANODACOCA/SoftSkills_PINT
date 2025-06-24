

export const ColumnsMaterialApoio = [
  { label: 'Nº', key: 'id_material_apoio'},
  { label: 'Nome Documento', render: (item) => { return item.nome_material; } },
  { label: 'Tipo Documento', render: (item) => { return item.id_formato_tipo_formato.formato; } },
]