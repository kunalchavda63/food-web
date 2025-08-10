import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Please fill all fields");
    setLoading(true);
    try {
      const res = await axios.post(
        `${API}/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      if (res.status === 200) {
        const role = res.data.role || "user";
        localStorage.setItem("user_id", res.data.user_id);
        localStorage.setItem("role", role);
        localStorage.setItem("email", email);
        alert("Login successful");
        if (role === "admin") navigate("/admin-dashboard");
        else navigate("/dashboard");
      }
    } catch (err) {
      alert(err?.response?.data?.error || err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.authContainer}>
      {/* Left Side */}
      <div style={styles.authLeft}>
        <img
          src="./burger.png"
          alt="Burger Illustration"
          style={styles.authImage}
        />
      </div>

      {/* Right Side */}
      <div style={styles.authRight}>
        <div style={styles.authForm}>
          <h2 style={styles.heading}>Log in</h2>
          <form onSubmit={handleLogin}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="E-mail"
              style={styles.input}
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              style={styles.input}
            />

            <label style={styles.terms}>
              <input type="checkbox" /> Remember me
            </label>

            <button type="submit" style={styles.authBtn}>
              {loading ? "Please wait..." : "Log in"}
            </button>
          </form>

          <p style={styles.authAlt}>
            Don’t have an account?{" "}
            <Link to="/signup" style={styles.textOrange}>
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  authContainer: {
    display: "flex",
    width: "170%",
    height: "80vh",
    margin: "40px auto",
    background: "#fff",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
  },
  authLeft: {
    flex: 1,
    background: "#ff4d00",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  authImage: {
    maxWidth: "90%",
    height: "auto",
  },
  authRight: {
    flex: 1,
    background: "#f3e9d2",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
  },
  authForm: {
    width: "100%",
    maxWidth: "300px",
  },
  heading: {
    textAlign: "center",
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "14px",
    border: "none",
    borderRadius: "6px",
    background: "#f8f4ee",
    fontSize: "14px",
    outline: "none",
  },
  terms: {
    display: "flex",
    alignItems: "center",
    fontSize: "12px",
    marginBottom: "20px",
  },
  authBtn: {
    width: "100%",
    padding: "12px",
    background: "#ff4d00",
    color: "white",
    fontWeight: "bold",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background 0.3s ease",
  },
  authAlt: {
    textAlign: "center",
    fontSize: "12px",
    marginTop: "10px",
  },
  textOrange: {
    color: "#ff4d00",
    textDecoration: "none",
  },
};
