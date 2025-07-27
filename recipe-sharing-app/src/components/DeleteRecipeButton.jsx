import { useState } from "react";
import { useRecipeStore } from "../recipeStore";

const DeleteRecipeButton = ({ recipeId, recipeName, onDelete }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    // Simulate API call delay
    setTimeout(() => {
      deleteRecipe(recipeId);
      setIsDeleting(false);
      setShowConfirm(false);
      if (onDelete) {
        onDelete();
      }
    }, 500);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  const buttonStyle = {
    padding: "0.75rem 1.5rem",
    border: "none",
    borderRadius: "5px",
    cursor: isDeleting ? "not-allowed" : "pointer",
    fontSize: "1rem",
    fontWeight: "bold",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    transition: "all 0.3s ease",
    backgroundColor: isDeleting ? "#bdc3c7" : "#e74c3c",
    color: "white",
    opacity: isDeleting ? 0.7 : 1,
  };

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
    padding: "1rem",
  };

  const modalStyle = {
    backgroundColor: "white",
    borderRadius: "10px",
    padding: "2rem",
    maxWidth: "500px",
    width: "100%",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
    position: "relative",
  };

  const modalHeaderStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    marginBottom: "1.5rem",
  };

  const iconStyle = {
    fontSize: "2rem",
    color: "#e74c3c",
  };

  const titleStyle = {
    fontSize: "1.5rem",
    color: "#2c3e50",
    margin: 0,
    fontWeight: "bold",
  };

  const messageStyle = {
    color: "#555",
    lineHeight: "1.6",
    marginBottom: "2rem",
    fontSize: "1rem",
  };

  const recipeNameStyle = {
    fontWeight: "bold",
    color: "#2c3e50",
    backgroundColor: "#f8f9fa",
    padding: "0.5rem 0.75rem",
    borderRadius: "4px",
    display: "inline-block",
    margin: "0.5rem 0",
  };

  const buttonContainerStyle = {
    display: "flex",
    gap: "1rem",
    justifyContent: "flex-end",
    flexWrap: "wrap",
  };

  const confirmButtonStyle = {
    padding: "0.75rem 1.5rem",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: isDeleting ? "not-allowed" : "pointer",
    transition: "all 0.3s ease",
    minWidth: "120px",
    backgroundColor: isDeleting ? "#bdc3c7" : "#e74c3c",
    color: "white",
    opacity: isDeleting ? 0.7 : 1,
  };

  const cancelButtonStyle = {
    padding: "0.75rem 1.5rem",
    border: "2px solid #95a5a6",
    borderRadius: "5px",
    fontSize: "1rem",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
    minWidth: "120px",
    backgroundColor: "white",
    color: "#95a5a6",
  };

  if (showConfirm) {
    return (
      <div style={overlayStyle} onClick={handleCancel}>
        <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
          <div style={modalHeaderStyle}>
            <span style={iconStyle}>⚠️</span>
            <h3 style={titleStyle}>Confirm Deletion</h3>
          </div>

          <div style={messageStyle}>
            <p>Are you sure you want to delete this recipe?</p>
            <div style={recipeNameStyle}>"{recipeName}"</div>
            <p
              style={{
                marginTop: "1rem",
                color: "#e74c3c",
                fontWeight: "bold",
              }}
            >
              This action cannot be undone. The recipe will be permanently
              removed from your collection.
            </p>
          </div>

          <div style={buttonContainerStyle}>
            <button
              onClick={handleCancel}
              disabled={isDeleting}
              style={cancelButtonStyle}
              onMouseOver={(e) => {
                if (!isDeleting) {
                  e.target.style.backgroundColor = "#95a5a6";
                  e.target.style.color = "white";
                }
              }}
              onMouseOut={(e) => {
                if (!isDeleting) {
                  e.target.style.backgroundColor = "white";
                  e.target.style.color = "#95a5a6";
                }
              }}
            >
              Cancel
            </button>

            <button
              onClick={handleDelete}
              disabled={isDeleting}
              style={confirmButtonStyle}
              onMouseOver={(e) => {
                if (!isDeleting) {
                  e.target.style.backgroundColor = "#c0392b";
                }
              }}
              onMouseOut={(e) => {
                if (!isDeleting) {
                  e.target.style.backgroundColor = "#e74c3c";
                }
              }}
            >
              {isDeleting ? "🗑️ Deleting..." : "🗑️ Delete Recipe"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      disabled={isDeleting}
      style={buttonStyle}
      onMouseOver={(e) => {
        if (!isDeleting) {
          e.target.style.backgroundColor = "#c0392b";
          e.target.style.transform = "translateY(-1px)";
        }
      }}
      onMouseOut={(e) => {
        if (!isDeleting) {
          e.target.style.backgroundColor = "#e74c3c";
          e.target.style.transform = "translateY(0)";
        }
      }}
    >
      {isDeleting ? "🗑️ Deleting..." : "🗑️ Delete Recipe"}
    </button>
  );
};

export default DeleteRecipeButton;
