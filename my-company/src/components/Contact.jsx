import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const containerStyle = {
    padding: "2rem",
    maxWidth: "1000px",
    margin: "0 auto",
  };

  const titleStyle = {
    fontSize: "2.5rem",
    color: "#2c3e50",
    marginBottom: "2rem",
    textAlign: "center",
  };

  const contentStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "3rem",
    marginTop: "2rem",
  };

  const formStyle = {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  };

  const inputStyle = {
    width: "100%",
    padding: "0.8rem",
    margin: "0.5rem 0 1rem 0",
    border: "2px solid #e0e0e0",
    borderRadius: "5px",
    fontSize: "1rem",
    transition: "border-color 0.3s ease",
    boxSizing: "border-box",
  };

  const textareaStyle = {
    ...inputStyle,
    minHeight: "120px",
    resize: "vertical",
  };

  const buttonStyle = {
    backgroundColor: "#3498db",
    color: "white",
    padding: "1rem 2rem",
    border: "none",
    borderRadius: "5px",
    fontSize: "1.1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    width: "100%",
  };

  const infoStyle = {
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  };

  const infoItemStyle = {
    marginBottom: "1.5rem",
    display: "flex",
    alignItems: "flex-start",
  };

  const iconStyle = {
    fontSize: "1.5rem",
    marginRight: "1rem",
    color: "#3498db",
  };

  const errorStyle = {
    color: "#e74c3c",
    fontSize: "0.9rem",
    marginTop: "0.25rem",
  };

  const successStyle = {
    backgroundColor: "#d4edda",
    color: "#155724",
    padding: "1rem",
    borderRadius: "5px",
    marginBottom: "1rem",
    border: "1px solid #c3e6cb",
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 5000);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Contact Us</h1>
      <p
        style={{
          textAlign: "center",
          fontSize: "1.2rem",
          color: "#666",
          marginBottom: "2rem",
        }}
      >
        Get in touch with us. We'd love to hear from you!
      </p>

      <div style={contentStyle}>
        <div style={formStyle}>
          <h2 style={{ color: "#2c3e50", marginBottom: "1.5rem" }}>
            Send us a Message
          </h2>

          {isSubmitted && (
            <div style={successStyle}>
              Thank you for your message! We'll get back to you soon.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Your Name *"
                value={formData.name}
                onChange={handleChange}
                style={{
                  ...inputStyle,
                  borderColor: errors.name ? "#e74c3c" : "#e0e0e0",
                }}
              />
              {errors.name && <div style={errorStyle}>{errors.name}</div>}
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Your Email *"
                value={formData.email}
                onChange={handleChange}
                style={{
                  ...inputStyle,
                  borderColor: errors.email ? "#e74c3c" : "#e0e0e0",
                }}
              />
              {errors.email && <div style={errorStyle}>{errors.email}</div>}
            </div>

            <div>
              <textarea
                name="message"
                placeholder="Your Message *"
                value={formData.message}
                onChange={handleChange}
                style={{
                  ...textareaStyle,
                  borderColor: errors.message ? "#e74c3c" : "#e0e0e0",
                }}
              />
              {errors.message && <div style={errorStyle}>{errors.message}</div>}
            </div>

            <button
              type="submit"
              style={buttonStyle}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#2980b9")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#3498db")}
            >
              Send Message
            </button>
          </form>
        </div>

        <div style={infoStyle}>
          <h2 style={{ color: "#2c3e50", marginBottom: "1.5rem" }}>
            Contact Information
          </h2>

          <div style={infoItemStyle}>
            <span style={iconStyle}>📍</span>
            <div>
              <h4 style={{ margin: "0 0 0.5rem 0", color: "#2c3e50" }}>
                Address
              </h4>
              <p style={{ margin: 0, color: "#666" }}>
                123 Business Street
                <br />
                Suite 100
                <br />
                City, State 12345
              </p>
            </div>
          </div>

          <div style={infoItemStyle}>
            <span style={iconStyle}>📞</span>
            <div>
              <h4 style={{ margin: "0 0 0.5rem 0", color: "#2c3e50" }}>
                Phone
              </h4>
              <p style={{ margin: 0, color: "#666" }}>+1 (555) 123-4567</p>
            </div>
          </div>

          <div style={infoItemStyle}>
            <span style={iconStyle}>✉️</span>
            <div>
              <h4 style={{ margin: "0 0 0.5rem 0", color: "#2c3e50" }}>
                Email
              </h4>
              <p style={{ margin: 0, color: "#666" }}>info@mycompany.com</p>
            </div>
          </div>

          <div style={infoItemStyle}>
            <span style={iconStyle}>🕐</span>
            <div>
              <h4 style={{ margin: "0 0 0.5rem 0", color: "#2c3e50" }}>
                Business Hours
              </h4>
              <p style={{ margin: 0, color: "#666" }}>
                Monday - Friday: 9:00 AM - 6:00 PM
                <br />
                Saturday: 10:00 AM - 4:00 PM
                <br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
