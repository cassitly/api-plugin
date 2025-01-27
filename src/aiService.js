// Default
const Groq = require("groq-sdk");
const fs = require("fs");
require('dotenv').config({ path: './src/secret.env' });

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function getResponse(userMessage) {
  try {
    const completion = await groq.chat.completions
    .create({
      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
      model: "llama3-8b-8192",
    })
    .then((chatCompletion) => {
      console.log(chatCompletion.choices[0]?.message?.content || "");
    });

    return completion.choices[0]?.message?.content || "" + "\n";
  } catch (error) {
    console.error('Error with AI service:', error);
  }
}
const rect = getResponse(`Hi`);
rect

module.exports = { getResponse };