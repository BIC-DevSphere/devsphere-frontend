import { socialLinks } from './navbarData';

interface SocialLinksProps {
  className?: string;
}

const SocialLinks = ({ className }: SocialLinksProps) => {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {socialLinks.map(({ href, icon, label }, idx) => (
        <a
          key={`social-item-${idx}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          className="text-2xl transition-transform hover:scale-110 text-red-700"
        >
          {icon}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
