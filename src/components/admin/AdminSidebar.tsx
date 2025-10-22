import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/authClient";
import toast from "react-hot-toast";

const AdminSidebar = ({ toggleDarkMode }) => {
  const sidebarItems = [
    { id: 1, name: "Dashboard", path: "/admin" },
    { id: 2, name: "Members", path: "/admin/members" },
    { id: 3, name: "Events", path: "/admin/events" },
    { id: 4, name: "Projects", path: "/admin/projects" },
  ];

  const logout = async () => {
    try {
      const response = await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logged out successfully");
            console.log("Successfully logged out");
          },
          onError: (error) => {
            toast.error("Error logging out");
            console.error("Logout error:", error);
          },
        },
      });
      console.log("Logout successful:", response);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <div className="p-4 space-y-8">
      <div className="flex items-center gap-4">
        <img src="/logo.png" alt="logo" className="w-10" />
        <p className="text-xl font-semibold">DevAdmin</p>
      </div>

      <div className="space-y-2">
        {sidebarItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            end={item.path === "/admin"}
            className={({ isActive }) =>
              `block px-3 py-2 rounded-md transition-colors ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </div>

      <div className="absolute bottom-4">
        <Button onClick={toggleDarkMode}>Switch Theme</Button>
      </div>
      <div>
        <Button onClick={logout}>Logout</Button>
      </div>
    </div>
  );
};

export default AdminSidebar;
