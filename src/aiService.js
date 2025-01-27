// Default
const Groq = require("groq-sdk");
require('dotenv').config({ path: './src/secret.env' });

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

module.exports = async function getResponse(userMessage) {
  try {
    const completions = await groq.chat.completions
    .create({
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
      model: "llama3-8b-8192",
    })

    return completions.choices[0]?.message?.content || "";
  } catch (error) {
    console.error('Error with AI service:', error);
  }
}