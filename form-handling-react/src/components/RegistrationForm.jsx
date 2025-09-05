import { useState } from "react";

const RegistrationForm = () => {
  // Track form values
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simple validation
    if (!username || !email || !password) {
      setError("All fields are required!");
      return;
    }

    setError("");
    console.log("Form Submitted:", { username, email, password });

    // Reset form
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 max-w-md mx-auto space-y-4 border rounded"
    >
      <h2 className="text-xl font-bold">User Registration</h2>

      {error && <p className="text-red-500">{error}</p>}

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Register
      </button>
    </form>
  );
};

export default RegistrationForm;
