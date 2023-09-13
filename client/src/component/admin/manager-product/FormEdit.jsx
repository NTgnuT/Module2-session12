import React, { useEffect, useState } from "react";
import "./product.css";
import { notification } from "antd";

export default function FormEdit({ idEdit, loadData, handleCloseEdit }) {
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

  // Gọi API lấy thông tin 1 sản phẩm theo id
  useEffect(() => {
    // Call API
    fetch(`http://localhost:8000/products/${idEdit}`)
      .then((response) => response.json()) // Ép kiểu về dạng JSON
      .then((response) => setProduct(response)) // Lấy dữ liệu
      .catch((error) => console.log(error)); // Bắt lỗi
  }, []);

  // Hàm thêm mới product
  const handleSubmit = (e) => {
    e.preventDefault();
    // Gọi API thêm mới
    fetch(`http://localhost:8000/products/${idEdit}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // ép kiểu dữ liệu đầu vào từ js sang JSON
      },
      body: JSON.stringify({ ...product, price: +product.price }),
    })
      .then((response) => {
        // Kiểm tra dữ liệu trả về
        if (response.status === 200) {
          // 200 là sửa
          // hiển thị thêm mới thành công
          notification.success({
            message: "Thành công",
            description: "Cập nhật sản phẩm thành công",
          });
          // ẩn form thêm mới
          handleCloseEdit();
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
              value={product.product_name}
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
              value={product.price}
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
              value={product.from}
            />
          </div>

          <div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={handleCloseEdit}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
