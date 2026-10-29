import React from 'react';
import { profileData } from '../data/profile';
import { XIcon, InstagramIcon } from '../components/SocialIcons';

export const Footer: React.FC = () => {
  return (
    <footer id="footer" className="py-12 sm:py-16 mt-20 border-t border-black/[0.04] dark:border-white/[0.06] bg-transparent">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-24">
        {/* One quiet line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Left: Brand name */}
          <div className="font-sans font-medium text-sm text-black dark:text-white">
            {profileData.brand}
          </div>

          {/* Right: Social icons + Tiny copyright */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-neutral-500 dark:text-[#9a9a9a]">
              <a
                href={profileData.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="hover:text-black dark:hover:text-white transition-colors"
              >
                <XIcon className="w-4 h-4" />
              </a>

              <a
                href={profileData.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-black dark:hover:text-white transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
            </div>

            <span className="text-xs text-neutral-400 dark:text-neutral-600">
              © 2026
            </span>
          </div>

        </div>
      </div>
    </footer>
  );
};
