import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaFacebookF, FaTwitter, FaApple } from "react-icons/fa";
import "./Login.css"; // CSS is in the same folder

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
      const res = await axios.post(`${API}/login`, { email, password });
      if (res.status === 200) {
        localStorage.setItem("user_id", res.data.user_id);
        alert("Login successful");
        navigate("/dashboard");
      }
    } catch (err) {
      alert(err?.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h1>Log In</h1>
          <p>Please sign in to your existing account</p>
        </div>
        <div className="card-body">
          <form onSubmit={handleLogin}>
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
            <div className="form-footer">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <Link to="/forgot" className="text-orange">
                Forgot Password?
              </Link>
            </div>
            <button type="submit" className="login-btn">
              {loading ? "Please wait..." : "LOG IN"}
            </button>
            <div className="text-center">
              Don't have an account?{" "}
              <Link to="/signup" className="text-orange">
                SIGN UP
              </Link>
            </div>
            <div className="text-center" style={{ marginTop: "10px" }}>
              Or
            </div>
            <div className="social-row">
              <button className="social-btn fb"><FaFacebookF /></button>
              <button className="social-btn tw"><FaTwitter /></button>
              <button className="social-btn ap"><FaApple /></button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
