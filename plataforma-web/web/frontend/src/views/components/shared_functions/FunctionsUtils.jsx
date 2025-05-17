//Funções uteis para todas as pages 

export const formatDayMonthYear = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('pt-PT', { day: 'numeric', month: 'short', year: 'numeric' });
}

export const daysMonthsYears = (isoDate) => {
    const date = new Date(isoDate);
    const now = new Date();
    const dateMs = now - date;

    const seconds = Math.floor(dateMs / 1000);
    const minutes = Math.floor(dateMs / (1000 * 60));
    const hours = Math.floor(dateMs / (1000 * 60 * 60));
    const days = Math.floor(dateMs / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) return `há ${seconds} segundo${seconds == 1 ? '' : 's'}`;
    if (minutes < 60) return `há ${minutes} minuto${minutes == 1 ? '' : 's'}`;
    if (hours < 24) return `há ${hours} hora${hours == 1 ? '' : 's'}`;
    if (days < 30) return `há ${days} dia${days == 1 ? '' : 's'}`;
    if (months < 12)return `há ${months} ${months == 1 ? 'mês' : 'meses'}`;
    return `há ${years} ano${years == 1 ? '' : 's'}`;
}