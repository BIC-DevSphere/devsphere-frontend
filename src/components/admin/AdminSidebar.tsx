import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  const sidebarItems = [
    { id: 1, name: "Dashboard", path: "/admin" },
    { id: 2, name: "Members", path: "/admin/members" },
    { id: 3, name: "Events", path: "/admin/events" },
    { id: 4, name: "Projects", path: "/admin/projects" },
  ];

  return (
    <div className="p-4 space-y-8">
      <div className="flex items-center">
        <img src="/logo.png" alt="logo" />
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
    </div>
  );
};

export default AdminSidebar;
