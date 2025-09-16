import { BrowserRouter, Routes, Route } from "react-router-dom";

// User Imports
import UserEvents from "./pages/user/UserEvents";
import UserHome from "@/pages/user/UserHome";
import UserMembers from "@/pages/user/UserMembers";
import UserProjects from "./pages/user/UserProjects";
import UserLayout from "@/components/UserLayout";

// Admin Imports
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminEvents from "@/pages/admin/AdminEvents";
import AdminMembers from "@/pages/admin/AdminMembers";
import AdminProjects from "@/pages/admin/AdminProjects";
import AdminLayout from "@/components/AdminLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<UserLayout />}>
          <Route index element={<UserHome />} />
          <Route path="events" element={<UserEvents />} />
          <Route path="members" element={<UserMembers />} />
          <Route path="projects" element={<UserProjects />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="login" element={<AdminLogin />} />
          <Route path="events" element={<AdminEvents />} />
          <Route path="members" element={<AdminMembers />} />
          <Route path="projects" element={<AdminProjects />} />
        </Route>
        <Route />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
