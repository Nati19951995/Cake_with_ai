const OpenAI = require("openai");
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function testQuota() {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: "h" }],
      max_tokens: 5
    });
    console.log(response.choices[0].message.content);
  } catch (error) {
    console.error("Error fetching recipe:", error.response ? error.response.data : error.message);
  }
}

testQuota();
