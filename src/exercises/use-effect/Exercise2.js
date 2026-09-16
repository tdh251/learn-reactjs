/**
Bài 2 (Cơ bản): Đồng hồ đếm ngược (Countdown Timer)
Mục tiêu: Làm chủ setInterval kết hợp với State và useEffect, tránh bẫy Stale Closure.
Yêu cầu thực tế:
Tạo component đếm ngược từ 60 về 0 giây (mỗi giây giảm 1 đơn vị).
Có 2 nút: Tạm dừng (Pause) và Tiếp tục (Resume).
Khi đếm về 0, tự động dừng đồng hồ và hiển thị thông báo "Hết giờ!".
Điểm cần chú ý: Làm sao để hàm đếm ngược không bị chạy nhanh gấp đôi/gấp ba khi người dùng bấm qua lại giữa các nút, và không bị đứng yên ở số 59 (bẫy closure).
*/

import { useState, useEffect, use } from "react";

function App() {
   const [countDown, setCountDown] = useState(60);
   const [isPausing, setIsPausing] = useState(false);

   useEffect(() => {
      if (countDown <= 0 || isPausing) {
         return;
      }
      const intervalId = setInterval(() => {
         setCountDown((prev) => {
            if (prev <= 1) {
               clearInterval(intervalId);
               return 0;
            }
            return prev - 1;
         });
      }, 1000);

      // Cleanup: Dọn interval khi pause hoặc unmount
      return () => clearInterval(intervalId);
   }, [isPausing]);

   return (
      <div>
         <p>{countDown > 0 ? `Đếm ngược ${countDown}s` : "Hết giờ"}</p>
         <div>
            <button
               onClick={() => setIsPausing(true)}
               disabled={isPausing || countDown === 0}
            >
               Pause
            </button>
            <button
               onClick={() => setIsPausing(false)}
               disabled={!isPausing || countDown === 0}
            >
               Resume
            </button>
            <button
               onClick={() => {
                  setCountDown(60);
                  setIsPausing(false);
               }}
            >
               Reset
            </button>
         </div>
      </div>
   );
}

export default App;
