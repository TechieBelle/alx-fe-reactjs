import React, { useState } from "react";
import { searchUsers } from "../services/githubService";

const Search = ({ setUsers }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    const results = await searchUsers(query);
    // Ensure we safely include location (in case it's missing)
    const usersWithLocation = results.map((user) => ({
      ...user,
      location: user.location || "Not available",
    }));

    setUsers(usersWithLocation);
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
     <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
       Search
     </button>

     {/* Example: show the query if it exists */}
     {query && <p>Searching for: {query}</p>}
   </form>
 );

};

export default Search;
