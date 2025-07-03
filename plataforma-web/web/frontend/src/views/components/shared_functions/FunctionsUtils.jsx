//Funções uteis para todas as pages 

export const toIntervalFormat = (seconds) => {
  const hrs = Math.floor(seconds / 3600).toString().padStart(2, "0");
  const mins = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
  const secs = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${hrs}:${mins}:${secs}`;
};

export const formatDayMonthYear = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

export function formatHoraMinutos(isoDate) {
  const data = new Date(isoDate);
  const horas = data.getHours().toString().padStart(2, '0') - 1;
  const minutos = data.getMinutes().toString().padStart(2, '0');
  return `${horas}h${minutos}`;
}

export const formatYearMonthDay = (isoDate) => {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;  
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

export const calcularHorasCurso = (aulas) => {
  let hrsAula = 0;
  let minAulas = 0;
  let secAulas = 0;
  for(let i = 0; i < aulas.length; i++) {
    const aula = aulas[i];
    const tempo = aula?.tempo_duracao
    if (tempo != undefined) {
      if (tempo.hours != undefined) {
        hrsAula += tempo.hours;
      }
      if (tempo.minutes != undefined) {
        minAulas += tempo.minutes;
      }
      if (tempo.seconds != undefined) {
        secAulas += tempo.seconds;
      }      
    }
  }
  
  hrsAula = hrsAula + (minAulas/60) + (secAulas/3600);

  return parseFloat(hrsAula.toFixed(2));
}


export const toIsoTimestamp = (data, hora) => `${data}T${hora}:00`;      // Para concatenar data e hora numa string  

// para converter depois para o interval depois
export const minutesToInterval = min => {
  const hours = Math.floor(min / 60);
  const minutes = min % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
};  

export const isValidMeetingLink = url => {
  const patterns = [
    // Zoom
    /^https:\/\/([a-z0-9-]+\.)?zoom\.us\/j\/\d+(?:\?.*)?$/i,

    // Microsoft Teams
    /^https:\/\/(www\.)?teams\.microsoft\.com\/l\/meetup-join\/[\w-?&=]+$/i,

    // Google Meet
    /^https:\/\/meet\.google\.com\/[a-z]{3}-[a-z]{4}-[a-z]{3}$/i
  ];
  return patterns.some(rx => rx.test(url));
}


export const durationToMinutes = (dur) => {
  if (!dur) return 0;

  if (typeof dur === 'string') {
    const [h = 0, m = 0] = dur.split(':').map(Number);
    return h * 60 + m;
  }

  if (typeof dur === 'object') {
    const hours = dur.hours || 0;
    const minutes = dur.minutes || 0;
    const seconds = dur.seconds || 0;
    return Math.round(hours * 60 + minutes + seconds / 60);
  }

  return 0;
};