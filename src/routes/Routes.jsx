import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/signup/SignUp";
import UpdateProfile from "../components/UpdateProfile";
import Shop from "../pages/shop/Shop";
import Dashboard from "../layout/Dashboard";
import AdminHome from "../pages/dashboard/admin/AdminHome";
import ManageUsers from "../pages/dashboard/admin/ManageUsers";
import ManageCategory from "../pages/dashboard/ManageCategory";
import ManagePayment from "../pages/dashboard/admin/ManagePayment";
import SalesReport from "../pages/dashboard/admin/SalesReport";
import AdManage from "../pages/dashboard/admin/AdManage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signUp",
        element: <SignUp></SignUp>,
      },
      {
        path: "/updateProfile",
        element: <UpdateProfile></UpdateProfile>,
      },
      {
        path: "/shop",
        element: <Shop></Shop>,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "adminHome",
        element: <AdminHome></AdminHome>,
      },
      {
        path: "manageUsers",
        element: <ManageUsers></ManageUsers>,
      },
      {
        path: "manageCategory",
        element: <ManageCategory></ManageCategory>,
      },
      {
        path: "managePayment",
        element: <ManagePayment></ManagePayment>,
      },
      {
        path: "salesReport",
        element: <SalesReport></SalesReport>,
      },
      {
        path: "adManage",
        element: <AdManage></AdManage>,
      },
    ],
  },
]);
export default router;
