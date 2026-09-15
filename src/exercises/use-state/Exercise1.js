import { useState } from "react";

const TABS_DATA = [
   {
      id: "intro",
      title: "Giới thiệu",
      content: "Nội dung phần giới thiệu tổng quan về sản phẩm và công ty.",
   },
   {
      id: "specs",
      title: "Thông số kỹ thuật",
      content: "Màn hình 6.7 inch, Chip Apple Silicon, RAM 16GB, Bộ nhớ 512GB.",
   },
   {
      id: "reviews",
      title: "Đánh giá (128)",
      content: "Danh sách các phản hồi và đánh giá từ khách hàng đã mua.",
   },
];

function App() {
   const [tabActive, setTabActive] = useState("intro");

   return (
      <div>
         <div className="buttons">
            {TABS_DATA.map((tab) => (
               <button
                  key={tab.id}
                  onClick={() => setTabActive(tab.id)}
                  style={tab.id === tabActive ? { backgroundColor: "red", color: 'white' } : {}}
               >
                  {tab.title}
               </button>
            ))}
         </div>
         <div className="content">
            {TABS_DATA.find((tab) => tab.id === tabActive).content}
         </div>
      </div>
   );
}

export default App;
