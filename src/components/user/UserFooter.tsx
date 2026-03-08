import { FaDiscord, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const socialLinks = [
  {
    href: 'https://discord.com/',
    icon: <FaDiscord className="text-blue-600" />,
    label: 'Discord',
  },
  {
    href: 'https://instagram.com/',
    icon: <FaInstagram className="text-red-400" />,
    label: 'Instagram',
  },
  {
    href: 'https://linkedin.com/',
    icon: <FaLinkedin className="text-sky-600" />,
    label: 'LinkedIn',
  },
];

const quickLinks = [
  { to: '/members', label: 'Members' },
  { to: '/events', label: 'Events' },
  { to: '/projects', label: 'Projects' },
];

const communityLinks = [
  { to: '/', label: 'How it works!' },
  { to: '/', label: 'Get in touch' },
];

const UserFooter = () => {
  return (
    <footer className="text-foreground border-border w-full space-y-10 border-t px-10 py-8">
      <div className="flex flex-col gap-10 md:flex-row md:justify-between">
        {/* Left Section */}
        <div className="space-y-4 md:max-w-1/5">
          <img src="/logo.png" alt="Devsphere Logo" className="h-20" />
          <p className="text-base">
            Join our Discord channel or follow us on Instagram to keep up to date with our latest
            work, events and announcements.
          </p>
          <div className="flex gap-4">
            {socialLinks.map(({ href, icon, label }, idx) => (
              <a
                key={`social-item-${idx}`}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-2xl transition-transform hover:scale-110"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
        {/* Quick Link */}
        <div className="space-y-4">
          <p className="text-primary text-xl font-bold">Quick Link</p>
          <ul className="space-y-2">
            {quickLinks.map(({ to, label }, idx) => (
              <li key={`qlink-item-${idx}`}>
                <Link to={to} className="hover:underline">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Community */}
        <div className="space-y-4">
          <p className="text-primary text-xl font-bold">Community</p>
          <ul className="space-y-2">
            {communityLinks.map(({ to, label }, idx) => (
              <li key={`clink-item-${idx}`}>
                <Link to={to} className="hover:underline">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Copyright and Privacy Terms */}
      <div className="flex flex-col justify-between text-sm sm:flex-row sm:items-center">
        <div className="text-sm">Copyright © 2025 Devsphere All Rights Reserved.</div>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">
            Privacy Policy
          </Link>
          <Link to="/" className="hover:underline">
            Terms of Use
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default UserFooter;
