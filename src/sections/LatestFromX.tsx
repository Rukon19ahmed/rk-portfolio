import React, { useMemo } from 'react';
import type { VideoItem } from '../data/videos';
import { videosData } from '../data/videos';
import { VideoCard } from '../components/VideoCard';
import { profileData } from '../data/profile';
import { ArrowRight } from 'lucide-react';
import { XIcon } from '../components/SocialIcons';

interface LatestFromXProps {
  onSelectVideo: (video: VideoItem) => void;
}

export const LatestFromX: React.FC<LatestFromXProps> = ({ onSelectVideo }) => {
  const xVideos = useMemo(() => {
    return videosData
      .filter(v => v.platform === 'x')
      .sort((a, b) => b.views - a.views);
  }, []);

  return (
    <section id="videos" className="py-8 sm:py-12">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-6 h-6 rounded-md bg-black dark:bg-white text-white dark:text-black flex items-center justify-center">
                <XIcon className="w-3.5 h-3.5" />
              </div>
              <h2 className="font-heading font-black text-xl sm:text-2xl text-black dark:text-white tracking-tight">
                Latest from X (Twitter)
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400">
              My viral videos and latest content from X. Sorted by real-time views.
            </p>
          </div>

          <a
            href={profileData.socials.x}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center self-start sm:self-auto gap-2 px-4 py-2 rounded-full border border-black/15 dark:border-white/15 hover:border-black/30 dark:hover:border-white/30 text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white bg-transparent transition-all hover:scale-[1.02]"
          >
            <span>View All on X</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {xVideos.slice(0, 5).map(video => (
            <VideoCard
              key={video.id}
              video={video}
              variant="x-card"
              onSelect={onSelectVideo}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
