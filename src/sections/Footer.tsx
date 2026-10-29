import React from 'react';
import { profileData } from '../data/profile';

export const Footer: React.FC = () => {
  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Videos (X)', href: '#videos' },
    { label: 'Instagram Reels', href: '#reels' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="py-8 border-t border-black/[0.06] dark:border-white/[0.06] bg-white/50 dark:bg-[#070709]/50 backdrop-blur-md">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* BRAND */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg overflow-hidden flex items-center justify-center border border-black/10 dark:border-white/10 shadow-sm">
              <img src="/logo/rk-logo.png" alt="RK Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-black text-sm text-black dark:text-white tracking-tight uppercase">
                {profileData.brandName}
              </span>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400">
                AI Film Creator &nbsp;|&nbsp; Video Editor &nbsp;|&nbsp; Visual Storyteller
              </span>
            </div>
          </div>

          {/* NAV LINKS */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-neutral-600 dark:text-neutral-400">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-black dark:hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* COPYRIGHT */}
          <div className="text-xs text-neutral-500 dark:text-neutral-500">
            © 2026 {profileData.brandName}. All rights reserved.
          </div>

        </div>
      </div>
    </footer>
  );
};
