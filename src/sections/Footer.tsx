import React from 'react';
import { profileData } from '../data/profile';

interface FooterProps {
  onNavigate?: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Videos', href: '#videos' },
    { label: 'AI Creations', href: '#ai-creations' },
    { label: 'Projects', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = (href: string) => {
    if (onNavigate) {
      onNavigate('home');
      setTimeout(() => {
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="py-8 sm:py-10 border-t border-black/8 dark:border-white/10 mt-8 bg-transparent">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left: Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-1">
              <div className="w-6 h-6 rounded-md bg-black dark:bg-white text-white dark:text-black flex items-center justify-center font-black text-xs font-heading">
                RK
              </div>
              <span className="font-heading font-black tracking-tight text-sm uppercase text-black dark:text-white">
                {profileData.brandName}
              </span>
            </div>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
              Video Editor | AI Creator | Visual Storyteller
            </p>
          </div>

          {/* Center: Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs font-medium text-neutral-600 dark:text-neutral-400">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={e => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="hover:text-black dark:hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right: Copyright */}
          <div className="text-xs text-neutral-500 dark:text-neutral-500 text-center md:text-right">
            © 2026 {profileData.brandName}. All rights reserved.
          </div>

        </div>
      </div>
    </footer>
  );
};
