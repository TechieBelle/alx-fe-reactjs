import { Link } from "react-router-dom";

function Navbar() {
  const navStyle = {
    backgroundColor: "#2c3e50",
    padding: "1rem 2rem",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  const listStyle = {
    listStyle: "none",
    display: "flex",
    margin: 0,
    padding: 0,
    alignItems: "center",
  };

  const itemStyle = {
    marginRight: "2rem",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontSize: "1.1rem",
    fontWeight: "500",
    transition: "color 0.3s ease",
  };

  const logoStyle = {
    color: "#3498db",
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginRight: "auto",
  };

  return (
    <nav style={navStyle}>
      <ul style={listStyle}>
        <li style={logoStyle}>MyCompany</li>
        <li style={itemStyle}>
          <Link to="/" style={linkStyle}>
            Home
          </Link>
        </li>
        <li style={itemStyle}>
          <Link to="/about" style={linkStyle}>
            About
          </Link>
        </li>
        <li style={itemStyle}>
          <Link to="/services" style={linkStyle}>
            Services
          </Link>
        </li>
        <li style={itemStyle}>
          <Link to="/contact" style={linkStyle}>
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
