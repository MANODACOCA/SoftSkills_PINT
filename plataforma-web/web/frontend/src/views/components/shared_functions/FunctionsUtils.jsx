//Funções uteis para todas as pages 

export const formatDayMonthYear = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('pt-PT', { day: 'numeric', month: 'short', year: 'numeric' });
}

