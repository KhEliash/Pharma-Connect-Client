import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Main = () => {
  return (
    <div>
    <div className="container mx-auto">
      {/* Navbar */}
      <Navbar></Navbar>
      <div className="min-h-screen ">
        {/* Main content */}
        <Outlet></Outlet>
      </div>
      </div>
      {/* Footer */}
      <Footer></Footer>
    </div>
  );
};

export default Main;
