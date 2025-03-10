import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = "https://cake-recipe-api.onrender.com";

const IngredientsForm = () => {
    const [ingredients, setIngredients] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/api/recipes/generate`, {
                ingredients: ingredients.split(", ")
            });
            setMessage("Recipe created!!");
        } catch (error) {
            setMessage("Error created the recipe");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="my-4">
            <input
                type="text"
                placeholder="Ingredient have"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                className="border p-2 w-full"
            />
            <button type="submit" className="bg-blue-500 text-white p-2 mt-2 w-full rounded">create Recipe</button>
            {message && <p className="mt-2">{message}</p>}
        </form>
    );
};

export default IngredientsForm;
