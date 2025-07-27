import { useEffect } from "react";
import RecipeList from "./components/RecipeList";
import AddRecipeForm from "./components/AddRecipeForm";
import { useRecipeStore } from "./recipeStore";

function App() {
  const setRecipes = useRecipeStore((state) => state.setRecipes);
  const recipes = useRecipeStore((state) => state.recipes);

  // Initialize with some sample recipes on first load
  useEffect(() => {
    if (recipes.length === 0) {
      const sampleRecipes = [
        {
          id: 1,
          title: "Classic Chocolate Chip Cookies",
          description:
            "Delicious homemade chocolate chip cookies with a perfect chewy texture. Mix butter, sugars, eggs, and vanilla. Add flour, baking soda, and salt. Fold in chocolate chips. Bake at 375°F for 9-11 minutes until golden brown.",
          createdAt: new Date().toLocaleDateString(),
        },
        {
          id: 2,
          title: "Fresh Garden Salad",
          description:
            "A healthy and refreshing salad with mixed greens, cherry tomatoes, cucumbers, and carrots. Toss with olive oil, lemon juice, salt, and pepper. Perfect as a side dish or light meal.",
          createdAt: new Date().toLocaleDateString(),
        },
      ];
      setRecipes(sampleRecipes);
    }
  }, [setRecipes, recipes.length]);

  const appStyle = {
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
    fontFamily: "Arial, sans-serif",
  };

  const headerStyle = {
    backgroundColor: "#2c3e50",
    color: "white",
    padding: "2rem 1rem",
    textAlign: "center",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  const titleStyle = {
    margin: 0,
    fontSize: "2.5rem",
    fontWeight: "bold",
  };

  const subtitleStyle = {
    margin: "0.5rem 0 0 0",
    fontSize: "1.1rem",
    opacity: 0.9,
  };

  const mainStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "2rem 1rem",
  };

  const statsStyle = {
    textAlign: "center",
    margin: "1rem 0 2rem 0",
    padding: "1rem",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  return (
    <div style={appStyle}>
      <header style={headerStyle}>
        <h1 style={titleStyle}>Recipe Sharing App</h1>
        <p style={subtitleStyle}>
          Share and discover amazing recipes from around the world
        </p>
      </header>

      <main style={mainStyle}>
        <div style={statsStyle}>
          <p
            style={{
              margin: 0,
              fontSize: "1.1rem",
              color: "#555",
              fontWeight: "bold",
            }}
          >
            📚 Total Recipes: {recipes.length}
          </p>
        </div>

        <AddRecipeForm />

        <div
          style={{
            margin: "3rem 0 2rem 0",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              color: "#333",
              fontSize: "2rem",
              marginBottom: "0.5rem",
            }}
          >
            Recipe Collection
          </h2>
          <p
            style={{
              color: "#666",
              margin: 0,
              fontSize: "1rem",
            }}
          >
            Browse through our delicious recipe collection
          </p>
        </div>

        <RecipeList />
      </main>

      <footer
        style={{
          backgroundColor: "#2c3e50",
          color: "white",
          textAlign: "center",
          padding: "1rem",
          marginTop: "3rem",
        }}
      >
        <p style={{ margin: 0, fontSize: "0.9rem" }}>
          © 2025 Recipe Sharing App - Built with React & Zustand
        </p>
      </footer>
    </div>
  );
}

export default App;
