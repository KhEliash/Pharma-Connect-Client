import { Link, NavLink } from "react-router-dom";
import logo from "/PharmaConnect Logo.jpg";
import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { FaCartShopping, FaShop } from "react-icons/fa6";
const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const navLinks = (
    <>
      <li>
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive ? " border border-blue-400 " : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to={"/shop"}
          className={({ isActive }) =>
            isActive ? " border border-blue-400 " : ""
          }
        >
          Shop
        </NavLink>
      </li>
      <li>
        <div className="indicator">
          <span className="indicator-item badge badge-secondary">99+</span>
          <button className="">
            <FaCartShopping className="text-lg"></FaCartShopping>
          </button>
        </div>
      </li>
      <li>
        <details className="dropdown">
          <summary className="m-1  ">Language</summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            <li>
              <a>English</a>
            </li>
            <li>
              <a>Bangla</a>
            </li>
          </ul>
        </details>
      </li>
    </>
  );
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {navLinks}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">
            <img src={logo} alt="logo" className="h-10 w-10" />
            <span className="text-2xl font-bold">PharmaConnect</span>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2">{navLinks}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={user?.photoURL}
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link to={"/updateProfile"}>Update Profile</Link>
                  </li>
                  <li>
                    <Link>Dashboard</Link>
                  </li>
                  <li>
                    <a
                      onClick={() => {
                        logOut();
                      }}
                    >
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            <>
              <Link to={"/signUp"} className="btn">
                Join Us
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
