import { useState } from "react";

export default function AddRecipeForm({ onAddRecipe }) {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!title || !ingredients || !steps) {
      setError("All fields are required!");
      return;
    }

    if (ingredients.split(",").length < 2) {
      setError("Please add at least 2 ingredients (separated by commas).");
      return;
    }

    // If valid, create new recipe object
    const newRecipe = {
      id: Date.now(),
      title,
      summary: steps.substring(0, 60) + "...",
      image: "https://via.placeholder.com/300x200",
      ingredients: ingredients.split(",").map((ing) => ing.trim()),
      instructions: steps
        .split(".")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    onAddRecipe(newRecipe); // send data back to parent
    setTitle("");
    setIngredients("");
    setSteps("");
    setError("");
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Add a New Recipe</h2>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Recipe Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-orange-300"
            placeholder="e.g. Chocolate Cake"
          />
        </div>

        {/* Ingredients */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Ingredients
          </label>
          <textarea
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-orange-300"
            placeholder="Enter ingredients separated by commas"
            rows="3"
          ></textarea>
        </div>

        {/* Steps */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Preparation Steps
          </label>
          <textarea
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-orange-300"
            placeholder="Write steps, separated by periods."
            rows="4"
          ></textarea>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-orange-600 text-white font-semibold py-2 rounded-lg hover:bg-orange-700 transition"
        >
          Add Recipe
        </button>
      </form>
    </div>
  );
}
