import { useState } from "react";
import { useRecipeStore } from "../recipeStore";

const EditRecipeForm = ({ recipe, onEditComplete }) => {
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.trim().length < 3) {
      newErrors.title = "Title must be at least 3 characters long";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
    } else if (description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters long";
    }

    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    // Simulate API call delay
    setTimeout(() => {
      const updatedRecipe = {
        ...recipe,
        title: title.trim(),
        description: description.trim(),
        updatedAt: new Date().toLocaleDateString(),
      };

      updateRecipe(updatedRecipe);
      setIsSubmitting(false);
      onEditComplete();
    }, 500);
  };

  const handleCancel = () => {
    setTitle(recipe.title);
    setDescription(recipe.description);
    setErrors({});
    onEditComplete();
  };

  const formStyle = {
    backgroundColor: "white",
    padding: "0",
    borderRadius: "8px",
  };

  const headerStyle = {
    marginBottom: "2rem",
    paddingBottom: "1rem",
    borderBottom: "2px solid #f0f0f0",
  };

  const titleStyle = {
    fontSize: "2rem",
    color: "#2c3e50",
    marginBottom: "0.5rem",
  };

  const subtitleStyle = {
    color: "#666",
    fontSize: "1rem",
    margin: 0,
  };

  const fieldStyle = {
    marginBottom: "1.5rem",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "0.5rem",
    fontWeight: "bold",
    color: "#555",
    fontSize: "1rem",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem",
    border: "2px solid #e0e0e0",
    borderRadius: "5px",
    fontSize: "1rem",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
    boxSizing: "border-box",
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: "150px",
    resize: "vertical",
    fontFamily: "inherit",
    lineHeight: "1.5",
  };

  const errorStyle = {
    color: "#e74c3c",
    fontSize: "0.9rem",
    marginTop: "0.25rem",
    fontWeight: "bold",
  };

  const buttonContainerStyle = {
    display: "flex",
    gap: "1rem",
    marginTop: "2rem",
    flexWrap: "wrap",
  };

  const buttonStyle = {
    padding: "0.75rem 1.5rem",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.3s ease",
    minWidth: "120px",
  };

  const primaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: isSubmitting ? "#bdc3c7" : "#27ae60",
    color: "white",
  };

  const secondaryButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#95a5a6",
    color: "white",
  };

  const characterCountStyle = {
    fontSize: "0.85rem",
    color: "#666",
    textAlign: "right",
    marginTop: "0.25rem",
  };

  return (
    <div style={formStyle}>
      <div style={headerStyle}>
        <h2 style={titleStyle}>Edit Recipe</h2>
        <p style={subtitleStyle}>
          Make changes to your recipe and save them below
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={fieldStyle}>
          <label htmlFor="edit-title" style={labelStyle}>
            Recipe Title *
          </label>
          <input
            id="edit-title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) {
                setErrors((prev) => ({ ...prev, title: "" }));
              }
            }}
            style={{
              ...inputStyle,
              borderColor: errors.title ? "#e74c3c" : "#e0e0e0",
            }}
            onFocus={(e) => {
              if (!errors.title) {
                e.target.style.borderColor = "#3498db";
                e.target.style.boxShadow = "0 0 0 3px rgba(52, 152, 219, 0.1)";
              }
            }}
            onBlur={(e) => {
              if (!errors.title) {
                e.target.style.borderColor = "#e0e0e0";
                e.target.style.boxShadow = "none";
              }
            }}
            disabled={isSubmitting}
            maxLength={100}
            placeholder="Enter a descriptive title for your recipe"
          />
          {errors.title && <div style={errorStyle}>{errors.title}</div>}
          <div style={characterCountStyle}>{title.length}/100 characters</div>
        </div>

        <div style={fieldStyle}>
          <label htmlFor="edit-description" style={labelStyle}>
            Recipe Description *
          </label>
          <textarea
            id="edit-description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (errors.description) {
                setErrors((prev) => ({ ...prev, description: "" }));
              }
            }}
            style={{
              ...textareaStyle,
              borderColor: errors.description ? "#e74c3c" : "#e0e0e0",
            }}
            onFocus={(e) => {
              if (!errors.description) {
                e.target.style.borderColor = "#3498db";
                e.target.style.boxShadow = "0 0 0 3px rgba(52, 152, 219, 0.1)";
              }
            }}
            onBlur={(e) => {
              if (!errors.description) {
                e.target.style.borderColor = "#e0e0e0";
                e.target.style.boxShadow = "none";
              }
            }}
            disabled={isSubmitting}
            maxLength={1000}
            placeholder="Describe your recipe, including ingredients, instructions, and any helpful tips..."
          />
          {errors.description && (
            <div style={errorStyle}>{errors.description}</div>
          )}
          <div style={characterCountStyle}>
            {description.length}/1000 characters
          </div>
        </div>

        <div style={buttonContainerStyle}>
          <button
            type="submit"
            disabled={isSubmitting}
            style={primaryButtonStyle}
            onMouseOver={(e) => {
              if (!isSubmitting) {
                e.target.style.backgroundColor = "#229954";
                e.target.style.transform = "translateY(-1px)";
              }
            }}
            onMouseOut={(e) => {
              if (!isSubmitting) {
                e.target.style.backgroundColor = "#27ae60";
                e.target.style.transform = "translateY(0)";
              }
            }}
          >
            {isSubmitting ? "💾 Saving..." : "💾 Save Changes"}
          </button>

          <button
            type="button"
            onClick={handleCancel}
            disabled={isSubmitting}
            style={secondaryButtonStyle}
            onMouseOver={(e) => {
              if (!isSubmitting) {
                e.target.style.backgroundColor = "#7f8c8d";
                e.target.style.transform = "translateY(-1px)";
              }
            }}
            onMouseOut={(e) => {
              if (!isSubmitting) {
                e.target.style.backgroundColor = "#95a5a6";
                e.target.style.transform = "translateY(0)";
              }
            }}
          >
            ❌ Cancel
          </button>
        </div>
      </form>

      {/* Help Text */}
      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          backgroundColor: "#f8f9fa",
          borderRadius: "5px",
          border: "1px solid #e9ecef",
        }}
      >
        <h4
          style={{
            color: "#2c3e50",
            marginBottom: "0.5rem",
            fontSize: "1rem",
          }}
        >
          💡 Tips for editing:
        </h4>
        <ul
          style={{
            color: "#666",
            fontSize: "0.9rem",
            marginBottom: 0,
            paddingLeft: "1.2rem",
          }}
        >
          <li>Make your title descriptive and engaging</li>
          <li>Include ingredients, cooking steps, and serving suggestions</li>
          <li>Add cooking times and difficulty level if helpful</li>
          <li>
            Your changes will be saved immediately after clicking "Save Changes"
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EditRecipeForm;
