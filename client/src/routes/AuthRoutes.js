import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Verify from "../pages/Verify";
import RequestPasswordReset from "../pages/RequestPasswordReset";
const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify" element={<Verify />} />
      <Route
        path="/auth/request-password-reset"
        element={<RequestPasswordReset />}
      />
    </Routes>
  );
};

export default AuthRoutes;
