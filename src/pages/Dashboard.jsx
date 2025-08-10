import React from "react";

export default function Dashboard(){
  const name = localStorage.getItem("email") || "User";
  return (
    <div style={{padding:30}}>
      <h2>Welcome to User Dashboard</h2>
      <p>Hello, {name}</p>
    </div>
  );
}
