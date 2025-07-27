import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import RecipeList from "./components/RecipeList";
import AddRecipeForm from "./components/AddRecipeForm";
import RecipeDetails from "./components/RecipeDetails";
import SearchBar from "./components/SearchBar";
import { useRecipeStore } from "./recipeStore";



// Home Page Component
const HomePage = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const searchTerm = useRecipeStore((state) => state.searchTerm);
  const filteredRecipes = useRecipeStore((state) => state.getFilteredRecipes());
  const favorites = useRecipeStore((state) => state.favorites);

  const statsStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1rem",
    margin: "2rem 1rem",
    textAlign: "center",
  };

  const statCardStyle = {
    backgroundColor: "white",
    padding: "1.5rem",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    border: "1px solid #e0e0e0",
  };

  const statNumberStyle = {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#3498db",
    display: "block",
  };

  const statLabelStyle = {
    color: "#666",
    fontSize: "0.9rem",
    marginTop: "0.5rem",
  };

  return (
    <>
      <div style={statsStyle}>
        <div style={statCardStyle}>
          <span style={statNumberStyle}>📚 {recipes.length}</span>
          <div style={statLabelStyle}>Total Recipes</div>
        </div>
        <div style={statCardStyle}>
          <span style={statNumberStyle}>❤️ {favorites.length}</span>
          <div style={statLabelStyle}>Favorites</div>
        </div>
        <div style={statCardStyle}>
          <span style={statNumberStyle}>
            🔍 {searchTerm ? filteredRecipes.length : recipes.length}
          </span>
          <div style={statLabelStyle}>
            {searchTerm ? "Search Results" : "Available Recipes"}
          </div>
        </div>
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

      <SearchBar />
      <RecipeList />
    </>
  );
};

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
            "Delicious homemade chocolate chip cookies with a perfect chewy texture. Mix butter, sugars, eggs, and vanilla. Add flour, baking soda, and salt. Fold in chocolate chips. Bake at 375°F for 9-11 minutes until golden brown.\n\nIngredients:\n- 2¼ cups all-purpose flour\n- 1 tsp baking soda\n- 1 tsp salt\n- 1 cup butter, softened\n- ¾ cup granulated sugar\n- ¾ cup brown sugar\n- 2 large eggs\n- 2 tsp vanilla extract\n- 2 cups chocolate chips",
          createdAt: new Date().toLocaleDateString(),
        },
        {
          id: 2,
          title: "Fresh Garden Salad",
          description:
            "A healthy and refreshing salad with mixed greens, cherry tomatoes, cucumbers, and carrots. Toss with olive oil, lemon juice, salt, and pepper. Perfect as a side dish or light meal.\n\nIngredients:\n- 4 cups mixed greens\n- 1 cup cherry tomatoes, halved\n- 1 cucumber, sliced\n- 2 carrots, julienned\n- 3 tbsp olive oil\n- 2 tbsp lemon juice\n- Salt and pepper to taste",
          createdAt: new Date().toLocaleDateString(),
        },
        {
          id: 3,
          title: "Homemade Pizza Margherita",
          description:
            "Authentic Italian pizza with fresh tomato sauce, mozzarella, and basil. The perfect comfort food that's surprisingly easy to make at home.\n\nIngredients:\n- 1 pizza dough ball\n- ½ cup pizza sauce\n- 8 oz fresh mozzarella, sliced\n- Fresh basil leaves\n- 2 tbsp olive oil\n- Salt to taste\n\nInstructions: Roll out dough, spread sauce, add cheese, bake at 475°F for 12-15 minutes.",
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

  const footerStyle = {
    backgroundColor: "#2c3e50",
    color: "white",
    textAlign: "center",
    padding: "1rem",
    marginTop: "3rem",
  };

  return (
    <BrowserRouter>
      <div style={appStyle}>
        <header style={headerStyle}>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <h1 style={titleStyle}>Recipe Sharing App</h1>
            <p style={subtitleStyle}>
              Share and discover amazing recipes from around the world
            </p>
          </Link>
        </header>

        <main style={mainStyle}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipe/:id" element={<RecipeDetails />} />
          </Routes>
        </main>

        <footer style={footerStyle}>
          <p style={{ margin: 0, fontSize: "0.9rem" }}>
            © 2025 Recipe Sharing App - Built with React & Zustand
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
