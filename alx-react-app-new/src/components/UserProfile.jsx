const UserProfile = (props) => {
  // This component displays user profile information
  // It accepts props for name, age, and bio
  return (
    <div style={{ border: "1px solid gray", padding: "10px", margin: "10px" }}>
      <h2
        style={{
          color: "blue",
          fontSize: "24px",
        }}
      >
        {props.name}
      </h2>
      <p>Age: <span style={{ fontWeight: 'bold' }}></span> {props.age}</p>
      <p>Bio: {props.bio}</p>
    </div>
  );
};

export default UserProfile;
