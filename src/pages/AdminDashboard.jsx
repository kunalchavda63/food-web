import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard(){
  const API = import.meta.env.VITE_API_URL;
  const adminEmail = localStorage.getItem("email");

  const [users, setUsers] = useState([]);

  useEffect(()=>{
    const fetchUsers = async ()=>{
      try{
        const res = await axios.get(`${API}/admin/users`, {
          headers: { "X-Admin-Email": adminEmail }
        });
        setUsers(res.data || res.data.users || res.data);
      }catch(err){
        console.error(err);
        alert("Unable to fetch users (make sure you are admin)");
      }
    };
    fetchUsers();
  },[adminEmail, API]);

  const deleteUser = async (id)=>{
    if(!window.confirm("Delete user?")) return;
    try{
      await axios.delete(`${API}/admin/users/${id}`, { headers: { "X-Admin-Email": adminEmail }});
      setUsers(u=>u.filter(x=>x.id !== id));
    }catch(err){
      alert("Delete failed");
    }
  };

  return (
    <div style={{padding:20}}>
      <h2>Admin Dashboard</h2>
      <div style={{marginTop:12}}>
        <table className="table">
          <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Action</th></tr></thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td><button onClick={()=>deleteUser(u.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
