import React from 'react';
import { profileData } from '../data/profile';
import { useTheme } from '../hooks/useTheme';
import { Play, Send, Briefcase, Settings, User } from 'lucide-react';

interface HeroProps {
  onWatchShowreel: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onWatchShowreel }) => {
  const { theme } = useTheme();

  const heroImageSrc = theme === 'dark' ? profileData.images.heroDark : profileData.images.heroLight;

  return (
    <section id="home" className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* Left Column: Headline, Subtitle, CTA & Badges */}
          <div className="lg:col-span-7 flex flex-col z-10">
            {/* Small uppercase category badge */}
            <div className="mb-3 sm:mb-4">
              <span className="text-[11px] sm:text-[12px] font-semibold tracking-[0.2em] uppercase text-neutral-500 dark:text-neutral-400">
                {profileData.roleTagline}
              </span>
            </div>

            {/* Giant Condensed Headline */}
            <h1 className="font-heading font-black text-4xl sm:text-5xl md:text-6xl lg:text-[62px] leading-[1.04] tracking-tight uppercase text-black dark:text-white mb-4 sm:mb-5">
              <span>{profileData.heroTitle.line1}</span>
              <br />
              <span className="text-neutral-900 dark:text-neutral-100">{profileData.heroTitle.line2}</span>
            </h1>

            {/* Subtitle description */}
            <div className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base font-medium space-y-1 mb-7 sm:mb-8 max-w-xl">
              <p>{profileData.heroSubtitle.line1}</p>
              <p>{profileData.heroSubtitle.line2}</p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-9 sm:mb-12">
              {/* Watch Showreel */}
              <button
                onClick={onWatchShowreel}
                className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 shadow-md hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="w-5 h-5 rounded-full bg-white/20 dark:bg-black/15 flex items-center justify-center">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Watch Showreel</span>
              </button>

              {/* Contact Me */}
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 bg-white/80 dark:bg-white/5 border border-black/15 dark:border-white/15 text-neutral-900 dark:text-neutral-100 hover:bg-black/5 dark:hover:bg-white/10 hover:border-black/30 dark:hover:border-white/30"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Three Mini Feature Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-2 pt-2 border-t border-black/8 dark:border-white/10 max-w-xl">
              {profileData.miniBadges.map((badge, idx) => (
                <div key={idx} className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center flex-shrink-0 text-neutral-800 dark:text-neutral-200">
                    {badge.icon === 'briefcase' && <Briefcase className="w-3.5 h-3.5" />}
                    {badge.icon === 'settings' && <Settings className="w-3.5 h-3.5" />}
                    {badge.icon === 'user' && <User className="w-3.5 h-3.5" />}
                  </div>
                  <div className="text-[11px] leading-tight">
                    <span className="text-neutral-500 dark:text-neutral-400 block">{badge.title}</span>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100 block">{badge.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Hero Workspace Image + Quote & Signature */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 bg-neutral-900 aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] max-w-lg mx-auto">
              {/* Background Editor Image */}
              <img
                src={heroImageSrc}
                alt="RK Creative workspace setup with video timeline"
                className="w-full h-full object-cover object-center transition-all duration-700"
              />

              {/* Dark/Light Edge Gradients for Cinematic Feel */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 dark:from-[#070707]/90 dark:via-transparent dark:to-transparent pointer-events-none" />

              {/* Top Right Handwritten Script Quote */}
              <div className="absolute top-4 right-5 sm:top-6 sm:right-6 text-right select-none pointer-events-none">
                <p className="font-script text-white text-lg sm:text-2xl font-bold leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] opacity-90 transform rotate-[-3deg]">
                  "Edit.<br />Create.<br />Explore.<br />Repeat."
                </p>
              </div>

              {/* Bottom Right Handwritten Signature */}
              <div className="absolute bottom-4 right-5 sm:bottom-5 sm:right-6 text-right select-none pointer-events-none">
                <span className="font-signature text-2xl sm:text-3xl text-white/90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] italic tracking-wider">
                  R.K. Creative
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

