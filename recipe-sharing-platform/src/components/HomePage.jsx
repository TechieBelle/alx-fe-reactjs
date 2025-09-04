import { useState, useEffect } from "react";
import NavBar from "./NavBar";
import Hero from "./Hero";
import AddRecipeForm from "./AddRecipeForm";

function HomePage() {
  const [recipes, setRecipes] = useState([]);

  // Load recipes from mock JSON
  useEffect(() => {
    fetch("/src/data.json")
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error("Error loading recipes:", err));
  }, []);

  // Handle adding a new recipe
  const handleAddRecipe = (newRecipe) => {
    setRecipes((prev) => [newRecipe, ...prev]); // add new recipe at top
  };

  return (
    <div>
      <NavBar />
      <Hero />

      {/* Add Recipe Form */}
      <AddRecipeForm onAddRecipe={handleAddRecipe} />

      {/* Recipe List */}
      <div className="p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          🍳 Recipe Sharing Platform
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform transform hover:scale-105"
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
                <p className="text-gray-600">{recipe.summary}</p>
                <a
                  href={`/recipe/${recipe.id}`}
                  className="mt-3 inline-block text-orange-500 hover:text-orange-700"
                >
                  View Recipe →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
