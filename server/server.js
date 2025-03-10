require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ פתרון בעיית CORS
const corsOptions = {
    origin: ["https://cake-with-ai.vercel.app"], // ודא שזה ה-URL הנכון של האתר שלך
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Server is running!");
});

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

let recipes = [];

async function getCakeRecipe(ingredients) {
    const prompt = `Generate a cake recipe based on the following ingredients: ${ingredients.join(', ')}. 
    Respond in JSON format with the following structure:
    {
      "name": "Cake Name",
      "ingredients": [
        { "name": "Ingredient 1", "quantity": "Amount and unit" },
        { "name": "Ingredient 2", "quantity": "Amount and unit" }
      ],
      "instructions": [
        "Step 1 description",
        "Step 2 description",
        "Step 3 description"
      ],
      "servings": "Number of servings",
      "baking_time": "Time in minutes",
      "temperature": "Temperature in Celsius"
    }`;

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: prompt }],
                temperature: 0.7
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                    "Content-Type": "application/json"
                }
            }
        );

        return JSON.parse(response.data.choices[0].message.content);
    } catch (error) {
        console.error("Error fetching recipe:", error.response ? error.response.data : error.message);
        throw new Error("Failed to fetch recipe.");
    }
}

app.post('/get-recipe', async (req, res) => {
    const { ingredients } = req.body;
    
    if (!ingredients || !Array.isArray(ingredients) || ingredients.length === 0) {
        return res.status(400).json({ error: "Invalid ingredients list. Please provide an array of ingredients." });
    }

    try {
        const recipe = await getCakeRecipe(ingredients);

        const query = `
            INSERT INTO recipes (name, ingredients, instructions, servings, baking_time, temperature)
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
        `;
        const values = [recipe.name, recipe.ingredients, recipe.instructions, recipe.servings, recipe.baking_time, recipe.temperature];

        const result = await pool.query(query, values);
        res.json(result.rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while generating the recipe." });
    }
});

app.get('/recipes/search', async (req, res) => {
    const { name } = req.query;

    if (!name) {
        return res.status(400).json({ error: "Please provide a recipe name to search." });
    }

    try {
        const result = await pool.query(
            "SELECT * FROM recipes WHERE LOWER(name) LIKE LOWER($1);",
            [`%${name}%`]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "No matching recipes found." });
        }

        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error searching for recipes." });
    }
});

app.get('/recipes', async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM recipes;");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching recipes" });
    }
});

app.get('/recipes/:id', async (req, res) => {
    const recipeId = parseInt(req.params.id);
    try {
        const result = await pool.query("SELECT * FROM recipes WHERE id = $1;", [recipeId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Recipe not found" });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching recipe" });
    }
});

app.put('/recipes/:id', async (req, res) => {
    const recipeId = parseInt(req.params.id);
    const { name, ingredients, instructions, servings, baking_time, temperature } = req.body;

    try {
        const query = `
            UPDATE recipes
            SET name = $1, ingredients = $2, instructions = $3, servings = $4, baking_time = $5, temperature = $6
            WHERE id = $7 RETURNING *;
        `;
        const values = [name, ingredients, instructions, servings, baking_time, temperature, recipeId];

        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Recipe not found" });
        }
        res.json({ message: "Recipe updated successfully", recipe: result.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error updating recipe" });
    }
});

app.delete('/recipes/:id', async (req, res) => {
    const recipeId = parseInt(req.params.id);

    try {
        const result = await pool.query("DELETE FROM recipes WHERE id = $1 RETURNING *;", [recipeId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Recipe not found" });
        }
        res.json({ message: "Recipe deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error deleting recipe" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
