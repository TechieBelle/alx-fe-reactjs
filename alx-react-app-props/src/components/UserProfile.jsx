const UserProfile = (props) => {
  // This component displays user profile information
  // It accepts props for name, age, and bio
  return (
    <div>
      <h2
        style={{
          color: "blue",
          fontSize: "24px",
        }}
      >
        {props.name}
      </h2>
      <p>Age: {props.age}</p>
      <p>Bio: {props.bio}</p>
    </div>
  );
};

export default UserProfile;
