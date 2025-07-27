import { create } from "zustand";

const useRecipeStore = create((set, get) => ({
  recipes: [],
  favorites: [],
  searchTerm: "",

  // Action to add a new recipe
  addRecipe: (newRecipe) =>
    set((state) => ({
      recipes: [...state.recipes, newRecipe],
    })),

  // Action to set recipes (for initialization or bulk updates)
  setRecipes: (recipes) => set({ recipes }),

  // Action to update an existing recipe
  updateRecipe: (updatedRecipe) =>
    set((state) => ({
      recipes: state.recipes.map((recipe) =>
        recipe.id === updatedRecipe.id
          ? { ...updatedRecipe, updatedAt: new Date().toLocaleDateString() }
          : recipe
      ),
    })),

  // Action to delete a recipe
  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
      favorites: state.favorites.filter((favId) => favId !== id),
    })),

  // Action to get a single recipe by ID
  getRecipeById: (id) => {
    const state = get();
    return state.recipes.find((recipe) => recipe.id === parseInt(id));
  },

  // Action to toggle favorite status
  toggleFavorite: (id) =>
    set((state) => {
      const isFavorite = state.favorites.includes(id);
      return {
        favorites: isFavorite
          ? state.favorites.filter((favId) => favId !== id)
          : [...state.favorites, id],
      };
    }),

  // Action to set search term
  setSearchTerm: (term) => set({ searchTerm: term }),

  // Computed getter for filtered recipes
  getFilteredRecipes: () => {
    const state = get();
    if (!state.searchTerm) return state.recipes;
    return state.recipes.filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        recipe.description
          .toLowerCase()
          .includes(state.searchTerm.toLowerCase())
    );
  },
}));

export { useRecipeStore };
