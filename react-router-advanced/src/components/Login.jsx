function Login() {
  return (
    <div>
      <h1>🔑 Login Page</h1>
      <p>Please log in to access your profile.</p>
      <button
        onClick={() => {
          localStorage.setItem("auth", "true");
          window.location.href = "/profile";
        }}
      >
        Log In
      </button>
    </div>
  );
}

export default Login;
