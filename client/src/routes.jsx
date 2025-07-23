import { createBrowserRouter } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Signup from "./components/Signup";
import AdminDashboard from "./pages/AdminDashboard"; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <LoginForm />,
      },
      {
        path: "register",
        element: <RegisterForm />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/admin", 
    element: <AdminDashboard />,
  },
]);

export default router;