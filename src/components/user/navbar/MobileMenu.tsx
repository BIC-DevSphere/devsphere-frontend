import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import NavLinks from './NavLinks';
import SocialLinks from './SocialLinks';

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);
  const close = () => setIsOpen(false);

  return (
    <div className="flex md:hidden">
      {/* Hamburger button */}
      <button
        onClick={toggle}
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
        className="rounded-md p-2 transition hover:bg-gray-100"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Dropdown mobile menu */}
      {isOpen && (
        <div className="border-border bg-white absolute top-full left-0 w-full border-b shadow-lg">
          <nav className="flex flex-col gap-2 px-6 py-4">
            <NavLinks onClick={close} />
          </nav>
          <div className="border-border border-t px-6 py-4">
            <SocialLinks />
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
