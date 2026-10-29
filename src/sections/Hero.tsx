import React from 'react';
import { profileData } from '../data/profile';
import { useTheme } from '../hooks/useTheme';

interface HeroProps {
  onWatchShowreel: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onWatchShowreel }) => {
  const { theme } = useTheme();

  return (
    <section
      id="home"
      className="relative min-h-[90vh] lg:min-h-screen pt-28 sm:pt-36 md:pt-40 pb-0 overflow-hidden flex items-center"
    >
      {/* Background Soft Glow behind head */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
        <div
          className="absolute right-0 top-1/4 sm:top-1/6 w-[360px] sm:w-[540px] h-[360px] sm:h-[540px] rounded-full blur-3xl transition-opacity duration-500 opacity-90"
          style={{
            background:
              theme === 'dark'
                ? 'radial-gradient(circle, rgba(255, 255, 255, 0.10) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(0, 0, 0, 0.06) 0%, transparent 70%)',
          }}
        />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-24 w-full relative z-10 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-end">
          
          {/* Left Column: Headline + Watch Showreel button */}
          <div className="lg:col-span-7 xl:col-span-6 flex flex-col z-20 pb-12 sm:pb-16 lg:pb-24">
            <h1 className="font-sans font-semibold text-4xl sm:text-6xl md:text-7xl lg:text-[76px] leading-[1.03] tracking-[-0.03em] text-black dark:text-white mb-8 sm:mb-10 max-w-xl">
              Turning ideas
              <br />
              into visual
              <br />
              stories
            </h1>

            {/* ONE button: Watch Showreel (hidden if no showreel set) */}
            {profileData.showreelVideo && (
              <div>
                <button
                  onClick={onWatchShowreel}
                  className="inline-flex items-center px-6 py-3 rounded-full text-xs sm:text-[13px] font-medium transition-all duration-300 bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                >
                  Watch Showreel
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Frameless Cutout Photo */}
          <div className="lg:col-span-5 xl:col-span-6 relative flex flex-col justify-end items-center lg:items-end z-10">
            <div className="relative w-full flex justify-center lg:justify-end items-end">
              
              {/* Soft contact shadow */}
              <div className="absolute -bottom-2 right-1/2 translate-x-1/2 lg:translate-x-0 lg:right-6 w-56 sm:w-72 lg:w-96 h-8 bg-black/20 dark:bg-black/60 rounded-full blur-xl pointer-events-none" />

              {/* Cutout Image with fade mask at bottom */}
              <picture
                className="relative block w-[85%] sm:w-[65%] md:w-[55%] lg:w-[92%] xl:w-[88%] max-w-[500px]"
                style={{
                  maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                }}
              >
                <source srcSet="/images/hero-cutout.webp" type="image/webp" />
                <img
                  src="/images/hero-cutout.png"
                  alt="Md Rukon Kholifa"
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
                  onError={(e) => {
                    // Silhouette fallback if file missing
                    const target = e.currentTarget;
                    target.style.opacity = '0.3';
                  }}
                />
              </picture>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
