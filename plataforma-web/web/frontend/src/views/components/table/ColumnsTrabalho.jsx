import { daysMonthsYears, formatDayMonthYear, formatHoraMinutos } from "../shared_functions/FunctionsUtils";

export const columnsTrabalhos = [
    {label: 'Nº', key:'id_trabalho' },
    {label: 'Nome trabalho', render: (item) => { return item.nome_tr; }},
    {label: 'Data entrega', render: (item) => { return formatDayMonthYear(item.data_entrega_tr); }},
    {label: 'Hora entrega', render: (item) => { return formatHoraMinutos(item.data_entrega_tr); }},
];