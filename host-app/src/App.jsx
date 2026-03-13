// App.jsx - Updated
import React, { Suspense, useEffect, useState } from "react";
import { Outlet, Link, createBrowserRouter } from "react-router-dom"; // Add Outlet
import useCounter from "hostApp/useCounter";
import eventBus from "hostApp/eventBus";
import productCountRxjs from "hostApp/productCountRxjs";

const ProductList = React.lazy(() => import("productApp/ProductList"));
const CartList = React.lazy(() => import("cartApp/CartList"));
const CartApp = React.lazy(() => import("cartApp/CartApp"));
const ProductApp = React.lazy(() => import("productApp/ProductApp"));

function NotFound() {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/">Go Home</Link>
    </div>
  );
}

function App() {
  const { count, increase } = useCounter();

  const [cartCount, increaseCart] = useState(0);

  const cartCountHandler = () => {
    increaseCart((prev) => {
      const newValue = prev + 1;

      eventBus.emit("cartUpdated", newValue);

      return newValue;
    });
  };

  useEffect(() => {
    const unsubscribe = eventBus.on("cartUpdated", (data) => {
      increaseCart(data);
    });

    return unsubscribe;
  }, []);

  const [productCount, increaseProductCount] = useState(0);

  const productCountHandler = () => {
    increaseProductCount((prev) => {
      const newValue = prev + 1;
      productCountRxjs.next(newValue);
      return newValue;
    });
  };

  useEffect(() => {
    const subscription = productCountRxjs.subscribe((value) => {
      increaseProductCount(value);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return (
    <div>
      <h1>Host Application</h1>
      <h2>Hai</h2>
      <h2>productApp count: {count} </h2>
      <button onClick={() => increase()}>Click me</button>
      <h2>CartApp count: {cartCount} </h2>
      <button onClick={() => cartCountHandler()}>Click me</button>
      <h2>productAppRxjs count: {productCount} </h2>
      <button onClick={() => productCountHandler()}>Click me</button>
      <nav>
        <ul>
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li>
            <Link to="/carts">Carts</Link>
          </li>
          <li>
            <Link to="/products/app">Product App</Link>
          </li>
          <li>
            <Link to="/micro/carts">Cart App</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Nest routes as children
      {
        path: "products",
        element: (
          <div>
            <h2>Products</h2>
            <Suspense fallback={<div>Loading Products...</div>}>
              <ProductList message="Welcome to the Host App! props  remote" />
            </Suspense>
          </div>
        ),
      },
      {
        path: "carts",
        element: (
          <Suspense fallback={<div>Loading Carts...</div>}>
            <CartList />
          </Suspense>
        ),
      },
    ],
  },

  {
    path: "products/app/*",
    element: <ProductApp />,
  },

  {
    path: "/micro/carts",
    element: (
      <Suspense fallback={<div>Loading Carts...</div>}>
        <CartApp />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
