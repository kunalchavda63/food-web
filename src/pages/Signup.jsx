import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Signup.css";

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

    // role derive on backend; still send role for convenience (backend ignores admin email)
    const role = ["shlok", "kunal"].includes(name.trim().toLowerCase()) ? "admin" : "user";

    setLoading(true);
    try {
      const res = await axios.post(`${API}/signup`, { name, email, password, role }, { headers: { "Content-Type": "application/json" }});
      if (res.status === 201) {
        alert("Signup successful! Please login.");
        navigate("/login");
      }
    } catch (err) {
      alert(err?.response?.data?.error || err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header"><h1>Sign Up</h1><p>Create your account</p></div>
        <div className="card-body">
          <form onSubmit={handleSignup}>
            <label>Name</label>
            <input value={name} onChange={e=>setName(e.target.value)} type="text" placeholder="Full name" />
            <label>Email</label>
            <input value={email} onChange={e=>setEmail(e.target.value)} type="email" placeholder="example@gmail.com" />
            <label>Password</label>
            <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Enter password" />
            <div style={{marginTop:14}}>
              <button className="login-btn" type="submit">{loading ? "Please wait..." : "SIGN UP"}</button>
            </div>
            <div style={{marginTop:12}} className="small">Already have an account? <Link to="/login" className="text-orange">Log in</Link></div>
          </form>
        </div>
      </div>
    </div>
  );
}
