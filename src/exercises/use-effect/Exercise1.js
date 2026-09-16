/**
Bài 1 (Dễ): Đồng bộ Tiêu đề trang (Document Title) & Lắng nghe phím tắt
Mục tiêu: Hiểu cơ chế chạy sau mỗi lần state đổi và cách dọn dẹp (cleanup) một Event Listener toàn cục.
Yêu cầu thực tế:
Tạo 1 counter có nút bấm tăng số lần click. Dùng useEffect để cập nhật tiêu đề tab trình duyệt thành: "Bạn đã click X lần".
Dùng useEffect để lắng nghe sự kiện nhấn phím Escape trên toàn màn hình (window.addEventListener('keydown', ...)). Khi bấm Escape, tự động reset counter về 0.
Bắt buộc: Phải có hàm cleanup để gỡ bỏ listener khi component unmount, tránh bị rò rỉ bộ nhớ (memory leak).
 */

import { useState, useEffect } from "react";

function App() {
  const [counter, setCounter] = useState(0);

  // Effect 1: Đồng bộ Title trình duyệt
  useEffect(() => {
    document.title = counter > 0 ? `Bạn đã click ${counter} lần...` : document.title;
  }, [counter]);

  // Effect 2: Lắng nghe phím tắt Escape toàn cục
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setCounter(0);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []); // Mảng rỗng vì chỉ cần đăng ký listener 1 lần duy nhất khi mount

  return (
    <div>
      <p>Bạn đã click {counter} lần...</p>
      <button onClick={() => setCounter((prev) => prev + 1)}>Click me!</button>
    </div>
  );
}

export default App;
