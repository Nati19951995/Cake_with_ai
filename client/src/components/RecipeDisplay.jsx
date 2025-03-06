import React, { useState } from 'react';

const RecipeDisplay = ({ recipe }) => {
    const [savedRecipes, setSavedRecipes] = useState([]);

    if (!recipe) return null;

    const saveRecipe = () => {
        setSavedRecipes([...savedRecipes, recipe]);
        alert("Recipe saved!");
    };

    return (
        <div className="p-4 mt-4 shadow-lg rounded-xl bg-white">
            <h2 className="text-2xl font-bold mb-2">{recipe.name}</h2>
            <h3 className="text-xl font-semibold mt-2">Ingredients:</h3>
            <ul className="list-disc ml-5">
                {recipe.ingredients.map((item, index) => (
                    <li key={index}>{item.name}: {item.quantity}</li>
                ))}
            </ul>
            <h3 className="text-xl font-semibold mt-4">Instructions:</h3>
            <ol className="list-decimal ml-5">
                {recipe.instructions.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ol>
            <p className="mt-4"><strong>Servings:</strong> {recipe.servings}</p>
            <p><strong>Baking Time:</strong> {recipe.baking_time}</p>
            <p><strong>Temperature:</strong> {recipe.temperature}</p>

            <button onClick={saveRecipe} className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded">
                Save Recipe
            </button>
        </div>
    );
};

export default RecipeDisplay;
