const axios = require('axios');
require('dotenv').config({ path: './src/secret.env' });

const getLyricsFromGenius = async (songTitle, artist) => {
  const apiUrl = `https://api.genius.com/search?q=${encodeURIComponent(songTitle)}%20${encodeURIComponent(artist)}`;
  const accessToken = process.env.LYRICS_RECOGNITION_API_KEY
  const config = {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  };

  try {
    const response = await axios.get(apiUrl, config);
    const songPath = response.data.response.hits[0].result.path;
    const lyricsUrl = `https://genius.com${songPath}`;
    console.log(`Lyrics URL: ${lyricsUrl}`);
  } catch (error) {
    console.error('Error fetching lyrics:', error);
  }
};

module.exports = getLyricsFromGenius;