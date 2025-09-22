import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";

const AdminLayout = () => {
  const location = useLocation();
  const hideSidebarFrom = ["/admin/login"];
  const hideSidebar = hideSidebarFrom.includes(location.pathname);

  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const session = useSession();
  const navigate = useNavigate();

  // Handle authentication redirects
  useEffect(() => {
    if (session.isPending) return;

    if (!session.data && location.pathname !== "/admin/login") {
      navigate("/admin/login", { replace: true });
    } else if (session.data && location.pathname === "/admin/login") {
      navigate("/admin", { replace: true });
    }
  }, [session.data, session.isPending, location.pathname, navigate]);

  return (
    <div
      className={`${darkMode && "dark"} min-h-screen max-h-screen overflow-hidden flex bg-neutral-300}`}
    >
      {!hideSidebar && (
        <div className="w-96 bg-sidebar backdrop-opacity-10 text-sidebar-foreground shadow-lg font-heading relative">
          <AdminSidebar toggleDarkMode={toggleDarkMode} />
        </div>
      )}

      {/* Any other pages like Members, Events, Projects... */}
      <div className="w-full bg-background text-foreground shadow-lg font-heading overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
