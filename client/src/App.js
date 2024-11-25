import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes";
import DashboardRoutes from "./routes/DashboardRoutes";

const App = () => {
  return (
    <Router>
      <AuthRoutes />
      <DashboardRoutes />
    </Router>
  );
};

export default App;
