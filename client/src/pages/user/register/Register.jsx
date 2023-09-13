import React, { useState } from "react";
import "./register.css";
import axios from "axios";
import { notification } from "antd";
import { resourceForm } from "../../../resources/resourceVN";

export default function Register() {
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    user_name: "",
    address: "",
    dateOfBirth: "",
    role: 1,
  });

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Hàm validate dữ liệu nhập vào
  const validateData = (nameInput, valueInput) => {
    switch (nameInput) {
      case "email":
        if (!valueInput) {
          setEmailError(true);
        } else {
          setEmailError(false);
        }
        break;
      case "password":
        if (!valueInput) {
          setPasswordError(true);
        } else {
          setPasswordError(false);
        }
        break;

      default:
        break;
    }
  };

  // Lấy giá trị từ các ô input
  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="container-login">
        <form className="form-login" onSubmit={handleSubmit}>
          <div className="d-flex justify-content-between align-items-center">
            <h3>{resourceForm.headingRegister}</h3>
            <div className="btn btn-close"></div>
          </div>
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="name">
              Họ và tên
            </label>
            <input
              placeholder="Nhập địa chỉ email"
              className={`form-control `}
              id="name"
              name="user_name"
              type="text"
              onChange={handleInputChange}
              onBlur={handleInputChange}
            />
            {emailError && (
              <div className="text-err mt-1">Email không được để trống.</div>
            )}
          </div>
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="date">
              Ngày sinh
            </label>
            <input
              onChange={handleInputChange}
              className={`form-control `}
              id="date"
              name="dateOfBirth"
              type="date"
            />
          </div>
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              placeholder="Nhập địa chỉ email"
              className={`form-control ${emailError && "border-err"}`}
              id="email"
              name="email"
              type="text"
              value={email}
              onChange={handleInputChange}
              onBlur={handleInputChange}
            />
            {emailError && (
              <div className="text-err mt-1">Email không được để trống.</div>
            )}
          </div>
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="password">
              Mật khẩu
            </label>
            <input
              placeholder="Nhập mật khẩu"
              className={`form-control ${passwordError && "border-err"}`}
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={handleInputChange}
              onBlur={handleInputChange}
            />
            {passwordError && (
              <div className="text-err mt-1">Mật khẩu không được để trống.</div>
            )}
          </div>
          <div className="form-group mb-3">
            <label className="form-label" htmlFor="confirmPassword">
              Nhập lại mật khẩu
            </label>
            <input
              placeholder="Nhập lại mật khẩu"
              className={`form-control `}
              id="confirmPassword"
              name="confirmPassword"
              type="password"
            />
            {passwordError && (
              <div className="text-err mt-1">Mật khẩu không được để trống.</div>
            )}
          </div>

          <div>
            <button style={{ width: "100%" }} className="btn btn-primary">
              Đăng nhập
            </button>
          </div>
          <p className="p-2 text-center">
            {resourceForm.confirmAccount} <a href="#">Đăng ký</a>
          </p>
        </form>
      </div>
    </>
  );
}
