import { useState } from "react";

export const PRODUCTS_DATA = [
   { id: 1, name: "MacBook Air M2", category: "Laptop", price: 24000000 },
   {
      id: 2,
      name: "iPhone 15 Pro Max",
      category: "Điện thoại",
      price: 29000000,
   },
   { id: 3, name: "Chuột Magic Mouse", category: "Phụ kiện", price: 1900000 },
   { id: 4, name: "Dell XPS 13", category: "Laptop", price: 28000000 },
   {
      id: 5,
      name: "Tai nghe AirPods Pro",
      category: "Phụ kiện",
      price: 4800000,
   },
];

const CATEGORIES_FILTER = ["Tất cả", "Laptop", "Điện thoại", "Phụ kiện"];

function ProductFilter({ searchData, onChange }) {
   return (
      <form>
         <input
            type="search"
            name="term"
            value={searchData.term}
            placeholder="Search here..."
            onChange={onChange}
         />
         <select
            name="category"
            value={searchData.category}
            onChange={onChange}
         >
            {CATEGORIES_FILTER.map((category) => (
               <option key={category} value={category}>
                  {category}
               </option>
            ))}
         </select>
      </form>
   );
}

function ProductsList({ products }) {
   return (
      <ul>
         {products.map((product) => (
            <ProductItem key={product.id} product={product} />
         ))}
      </ul>
   );
}

function ProductItem({ product }) {
   return (
      <li>
         <strong>{product.name}</strong>
         <br />
         Giá:{" "}
         {product.price.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
         })}
      </li>
   );
}

function App() {
   const [searchData, setSearchData] = useState({
      term: "",
      category: "Tất cả",
   });

   const handleChange = (e) => {
      const { name, value } = e.target;
      setSearchData((prev) => ({ ...prev, [name]: value }));
   };

   const filteredProducts = PRODUCTS_DATA.filter((product) => {
      const matchesCategory =
         searchData.category === "Tất cả" ||
         searchData.category === product.category;
      const matchesTerm = product.name
         .toLocaleLowerCase()
         .includes(searchData.term.trim().toLocaleLowerCase());
      return matchesCategory && matchesTerm;
   });

   return (
      <>
         <ProductFilter searchData={searchData} onChange={handleChange} />
         <ProductsList products={filteredProducts} />
      </>
   );
}

export default App;
