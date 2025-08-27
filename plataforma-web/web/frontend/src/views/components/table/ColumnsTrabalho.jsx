import { formatDayMonthYear, formatHoraMinutos } from "../shared_functions/FunctionsUtils";

export const columnsTrabalhos = [
    //{label: 'Nº',  render: (_item, index) => index + 1 },
    {label: 'Nome trabalho', render: (item) => { return item.nome_tr; }},
    {label: 'Data entrega', render: (item) => { return item?.data_entrega_tr?.split('T')[0]; }},
    {label: 'Hora entrega', render: (item) => { return item?.data_entrega_tr?.split('T')[1]?.slice(0, 5); }},
];