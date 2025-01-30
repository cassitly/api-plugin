const axios = require('axios');

const getLyricsFromGenius = async (songTitle, artist) => {
  const apiUrl = `https://api.genius.com/search?q=${encodeURIComponent(songTitle)}%20${encodeURIComponent(artist)}`;
  const accessToken = 'your_genius_access_token';
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