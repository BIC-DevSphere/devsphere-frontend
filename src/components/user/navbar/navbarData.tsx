import {
  FaHome,
  FaCalendarAlt,
  FaRegClipboard,
  FaUsers,
  FaLinkedin,
  FaDiscord,
  FaInstagram,
} from 'react-icons/fa';

export interface NavLinkItem {
  to: string;
  label: string;
  icon: React.ReactNode;
}

export interface SocialLinkItem {
  href: string;
  icon: React.ReactNode;
  label: string;
}

export const navLinks: NavLinkItem[] = [
  { to: '/', label: 'Home', icon: <FaHome /> },
  { to: '/events', label: 'Events', icon: <FaCalendarAlt /> },
  { to: '/projects', label: 'Projects', icon: <FaRegClipboard /> },
  { to: '/members', label: 'Members', icon: <FaUsers /> },
];

export const socialLinks: SocialLinkItem[] = [
  { href: 'https://linkedin.com/', icon: <FaLinkedin />, label: 'LinkedIn' },
  { href: 'https://discord.com/', icon: <FaDiscord />, label: 'Discord' },
  { href: 'https://instagram.com/', icon: <FaInstagram />, label: 'Instagram' },
];
