import React from 'react';
import type { VideoItem } from '../data/videos';
import { videosData } from '../data/videos';
import { VideoCard } from '../components/VideoCard';
import { ArrowRight } from 'lucide-react';
import { profileData } from '../data/profile';
import { InstagramIcon } from '../components/SocialIcons';

interface InstagramReelsProps {
  onSelectVideo: (video: VideoItem) => void;
}

export const InstagramReels: React.FC<InstagramReelsProps> = ({ onSelectVideo }) => {
  const instagramReels = videosData.filter((v) => v.platform === 'instagram');

  return (
    <section id="reels" className="py-8 sm:py-12">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white shadow-sm">
                <InstagramIcon className="w-3.5 h-3.5 text-white" />
              </div>
              <h2 className="font-heading font-black text-xl sm:text-2xl text-black dark:text-white tracking-tight">
                Instagram Reels
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
              Short cinematic films & AI visual stories from @rk.creative.ai
            </p>
          </div>

          <a
            href={profileData.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center self-start sm:self-auto gap-2 px-4 py-2 rounded-full border border-black/15 dark:border-white/15 hover:border-black/30 dark:hover:border-white/30 text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white bg-transparent transition-all hover:scale-[1.02]"
          >
            <span>View on Instagram</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 6 Real Reels Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3.5 sm:gap-4">
          {instagramReels.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              variant="reel"
              onSelect={onSelectVideo}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

