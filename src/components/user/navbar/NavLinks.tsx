import { NavLink } from 'react-router-dom';
import { navLinks } from './navbarData';

interface NavLinksProps {
  onClick?: () => void;
}

const NavLinks = ({ onClick }: NavLinksProps) => {
  return (
    <>
      {navLinks.map(({ to, label, icon }, idx) => (
        <NavLink
          key={idx}
          to={to}
          onClick={onClick}
          className={({ isActive }) =>
            `flex items-center gap-2 rounded-full px-6 py-2 text-lg font-medium transition ${
              isActive ? 'border-r border-b text-red-500' : ''
            }`
          }
        >
          <span className="text-xl">{icon}</span>
          {label}
        </NavLink>
      ))}
    </>
  );
};

export default NavLinks;
