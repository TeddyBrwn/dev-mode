import React, { useState, useEffect } from "react";
import API from "../api/api";

const Verify = () => {
  const [emailOrUsername, setEmailOrUsername] = useState(""); // Email or username auto-filled
  const [verificationCode, setVerificationCode] = useState(""); // 6-digit code from user
  const [error, setError] = useState(""); // Error message
  const [message, setMessage] = useState(""); // Success message

  // Retrieve email/username from localStorage on page load
  useEffect(() => {
    const storedEmailOrUsername = localStorage.getItem("emailOrUsername");
    if (storedEmailOrUsername) {
      setEmailOrUsername(storedEmailOrUsername);
    }
  }, []);

  // Handle Verify Button Click
  const handleVerify = async () => {
    try {
      const response = await API.post("/auth/verify", {
        email: emailOrUsername, // Email/username from localStorage
        code: verificationCode, // Code entered by user
      });
      setMessage(
        response.data.message || "Verification successful! Please log in."
      );
      setError("");
      setTimeout(() => {
        window.location.href = "/login"; // Redirect to Login Page
      }, 2000); // Delay for success message
    } catch (err) {
      setError(
        err.response?.data?.message || "Verification failed. Please try again."
      );
      setMessage("");
    }
  };

  // Handle Input Change for Verification Code
  const handleCodeChange = (e) => {
    setVerificationCode(e.target.value);
  };

  return (
    <div>
      <h2>Verify Your Account</h2>
      <p>Please enter the 6-digit verification code sent to your email.</p>
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
      {/* Display error message */}
      {message && <p style={{ color: "green" }}>{message}</p>}{" "}
      {/* Display success message */}
      <p>
        Email/Username: <strong>{emailOrUsername}</strong>{" "}
        {/* Display auto-filled email/username */}
      </p>
      <input
        type="text"
        placeholder="Enter Verification Code"
        value={verificationCode}
        onChange={handleCodeChange} // Handle input change
      />
      <button onClick={handleVerify}>Verify</button>
    </div>
  );
};

export default Verify;
