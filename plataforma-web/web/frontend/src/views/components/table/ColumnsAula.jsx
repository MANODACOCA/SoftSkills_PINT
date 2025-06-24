import { renderMatches } from "react-router-dom";
import { formatDayMonthYear } from "../shared_functions/FunctionsUtils";


export const columnsAulas = [
    { label: 'Nº', key: 'id_aula'},
    { label: 'Nome Aula', render: (item) => { return item.nome_aula; }},
    { label: 'Video', render: (item) => {
        if(item.caminho_url != null) {
            return 'Já contém aula';
        }
        else return 'Não contém aula';
    }},
    { label: 'Tempo Duracao', render: (item) => { return item.tempo_duracao.minutes;}},
];

