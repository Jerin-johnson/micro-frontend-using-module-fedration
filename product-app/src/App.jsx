import React from "react";
import ProductList from "./ProductList";

const App = () => {
  return (
    <div>
      <h1>Product Microfrontend</h1>
      <ProductList message="Welcome to the Product App! props" />
    </div>
  );
};

export default App;
