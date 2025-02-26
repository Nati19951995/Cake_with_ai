const OpenAI = require("openai");
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function listModels() {
  try {
    const response = await openai.models.list();
    console.log(" :");
    response.data.forEach(model => {
      console.log(model.id);
    });
  } catch (error) {
    console.error("  :", error.response ? error.response.data : error.message);
  }
}

listModels();