import React, { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';
import { profileData } from '../data/profile';
import { Sun, Moon, Menu, X as CloseIcon } from 'lucide-react';

interface NavbarProps {
  currentRoute?: string;
  onNavigate?: (route: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentRoute = 'home', onNavigate }) => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (target: string) => {
    setMobileMenuOpen(false);
    if (target === 'work') {
      if (currentRoute !== 'home' && onNavigate) {
        onNavigate('home');
        setTimeout(() => {
          document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (target === 'about') {
      if (currentRoute !== 'home' && onNavigate) {
        onNavigate('home');
        setTimeout(() => {
          document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#f7f7f5]/80 dark:bg-[#070707]/80 backdrop-blur-md border-b border-black/[0.04] dark:border-white/[0.06] py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-24 flex items-center justify-between">
        
        {/* Left: Tiny "RK" Logo */}
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            if (onNavigate) onNavigate('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 group cursor-pointer"
          aria-label={profileData.brand}
        >
          <div className="w-7 h-7 flex items-center justify-center font-bold tracking-tight text-base font-sans text-black dark:text-white">
            <span>RK</span>
          </div>
        </a>

        {/* Center: Three quiet links (Work, About, Contact) */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => handleLinkClick('work')}
            className="text-xs sm:text-[13px] font-medium text-neutral-600 dark:text-[#9a9a9a] hover:text-black dark:hover:text-white transition-colors"
          >
            Work
          </button>
          <button
            onClick={() => handleLinkClick('about')}
            className="text-xs sm:text-[13px] font-medium text-neutral-600 dark:text-[#9a9a9a] hover:text-black dark:hover:text-white transition-colors"
          >
            About
          </button>
          <a
            href={`mailto:${profileData.email}`}
            className="text-xs sm:text-[13px] font-medium text-neutral-600 dark:text-[#9a9a9a] hover:text-black dark:hover:text-white transition-colors"
          >
            Contact
          </a>
        </div>

        {/* Right: Theme Toggle + "Hire Me" Pill */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-1.5 rounded-full text-neutral-600 dark:text-[#9a9a9a] hover:text-black dark:hover:text-white transition-colors"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-neutral-300" /> : <Moon className="w-4 h-4 text-neutral-700" />}
          </button>

          <a
            href={`mailto:${profileData.email}?subject=Project%20Inquiry%20for%20RK%20CREATIVE`}
            className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200 bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Menu Actions */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 text-neutral-600 dark:text-[#9a9a9a]"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Open navigation menu"
            className="p-2 text-black dark:text-white"
          >
            {mobileMenuOpen ? <CloseIcon className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 pt-4 pb-6 bg-[#f7f7f5]/98 dark:bg-[#070707]/98 backdrop-blur-2xl border-b border-black/[0.06] dark:border-white/[0.08] flex flex-col gap-4 animate-fade-in">
          <button
            onClick={() => handleLinkClick('work')}
            className="text-left text-sm font-medium text-neutral-800 dark:text-neutral-200 py-1"
          >
            Work
          </button>
          <button
            onClick={() => handleLinkClick('about')}
            className="text-left text-sm font-medium text-neutral-800 dark:text-neutral-200 py-1"
          >
            About
          </button>
          <a
            href={`mailto:${profileData.email}`}
            className="text-sm font-medium text-neutral-800 dark:text-neutral-200 py-1"
          >
            Contact
          </a>

          <div className="pt-2 border-t border-black/[0.06] dark:border-white/[0.08]">
            <a
              href={`mailto:${profileData.email}?subject=Project%20Inquiry%20for%20RK%20CREATIVE`}
              className="inline-block text-center w-full py-2.5 rounded-full text-xs font-semibold bg-black text-white dark:bg-white dark:text-black"
            >
              Hire Me
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
