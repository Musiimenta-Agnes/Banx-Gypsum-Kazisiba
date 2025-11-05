import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // For now just navigate to dashboard (backend auth comes later)
    navigate("/admin/dashboard");
  };

  return (
    <div className="admin-login-page">
      <form onSubmit={handleLogin} className="login-card">
        <h2>Admin Login</h2>
        <input type="text" placeholder="Username" onChange={(e)=>setUsername(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
export default AdminLogin;
