
export const columnsTrabalhos = [
    {label: 'Nº', key:'id_trabalho' },
    {label: 'Nome trabalho', render: (item) => { return item.nome_tr; }},
    {label: 'Data entrega', render: (item) => { return item.data_entrega_ty; }},
];