import React, { useEffect, useState } from "react";
import axios from "axios";
import { notification } from "antd";
import FormAddUser from "../../component/admin/manager-user/FormAddUser";
import { formatDate } from "../../utils/formatData";
import debounce from "lodash.debounce";
import Loading from "../../component/base/loading/Loading";

export default function ListUser() {
  const [users, setUsers] = useState([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [showLoading, setShowLoading] = useState(false);

  // Gọi API lấy thông tin tất cả user
  const loadData = async () => {
    // async: xử lý bất đồng bộ trong hàm
    setShowLoading(true);
    axios
      .get(`http://localhost:8000/users?user_name_like=${searchText}`)
      // (tên hàm) ? (phân tử cần trỏ đến)_like(phương thức có sẵn)
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error));
    setShowLoading(false);
  };

  useEffect(() => {
    const delaySearch = debounce(loadData, 1000); // đặt độ trễ cho hàm search tính từ khi bỏ tay khỏi bàn phím
    delaySearch();

    return delaySearch.cancel; // Hủy debounce khi không thực hiện chức nang search
  }, [searchText]);

  // Hàm xóa thông tin user
  const handleDelete = (id) => {
    // Gọi API
    axios
      .delete(`http://localhost:8000/users/${id}`)
      .then((response) => {
        if (response.status === 1000) {
          notification.success({
            message: "Thành công",
            description: "Xóa dữ liệu người dùng thành công",
          });
          loadData();
        }
      })
      .catch((error) => console.log(error));
  };

  // Hiển thị form thêm mới
  const handleAddUser = () => {
    setShowAddUser(true);
  };

  // Đóng form thêm mới
  const handleCloseAddUser = () => {
    setShowAddUser(false);
  };

  return (
    <>
      {/* Loading */}
      {showLoading && <Loading />}

      {/* Form thêm mới user */}
      {showAddUser && (
        <FormAddUser
          handleCloseAddUser={handleCloseAddUser}
          loadData={loadData}
        />
      )}

      <div>
        <div>
          <button className="btn btn-info" onClick={handleAddUser}>
            Thêm mới tài khoản
          </button>
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            name=""
            id=""
            className="form-control w-50"
            placeholder="Nhập từ khoá tìm kiếm"
          />
        </div>
        <table className="table table-bordered table-hover table-striper">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên</th>
              <th>Giới tính</th>
              <th>Ngày sinh</th>
              <th>Địa chỉ</th>
              <th>Email</th>
              <th colSpan={2}>Chức năng</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <td>{index + 1}</td>
                <td>{user.user_name}</td>
                <td>{user.gender === 0 ? "Nam" : "Nữ"}</td>
                <td>{formatDate(user.dateOfBirth)}</td>
                <td>{user.address}</td>
                <td>{user.email}</td>
                <td>
                  <button className="btn btn-warning">Sửa</button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="btn btn-danger"
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
