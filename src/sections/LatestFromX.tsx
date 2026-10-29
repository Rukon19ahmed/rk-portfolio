import React, { useState, useMemo } from 'react';
import type { VideoItem } from '../data/videos';
import { videosData } from '../data/videos';
import { VideoCard } from '../components/VideoCard';
import { profileData } from '../data/profile';
import { ArrowRight, Sparkles } from 'lucide-react';
import { XIcon } from '../components/SocialIcons';

interface LatestFromXProps {
  onSelectVideo: (video: VideoItem) => void;
}

export const LatestFromX: React.FC<LatestFromXProps> = ({ onSelectVideo }) => {
  const [activeTab, setActiveTab] = useState<'featured' | 'real'>('featured');

  // Featured 5 from reference design
  const featuredXVideos = useMemo(() => {
    return videosData
      .filter(v => v.platform === 'x' && !v.isRealPost)
      .sort((a, b) => b.views - a.views)
      .slice(0, 5);
  }, []);

  // Real posts from user's Twitter profile screenshots
  const realXVideos = useMemo(() => {
    return videosData
      .filter(v => v.platform === 'x' && v.isRealPost)
      .sort((a, b) => b.views - a.views);
  }, []);

  const displayedVideos = activeTab === 'featured' ? featuredXVideos : realXVideos;

  return (
    <section id="videos" className="py-8 sm:py-12">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex flex-col">
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="w-6 h-6 rounded-md bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shadow-sm">
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

          <div className="flex items-center gap-3">
            {/* View Mode Tabs */}
            <div className="inline-flex items-center p-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-xs font-semibold">
              <button
                onClick={() => setActiveTab('featured')}
                className={`px-3 py-1.5 rounded-full transition-all duration-200 ${
                  activeTab === 'featured'
                    ? 'bg-white dark:bg-[#1a1a1e] text-black dark:text-white shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                }`}
              >
                Viral Hits
              </button>
              <button
                onClick={() => setActiveTab('real')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all duration-200 ${
                  activeTab === 'real'
                    ? 'bg-white dark:bg-[#1a1a1e] text-black dark:text-white shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                }`}
              >
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>My Profile Posts</span>
              </button>
            </div>

            {/* View All on X CTA */}
            <a
              href={profileData.socials.x}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-black/15 dark:border-white/15 hover:border-black/30 dark:hover:border-white/30 text-xs sm:text-sm font-semibold text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white bg-transparent transition-all hover:scale-[1.02]"
            >
              <span>View All on X</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {displayedVideos.map(video => (
            <VideoCard
              key={video.id}
              video={video}
              variant="x-card"
              onSelect={onSelectVideo}
            />
          ))}
        </div>

        {/* Mobile View All Link */}
        <div className="mt-4 sm:hidden text-center">
          <a
            href={profileData.socials.x}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:underline"
          >
            <span>View All on X</span>
            <ArrowRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
};

