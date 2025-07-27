import { useEffect } from "react";
import { useRecipeStore } from "../recipeStore";

const RecommendationsList = () => {
  const recommendations = useRecipeStore((state) => state.recommendations);
  const generateRecommendations = useRecipeStore(
    (state) => state.generateRecommendations
  );

  useEffect(() => {
    generateRecommendations();
  }, [generateRecommendations]);

  if (recommendations.length === 0) {
    return (
      <p style={{ color: "#666" }}>
        No recommendations yet. Favorite some recipes first!
      </p>
    );
  }

  return (
    <div style={{ marginTop: "2rem" }}>
      <h2 style={{ color: "#2c3e50" }}>Recommended for You 🔥</h2>
      {recommendations.map((recipe) => (
        <div key={recipe.id} style={{ marginBottom: "1rem" }}>
          <h3>{recipe.title}</h3>
          <p style={{ color: "#555" }}>{recipe.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RecommendationsList;
