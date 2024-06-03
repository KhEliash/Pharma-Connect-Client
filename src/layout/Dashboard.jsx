import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex w-full container mx-auto">
      <div className="flex flex-col w-1/4 p-3 bg-[#1E90FF] space-y-2 min-h-screen text-white">
        <Link to={"adminHome"}>Admin Home</Link>
        <Link to={"manageUsers"}>Manage Users</Link>
        <Link to={"manageCategory"}>Manage Category</Link>
        <Link to={"managePayment"}>Manage Payment</Link>
        <Link to={"salesReport"}>Sales Report</Link>
        <Link to={"adManage"}>Advertise Manage</Link>

        <Link to={"/"}>Home</Link>
      </div>
      <div className="w-4/6 bg-base-100 min-h-screen">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
