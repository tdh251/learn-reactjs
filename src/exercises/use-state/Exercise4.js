/*
Bài 4: Giỏ hàng thương mại điện tử (E-Commerce Shopping Cart)
Mục tiêu: Thao tác mảng bất biến (Immutability): Thêm mới, tăng/giảm số lượng, xóa sản phẩm, tính tổng tiền bằng Derived State.
Yêu cầu:
Danh sách sản phẩm mẫu có nút "Thêm vào giỏ".
Nếu sản phẩm chưa có trong giỏ: thêm vào với quantity = 1.
Nếu sản phẩm đã có: tăng quantity lên 1.
Bảng giỏ hàng: Có nút + và - số lượng (nếu giảm về 0 thì tự xóa khỏi giỏ), nút "Xóa".
Tính tổng tiền tự động (dùng Derived State với .reduce()).
*/

import { useState } from "react";

const SHOP_ITEMS = [
   { id: 101, name: "Bàn phím cơ Không dây", price: 1500000 },
   { id: 102, name: "Màn hình 4K 27 inch", price: 8500000 },
   { id: 103, name: "Ghế công thái học", price: 3900000 },
];

function ProductsList({ onAddToCart }) {
   return (
      <ul>
         {SHOP_ITEMS.map((product) => (
            <ProductItem
               key={product.id}
               product={product}
               onAddToCart={onAddToCart}
            />
         ))}
      </ul>
   );
}

function ProductItem({ product, onAddToCart }) {
   return (
      <li>
         <strong>{product.name}</strong>
         <div>
            Price:
            {product.price.toLocaleString("vi-VN", {
               style: "currency",
               currency: "VND",
            })}
         </div>
         <button onClick={() => onAddToCart(product.id)}>
            Thêm vào giỏ hàng
         </button>
      </li>
   );
}

function CartList({ cartItems, onReduce, onIncrease, onRemove }) {
   const totalAmount = cartItems.reduce(
      (total, item) => (total += item.price * item.quantity),
      0,
   );
   return (
      <div>
         <h4 style={{ marginBottom: 5 }}>Giỏ hàng</h4>
         <table border="1" cellPadding="8" cellSpacing="0">
            <thead>
               <tr>
                  <th>Mã sản phẩm</th>
                  <th>Tên sản phẩm</th>
                  <th>Số lượng</th>
                  <th>Giá tiền</th>
                  <th>Hành động</th>
               </tr>
            </thead>
            <tbody>
               {cartItems.map((item) => (
                  <CartItem
                     key={item.id}
                     cartItem={item}
                     onReduce={onReduce}
                     onIncrease={onIncrease}
                     onRemove={onRemove}
                  />
               ))}
            </tbody>
            <tfoot>
               <tr>
                  <td colSpan="3">
                     <strong>Tổng cộng:</strong>
                  </td>
                  <td colSpan="2">
                     <strong>
                        {totalAmount.toLocaleString("vi-VN", {
                           style: "currency",
                           currency: "VND",
                        })}
                     </strong>
                  </td>
               </tr>
            </tfoot>
         </table>
      </div>
   );
}

function CartItem({ cartItem, onReduce, onIncrease, onRemove }) {
   return (
      <tr>
         <td>{cartItem.id}</td>
         <td>{cartItem.name}</td>
         <td>
            <button onClick={() => onReduce(cartItem.id)}>-</button>
            {cartItem.quantity}
            <button onClick={() => onIncrease(cartItem.id)}>+</button>
         </td>
         <td>
            {cartItem.price.toLocaleString("vi-VN", {
               style: "currency",
               currency: "VND",
            })}
         </td>
         <td>
            <button onClick={() => onRemove(cartItem.id)}>Xóa</button>
         </td>
      </tr>
   );
}

function App() {
   const [cartItems, setCartItems] = useState([]);

   const handeAddToCart = (id) => {
      const cartItem = cartItems.find((item) => item.id === id);
      if (cartItem) {
         alert(`Đã có ${cartItem.name} trong giỏ hàng`);
         return;
      }
      const currentProduct = SHOP_ITEMS.find((product) => product.id === id);
      currentProduct.quantity = 1;
      setCartItems((prev) => [...prev, currentProduct]);
   };

   const handleDelete = (id) => {
      if (window.confirm("Bạn muốn xóa sản phẩm này không?")) {
         setCartItems((prev) => prev.filter((item) => item.id !== id));
      }
   };

   const handleIncrease = (id) => {
      setCartItems((prev) =>
         prev.map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
         ),
      );
   };

   const handleReduce = (id, quantity) => {
      const currentCartItem = cartItems.find((item) => item.id === id);
      if (currentCartItem.quantity <= 1) {
         setCartItems((prev) => prev.filter((item) => item.id !== id));
         return;
      }
      setCartItems((prev) =>
         prev.map((item) => {
            return item.id === id
               ? { ...item, quantity: item.quantity - 1 }
               : item;
         }),
      );
   };

   return (
      <>
         <ProductsList onAddToCart={handeAddToCart} />
         <CartList
            cartItems={cartItems}
            onReduce={handleReduce}
            onIncrease={handleIncrease}
            onRemove={handleDelete}
         />
      </>
   );
}

export default App;
