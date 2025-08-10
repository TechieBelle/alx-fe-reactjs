// src/services/githubService.js
export const searchUsers = async (query, minRepos) => {
  let searchQuery = query;

  // Add minRepos filter if provided
  if (minRepos) {
    searchQuery += ` repos:>=${minRepos}`;
  }

  const response = await fetch(
    `https://api.github.com/search/users?q=${encodeURIComponent(searchQuery)}`
  );

  const data = await response.json();

  if (data.items) {
    // Fetch extra details for each user (to get location, repos count, etc.)
    const usersWithDetails = await Promise.all(
      data.items.map(async (user) => {
        const userResponse = await fetch(user.url);
        return userResponse.json();
      })
    );
    return usersWithDetails;
  }

  return [];
};
