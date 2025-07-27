import { useState } from "react";
import { useRecipeStore } from "../recipeStore";

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore((state) => state.addRecipe);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic validation
    if (!title.trim() || !description.trim()) {
      alert("Please fill in both title and description");
      return;
    }

    setIsSubmitting(true);

    // Simulate a brief loading state
    setTimeout(() => {
      addRecipe({
        id: Date.now(),
        title: title.trim(),
        description: description.trim(),
        createdAt: new Date().toLocaleDateString(),
      });

      setTitle("");
      setDescription("");
      setIsSubmitting(false);
    }, 300);
  };

  const formStyle = {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    margin: "1rem",
    maxWidth: "500px",
    marginLeft: "auto",
    marginRight: "auto",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    border: "2px solid #e0e0e0",
    borderRadius: "4px",
    fontSize: "1rem",
    marginBottom: "1rem",
    transition: "border-color 0.3s ease",
    boxSizing: "border-box",
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: "100px",
    resize: "vertical",
    fontFamily: "inherit",
  };

  const buttonStyle = {
    backgroundColor: isSubmitting ? "#bdc3c7" : "#3498db",
    color: "white",
    border: "none",
    padding: "0.75rem 1.5rem",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: isSubmitting ? "not-allowed" : "pointer",
    transition: "background-color 0.3s ease",
    width: "100%",
    fontWeight: "bold",
  };

  return (
    <div style={formStyle}>
      <h2
        style={{
          textAlign: "center",
          marginBottom: "1.5rem",
          color: "#333",
          fontSize: "1.5rem",
        }}
      >
        Add New Recipe
      </h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
              color: "#555",
            }}
          >
            Recipe Title *
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter recipe title..."
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#3498db")}
            onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
            disabled={isSubmitting}
            maxLength={100}
          />
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: "0.5rem",
              fontWeight: "bold",
              color: "#555",
            }}
          >
            Description *
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your recipe, ingredients, and cooking instructions..."
            style={textareaStyle}
            onFocus={(e) => (e.target.style.borderColor = "#3498db")}
            onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
            disabled={isSubmitting}
            maxLength={500}
          />
          <div
            style={{
              fontSize: "0.8rem",
              color: "#999",
              textAlign: "right",
              marginTop: "-0.5rem",
              marginBottom: "1rem",
            }}
          >
            {description.length}/500 characters
          </div>
        </div>

        <button
          type="submit"
          style={buttonStyle}
          disabled={isSubmitting}
          onMouseOver={(e) => {
            if (!isSubmitting) {
              e.target.style.backgroundColor = "#2980b9";
            }
          }}
          onMouseOut={(e) => {
            if (!isSubmitting) {
              e.target.style.backgroundColor = "#3498db";
            }
          }}
        >
          {isSubmitting ? "Adding Recipe..." : "Add Recipe"}
        </button>
      </form>

      <p
        style={{
          fontSize: "0.85rem",
          color: "#666",
          textAlign: "center",
          marginTop: "1rem",
          marginBottom: 0,
        }}
      >
        * Required fields
      </p>
    </div>
  );
};

export default AddRecipeForm;
