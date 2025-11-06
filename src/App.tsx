import Loading from '@/components/Loading';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

// User Imports
import UserEvents from './pages/user/UserEvents';
import UserHome from '@/pages/user/UserHome';
import UserMembers from '@/pages/user/UserMembers';
import UserProjects from './pages/user/UserProjects';
import UserLayout from '@/components/user/UserLayout';

// Admin Imports
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminEvents from '@/pages/admin/AdminEvents';
import AdminEventDetails from '@/pages/admin/AdminEventDetails';
import AdminMembers from '@/pages/admin/AdminMembers';
import AdminProjects from '@/pages/admin/AdminProjects';
import AdminLayout from '@/components/admin/AdminLayout';
import { useSession } from './lib/authClient';
import { useEffect } from 'react';
import AdminProjectEditor from '@/pages/admin/AdminProjectEditor';
import AdminTags from '@/pages/admin/AdminTags';
import AdminSettings from './pages/admin/AdminSettings';

const AdminPublicRoute = ({ children }) => {
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session.isPending && session.data) {
      navigate('/admin');
    }
  }, [session.isPending, session.data, navigate]);

  if (session.isPending) {
    return <Loading />;
  }

  return children;
};

const AdminPrivateRoute = ({ children }) => {
  const session = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session.isPending && !session.data) {
      navigate('/admin/login');
    }
  }, [session.isPending, session.data, navigate]);

  if (session.isPending) {
    return <Loading />;
  }

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
          <Route path="events/:id" element={<AdminEventDetails />} />
          <Route path="members" element={<AdminMembers />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="projects/:id" element={<AdminProjectEditor />} />
          <Route path="projects/new" element={<AdminProjectEditor />} />
          <Route path="tags" element={<AdminTags />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>
        <Route />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
