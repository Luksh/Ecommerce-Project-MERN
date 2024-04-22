import Header from "../components/Header";
import Login from "../pages/Login";
import Register from "../pages/Register";

const guestRoutes = [
  { path: "login", element: <Login /> },
  { path: "register", element: <Register /> },
  { path: "header", element: <Header /> },
];

export default guestRoutes;
