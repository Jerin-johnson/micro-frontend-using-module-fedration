import React from "react";

const ProductList = () => {
  const products = ["Laptop", "Phone", "Headphones"];

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((p, index) => (
          <li key={index}>{p}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
