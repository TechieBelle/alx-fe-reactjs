import React, { useState } from "react";
import { searchUsers } from "../services/githubService";

const Search = ({ setUsers }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    const results = await searchUsers(query);

    const usersWithDetails = results.map((user) => ({
      ...user,
      location: user.location || "Not available",
      html_url: user.html_url || "#", // ✅ ensure html_url is always present
    }));

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

      {/* Example output */}
      {query && <p>Searching for: {query}</p>}
    </form>
  );
};

export default Search;
