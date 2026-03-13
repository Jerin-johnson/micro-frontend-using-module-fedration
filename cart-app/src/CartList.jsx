import React from "react";

const CartList = () => {
  const products = ["Laptop", "Phone", "Headphones"];

  return (
    <div>
      <h2>Carts Lists</h2>
      <h2>Hello from cart </h2>
      <ul>
        {products.map((p, index) => (
          <li key={index}>{p}</li>
        ))}
      </ul>
    </div>
  );
};

export default CartList;
