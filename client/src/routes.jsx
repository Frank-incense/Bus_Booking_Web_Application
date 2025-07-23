import { createBrowserRouter } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import LoginForm from "./components/LoginForm";
import Signup from "./components/Signup";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Hiring from "./components/Hiring";
import Parcel from "./components/Parcel";


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
        path: "signup",
        element: <Signup />,
      },
      {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "contact",
        element: <ContactUs />,
      },
      {
        path: "service1",
        element: <Hiring />,
      },
      {
        path: "service2",
        element: <Parcel />,
      },
    ],
  },
]);

export default router;
  