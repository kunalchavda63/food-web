import React from "react";

export default function Dashboard() {
  const name = localStorage.getItem("email") || "User";

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #4facfe, #00f2fe)",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const cardStyle = {
    background: "white",
    padding: "40px",
    borderRadius: "15px",
    boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.15)",
    textAlign: "center",
    maxWidth: "400px",
    width: "90%",
  };

  const headingStyle = {
    fontSize: "1.8rem",
    color: "#333",
    marginBottom: "10px",
  };

  const subTextStyle = {
    fontSize: "1.1rem",
    color: "#555",
  };

  const emojiStyle = {
    fontSize: "2rem",
    marginBottom: "15px",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={emojiStyle}>👋</div>
        <h2 style={headingStyle}>Welcome to Your Dashboard</h2>
        <p style={subTextStyle}>Hello, <strong>{name}</strong></p>
      </div>
    </div>
  );
}
