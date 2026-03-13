import React, { Suspense } from "react";

const ProductList = React.lazy(() => import("productApp/ProductList"));
const CartList = React.lazy(() => import("cartApp/CartList"));

export default function App() {
  return (
    <div>
      <h1>Host Application</h1>

      <Suspense fallback={<div>Loading Products...</div>}>
        <ProductList />
      </Suspense>
      <Suspense fallback={<div>Loading Carts...</div>}>
        <CartList />
      </Suspense>
    </div>
  );
}
