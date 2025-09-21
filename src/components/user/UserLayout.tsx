import { Outlet } from "react-router-dom";
import UserNavbar from "@/components/user/UserNavbar";

const UserLayout = () => {
  return (
    <div>
      <UserNavbar />
      <Outlet />
    </div>
  );
};

export default UserLayout;
