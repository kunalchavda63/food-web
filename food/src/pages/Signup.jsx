import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css"; // local CSS file

export default function Signup() {
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) return alert("Please fill all fields");
    setLoading(true);
    try {
      const res = await axios.post(`${API}/signup`, { name, email, password });
      if (res.status === 201) {
        alert("Signup successful! Please login.");
        navigate("/login");
      }
    } catch (err) {
      alert(err?.response?.data?.error || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h1>Sign Up</h1>
          <p>Create a new account</p>
        </div>
        <div className="card-body">
          <form onSubmit={handleSignup}>
            <div className="form-row">
              <label>Name</label>
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-row">
              <label>Email</label>
              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-row">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="login-btn">
              {loading ? "Please wait..." : "SIGN UP"}
            </button>
            <div className="text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-orange">
                LOG IN
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
