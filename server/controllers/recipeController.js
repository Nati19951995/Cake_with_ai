const { Configuration, OpenAIApi } = require('openai');
const Recipe = require('../models/Recipe');

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

const generateRecipe = async (req, res) => {
    const { ingredients } = req.body;

    try {
        const prompt = ` Give me recipe with the Ingredients: ${ingredients.join(", ")} Include how to make it  .`;
        const response = await openai.createCompletion({
            model: "gpt-3.5-turbo",
            prompt,
            max_tokens: 300
        });

        const recipeText = response.data.choices[0].text.trim();
        const newRecipe = new Recipe({
            name: 'Personal Recipe',
            ingredients,
            instructions: recipeText,
            imageUrl: 'https://example.com/cake-image.jpg' 
        });

        await newRecipe.save();
        res.json(newRecipe);
    } catch (error) {
        res.status(500).send("Error generating recipe");
    }
};

module.exports = { generateRecipe };
