import React from 'react';

const HomePage = () => {
    return (
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 min-h-screen flex flex-col items-center justify-center text-white">
            <h1 className="text-5xl font-bold mb-4">🍰 Welcome to Cake Recipes!</h1>
            <p className="text-lg text-center max-w-lg">
                Discover delicious cake recipes based on your ingredients. 
                Enter the ingredients you have and get the perfect recipe!
            </p>
            <button className="bg-white text-purple-600 px-6 py-3 rounded-lg mt-4 font-semibold shadow-md hover:bg-gray-200 transition">
                Get Started
            </button>
        </div>
    );
};

export default HomePage;
