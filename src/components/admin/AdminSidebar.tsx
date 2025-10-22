import { Link, NavLink } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { authClient } from '@/lib/authClient';
import toast from 'react-hot-toast';
import {
  CalendarCog,
  KanbanIcon,
  LayoutDashboardIcon,
  Settings,
  Tags,
  Users,
  Moon,
  Sun,
} from 'lucide-react';
import { useState } from 'react';

const AdminSidebar = ({ toggleDarkMode, isDarkMode = false }) => {
  const sidebarItems = [
    { id: 1, name: 'Dashboard', icon: LayoutDashboardIcon, path: '/admin' },
    { id: 2, name: 'Members', icon: Users, path: '/admin/members' },
    { id: 3, name: 'Events', icon: CalendarCog, path: '/admin/events' },
    { id: 4, name: 'Projects', icon: KanbanIcon, path: '/admin/projects' },
    { id: 5, name: 'Tags', icon: Tags, path: '/admin/tags' },
    { id: 6, name: 'Settings', icon: Settings, path: '/admin/settings' },
  ];

  const logout = async () => {
    try {
      const response = await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success('Logged out successfully');
            console.log('Successfully logged out');
          },
          onError: (error) => {
            toast.error('Error logging out');
            console.error('Logout error:', error);
          },
        },
      });
      console.log('Logout successful:', response);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center space-y-8 p-4">
      <div className="flex items-center justify-center py-4">
        <img src="/logo.png" alt="DevSphere Logo" className="h-20 w-auto" />
      </div>
      <div className="space-y-8 p-4">
        <nav className="flex flex-col items-center gap-6">
          {sidebarItems.slice(0, 3).map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.path === '/admin'}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center gap-1.5 rounded-lg p-3 text-center transition-all duration-200 hover:scale-105 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:hover:bg-gray-800 ${
                    isActive
                      ? 'bg-blue-100 text-blue-600 shadow-sm dark:bg-blue-900 dark:text-blue-300'
                      : 'text-gray-600 dark:text-gray-300'
                  }`
                }
                aria-label={`Navigate to ${item.name}`}
                role="link"
              >
                <Icon className="h-6 w-6" aria-hidden="true" />
                <span className="text-xs font-medium">{item.name}</span>
              </NavLink>
            );
          })}

          <div className="my-2 h-px w-12 bg-gray-300 dark:bg-gray-600" />

          {sidebarItems.slice(3).map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center gap-1.5 rounded-lg p-3 text-center transition-all duration-200 hover:scale-105 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none dark:hover:bg-gray-800 ${
                    isActive
                      ? 'bg-blue-100 text-blue-600 shadow-sm dark:bg-blue-900 dark:text-blue-300'
                      : 'text-gray-600 dark:text-gray-300'
                  }`
                }
                aria-label={`Navigate to ${item.name}`}
                role="link"
              >
                <Icon className="h-6 w-6" aria-hidden="true" />
                <span className="text-xs font-medium">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="absolute bottom-4">
          <Button onClick={toggleDarkMode}>Switch Theme</Button>
        </div>
        <div>
          <Button onClick={logout}>Logout</Button>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
