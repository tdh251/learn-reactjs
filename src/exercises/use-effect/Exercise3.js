/**
Bài 3 (Trung bình): Fetch dữ liệu & Xử lý 3 trạng thái (Loading - Error - Data)
Mục tiêu: Mô phỏng luồng gọi REST API thực tế với dependency array và cleanup.
Yêu cầu thực tế:
Tạo 1 ô chọn <select> danh sách Post ID (ví dụ: 1, 2, 3).
Khi người dùng chọn ID nào, dùng useEffect gọi API miễn phí:
[https://jsonplaceholder.typicode.com/posts/](https://jsonplaceholder.typicode.com/posts/){id}
Phải quản lý đầy đủ 3 trạng thái trên giao diện:
Đang tải: Hiển thị chữ "Đang tải dữ liệu...".
Thành công: Hiển thị tiêu đề (title) và nội dung (body) của bài viết.
Lỗi: Nếu API sập hoặc mất mạng, hiển thị "Có lỗi xảy ra khi tải dữ liệu!".
Thử thách phụ: Xử lý tránh Race Condition (nếu người dùng đổi từ bài 1 sang bài 2 thật nhanh, kết quả bài 1 không được đè lên bài 2).
*/

import { useState, useEffect } from "react";

const IDS = [1, 2, 3, 4, 5];

function App() {
  const [postId, setPostId] = useState(1);
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setIsLoading(true);
    setError(null);

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, { signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Mã lỗi HTTP: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setPost(data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.name === "AbortError") return;

        setError(err.message || "Có lỗi xảy ra khi tải dữ liệu");
        setIsLoading(false);
      });

    return () => {
      controller.abort();
    };
  }, [postId]);

  return (
    <div>
      <select value={postId} onChange={(e) => setPostId(e.target.value)}>
        {IDS.map((id) => (
          <option key={id} value={id}>
            Post {id}
          </option>
        ))}
      </select>

      {isLoading && <p>Đang tải dữ liệu...</p>}

      {!isLoading && error && (
        <p style={{ color: "red" }}>Lỗi: {error}</p>
      )}

      {!isLoading && !error && post && (
        <ul>
          <li><strong>Tiêu đề:</strong> {post.title}</li>
          <li><strong>Nội dung:</strong> {post.body}</li>
        </ul>
      )}
    </div>
  );
}

export default App;
