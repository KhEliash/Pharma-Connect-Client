import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Helmet } from "react-helmet";

const Main = () => {
  return (
    <div>
      <Helmet>
        <title>PharmaConnect | Home</title>
        <meta name="description" content="Nested component" />
      </Helmet>
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
