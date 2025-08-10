import React, { useState } from "react";
import { searchUsers, fetchUserData } from "../services/githubService";

const Search = ({ setUsers }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    // 1️⃣ Search users by query
    const results = await searchUsers(query);

    // 2️⃣ Fetch detailed info for each user
    const usersWithDetails = await Promise.all(
      results.map(async (user) => {
        const details = await fetchUserData(user.login);
        return {
          ...user,
          location: details.location || "Not available",
          html_url: details.html_url || "#",
        };
      })
    );

    setUsers(usersWithDetails);
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search GitHub users..."
        className="border px-3 py-2 rounded w-full"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Search
      </button>

      {query && <p>Searching for: {query}</p>}
    </form>
  );
};

export default Search;
