
export const columnsNotasFinais = [
    {label: 'Nº', key: 'id_formando'},
    {label: 'Nome', render: (item) => { 
        return item.id_formando; }},
    {label: 'Nota final', render: (item) => { return item.resul; }},
];