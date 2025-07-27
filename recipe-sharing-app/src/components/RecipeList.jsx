import { useRecipeStore } from "./recipeStore";

const RecipeList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      deleteRecipe(id);
    }
  };

  if (recipes.length === 0) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "2rem",
          color: "#666",
          fontSize: "1.1rem",
        }}
      >
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
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.15)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)";
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
            <h3
              style={{
                margin: 0,
                color: "#333",
                fontSize: "1.3rem",
                fontWeight: "bold",
              }}
            >
              {recipe.title}
            </h3>
            <button
              onClick={() => handleDelete(recipe.id)}
              style={{
                background: "none",
                border: "none",
                color: "#e74c3c",
                cursor: "pointer",
                fontSize: "1.2rem",
                padding: "0.25rem",
                borderRadius: "4px",
                transition: "background-color 0.2s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#fee")}
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = "transparent")
              }
              title="Delete recipe"
            >
              ✕
            </button>
          </div>
          <p
            style={{
              color: "#666",
              lineHeight: "1.6",
              margin: 0,
              fontSize: "0.95rem",
            }}
          >
            {recipe.description}
          </p>
          <div
            style={{
              marginTop: "1rem",
              fontSize: "0.8rem",
              color: "#999",
            }}
          >
            Recipe ID: {recipe.id}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
