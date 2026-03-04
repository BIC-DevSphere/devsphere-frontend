import { Outlet } from "react-router-dom";
import UserNavbar from "@/components/user/UserNavbar";
import UserFooter from "@/components/user/UserFooter";

const UserLayout = () => {
  return (
    <div>
      <UserNavbar />
      <Outlet />
      <UserFooter />
    </div>
  );
};

export default UserLayout;
