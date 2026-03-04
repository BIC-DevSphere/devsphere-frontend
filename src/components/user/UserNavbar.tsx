import MobileMenu from './navbar/MobileMenu';
import NavLinks from './navbar/NavLinks';
import SocialLinks from './navbar/SocialLinks';

const UserNavbar = () => {
  return (
    <nav className="border-border sticky top-0 z-50 flex w-full items-center justify-between border-b px-6 backdrop-blur-xl md:px-10">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img src="/logo.png" alt="Devsphere Logo" className="h-16 md:h-20" />
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden items-center gap-6 md:flex">
        <NavLinks />
      </div>

      {/* Desktop Social Icons */}
      <SocialLinks className="hidden md:flex" />

      {/* Mobile Hamburger Menu */}
      <MobileMenu />
    </nav>
  );
};

export default UserNavbar;
