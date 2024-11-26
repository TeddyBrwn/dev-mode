import React, { useEffect, useState } from "react";
import API from "../api/api"; // Import instance Axios của bạn

const Products = () => {
  const [products, setProducts] = useState([]); // State để lưu danh sách sản phẩm
  const [loading, setLoading] = useState(true); // State để theo dõi trạng thái loading
  const [error, setError] = useState(null); // State để theo dõi lỗi

  useEffect(() => {
    // Fetch products từ API
    const fetchProducts = async () => {
      try {
        const { data } = await API.get("/user/products");
        setProducts(data); // Cập nhật state với dữ liệu sản phẩm
        setLoading(false);
      } catch (err) {
        setError(err.message || "Có lỗi xảy ra!");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // useEffect sẽ chạy 1 lần sau khi component mount

  if (loading) return <p>Loading...</p>; // Hiển thị loading khi đang fetch dữ liệu
  if (error) return <p>Error: {error}</p>; // Hiển thị lỗi nếu có

  return (
    <div>
      <h1>Danh sách sản phẩm</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <h3>{product.name}</h3> {/* Hiển thị tên sản phẩm */}
            <p>Giá: {product.price} VND</p> {/* Hiển thị giá */}
            <p>Mô tả: {product.description}</p> {/* Hiển thị mô tả */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
