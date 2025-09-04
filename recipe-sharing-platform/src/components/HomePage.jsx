import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // ✅ import Link
import NavBar from "./NavBar";  
import Hero from "./Hero";

function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch("/src/data.json")
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.error("Error loading recipes:", err));
  }, []);

  return (
    <div>
      <NavBar />
      <Hero />
      <div className="p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          🍳 Recipe Sharing Platform
        </h1>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                {/* ✅ Use Link instead of <a> */}
                <Link
                  to={`/recipe/${recipe.id}`}
                  className="mt-3 inline-block text-blue-500 hover:text-blue-700"
                >
                  View Recipe →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
