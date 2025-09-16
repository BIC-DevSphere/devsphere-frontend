import { Outlet } from "react-router-dom";
import Navbar from "./UserNavbar";

const UserLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default UserLayout;
