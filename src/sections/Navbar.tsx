import React, { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { profileData } from '../data/profile';
import { XIcon, InstagramIcon, YouTubeIcon } from '../components/SocialIcons';
import {
  Sun,
  Moon,
  Menu,
  X as CloseIcon,
  ArrowRight,
} from 'lucide-react';

interface NavbarProps {
  currentRoute?: string;
  onNavigate?: (route: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute = 'home',
  onNavigate,
}) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (currentRoute === 'home') {
        const sections = ['home', 'videos', 'ai-creations', 'projects', 'about', 'contact'];
        const scrollPosition = window.scrollY + 200;

        for (const sectionId of sections) {
          const el = document.getElementById(sectionId);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(sectionId);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentRoute]);

  const navLinks = [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'videos', label: 'Videos', href: '#videos' },
    { id: 'ai-creations', label: 'AI Creations', href: '#ai-creations' },
    { id: 'projects', label: 'Projects', href: '#projects' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (id: string, href: string) => {
    setMobileMenuOpen(false);

    if (currentRoute !== 'home' && onNavigate) {
      onNavigate('home');
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    setActiveSection(id);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-[#070709]/85 backdrop-blur-xl border-b border-black/[0.06] dark:border-white/[0.06] py-3 shadow-sm'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={e => {
            e.preventDefault();
            handleNavClick('home', '#home');
          }}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-sm border border-black/10 dark:border-white/10">
            <img src="/logo/rk-logo.png" alt="RK Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-heading font-black tracking-tight text-base sm:text-lg text-black dark:text-white uppercase">
            {profileData.brandName}
          </span>
        </a>

        {/* Center Desktop Navigation Pills */}
        <div className="hidden md:flex items-center gap-1 bg-black/[0.03] dark:bg-white/[0.04] p-1.5 rounded-full border border-black/[0.04] dark:border-white/[0.06] backdrop-blur-md">
          {navLinks.map(link => {
            const isActive = activeSection === link.id && currentRoute === 'home';
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={e => {
                  e.preventDefault();
                  handleNavClick(link.id, link.href);
                }}
                className={`relative px-3.5 py-1.5 text-xs sm:text-[13px] font-medium rounded-full transition-all duration-200 ${
                  isActive
                    ? 'text-black dark:text-white bg-white dark:bg-[#1a1a1e] shadow-sm font-semibold'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Right Desktop Actions: Socials + Theme Toggle + Hire Me */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Social Icons */}
          <div className="flex items-center gap-1.5">
            <a
              href={profileData.socials.x}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter) Profile"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            >
              <XIcon className="w-3.5 h-3.5" />
            </a>

            <a
              href={profileData.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            >
              <InstagramIcon className="w-3.5 h-3.5" />
            </a>

            <a
              href={profileData.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube Channel"
              className="w-8 h-8 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            >
              <YouTubeIcon className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="h-4 w-[1px] bg-black/10 dark:bg-white/10 mx-0.5" />

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark / Light Theme"
            className="w-8 h-8 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/10 text-neutral-800 dark:text-neutral-200 hover:scale-105 active:scale-95 transition-all"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-neutral-800" />}
          </button>

          {/* Hire Me CTA Button */}
          <a
            href={profileData.socials.xDm}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-[13px] font-semibold transition-all duration-200 bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 shadow-sm hover:shadow"
          >
            <span>Hire Me</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Mobile Actions: Theme + Hamburger */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dark / Light Theme"
            className="w-8 h-8 rounded-full flex items-center justify-center bg-black/5 dark:bg-white/10 text-neutral-800 dark:text-neutral-200"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-neutral-800" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-xl text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            {mobileMenuOpen ? <CloseIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-3 pb-6 bg-white/95 dark:bg-[#070709]/95 backdrop-blur-2xl border-b border-black/10 dark:border-white/10 flex flex-col gap-3 shadow-xl">
          <div className="flex flex-col gap-1">
            {navLinks.map(link => (
              <a
                key={link.id}
                href={link.href}
                onClick={e => {
                  e.preventDefault();
                  handleNavClick(link.id, link.href);
                }}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activeSection === link.id && currentRoute === 'home'
                    ? 'bg-black/10 dark:bg-white/15 text-black dark:text-white font-semibold'
                    : 'text-neutral-700 dark:text-neutral-300 hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <a
                href={profileData.socials.x}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
              >
                <XIcon className="w-4 h-4" />
              </a>
              <a
                href={profileData.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href={profileData.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10"
              >
                <YouTubeIcon className="w-4 h-4" />
              </a>
            </div>

            <a
              href={profileData.socials.xDm}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-black text-white dark:bg-white dark:text-black"
            >
              <span>Hire Me</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
