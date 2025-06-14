//Funções uteis para todas as pages 

export const formatDayMonthYear = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric' });
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

//Formata string no formato "hh:mm:ss" que vem da BD, mostra min se for < 1 hora
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

//Converte valor numerico em segundos para mm:ss ou hh:mm:ss para o nosso player de videos
export const formatSecondsToTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const sec = Math.floor(seconds % 60);

  if (hours === 0) {
    return `${String(minutes).padStart(2, '0')}:${String(sec).padStart(2, '0')} min`;
  }
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
};


export function getUserIdFromToken(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id;
  } catch (e) {
    return null;
  }
}


export const radomArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
