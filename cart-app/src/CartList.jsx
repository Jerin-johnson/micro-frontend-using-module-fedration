import React from "react";
import { useState, useEffect } from "react";
import eventBus from "hostApp/eventBus";

console.log(eventBus);

const CartList = () => {
  const products = ["Laptop", "Phone", "Headphones"];
  const [cartCount, increaseCart] = useState(0);

  useEffect(() => {
    const unsubscribe = eventBus.on("cartUpdated", (data) => {
      increaseCart(data);
    });

    return unsubscribe;
  }, []);

  const cartCountHandler = () => {
    increaseCart((prev) => {
      const newValue = prev + 1;

      eventBus.emit("cartUpdated", newValue);

      return newValue;
    });
  };

  return (
    <div>
      <h2>Carts Lists</h2>
      <h2>Hello from cart </h2>
      <h2>CartApp count: {cartCount} </h2>
      <button onClick={cartCountHandler}>Click me</button>
      <ul>
        {products.map((p, index) => (
          <li key={index}>{p}</li>
        ))}
      </ul>
    </div>
  );
};

export default CartList;
