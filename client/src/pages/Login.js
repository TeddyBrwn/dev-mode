import React, { useState } from "react";
import API from "../api/api";

const Login = () => {
  const [credentials, setCredentials] = useState({
    emailOrUsername: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const response = await API.post("/auth/login", credentials);
      localStorage.setItem("token", response.data.token); // Save token
      alert("Login successful!");
      window.location.href = "/dashboard"; // Redirect to Dashboard
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="text"
        name="emailOrUsername"
        placeholder="Email or Username"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <button onClick={handleLogin}>Login</button>
      <p>
        Don't have an account? <a href="/register">Register here</a>
      </p>
    </div>
  );
};

export default Login;
