import React from "react";

const Dashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    window.location.href = "/login"; // Redirect to Login
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
