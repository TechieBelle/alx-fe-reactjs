import { useRecipeStore } from "../recipeStore";

const FavoritesList = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const favorites = useRecipeStore((state) => state.favorites);

  const favoriteRecipes = recipes.filter((recipe) =>
    favorites.includes(recipe.id)
  );

  if (favoriteRecipes.length === 0) {
    return (
      <p style={{ color: "#666" }}>You haven’t favorited any recipes yet.</p>
    );
  }

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2 style={{ color: "#2c3e50" }}>My Favorites ❤️</h2>
      {favoriteRecipes.map((recipe) => (
        <div key={recipe.id} style={{ marginBottom: "1rem" }}>
          <h3>{recipe.title}</h3>
          <p style={{ color: "#555" }}>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FavoritesList;
