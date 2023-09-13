/**
 * Hàm fomat tiền tệ Việt Nam
 * @param {*} money chuỗi tiền tệ cần fomat
 * @returns chuỗi tiền tệ đã được format
 * AUTHOR: TungNT (11/09/23)
 */
export const formatMoney = (money) => {
  return money.toLocaleString("vi", { style: "currency", currency: "VND" });
};

/**
 * Định dạng chuỗi tgian
 * @param {*} date : Chuỗi tgian cần định dạng
 * @returns Định dạng tgian ngày-tháng-năm
 * AUTHOR: TungNT
 */
export const formatDate = (date) => {
  // Lấy ra định dạng tgian của chuỗi dựa vào thời gian thực
  const today = new Date(date);

  // Lấy ra năm
  let year = today.getFullYear();
  // Lấy ra tháng
  let month = today.getMonth() + 1;
  if (month > 0 && month < 10) {
    month = `0${month}`;
  }
  // Lấy ra ngày
  let day = today.getDate();
  if (day > 0 && day < 10) {
    day = `0${day}`;
  }
  // Trả ra chuỗi cần định dạng
  return `${day} - ${month} - ${year}`;
};
