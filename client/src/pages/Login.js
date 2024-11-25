import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation to another page
import API from "../api/api"; // Adjust the path to your API instance

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState(""); // Combine email and username into one field
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send login request to the API
      const response = await API.post("/auth/login", {
        emailOrUsername,
        password,
      });
      console.log("Login successful:", response.data);

      // Save the token to localStorage (or another secure storage)
      localStorage.setItem("token", response.data.token);

      // Navigate to the dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.response?.data?.error || "Login failed. Please try again.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email or Username:</label>
          <input
            type="text"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            placeholder="Enter email or username"
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Add "Forgot Password?" button */}
      <div style={{ marginTop: "20px" }}>
        <button
          type="button"
          onClick={() => navigate("/auth/request-password-reset")}
        >
          Forgot Password?
        </button>
      </div>

      {/* Add "Register" button */}
      <div style={{ marginTop: "10px" }}>
        <button type="button" onClick={() => navigate("/register")}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
