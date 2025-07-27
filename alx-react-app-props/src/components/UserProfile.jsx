import React, { useContext } from "react"; // ✅ must import useContext & react
import UserContext from "../UserContext"; // ✅ import the context

function UserProfile() {
  // ✅ Access the context data directly
  const userData = useContext(UserContext);

  return (
    <div>
      <p>Name: {userData.name}</p>
      <p>Email: {userData.email}</p>
    </div>
  );
}

export default UserProfile;
