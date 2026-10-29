import React, { useState, useMemo } from 'react';
import type { VideoItem, PlatformType } from '../data/videos';
import { videosData } from '../data/videos';
import { WorkCard } from '../components/WorkCard';
import { ArrowLeft } from 'lucide-react';

interface WorkGalleryPageProps {
  onSelectVideo: (video: VideoItem) => void;
  onBackToHome: () => void;
}

type FilterOption = 'all' | PlatformType;
type SortOption = 'views' | 'date';

export const WorkGalleryPage: React.FC<WorkGalleryPageProps> = ({
  onSelectVideo,
  onBackToHome,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');
  const [sortBy, setSortBy] = useState<SortOption>('views');

  const filterTabs: { id: FilterOption; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'x', label: 'X' },
    { id: 'instagram', label: 'Instagram' },
  ];

  const filteredAndSortedVideos = useMemo(() => {
    let result = [...videosData];

    if (activeFilter !== 'all') {
      result = result.filter((v) => v.platform === activeFilter);
    }

    result.sort((a, b) => {
      if (sortBy === 'views') return (b.views || 0) - (a.views || 0);
      if (sortBy === 'date') return new Date(b.date || '').getTime() - new Date(a.date || '').getTime();
      return 0;
    });

    return result;
  }, [activeFilter, sortBy]);

  return (
    <div className="pt-28 pb-20 min-h-screen">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-24">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-10">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs font-medium text-neutral-500 dark:text-[#9a9a9a] hover:text-black dark:hover:text-white mb-6 transition-colors group"
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back</span>
          </button>

          <h1 className="font-sans font-semibold text-3xl sm:text-4xl lg:text-5xl tracking-[-0.03em] text-black dark:text-white">
            All work
          </h1>
        </div>

        {/* Filters & Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-4 border-b border-black/[0.04] dark:border-white/[0.06]">
          <div className="flex items-center gap-2">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
                  activeFilter === tab.id
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'text-neutral-500 dark:text-[#9a9a9a] hover:text-black dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-[#9a9a9a]">
            <span>Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-transparent text-black dark:text-white font-medium focus:outline-none cursor-pointer"
            >
              <option value="views" className="bg-[#f7f7f5] dark:bg-[#101010]">
                Most viewed
              </option>
              <option value="date" className="bg-[#f7f7f5] dark:bg-[#101010]">
                Latest
              </option>
            </select>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {filteredAndSortedVideos.map((video) => (
            <WorkCard
              key={video.id}
              video={video}
              onClick={() => onSelectVideo(video)}
              variant={video.orientation === 'vertical' ? 'reel' : 'x-video'}
            />
          ))}
        </div>

      </div>
    </div>
  );
};
