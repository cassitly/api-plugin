const axios = require('axios');
const fs = require('fs');

const apiKey = process.env.SPEECH_RECOGNITION_API_KEY;
const audioPath = 'path/to/audio.mp3'; // Your audio file

// Upload audio file to AssemblyAI
async function uploadAudio() {
  const audioFile = fs.createReadStream(audioPath);
  const response = await axios.post('https://api.assemblyai.com/v2/upload', audioFile, {
    headers: { 'authorization': apiKey },
  });
  return response.data.upload_url;
}

// Request transcription from AssemblyAI
async function requestTranscription(audioUrl) {
  const response = await axios.post(
    'https://api.assemblyai.com/v2/transcript',
    { audio_url: audioUrl },
    { headers: { 'authorization': apiKey } }
  );
  return response.data.id;
}

// Get the transcription result (once ready)
async function getTranscriptionResult(transcriptId) {
  let response;
  while (true) {
    response = await axios.get(`https://api.assemblyai.com/v2/transcript/${transcriptId}`, {
      headers: { 'authorization': apiKey }
    });

    if (response.data.status === 'completed') {
      return response.data;
    }

    if (response.data.status === 'failed') {
      throw new Error('Transcription failed.');
    }

    // Wait for 5 seconds before polling again
    await new Promise(resolve => setTimeout(resolve, 5000));
  }
}

// Convert transcription result to SRT format
function generateSRT(subtitles) {
  let srtContent = '';
  subtitles.forEach((subtitle, index) => {
    const startTime = formatTime(subtitle.start);
    const endTime = formatTime(subtitle.end);
    srtContent += `${index + 1}\n${startTime} --> ${endTime}\n${subtitle.text}\n\n`;
  });
  return srtContent;
}

// Format time into SRT format
function formatTime(seconds) {
  const date = new Date(0);
  date.setSeconds(seconds);
  return date.toISOString().substr(11, 8) + ',' + ('000' + date.getMilliseconds()).slice(-3);
}

async function generateSubtitles() {
  try {
    // Step 1: Upload audio
    const audioUrl = await uploadAudio();

    // Step 2: Request transcription
    const transcriptId = await requestTranscription(audioUrl);

    // Step 3: Get transcription result
    const result = await getTranscriptionResult(transcriptId);

    // Step 4: Convert to .srt format and save
    const srtContent = generateSRT(result.words);
    fs.writeFileSync('output.srt', srtContent, 'utf8');
    console.log("SRT file generated successfully!");
  } catch (error) {
    console.error('Error generating subtitles:', error);
  }
}

// Run the transcription and subtitle generation
module.exports = { generateSubtitles, formatTime, generateSRT, getTranscriptionResult, requestTranscription, uploadAudio };
