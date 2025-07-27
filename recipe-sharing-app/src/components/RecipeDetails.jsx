import { useParams, useNavigate, Link } from "react-router-dom";
import { useRecipeStore } from "../recipeStore";
import EditRecipeForm from "./EditRecipeForm";
import DeleteRecipeButton from "./DeleteRecipeButton";
import { useState } from "react";

const RecipeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const recipe = useRecipeStore((state) => state.getRecipeById(id));
  const toggleFavorite = useRecipeStore((state) => state.toggleFavorite);
  const favorites = useRecipeStore((state) => state.favorites);

  const isFavorite = favorites.includes(parseInt(id));

  if (!recipe) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "3rem",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <h2 style={{ color: "#e74c3c", marginBottom: "1rem" }}>
          Recipe Not Found
        </h2>
        <p style={{ color: "#666", marginBottom: "2rem" }}>
          The recipe you're looking for doesn't exist or may have been deleted.
        </p>
        <Link
          to="/"
          style={{
            backgroundColor: "#3498db",
            color: "white",
            padding: "0.75rem 1.5rem",
            textDecoration: "none",
            borderRadius: "5px",
            display: "inline-block",
            transition: "background-color 0.3s ease",
          }}
        >
          ← Back to Recipes
        </Link>
      </div>
    );
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditComplete = () => {
    setIsEditing(false);
  };

  const handleDelete = () => {
    navigate("/");
  };

  const containerStyle = {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "2rem",
    backgroundColor: "white",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    position: "relative",
  };

  const headerStyle = {
    borderBottom: "2px solid #f0f0f0",
    paddingBottom: "1.5rem",
    marginBottom: "2rem",
  };

  const titleStyle = {
    fontSize: "2.5rem",
    color: "#2c3e50",
    marginBottom: "1rem",
    lineHeight: "1.2",
  };

  const metaInfoStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "1rem",
    marginBottom: "1rem",
  };

  const badgeStyle = {
    display: "inline-block",
    padding: "0.25rem 0.75rem",
    backgroundColor: "#e8f4f8",
    color: "#2c3e50",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "bold",
  };

  const actionButtonsStyle = {
    display: "flex",
    gap: "1rem",
    marginTop: "2rem",
    flexWrap: "wrap",
  };

  const buttonStyle = {
    padding: "0.75rem 1.5rem",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    transition: "all 0.3s ease",
  };

  const favoriteButtonStyle = {
    ...buttonStyle,
    backgroundColor: isFavorite ? "#e74c3c" : "#95a5a6",
    color: "white",
  };

  if (isEditing) {
    return (
      <div style={containerStyle}>
        <EditRecipeForm recipe={recipe} onEditComplete={handleEditComplete} />
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      {/* Navigation */}
      <div style={{ marginBottom: "2rem" }}>
        <Link
          to="/"
          style={{
            color: "#3498db",
            textDecoration: "none",
            fontSize: "1rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          ← Back to All Recipes
        </Link>
      </div>

      {/* Header */}
      <header style={headerStyle}>
        <h1 style={titleStyle}>{recipe.title}</h1>

        <div style={metaInfoStyle}>
          <div>
            <span style={badgeStyle}>ID: {recipe.id}</span>
            {recipe.createdAt && (
              <span style={{ ...badgeStyle, marginLeft: "0.5rem" }}>
                Created: {recipe.createdAt}
              </span>
            )}
            {recipe.updatedAt && (
              <span style={{ ...badgeStyle, marginLeft: "0.5rem" }}>
                Updated: {recipe.updatedAt}
              </span>
            )}
          </div>

          <button
            onClick={() => toggleFavorite(recipe.id)}
            style={favoriteButtonStyle}
            onMouseOver={(e) => {
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseOut={(e) => {
              e.target.style.transform = "scale(1)";
            }}
          >
            {isFavorite ? "❤️ Unfavorite" : "🤍 Favorite"}
          </button>
        </div>
      </header>

      {/* Content */}
      <div style={{ marginBottom: "2rem" }}>
        <h2
          style={{
            color: "#2c3e50",
            marginBottom: "1rem",
            fontSize: "1.5rem",
          }}
        >
          Description
        </h2>
        <div
          style={{
            fontSize: "1.1rem",
            lineHeight: "1.8",
            color: "#555",
            backgroundColor: "#f8f9fa",
            padding: "1.5rem",
            borderRadius: "8px",
            border: "1px solid #e9ecef",
          }}
        >
          {recipe.description.split("\n").map((paragraph, index) => (
            <p
              key={index}
              style={{ marginBottom: paragraph.trim() ? "1rem" : "0.5rem" }}
            >
              {paragraph || "\u00A0"}
            </p>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div style={actionButtonsStyle}>
        <button
          onClick={handleEdit}
          style={{
            ...buttonStyle,
            backgroundColor: "#f39c12",
            color: "white",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#e67e22")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#f39c12")}
        >
          ✏️ Edit Recipe
        </button>

        <DeleteRecipeButton
          recipeId={recipe.id}
          recipeName={recipe.title}
          onDelete={handleDelete}
        />

        <Link
          to={`/recipe/${recipe.id}/print`}
          style={{
            ...buttonStyle,
            backgroundColor: "#27ae60",
            color: "white",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#229954")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#27ae60")}
        >
          🖨️ Print Recipe
        </Link>
      </div>

      {/* Recipe Stats */}
      <div
        style={{
          marginTop: "3rem",
          padding: "1.5rem",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          border: "1px solid #e9ecef",
        }}
      >
        <h3
          style={{
            color: "#2c3e50",
            marginBottom: "1rem",
            fontSize: "1.2rem",
          }}
        >
          Recipe Information
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
          }}
        >
          <div>
            <strong>Recipe ID:</strong> {recipe.id}
          </div>
          <div>
            <strong>Status:</strong>{" "}
            {isFavorite ? "❤️ Favorited" : "📝 Regular"}
          </div>
          <div>
            <strong>Word Count:</strong> {recipe.description.split(" ").length}{" "}
            words
          </div>
          <div>
            <strong>Character Count:</strong> {recipe.description.length}{" "}
            characters
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
