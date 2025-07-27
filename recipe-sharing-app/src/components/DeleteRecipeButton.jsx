import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecipeStore } from "../recipeStore";

const DeleteRecipeButton = ({ recipeId, recipeName, onDelete }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    setIsDeleting(true);

    setTimeout(() => {
      deleteRecipe(recipeId);
      setIsDeleting(false);
      setShowConfirm(false);

      if (onDelete) {
        onDelete();
      }

      navigate("/"); // Redirect after deletion
    }, 500);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  if (showConfirm) {
    return (
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          padding: "2rem",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "10px",
            maxWidth: "400px",
            textAlign: "center",
          }}
        >
          <h3>⚠️ Confirm Deletion</h3>
          <p>Are you sure you want to delete:</p>
          <strong>"{recipeName}"</strong>
          <p style={{ color: "red" }}>This action cannot be undone.</p>

          <div style={{ marginTop: "1rem" }}>
            <button
              onClick={handleCancel}
              disabled={isDeleting}
              style={{ marginRight: "1rem" }}
            >
              Cancel
            </button>
            <button onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button onClick={() => setShowConfirm(true)} disabled={isDeleting}>
      {isDeleting ? "Deleting..." : "🗑️ Delete Recipe"}
    </button>
  );
};

export default DeleteRecipeButton;
