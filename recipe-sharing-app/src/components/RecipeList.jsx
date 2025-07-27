import { Link } from "react-router-dom";
import { useRecipeStore } from "../recipeStore";

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const favorites = useRecipeStore((state) => state.favorites);
  const addFavorite = useRecipeStore((state) => state.addFavorite);
  const removeFavorite = useRecipeStore((state) => state.removeFavorite);
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      deleteRecipe(id);
    }
  };

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  };

  if (recipes.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "2rem", color: "#666" }}>
        <p>No recipes available. Add your first recipe!</p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gap: "1.5rem",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        padding: "1rem",
      }}
    >
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          style={{
            backgroundColor: "white",
            border: "1px solid #e0e0e0",
            borderRadius: "8px",
            padding: "1.5rem",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "1rem",
            }}
          >
            <Link
              to={`/recipe/${recipe.id}`}
              style={{
                textDecoration: "none",
                color: "#3498db",
                fontWeight: "bold",
                fontSize: "1.3rem",
              }}
            >
              {recipe.title}
            </Link>

            <div>
              {/* Favorite Button */}
              <button
                onClick={() => toggleFavorite(recipe.id)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  color: favorites.includes(recipe.id) ? "#e74c3c" : "#ccc",
                  marginRight: "0.5rem",
                }}
                title="Add to favorites"
              >
                ❤️
              </button>

              {/* Delete Button */}
              <button
                onClick={() => handleDelete(recipe.id)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#e74c3c",
                  cursor: "pointer",
                  fontSize: "1.2rem",
                }}
              >
                ✕
              </button>
            </div>
          </div>

          <p style={{ color: "#666", fontSize: "0.95rem" }}>
            {recipe.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
