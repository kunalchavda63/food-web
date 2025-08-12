import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    // Optional: Pre-set role for known admins (backend still enforces roles)
    const role =
      ["shlok", "kunal"].includes(name.trim().toLowerCase()) ? "admin" : "user";

    setLoading(true);
    try {
      const res = await axios.post(
        `${API}/auth/signup`,
        { 
          username:name,
          email: email,
          password: password,
          role: role 
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.status === 201) {
        alert(res.data?.message || "Signup successful! Please log in.");
        navigate("/login");
      }
    } catch (err) {
      if (err.response) {
        // FastAPI usually sends errors in `detail`
        alert(err.response.data?.detail || "Signup failed");
      } else if (err.request) {
        alert("No response from server. Please check your connection.");
      } else {
        alert("An error occurred: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h1>Sign Up</h1>
            <p>Create your account</p>
          </div>
          <div className="card-body">
            <form onSubmit={handleSignup}>
              <label>Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Full name"
              />
              <label>Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="example@gmail.com"
              />
              <label>Password</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter password"
              />
              <div style={{ marginTop: 14 }}>
                <button className="login-btn" type="submit" disabled={loading}>
                  {loading ? "Please wait..." : "SIGN UP"}
                </button>
              </div>
              <div style={{ marginTop: 12 }} className="small">
                Already have an account?{" "}
                <Link to="/login" className="text-orange">
                  Log in
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
