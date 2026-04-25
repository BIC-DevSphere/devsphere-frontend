import { scrollToSection } from '@/hooks/useScrollSection';
import { navLinks } from './navbarData';
import { useScrollSectionContext } from '@/contexts/ScrollSectionContext';

interface NavLinksProps {
  onClick?: () => void;
}

const NavLinks = ({ onClick }: NavLinksProps) => {
  const { activeSection } = useScrollSectionContext();

  return (
    <>
      {navLinks.map(({ label, icon, section }) => (
        <button
          key={section}
          onClick={() => {
            scrollToSection(section);
            onClick?.();
          }}
          className={`flex items-center gap-2 rounded-full px-6 py-2 text-lg font-medium transition ${
            activeSection === section ? 'border-r-2 border-b-2 text-red-700' : ''
          }`}
        >
          <span className="text-xl">{icon}</span>
          {label}
        </button>
      ))}
    </>
  );
};

export default NavLinks;
