import React, { useState } from "react";
import "./form.css";
import axios from "axios";
import { notification } from "antd";
import { formatEmail } from "../../../utils/validateData";

export default function FormAddUser({ handleCloseAddUser, loadData }) {
  const [gender, setGender] = useState(0);

  const [user, setUser] = useState({
    user_name: "",
    address: "",
    dateOfBirth: "",
    email: "",
    password: "",
  });
  // Danh sách gender
  const listGender = [
    {
      id: 0,
      title: "Nam",
    },
    {
      id: 1,
      title: "Nữ",
    },
    {
      id: 2,
      title: "Khác",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  // Gửi dữ liệu từ form lên server
  const handleSubmit = (e) => {
    e.preventDefault();

    //cach 1:
    // if (
    //   user_name !== "" &&
    //   dateOfBirth !== "" &&
    //   email !== "" &&
    //   address !== "" &&
    //   password !== ""
    // ) {
    // }
    // cach 2:
    if (!user.user_name) {
      notification.error({
        message: "Cảnh báo",
        description: "Tên đăng nhập không được để trống",
      });
      return;
    } else if (!user.dateOfBirth) {
      notification.error({
        message: "Cảnh báo",
        description: "Ngày sinh không được để trống",
      });
      return;
    } else if (!user.email) {
      notification.error({
        message: "Cảnh báo",
        description: "Email không được để trống",
      });
      return;
    } else if (!user.address) {
      notification.error({
        message: "Cảnh báo",
        description: "Địa chỉ không được để trống",
      });
      return;
    } else if (!user.password) {
      notification.error({
        message: "Cảnh báo",
        description: "Mât khẩu không được để trống",
      });
      return;
    } else if (!formatEmail(user.email)) {
      notification.error({
        message: "Cảnh báo",
        description: "Email không đúng định dạng",
      });
    } else {
      // Gọi API register
      axios
        .post("http://localhost:8000/users", { ...user, gender: gender })
        .then((response) => {
          if (response.status === 201) {
            // Hiển thị notyification
            notification.success({
              message: "Thành công",
              description: "Thêm mới người dùng thành công",
            });
            // Đóng form
            handleCloseAddUser();
            // Load lại dữ liệu
            loadData();
          }
        })
        .catch((error) => {
          if (error.response.data === "Email already exists") {
            notification.error({
              message: "Cảnh báo ",
              description: "Email đã tồn tại",
            });
          } else {
            notification.error({
              message: "Cảnh báo ",
              description: "Lỗi hệ thống",
            });
          }
        });
    }
  };

  return (
    <>
      <div className="container-1">
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="d-flex align-items-center justify-content-between">
            <h3>Thêm mới tài khoản</h3>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCloseAddUser}
            >
              X
            </button>
          </div>
          <div className="mb-3">
            <label className="form-label">
              Tên <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              onChange={handleChange}
              name="user_name"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Giới tính</label>
            <div className="d-flex gap-3">
              {listGender.map((g) => (
                <div className="form-check" key={g.id}>
                  <input
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    onChange={() => setGender(g.id)}
                    checked={g.id === gender}
                  />
                  <label className="form-check-label">{g.title}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Ngày sinh</label>
            <input
              type="date"
              className="form-control"
              onChange={handleChange}
              name="dateOfBirth"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Địa chỉ</label>
            <input
              type="text"
              className="form-control"
              onChange={handleChange}
              name="address"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              Email<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              onChange={handleChange}
              name="email"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              Mật khẩu<span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control"
              onChange={handleChange}
              name="password"
            />
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCloseAddUser}
            >
              Hủy
            </button>
            <button type="submit" className="btn btn-primary">
              Lưu
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
