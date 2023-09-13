import React, { useEffect, useState } from "react";
import { formatMoney } from "../../utils/formatData";
import FormAdd from "../../component/admin/manager-product/FormAdd";
import FormEdit from "../../component/admin/manager-product/FormEdit";

export default function ListProduct() {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showFormEdit, setShowFormEdit] = useState(false);
  const [idEdit, setIdEdit] = useState(null);

  // Gọi API lấy thông tin tất cả sản phẩm
  const loadData = () => {
    fetch("http://localhost:8000/products")
      .then((response) => response.json()) // Ép kiểu về dạng JSON
      .then((response) => setProducts(response)) //Nơi có dữ liệu trả về
      .catch((error) => console.log(error)); // Bắt lỗi
  };

  useEffect(() => {
    loadData();
  }, []);

  /**
   * Hàm xóa thông tin một products theo id
   * @param {*} id id cửa product cần xóa
   */
  const handleDelete = (id) => {
    fetch(`http://localhost:8000/products/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 200) {
          loadData();
        }
      })
      .catch((error) => console.log(error));
  };

  // Hàm hiển thị form thêm mới sản phẩm
  const handleShowForm = () => {
    setShowForm(true);
  };

  // Hàm đóng form
  const handleCloseForm = () => {
    setShowForm(false);
  };

  // Hiển thị form Edit
  const handleEdit = (productID) => {
    setShowFormEdit(true);
    setIdEdit(productID); // Lấy ra id edit
  };

  // Hàm đóng form Edit
  const handleCloseEdit = () => {
    setShowFormEdit(false);
  };

  return (
    <>
      {/* Form thêm mới sản phẩm */}
      {showForm && (
        <FormAdd handleCloseForm={handleCloseForm} loadData={loadData} />
      )}

      {/* Form Edit */}
      {showFormEdit && (
        <FormEdit
          idEdit={idEdit}
          handleCloseEdit={handleCloseEdit}
          loadData={loadData}
        />
      )}

      <div>
        <div>
          <button className="btn btn-success" onClick={handleShowForm}>
            Thêm mới sản phẩm
          </button>
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">STT</th>
              <th scope="col">Tên sản phẩm</th>
              <th scope="col">Giá</th>
              <th scope="col">Xuất xứ</th>
              <th scope="col" colSpan={2}>
                Chức năng
              </th>
            </tr>
          </thead>

          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                {/* Khuyến cáo key không nên dùng index */}

                <td>{index + 1}</td>
                <td>{product.product_name}</td>
                <td>{formatMoney(product.price)}</td>
                <td>{product.from}</td>
                <td>
                  <button
                    onClick={() => handleEdit(product.id)}
                    className="btn btn-warning"
                  >
                    Sửa
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(product.id)}
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
