import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Link, NavLink, Outlet } from "react-router-dom";

import useAxios from "../others/Axios/useAxios";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const Dashboard = () => {
  const axios = useAxios();
  const { user } = useContext(AuthContext);
  const {
    data: userRole = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get(`/users/${user?.email}`);
      return res.data;
    },
    refetchInterval: 1000,
  });

  return (
    <div className="flex w-full container mx-auto">
      <Helmet>
        <title>PharmaConnect | Dashboard</title>
        <meta name="description" content="Nested component" />
      </Helmet>

      <div className="flex flex-col w-1/4 p-3 bg-[#1E90FF] space-y-2 min-h-screen text-white">
        {isLoading ? (
          <h1>loading...</h1>
        ) : (
          <>
            {userRole.role === "admin" && (
              <>
                {/* admin routes */}
                <NavLink
                  className={({ isActive }) =>
                    isActive ? " text-blue-500 bg-white p-1 rounded-md " : ""
                  }
                  to={"adminHome"}
                >
                  Admin Home
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? " text-blue-500 bg-white p-1 rounded-md " : ""
                  }
                  to={"manageUsers"}
                >
                  Manage Users
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? " text-blue-500 bg-white p-1 rounded-md" : ""
                  }
                  to={"manageCategory"}
                >
                  Manage Category
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "text-blue-500 bg-white p-1 rounded-md " : ""
                  }
                  to={"managePayment"}
                >
                  Manage Payment
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? " text-blue-500 bg-white p-1 rounded-md " : ""
                  }
                  to={"salesReport"}
                >
                  Sales Report
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? " text-blue-500 bg-white p-1 rounded-md " : ""
                  }
                  to={"adManage"}
                >
                  Advertise Manage
                </NavLink>
                <hr />
                <Link to={"/"}>Home</Link>
              </>
            )}
            {userRole.role === "seller" && (
              <>
                {/* seller routes */}
                <NavLink
                  className={({ isActive }) =>
                    isActive ? " text-blue-500 bg-white p-1 rounded-md " : ""
                  }
                  to={"sellerHome"}
                >
                  Seller Home
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? " text-blue-500 bg-white p-1 rounded-md " : ""
                  }
                  to={"sellerMedicine"}
                >
                  Manage Medicine
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? " text-blue-500 bg-white p-1 rounded-md " : ""
                  }
                  to={"paymentHistory"}
                >
                  Payment History
                </NavLink>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? " text-blue-500 bg-white p-1 rounded-md " : ""
                  }
                  to={"askForAdd"}
                >
                  Ask For Ad
                </NavLink>
                <hr />
                <Link to={"/"}>Home</Link>
              </>
            )}
            {userRole.role === "user" && (
              <>
                {/* user routes */}

                <NavLink
                  className={({ isActive }) =>
                    isActive ? " text-blue-500 bg-white p-1 rounded-md " : ""
                  }
                  to={"userPayHistory"}
                >
                  Payment History
                </NavLink>
                <hr />
                <Link to={"/"}>Home</Link>
              </>
            )}
          </>
        )}
      </div>
      <div className="w-4/6 bg-base-100 min-h-screen">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
