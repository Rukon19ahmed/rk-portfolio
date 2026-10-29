import React from 'react';
import type { VideoItem } from '../data/videos';
import { videosData } from '../data/videos';
import { WorkCard } from '../components/WorkCard';

interface WorkSectionProps {
  onSelectVideo: (video: VideoItem) => void;
  onViewAll: () => void;
}

export const WorkSection: React.FC<WorkSectionProps> = ({ onSelectVideo, onViewAll }) => {
  // Sort by views desc
  const allVideosSorted = [...videosData].sort((a, b) => (b.views || 0) - (a.views || 0));

  const xVideos = allVideosSorted.filter((v) => v.platform === 'x').slice(0, 4);
  const reels = allVideosSorted.filter((v) => v.platform === 'instagram').slice(0, 5);

  return (
    <section id="work" className="py-16 sm:py-24 lg:py-28 relative">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-24">
        
        {/* Section Heading: "Latest work" on left, "View all" on right */}
        <div className="flex items-baseline justify-between mb-10 sm:mb-12">
          <h2 className="font-sans font-semibold text-2xl sm:text-3xl lg:text-4xl tracking-[-0.02em] text-black dark:text-white">
            Latest work
          </h2>
          <button
            onClick={onViewAll}
            className="text-xs sm:text-sm font-medium text-neutral-500 dark:text-[#9a9a9a] hover:text-black dark:hover:text-white transition-colors"
          >
            View all
          </button>
        </div>

        {/* Row A: X Videos (4 equal cards in desktop grid, scroll-snap on small screens) */}
        {xVideos.length > 0 && (
          <div className="mb-16 sm:mb-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
              {xVideos.map((video) => (
                <WorkCard
                  key={video.id}
                  video={video}
                  onClick={() => onSelectVideo(video)}
                  variant="x-video"
                />
              ))}
            </div>
          </div>
        )}

        {/* Row B: Instagram Reels (5 tall 9:16 cards, tiny view-count badge, title on hover) */}
        {reels.length > 0 && (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6">
              {reels.map((video) => (
                <WorkCard
                  key={video.id}
                  video={video}
                  onClick={() => onSelectVideo(video)}
                  variant="reel"
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
