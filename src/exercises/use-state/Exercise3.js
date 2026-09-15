import { useState } from "react";

const INITIAL_REGISTER_FORM = {
  email: "",
  password: "",
  fullName: "",
  phone: "",
};

function AccountForm({formData, onChange}) {
   return (
      <div>
         <div>
            <label htmlFor="email">Email</label>
            <input type="email" id='email' name="email" value={formData.email} onChange={onChange} />
         </div>
         <div>
            <label htmlFor="password">Password</label>
            <input type="password" id='password' name="password" value={formData.password} onChange={onChange}/>
         </div>
      </div>
   )
}

function PersionalInfoForm() {
   return (
      <div>
         <div>
            <label htmlFor="fullName">Full Name</label>
            <input id='fullName' name="fullName" />
         </div>
         <div>
            <label htmlFor="phone">Phone</label>
            <input type="phone" id='phone' name="phone"/>
         </div>
      </div>
   )
}

function CustomerSummary({customer}) {
   return (
      <div>
         <div><strong>Full Name: </strong>{customer.fullName}</div>
         <div><strong>Email: </strong>{customer.email}</div>
         <div><strong>Phone Number: </strong>{customer.phone}</div>
         <div><strong>Password: </strong>{customer.password}</div>
      </div>
   )
}

function BuklActions({step, onNext}) {
   return (
      <div>
         {step > 1 && <button>Quay lại</button>}
         <button type="button" onClick={onNext}>{ step === 3 ? 'Xác nhận' : 'Tiếp tục' }</button>
      </div>
   )
}

function App() {
   const [formData, setFormData] = useState(INITIAL_REGISTER_FORM)
   const [step, setStep] = useState(1);

   const handleChange = (e) => {
      const [name, value] = e.target;
      setFormData(prev => ({...prev, [name]: value}))
   }

   const handleNext = () => {
      setStep(prev => prev + 1);
   }

   return (
      <form>
         <AccountForm formData={formData} onChange={handleChange}/>
         <PersionalInfoForm onChange={handleChange}/>
         <CustomerSummary customer={step}/>
         <BuklActions step={step} onNext={handleNext}/>
      </form>
   );
}

export default App;
