import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation to another page
import API from "../api/api"; // Adjust the path to your API instance

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/auth/login", { email, password });
      console.log("Login successful:", response.data);
      // Redirect to dashboard or home on success
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please try again.");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Add the "Forgot Password?" button */}
      <div style={{ marginTop: "20px" }}>
        <button
          type="button"
          onClick={() => navigate("/auth/request-password-reset")}
        >
          Forgot Password?
        </button>
      </div>
    </div>
  );
};

export default Login;
