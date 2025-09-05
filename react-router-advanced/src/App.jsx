import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BlogPost from "./components/BlogPost";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Protected route example */}
        <Route
          path="/profile/*"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Dynamic route example */}
        <Route path="/post/:id" element={<BlogPost />} />

        {/* Login page */}
        <Route path="/login" element={<Login />} />

        {/* Catch-all (like wrong address) */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
