require('dotenv').config();
const axios = require('axios');

const { YT_API_KEY } = process.env;                

function getYouTubeVideoId(url) {
  const re = /(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/;
  const m  = url.match(re);
  return m ? m[1] : null;
}

function parseISODuration(iso) {
  const re = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const match = iso.match(re);
  
  if (!match) throw new Error('Formato de duração ISO-8601 inválido');

  const hours   = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);

  return { hours, minutes, seconds };
}

async function getVideoDuration(youtubeUrl) {
  const id = getYouTubeVideoId(youtubeUrl);
  if (!id) throw new Error('ID do vídeo inválido');

  const { data } = await axios.get(
    'https://www.googleapis.com/youtube/v3/videos',
    {
      params: {
        id,
        part: 'contentDetails',
        key: YT_API_KEY,                     
      },
    }
  );

  if (!data.items?.length) throw new Error('Vídeo não encontrado');

  return parseISODuration(data.items[0].contentDetails.duration);
}

module.exports = { getVideoDuration };
