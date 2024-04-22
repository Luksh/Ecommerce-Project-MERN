import MinimumLayout from "../layouts/MinimumLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";

const guestRoutes = [
  {
    path: "/",
    element: <MinimumLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  // { path: "login", element: <Login /> },
  // { path: "register", element: <Register /> },
  // { path: "header", element: <Header /> },
];

export default guestRoutes;
