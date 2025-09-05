import React from "react";
import { useQuery } from "@tanstack/react-query";

// Function to fetch posts
const fetchPosts = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
};

const PostsComponent = () => {
  const { data, error, isLoading, isError, refetch } = useQuery({
    queryKey: ["posts"], // unique key
    queryFn: fetchPosts,
  });

  if (isLoading) return <p>⏳ Loading posts...</p>;
  if (isError) return <p>❌ Error: {error.message}</p>;

  return (
    <div>
      <button
        onClick={() => refetch()}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        🔄 Refetch Posts
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
