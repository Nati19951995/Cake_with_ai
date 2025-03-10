import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = "https://cake-recipe-api.onrender.com";

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        axios.get(`${API_BASE_URL}/api/recipes`)
            .then(response => setRecipes(response.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="my-4">
            {recipes.map((recipe, index) => (
                <div key={index} className="border p-4 my-2 rounded-lg shadow-sm">
                    <h2 className="text-xl font-bold">{recipe.name}</h2>
                    <img src={recipe.imageUrl} alt="Cake" className="rounded-md my-2" />
                    <p>{recipe.instructions}</p>
                </div>
            ))}
        </div>
    );
};

export default RecipeList;
