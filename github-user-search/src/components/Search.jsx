import React, { useState } from "react";

export default function GitHubUserSearch() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const perPage = 10; // results per page

  const fetchUsers = async (searchQuery, pageNumber) => {
    if (!searchQuery.trim()) return;
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.github.com/search/users?q=${searchQuery}&per_page=${perPage}&page=${pageNumber}`
      );
      const data = await response.json();
      setUsers(data.items || []);
      setTotalCount(data.total_count || 0);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPage(1);
    fetchUsers(query, 1);
  };

  const handleNext = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchUsers(query, nextPage);
  };

  const handlePrev = () => {
    if (page > 1) {
      const prevPage = page - 1;
      setPage(prevPage);
      fetchUsers(query, prevPage);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">
        GitHub User Search
      </h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search GitHub users..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          <ul>
            {users.map((user) => (
              <li key={user.id} className="p-2 border-b">
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {user.login}
                </a>
              </li>
            ))}
          </ul>

          {users.length > 0 && (
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={handlePrev}
                disabled={page === 1}
                className={`px-4 py-2 rounded ${
                  page === 1
                    ? "bg-gray-300"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Previous
              </button>
              <span>
                Page {page} of {Math.ceil(totalCount / perPage)}
              </span>
              <button
                onClick={handleNext}
                disabled={page >= Math.ceil(totalCount / perPage)}
                className={`px-4 py-2 rounded ${
                  page >= Math.ceil(totalCount / perPage)
                    ? "bg-gray-300"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
