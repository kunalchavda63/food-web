import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import burgerImage from "../assets/burger.png"; 

export default function Login() {
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) return alert("Please fill all fields");

    setLoading(true);
    try {
      const res = await axios.post(
        `${API}/auth/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.status === 200) {
        const { role = "user", user_id, access_token } = res.data;

        // Store session data
        localStorage.setItem("user_id", user_id);
        localStorage.setItem("role", role);
        localStorage.setItem("email", email);
        if (access_token) {
          localStorage.setItem("token", access_token); // JWT or session token
        }

        alert("Login successful");

        // Navigate based on role
        if (role === "admin") navigate("/admin-dashboard");
        else navigate("/dashboard");
      }
    } catch (err) {
      alert(err?.response?.data?.detail || err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.authContainer}>
        {/* Left Side */}
        <div style={styles.authLeft}>
          <img
            src={burgerImage}
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
    </div>
  );
}

const styles = {
  pageWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
    background: "linear-gradient(135deg, #ff4d00, #ff8a3d)",
  },
  authContainer: {
    display: "flex",
    width: "90%",
    maxWidth: "900px",
    height: "550px",
    background: "#fff",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "-1px -1px 30px #fbc17b",
  },
  authLeft: {
    flex: 1,
    background: "linear-gradient(135deg, #ff4d00, #ff8a3d)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    padding: "20px",
  },
  authImage: {
    maxWidth: "150%",
    height: "auto",
  },
  authRight: {
    flex: 1,
    background: "#fdf8f3",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
  },
  authForm: {
    width: "100%",
    maxWidth: "320px",
  },
  heading: {
    textAlign: "center",
    fontSize: "26px",
    fontWeight: "600",
    color: "#ff4d00",
    marginBottom: "25px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "16px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    background: "#fff",
    fontSize: "14px",
    outline: "none",
    transition: "0.3s",
  },
  authBtn: {
    width: "100%",
    padding: "12px",
    background: "#ff4d00",
    color: "white",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background 0.3s ease",
  },
  authAlt: {
    textAlign: "center",
    fontSize: "13px",
    marginTop: "12px",
    color: "#555",
  },
  textOrange: {
    color: "#ff4d00",
    textDecoration: "none",
    fontWeight: "500",
  },
  terms: {
    fontSize: "13px",
    color: "#555",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginBottom: "16px",
  },
};
