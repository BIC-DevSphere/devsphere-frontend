import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { useState } from "react";

const AdminLayout = () => {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`${darkMode && "dark"} min-h-screen max-h-screen overflow-hidden flex bg-neutral-300}`}
    >
      <div className="w-96 bg-sidebar backdrop-opacity-10 text-sidebar-foreground shadow-lg relative">
        <AdminSidebar toggleDarkMode={toggleDarkMode} />
      </div>

      {/* Any other pages like Members, Events, Projects... */}
      <div className="w-full bg-background text-foreground shadow-lg overflow-x-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
