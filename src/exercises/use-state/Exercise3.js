/**
Bài 3: Form đăng ký nhiều bước (Multi-step Registration Form)
Mục tiêu: Quản lý state dạng Object phức tạp với Computed Property Names ([name]: value), chia nhỏ components và validate cơ bản.
Yêu cầu:
Bước 1 (Tài khoản): Nhập email và password. Bấm "Tiếp tục" chuyển sang Bước 2.
Bước 2 (Cá nhân): Nhập fullName và phone. Bấm "Quay lại" hoặc "Tiếp tục" chuyển sang Bước 3.
Bước 3 (Xác nhận): Hiển thị toàn bộ thông tin đã nhập để kiểm tra. Bấm "Hoàn tất" để reset form.
*/

import { useState } from "react";

const INITIAL_REGISTER_FORM = {
   email: "",
   password: "",
   fullName: "",
   phone: "",
};

function AccountForm({ formData, onChange }) {
   return (
      <div>
         <div>
            <label htmlFor="email">Email</label>
            <input
               type="email"
               id="email"
               name="email"
               value={formData.email}
               onChange={onChange}
            />
         </div>
         <div>
            <label htmlFor="password">Password</label>
            <input
               type="password"
               id="password"
               name="password"
               value={formData.password}
               onChange={onChange}
            />
         </div>
      </div>
   );
}

function PersionalInfoForm({ formData, onChange }) {
   return (
      <div>
         <div>
            <label htmlFor="fullName">Full Name</label>
            <input
               id="fullName"
               name="fullName"
               value={formData.fullName}
               onChange={onChange}
            />
         </div>
         <div>
            <label htmlFor="phone">Phone</label>
            <input
               type="phone"
               id="phone"
               name="phone"
               value={formData.phone}
               onChange={onChange}
            />
         </div>
      </div>
   );
}

function CustomerSummary({ customer }) {
   return (
      <div>
         <div>
            <strong>Full Name: </strong>
            {customer.fullName}
         </div>
         <div>
            <strong>Email: </strong>
            {customer.email}
         </div>
         <div>
            <strong>Phone Number: </strong>
            {customer.phone}
         </div>
         <div>
            <strong>Password: </strong>
            {customer.password}
         </div>
      </div>
   );
}

function BuklActions({ step, onNext, onCancel }) {
   return (
      <div>
         {step > 1 && <button type="button" onClick={onCancel}>Quay lại</button>}
         <button type="button" onClick={onNext}>
            {step === 3 ? "Xác nhận" : "Tiếp tục"}
         </button>
      </div>
   );
}

function App() {
   const [formData, setFormData] = useState(INITIAL_REGISTER_FORM);
   const [step, setStep] = useState(1);

   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
   };

   const handleNext = () => {
      if(step >= 3) {
         setFormData(INITIAL_REGISTER_FORM);
         setStep(1);
         return;
      }
      setStep((prev) => prev + 1);
   };

   const handleCancel = () => {
      if(step <= 0) {
         return;
      }
      setStep((prev) => prev - 1);
   }

   return (
      <form>
         {step === 1 && (
            <AccountForm formData={formData} onChange={handleChange} />
         )}
         {step === 2 && (
            <PersionalInfoForm formData={formData} onChange={handleChange} />
         )}
         {step === 3 && <CustomerSummary customer={formData} />}
         <BuklActions step={step} onNext={handleNext} onCancel={handleCancel} />
      </form>
   );
}

export default App;
