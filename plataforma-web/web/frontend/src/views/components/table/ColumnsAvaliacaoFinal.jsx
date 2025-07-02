
export const columnsNotasFinais = [
    {label: 'Nº', key: 'id_formando'},
    {label: 'Nome', render: (item) => { 
        return item.id_formando_formando.id_formando_utilizador.nome_util; }},
    {label: 'Nota final', render: (item) => { return item.resul; }},
];