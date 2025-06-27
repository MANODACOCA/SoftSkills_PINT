
require('dotenv').config();        
const axios = require('axios');

function getYouTubeVideoId(url) {
  const re = /(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/;
  const m  = url.match(re);
  return m ? m[1] : null;
}

function parseISODuration(iso) {
  const re = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const [, h = 0, m = 0, s = 0] = (iso.match(re) || []).map(Number);
  return { hours: h, minutes: m, seconds: s };
}

async function getVideoDuration(youtubeUrl) {
  const id = getYouTubeVideoId(youtubeUrl);
  if (!id) throw new Error('ID do vídeo inválido');

  const apiKey = YT_API_KEY;   
  if (!apiKey) throw new Error('YT_API_KEY não definido no .env');

  const { data } = await axios.get(
    'https://www.googleapis.com/youtube/v3/videos',
    {
      params: {
        id,
        part: 'contentDetails',
        key: apiKey,
      },
    }
  );

  if (!data.items || data.items.length === 0)
    throw new Error('Vídeo não encontrado');

  return parseISODuration(data.items[0].contentDetails.duration);
}

module.exports = { getVideoDuration };
