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
  label: string;
  icon: React.ReactNode;
  section: string;
}

export interface SocialLinkItem {
  href: string;
  icon: React.ReactNode;
  label: string;
}

export const navLinks: NavLinkItem[] = [
  { label: 'Home', icon: <FaHome />, section: 'home' },
  { label: 'Events', icon: <FaCalendarAlt />, section: 'events' },
  { label: 'Projects', icon: <FaRegClipboard />, section: 'projects' },
  { label: 'Members', icon: <FaUsers />, section: 'members' },
];

export const socialLinks: SocialLinkItem[] = [
  { href: 'https://linkedin.com/', icon: <FaLinkedin />, label: 'LinkedIn' },
  { href: 'https://discord.com/', icon: <FaDiscord />, label: 'Discord' },
  { href: 'https://instagram.com/', icon: <FaInstagram />, label: 'Instagram' },
];
