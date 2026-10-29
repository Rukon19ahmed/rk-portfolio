import React, { useState, useMemo } from 'react';
import type { VideoItem, PlatformType } from '../data/videos';
import { videosData } from '../data/videos';
import { VideoCard } from '../components/VideoCard';
import { Search, SlidersHorizontal, ArrowLeft, Video } from 'lucide-react';

interface VideosGalleryPageProps {
  onSelectVideo: (video: VideoItem) => void;
  onBackToHome: () => void;
}

type FilterOption = 'all' | PlatformType;
type SortOption = 'views' | 'date' | 'likes';

export const VideosGalleryPage: React.FC<VideosGalleryPageProps> = ({
  onSelectVideo,
  onBackToHome,
}) => {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');
  const [sortBy, setSortBy] = useState<SortOption>('views');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(10);

  const filterTabs: { id: FilterOption; label: string }[] = [
    { id: 'all', label: 'All Videos' },
    { id: 'x', label: 'X (Twitter)' },
    { id: 'instagram', label: 'Instagram Reels' },
    { id: 'ai', label: 'AI Creations' },
    { id: 'project', label: 'Editing Projects' },
  ];

  const filteredAndSortedVideos = useMemo(() => {
    let result = [...videosData];

    if (activeFilter !== 'all') {
      result = result.filter(v => v.platform === activeFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        v =>
          v.title.toLowerCase().includes(q) ||
          v.tags.some(t => t.toLowerCase().includes(q)) ||
          (v.category && v.category.toLowerCase().includes(q))
      );
    }

    result.sort((a, b) => {
      if (sortBy === 'views') return b.views - a.views;
      if (sortBy === 'likes') return b.likes - a.likes;
      if (sortBy === 'date') return new Date(b.date).getTime() - new Date(a.date).getTime();
      return 0;
    });

    return result;
  }, [activeFilter, sortBy, searchQuery]);

  const displayedVideos = filteredAndSortedVideos.slice(0, visibleCount);
  const hasMore = visibleCount < filteredAndSortedVideos.length;

  return (
    <div className="pt-28 pb-16 min-h-screen">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-500 hover:text-black dark:text-neutral-400 dark:hover:text-white mb-4 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>Back to Home</span>
          </button>

          <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-black dark:text-white uppercase">
            Complete Video Archive
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Browse, search and filter all viral videos, short reels, and AI creations.
          </p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-black/8 dark:border-white/10">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {filterTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveFilter(tab.id);
                  setVisibleCount(10);
                }}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
                  activeFilter === tab.id
                    ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm'
                    : 'bg-black/5 dark:bg-white/5 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search videos, tags..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs sm:text-sm text-black dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
              />
            </div>

            <div className="relative">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value as SortOption)}
                className="appearance-none pl-3.5 pr-8 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs sm:text-sm font-medium text-black dark:text-white cursor-pointer focus:outline-none"
              >
                <option value="views" className="bg-white dark:bg-[#161616]">Most Viewed</option>
                <option value="likes" className="bg-white dark:bg-[#161616]">Most Liked</option>
                <option value="date" className="bg-white dark:bg-[#161616]">Latest</option>
              </select>
              <SlidersHorizontal className="w-3.5 h-3.5 absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="text-xs text-neutral-500 mb-6">
          Showing <span className="font-semibold text-black dark:text-white">{displayedVideos.length}</span> of{' '}
          <span className="font-semibold text-black dark:text-white">{filteredAndSortedVideos.length}</span> videos
        </div>

        {displayedVideos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {displayedVideos.map(video => (
              <VideoCard
                key={video.id}
                video={video}
                variant="x-card"
                onSelect={onSelectVideo}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-black/5 dark:bg-white/5 rounded-3xl border border-black/5 dark:border-white/10">
            <Video className="w-10 h-10 mx-auto text-neutral-400 mb-3" />
            <h3 className="font-heading font-bold text-lg text-black dark:text-white mb-1">
              No videos found
            </h3>
            <p className="text-xs text-neutral-500">
              Try adjusting your search query or switching filters.
            </p>
          </div>
        )}

        {hasMore && (
          <div className="mt-12 text-center">
            <button
              onClick={() => setVisibleCount(prev => prev + 8)}
              className="px-6 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black font-semibold text-xs sm:text-sm shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              Load More Videos ({filteredAndSortedVideos.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
