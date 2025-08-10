// src/services/githubService.js
export const searchUsers = async (query) => {
  const response = await fetch(
    `https://api.github.com/search/users?q=${query}`
  );
  const data = await response.json();

  // Fetch details for each user to get location
  const detailedUsers = await Promise.all(
    data.items.map(async (user) => {
      const userResponse = await fetch(user.url);
      const userData = await userResponse.json();
      return { ...user, location: userData.location };
    })
  );

  return detailedUsers;
};
