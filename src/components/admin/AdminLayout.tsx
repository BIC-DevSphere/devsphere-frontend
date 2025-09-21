import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "@/components/admin/AdminSidebar";

const AdminLayout = () => {
  const location = useLocation();
  const hideSidebarFrom = ["/admin/login"];
  const hideSidebar = hideSidebarFrom.includes(location.pathname);

  return (
    <div className="min-h-screen max-h-screen overflow-hidden flex gap-3 p-3 bg-sky-100">
      {!hideSidebar && (
        <div className="rounded-lg w-96 bg-sidebar text-sidebar-foreground shadow-lg font-heading">
          <AdminSidebar />
        </div>
      )}
      
      <div className="rounded-lg w-full bg-background text-foreground shadow-lg font-heading overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
