import React, { useState } from "react";
import "./product.css";
import { notification } from "antd";

export default function FormAdd({ handleCloseForm, loadData }) {
  const [product, setProduct] = useState({
    product_name: "",
    price: 0,
    from: "",
  });

  // Hàm lấy giá trị từ các ô input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  // Hàm thêm mới product
  const handleSubmit = (e) => {
    e.preventDefault();
    // Gọi API thêm mới
    fetch("http://localhost:8000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // ép kiểu dữ liệu đầu vào từ js sang JSON
      },
      body: JSON.stringify({ ...product, price: +product.price }),
    })
      .then((response) => {
        // Kiểm tra dữ liệu trả về
        if (response.status === 201) {
          // 201 Thêm mới
          // hiển thị thêm mới thành công
          notification.success({
            message: "Thành công",
            description: "Thêm mới sản phẩm thành công",
          });
          // ẩn form thêm mới
          handleCloseForm();
          loadData();
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="product-container">
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="product_name" className="form-label">
              Tên sản phẩm
            </label>
            <input
              type="text"
              className="form-control"
              id="product_name"
              onChange={handleChange}
              name="product_name"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="price" className="form-label">
              Giá
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              onChange={handleChange}
              name="price"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="from" className="form-label">
              Xuất xứ
            </label>
            <input
              type="text"
              className="form-control"
              id="from"
              onChange={handleChange}
              name="from"
            />
          </div>

          <div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleCloseForm}
            >
              Hủy
            </button>
            <div className="d-flex"></div>
          </div>
        </form>
      </div>
    </>
  );
}
