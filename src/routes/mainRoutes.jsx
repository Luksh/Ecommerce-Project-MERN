import AuthGuard from "../guards/AuthGuard";
import MainLayout from "../layouts/MainLayout";
import About from "../pages/About";
import AddProduct from "../pages/AddProduct";
import Cart from "../pages/Cart";
import EditProduct from "../pages/EditProduct";
import Home from "../pages/Home";
import ProductDetails from "../pages/ProductDetails";
import ProductList from "../pages/ProductList";

const mainRoutes = [
  {
    path: "/",
    element: (
      <AuthGuard>
        <MainLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "products",
        element: <ProductList />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "product-details/:id",
        element: <ProductDetails />,
      },
      {
        path: "edit-product/:id",
        element: <EditProduct />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
];

export default mainRoutes;
