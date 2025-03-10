import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = "https://cake-recipe-api.onrender.com"; // ודא שזה ה-URL של ה-Backend שלך

const IngredientsForm = () => {
    const [ingredients, setIngredients] =  useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("✅ Create Recipe button clicked!"); // בדיקת לחיצה על הכפתור

        try {
            const response = await axios.post(`${API_BASE_URL}/api/recipes/generate`, {
                ingredients: ingredients.split(", ")
            });

            console.log("✅ API Response:", response.data); // הדפסת תשובת ה-API ל-Console
            setMessage(response.data.message || "🎉 Recipe created successfully!");
        } catch (error) {
            console.error("❌ Error sending request:", error);
            setMessage("❌ Error creating the recipe. Please try again.");
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-4">Create Your Recipe</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Enter ingredients (comma-separated)"
                    value={ingredients}
                    onChange={(e) => setIngredients(e.target.value)}
                    className="border p-2 w-full rounded-md"
                />
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 w-full rounded-md hover:bg-blue-600 transition"
                >
                    Create Recipe
                </button>
            </form>
            {message && <p className="mt-4 text-center font-semibold">{message}</p>}
        </div>
    );
};

export default IngredientsForm;
