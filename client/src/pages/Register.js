import React, { useState } from "react";
import API from "../api/api";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    birthday: "",
    username: "",
    password: "",
    gender: "",
    address: "",
    city: "",
    country: "",
  });
  const [error, setError] = useState(""); // Error message
  const [message, setMessage] = useState(""); // Success message

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleRegister = async () => {
    try {
      // Include the default "user" role in the payload
      const payload = { ...formData, role: "user" };

      // Send POST request to register API
      const response = await API.post("/auth/register", payload);
      setMessage(
        response.data.message ||
          "Registration successful! Please verify your account."
      );
      setError("");

      // Save email/username to localStorage for use in the verify page
      localStorage.setItem(
        "emailOrUsername",
        formData.email || formData.username
      );

      // Redirect to the verify page
      setTimeout(() => {
        window.location.href = "/verify";
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Please try again."
      );
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error */}
      {message && <p style={{ color: "green" }}>{message}</p>}{" "}
      {/* Display success */}
      <form>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="date"
          name="birthday"
          placeholder="Birthday"
          value={formData.birthday}
          onChange={handleChange}
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
        />
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
      <p>
        Already have an account? <a href="/login">Login here</a>
      </p>
    </div>
  );
};

export default Register;