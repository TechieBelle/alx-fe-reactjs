import { Routes, Route, Link } from "react-router-dom";
import ProfileDetails from "./ProfileDetails";
import ProfileSettings from "./ProfileSettings";

function Profile() {
  return (
    <div>
      <h1>👤 Profile Page</h1>
      <nav className="space-x-4">
        <Link to="details">Details</Link>
        <Link to="settings">Settings</Link>
      </nav>

      <Routes>
        <Route path="details" element={<ProfileDetails />} />
        <Route path="settings" element={<ProfileSettings />} />
      </Routes>
    </div>
  );
}

export default Profile;
