const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: './src/secret.env' });

// Function to encode an image to base64
function encodeImageToBase64(imagePath = path.join(__dirname, 'your-image.jpg')) {
  const image = fs.readFileSync(imagePath);
  return image.toString('base64');
}

// Function to analyze the image using Groq API
async function analyzeImage(imagePath = path.join(__dirname, 'your-image.jpg')) {
  /**
   * @param {string} imagePath - The path to the image file.
   * @description Analyzes an image using Groq API.
   * @example Example Usage
   * // Import the module
   * const { analyzeImage } = require('api-plugin-path/src/image/analyzer');
   * 
   * // Path to your local image file
   * const imagePath = path.join(__dirname, 'your-image.jpg');
   * 
   * // Analyze the image
   * analyzeImage(imagePath);
   * @example
  */
  const apiKey = process.env.GROQ_API_KEY;
  const modelId = 'llama-3.2-11b-vision-preview'; // Model ID for image analysis

  // Encode the image to base64
  const base64Image = encodeImageToBase64(imagePath);

  // Prepare the request payload
  const payload = {
    model: modelId,
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: "Describe the content of this image." },
          { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${base64Image}` } }
        ]
      }
    ],
    temperature: 1,
    max_completion_tokens: 1024,
    top_p: 1,
    stream: false,
    stop: null
  };

  try {
    // Send the request to Groq API
    const response = await axios.post('https://api.groq.com/openai/v1/chat/completions', payload, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    // Output the description provided by the model
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('Error analyzing image:', error.response ? error.response.data : error.message);
  }
}

module.exports = { analyzeImage, encodeImageToBase64 };