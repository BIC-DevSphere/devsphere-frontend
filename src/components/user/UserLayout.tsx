import { Outlet } from 'react-router-dom';
import UserNavbar from '@/components/user/UserNavbar';
import UserFooter from '@/components/user/UserFooter';
import { ScrollSectionProvider } from '@/contexts/ScrollSectionContext';

const UserLayout = () => {
  return (
    <ScrollSectionProvider>
      <div>
        <UserNavbar />
        <Outlet />
        <UserFooter />
      </div>
    </ScrollSectionProvider>
  );
};

export default UserLayout;
