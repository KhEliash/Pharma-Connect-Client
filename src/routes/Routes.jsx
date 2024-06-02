import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import SignUp from "../pages/signup/SignUp";
import UpdateProfile from "../components/UpdateProfile";
import Shop from "../pages/shop/Shop";

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
            path: '/login',
            element: <Login></Login>
        },
        {
            path: '/signUp',
            element: <SignUp></SignUp>
        },
        {
          path: '/updateProfile',
          element: <UpdateProfile></UpdateProfile>
        }
        ,
        {
          path: '/shop',
          element: <Shop></Shop>
        }

    ],
  },
]);
export default router;
