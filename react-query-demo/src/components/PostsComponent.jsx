import React from "react";
import { useQuery } from "@tanstack/react-query";

// Function to fetch posts
const fetchPosts = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

const PostsComponent = () => {
  const { data, error, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,

    // ✅ Advanced React Query features
    staleTime: 1000 * 60 * 2, // Data is "fresh" for 2 minutes
    cacheTime: 1000 * 60 * 5, // Cache is kept for 5 minutes after unused
    refetchOnWindowFocus: false, // Don’t refetch every time window is focused
    keepPreviousData: true, // Show old data while fetching new data
  });

  if (isLoading) return <p>⏳ Loading posts...</p>;
  if (isError) return <p>❌ Error: {error.message}</p>;

  return (
    <div>
      <button
        onClick={() => refetch()}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        🔄 {isFetching ? "Refreshing..." : "Refetch Posts"}
      </button>
      <ul className="space-y-2">
        {data.slice(0, 10).map((post) => (
          <li key={post.id} className="p-4 border rounded shadow">
            <h2 className="font-semibold">{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostsComponent;
