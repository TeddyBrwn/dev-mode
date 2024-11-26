import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./components/Products"; // Import component Products

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/products" element={<Products />} />{" "}
        {/* Route cho danh sách sản phẩm */}
      </Routes>
    </Router>
  );
};

export default App;
