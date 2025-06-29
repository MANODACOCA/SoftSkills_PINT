
export const catColumns = [
    { label: 'Categoria', key: 'nome_cat'},
    { label: 'Nº Areas', render: (item) => item.areas?.length ?? 0 }
];

export const areaColumns = [
    { label: 'Área', render: (item) => item?.nome_area ?? 0},
    { label: 'Nº Tópicos', render: (item) => item.topicos?.length ?? 0 }
];

export const topicoColumns = [
    { label: 'Nº', key: 'id_topico'},
    { label: 'Topico', key: 'descricao_top'},
];