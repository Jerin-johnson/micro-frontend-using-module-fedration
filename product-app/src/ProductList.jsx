import React, { useEffect, useState } from "react";
import useCounter from "hostApp/useCounter";
import productCountRxjs from "hostApp/productCountRxjs";

const ProductList = (props) => {
  const products = ["Laptop", "Phone", "Headphones"];
  const { count, increase } = useCounter();
  const [rxjsProductCount, setRxjsProductCount] = useState(0);

  useEffect(() => {
    const subscription = productCountRxjs.subscribe((value) => {
      setRxjsProductCount(value);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      <h2>Products</h2>
      <p>
        Welcome to the Products page! {props?.message || "Enjoy your shopping!"}
      </p>

      <h2>Count :{count}</h2>
      <button onClick={() => increase()}>Click me</button>

      <h2>Product RxJS Count :{rxjsProductCount}</h2>
      <button onClick={() => productCountRxjs.next(rxjsProductCount + 1)}>
        Click me
      </button>

      <ul>
        {products.map((p, index) => (
          <li key={index}>{p}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
