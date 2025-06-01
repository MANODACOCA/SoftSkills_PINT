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
    if (months < 12) return `há ${months} ${months == 1 ? 'mês' : 'meses'}`;
    return `há ${years} ano${years == 1 ? '' : 's'}`;
}

export const formatTime = (timeValue) => {
  if (!timeValue || typeof timeValue !== 'string') return '';

  try {
    const parts = timeValue.trim().split(':');
    
    if (parts.length === 3) {
      const [hoursStr, minutesStr, secondsStr] = parts;
      const hours = parseInt(hoursStr, 10);
      const minutes = parseInt(minutesStr, 10);
      const seconds = parseInt(secondsStr, 10);

      if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
        return '';
      }

      if (hours === 0 && minutes < 60) {
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} min`;
      } else {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      }
    }

    return '';
  } catch (error) {
    console.error('Erro ao formatar tempo:', error);
    return '';
  }
};
