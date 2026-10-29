import React from 'react';
import { profileData } from '../data/profile';
import { useTheme } from '../hooks/useTheme';
import { Play, Send, Briefcase, Settings, User } from 'lucide-react';

interface HeroProps {
  onWatchShowreel: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onWatchShowreel }) => {
  const { theme } = useTheme();

  return (
    <section
      id="home"
      className="relative min-h-[560px] md:min-h-[640px] lg:min-h-[680px] pt-28 sm:pt-32 md:pt-36 pb-8 sm:pb-12 overflow-hidden flex items-center"
    >
      {/* ======================================================== */}
      {/* DECORATIVE BACKDROP LAYER BEHIND CUTOUT */}
      {/* ======================================================== */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        {/* Soft Radial Glow behind person's head & shoulders */}
        <div
          className="absolute right-0 top-1/4 sm:top-1/6 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full blur-3xl transition-opacity duration-500 opacity-80"
          style={{
            background:
              theme === 'dark'
                ? 'radial-gradient(circle, rgba(255, 255, 255, 0.10) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(0, 0, 0, 0.06) 0%, transparent 70%)',
          }}
        />

        {/* Big faint outlined text "CREATIVE" behind the shoulder */}
        <div className="hidden sm:block absolute right-[-20px] sm:right-6 top-1/4 sm:top-1/3 font-heading font-black text-[90px] sm:text-[140px] lg:text-[200px] leading-none tracking-tighter text-black/[0.05] dark:text-white/[0.04] uppercase select-none">
          CREATIVE
        </div>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          
          {/* ======================================================== */}
          {/* CUTOUT IMAGE: Order 1 on Mobile (TOP), Order 2 on Desktop (RIGHT) */}
          {/* ======================================================== */}
          <div className="order-1 lg:order-2 lg:col-span-5 xl:col-span-6 relative flex flex-col justify-end items-center lg:items-end w-full min-h-[280px] sm:min-h-[380px] lg:min-h-[580px] z-10">
            
            {/* Separate Handwritten Quote at Top Right (Rotated -6deg) */}
            <div className="absolute top-0 right-2 sm:right-6 lg:right-4 z-20 text-right select-none pointer-events-none">
              <p className="font-script text-sm sm:text-xl lg:text-2xl font-bold leading-tight text-[#111111] dark:text-white drop-shadow-sm transform rotate-[-6deg] transition-colors duration-300">
                "Edit.<br />Create.<br />Explore.<br />Repeat."
              </p>
            </div>

            {/* Cutout Image Container anchored bottom */}
            <div className="relative w-full flex justify-center lg:justify-end items-end pt-2 sm:pt-0">
              
              {/* Soft contact shadow ellipse under the person */}
              <div className="absolute -bottom-2 right-1/2 translate-x-1/2 lg:translate-x-0 lg:right-8 w-56 sm:w-80 lg:w-96 h-8 sm:h-10 bg-black/25 dark:bg-black/60 rounded-full blur-xl pointer-events-none" />

              {/* Cutout Photo with Alpha Transparency */}
              <picture
                className="relative block w-[75%] sm:w-[60%] md:w-[50%] lg:w-[95%] xl:w-[90%] max-w-[320px] sm:max-w-[420px] lg:max-w-[520px]"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 82%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 82%, transparent 100%)',
                }}
              >
                <source srcSet="/images/hero-cutout.webp" type="image/webp" />
                <img
                  src="/images/hero-cutout.png"
                  alt="Md Rukon Kholifa (RK) editing at workstation"
                  loading="eager"
                  fetchPriority="high"
                  width={760}
                  height={540}
                  className="w-full h-auto object-contain object-bottom select-none pointer-events-none transition-all duration-300 ease-out"
                  style={{
                    filter:
                      theme === 'dark'
                        ? 'grayscale(1) contrast(1.1) brightness(0.9)'
                        : 'none',
                  }}
                />
              </picture>

              {/* Separate Handwritten Signature at Bottom Right */}
              <div className="absolute bottom-2 sm:bottom-6 right-3 sm:right-6 lg:right-0 z-20 text-right select-none pointer-events-none">
                <span className="font-signature text-xl sm:text-3xl lg:text-4xl text-[#111111] dark:text-white drop-shadow-sm italic tracking-wider transition-colors duration-300">
                  RK Creative
                </span>
              </div>
            </div>

          </div>

          {/* ======================================================== */}
          {/* TEXT, BUTTONS, BADGES: Order 2 on Mobile, Order 1 on Desktop */}
          {/* ======================================================== */}
          <div className="order-2 lg:order-1 lg:col-span-7 xl:col-span-6 flex flex-col z-20 text-center lg:text-left items-center lg:items-start">
            {/* Small uppercase category badge */}
            <div className="mb-2 sm:mb-4">
              <span className="text-[11px] sm:text-[12px] font-semibold tracking-[0.2em] uppercase text-neutral-500 dark:text-neutral-400">
                {profileData.roleTagline}
              </span>
            </div>

            {/* Giant Condensed Headline */}
            <h1 className="font-heading font-black text-3xl sm:text-5xl md:text-6xl lg:text-[62px] leading-[1.04] tracking-tight uppercase text-black dark:text-white mb-3 sm:mb-5">
              <span>{profileData.heroTitle.line1}</span>
              <br />
              <span className="text-neutral-900 dark:text-neutral-100">{profileData.heroTitle.line2}</span>
            </h1>

            {/* Subtitle description */}
            <div className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-base font-medium space-y-1 mb-6 sm:mb-8 max-w-xl">
              <p>{profileData.heroSubtitle.line1}</p>
              <p>{profileData.heroSubtitle.line2}</p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-4 mb-7 sm:mb-12">
              <button
                onClick={onWatchShowreel}
                className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 shadow-md hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="w-5 h-5 rounded-full bg-white/20 dark:bg-black/15 flex items-center justify-center">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Watch Showreel</span>
              </button>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 bg-white/80 dark:bg-white/5 border border-black/15 dark:border-white/15 text-neutral-900 dark:text-neutral-100 hover:bg-black/5 dark:hover:bg-white/10 hover:border-black/30 dark:hover:border-white/30"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Contact Me</span>
              </a>
            </div>

            {/* Three Mini Feature Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-2 pt-2 border-t border-black/8 dark:border-white/10 w-full max-w-xl">
              {profileData.miniBadges.map((badge, idx) => (
                <div key={idx} className="flex items-center justify-center lg:justify-start gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 flex items-center justify-center flex-shrink-0 text-neutral-800 dark:text-neutral-200">
                    {badge.icon === 'briefcase' && <Briefcase className="w-3.5 h-3.5" />}
                    {badge.icon === 'settings' && <Settings className="w-3.5 h-3.5" />}
                    {badge.icon === 'user' && <User className="w-3.5 h-3.5" />}
                  </div>
                  <div className="text-[11px] leading-tight text-left">
                    <span className="text-neutral-500 dark:text-neutral-400 block">{badge.title}</span>
                    <span className="font-semibold text-neutral-900 dark:text-neutral-100 block">{badge.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
