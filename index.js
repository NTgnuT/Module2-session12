// Promise sẽ có 3 trạng thái
// 1.Pending: trạng thái chờ xử lý => nếu không xử lý sẽ gây ra tình trạng tràn bộ nhớ
// 2.Fulfilled: Trạng thái thành công và trả về dữ liệu <=> resovel()
// Rejected: Trạng thái thất bại và trả về lỗi (lỗi server, lỗi cú pháp...) <=> reject()

// Cách tạo 1 Promise
const promise = new Promise((resolve, reject) => {
  // resolve sẽ gọi khi thành công và trả về kết quả
  //   resolve([
  //     {
  //       id: 1,
  //       name: "Nguyễn Văn A",
  //     },
  //   ]);
  // reject sẽ gọi khi thất bại và trông báo lỗi
  reject("Lỗi server");
});

promise
  .then((response) => {
    console.log("Thành công", response);
  })
  .catch((error) => {
    console.log("Thất bại", error);
  })
  .finally(() => {
    console.log("Done!");
  });

// const loadData = asyn
//     const data = await // Gọi API để trả về dữ liệu
// }
