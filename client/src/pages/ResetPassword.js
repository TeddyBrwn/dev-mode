import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api"; // Adjust the path to your API configuration file

const ResetPassword = () => {
  const { token } = useParams(); // Extract token from the URL
  const navigate = useNavigate(); // Initialize the navigation function
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await API.post(
        "/auth/reset-password",
        { newPassword, confirmNewPassword },
        {
          headers: {
            Authorization: token, // Pass the token in the Authorization header
          },
        }
      );

      setSuccess("Password reset successful!");
      setError("");

      // Redirect to login page after successful password reset
      setTimeout(() => navigate("/login"), 2000); // 2-second delay for user feedback
    } catch (err) {
      setError(err.response?.data?.message || "Error resetting password");
      setSuccess("");
    }
  };

  return (
    <div>
      <h2>Reset Your Password</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm New Password</label>
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
