import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

// User Imports
import UserEvents from "./pages/user/UserEvents";
import UserHome from "@/pages/user/UserHome";
import UserMembers from "@/pages/user/UserMembers";
import UserProjects from "./pages/user/UserProjects";
import UserLayout from "@/components/user/UserLayout";

// Admin Imports
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminEvents from "@/pages/admin/AdminEvents";
import AdminMembers from "@/pages/admin/AdminMembers";
import AdminProjects from "@/pages/admin/AdminProjects";
import AdminLayout from "@/components/admin/AdminLayout";
import { useSession } from "./lib/auth-client";
import { useEffect } from "react";

const AdminPublicRoute = ({ children }) => {
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (session.data) {
      navigate("/admin");
    }
  }, [session.data, navigate]);

  return children;
};

const AdminPrivateRoute = ({ children }) => {
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session.data) {
      navigate("/admin/login");
    }
  }, [session.data, navigate]);

  return children;
};
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
        <Route
          path="/admin/login"
          element={
            <AdminPublicRoute>
              <AdminLogin />
            </AdminPublicRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminPrivateRoute>
              <AdminLayout />
            </AdminPrivateRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
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
