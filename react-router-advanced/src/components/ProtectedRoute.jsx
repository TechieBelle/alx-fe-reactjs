import { Navigate } from "react-router-dom";

// 🔹 Fake hook for authentication
function useAuth() {
  // Replace this with real auth logic later (e.g., token check, context, etc.)
  const token = localStorage.getItem("authToken");
  return !!token; // true if logged in, false if not
}

function ProtectedRoute({ children }) {
  const isAuthenticated = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
