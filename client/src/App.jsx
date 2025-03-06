import React from 'react';
import HomePage from './components/HomePage';
import IngredientsForm from './components/IngredientsForm';
import RecipeList from './components/RecipeList';
import RecipeDisplay from './components/RecipeDisplay';

const App = () => {
    return (
        <div className="container mx-auto p-4">
            <HomePage />
            <IngredientsForm />
            <RecipeList />
        </div>
    );
};

export default App;
