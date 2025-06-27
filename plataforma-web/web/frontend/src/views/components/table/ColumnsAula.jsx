import { renderMatches } from "react-router-dom";
import { formatDayMonthYear } from "../shared_functions/FunctionsUtils";


export const columnsAulas = [
    { label: 'Nº', key: 'id_aula'},
    { label: 'Nome Aula', render: (item) => { return item.nome_aula; }},
    { label: 'Video', render: (item) => {
        if(item.caminho_url != null) { return 'Já contém aula';
        } else return 'Não contém aula';
    }},
    { label: 'Tempo Duracao', render: (item) => {
        let minutos = item.tempo_duracao.minutes;
        let segundos = item.tempo_duracao.seconds;
        if(minutos == undefined || segundos == undefined) {
            segundos = 0;
            minutos = 0;
        }
        return minutos + 'min ' + segundos + 'seg'; 
    }},
];
