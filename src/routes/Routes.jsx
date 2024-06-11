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
 import ManagePayment from "../pages/dashboard/admin/ManagePayment";
import SalesReport from "../pages/dashboard/admin/SalesReport";
import AdManage from "../pages/dashboard/admin/AdManage";
import ManageCategory from "../pages/dashboard/admin/ManageCategory";
import SellerHome from "../pages/dashboard/seller/SellerHome";
import MedicinesManage from "../pages/dashboard/seller/MedicinesManage";
import PaymentHistory from "../pages/dashboard/seller/PaymentHistory";
import AdAsk from "../pages/dashboard/seller/AdAsk";
import PaymentHistoryy from "../pages/dashboard/user/PaymentHistoryy";
 import UpdateCategory from './../pages/dashboard/admin/UpdateCategory';
import CategoryDetails from "../components/CategoryDetails";
import Cart from "../components/Cart";
import Checkout from "../components/Checkout";

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
      {
        path: '/categoryDetails/:category',
        element: <CategoryDetails></CategoryDetails>
      },
      {
        path: '/cart',
        element: <Cart></Cart>
      },
      {
        path: '/checkout',
        element: <Checkout></Checkout>
      }
      
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      // Admin Routes
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
      {
        path: 'updateCategory/:id',
        element: <UpdateCategory></UpdateCategory>
      },
    
      // seller routes
      {
        path: "sellerHome",
        element: <SellerHome></SellerHome>,
      },
      {
        path: 'sellerMedicine',
        element: <MedicinesManage></MedicinesManage>
      },
      {
        path: 'paymentHistory',
        element: <PaymentHistory></PaymentHistory>
      },
      {
        path: 'askForAdd',
        element: <AdAsk></AdAsk>
      },
      // user routes
      {
        path: 'userPayHistory',
        element: <PaymentHistoryy></PaymentHistoryy>
      }
    ],
  },
]);
export default router;
