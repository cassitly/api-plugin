const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const client = new textToSpeech.TextToSpeechClient();

module.exports = async function speak(message) {
  const request = {
    input: { text: message },
    voice: { languageCode: 'en-US', ssmlGender: 'GIRL' },
    audioConfig: { audioEncoding: 'MP3' },
  };

  const [response] = await client.synthesizeSpeech(request);
  fs.writeFileSync('output.mp3', response.audioContent, 'binary');

  // Play the audio file (you'll need to install a package for playing mp3s like "play-sound")
  const player = require('play-sound')();
  player.play('output.mp3', function(err) {
    if (err) throw err;
  });
}
