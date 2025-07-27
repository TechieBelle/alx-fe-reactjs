import React from "react";
import { useRecipeStore } from "../recipeStore";

const SearchBar = () => {
  const searchTerm = useRecipeStore((state) => state.searchTerm);
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);

  return (
    <div style={{ textAlign: "center", margin: "1rem 0" }}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search recipes by title..."
        style={{
          padding: "0.5rem 1rem",
          width: "300px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          outline: "none",
        }}
      />
    </div>
  );
};

export default SearchBar;
