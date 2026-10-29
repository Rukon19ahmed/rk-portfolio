import React, { useRef, useState } from 'react';
import type { VideoItem } from '../data/videos';
import { formatNumber } from '../utils/formatters';
import { Play, Eye, Heart, Repeat } from 'lucide-react';

interface VideoCardProps {
  video: VideoItem;
  onSelect: (video: VideoItem) => void;
  variant?: 'x-card' | 'reel' | 'ai-card' | 'project';
}

export const VideoCard: React.FC<VideoCardProps> = ({
  video,
  onSelect,
  variant = 'x-card',
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);

  const handleMouseEnter = () => {
    if (video.videoSrc && videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlayingPreview(true))
          .catch(() => {});
      }
    }
  };

  const handleMouseLeave = () => {
    if (video.videoSrc && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlayingPreview(false);
    }
  };

  // 1. INSTAGRAM REEL (9:16 vertical card)
  if (variant === 'reel') {
    return (
      <div
        onClick={() => onSelect(video)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative cursor-pointer flex-shrink-0 w-full aspect-[9/16] rounded-2xl overflow-hidden bg-[#101014] border border-black/[0.08] dark:border-white/[0.1] shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-black/20 dark:hover:border-white/25"
      >
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            isPlayingPreview ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {video.videoSrc && (
          <video
            ref={videoRef}
            src={video.videoSrc}
            poster={video.thumbnail}
            preload="metadata"
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              isPlayingPreview ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />

        {/* Centered Frosted Play Icon on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-md">
            <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
          </div>
        </div>

        {/* Bottom View Pill */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-start pointer-events-none">
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white text-[10px] font-semibold tracking-wide shadow-sm">
            <Eye className="w-2.5 h-2.5 text-white/90" />
            <span>{formatNumber(video.views || 0)}</span>
          </div>
        </div>
      </div>
    );
  }

  // 2. FEATURED AI CREATION (4:5 vertical card)
  if (variant === 'ai-card') {
    return (
      <div
        onClick={() => onSelect(video)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative cursor-pointer flex-shrink-0 w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#101014] border border-black/[0.08] dark:border-white/[0.1] shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-black/20 dark:hover:border-white/25"
      >
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            isPlayingPreview ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {video.videoSrc && (
          <video
            ref={videoRef}
            src={video.videoSrc}
            poster={video.thumbnail}
            preload="metadata"
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              isPlayingPreview ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-85" />

        {/* Centered Frosted Play Icon on Hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-md">
            <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
          </div>
        </div>

        {/* Bottom View Pill */}
        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-start pointer-events-none">
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white text-[10px] font-semibold tracking-wide shadow-sm">
            <Eye className="w-2.5 h-2.5 text-white/90" />
            <span>{formatNumber(video.views || 0)}</span>
          </div>
        </div>
      </div>
    );
  }

  // 3. EDITING PROJECTS (4:5 card with category label underneath)
  if (variant === 'project') {
    return (
      <div
        onClick={() => onSelect(video)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group cursor-pointer flex flex-col gap-1.5 flex-shrink-0 w-full"
      >
        <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#101014] border border-black/[0.08] dark:border-white/[0.1] shadow-md transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:border-black/20 dark:group-hover:border-white/25">
          <img
            src={video.thumbnail}
            alt={video.title}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
              isPlayingPreview ? 'opacity-0' : 'opacity-100'
            }`}
          />

          {video.videoSrc && (
            <video
              ref={videoRef}
              src={video.videoSrc}
              poster={video.thumbnail}
              preload="metadata"
              muted
              loop
              playsInline
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                isPlayingPreview ? 'opacity-100' : 'opacity-0'
              }`}
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

          {/* Centered Frosted Play Icon on Hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-md">
              <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
            </div>
          </div>
        </div>

        <div className="text-center pt-0.5">
          <span className="text-[12px] font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-black dark:group-hover:text-white transition-colors block truncate">
            {video.category || video.title}
          </span>
        </div>
      </div>
    );
  }

  // 4. LATEST FROM X (TWITTER) 16:9 CARD
  return (
    <div
      onClick={() => onSelect(video)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group cursor-pointer flex flex-col rounded-2xl overflow-hidden bg-white/80 dark:bg-[#101014] border border-black/[0.08] dark:border-white/[0.08] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:border-black/20 dark:hover:border-white/20"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-900">
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          className={`w-full h-full ${
            video.thumbnail.includes('mockup_extracted')
              ? 'object-cover object-bottom'
              : 'object-cover'
          } transition-transform duration-500 group-hover:scale-105 ${
            isPlayingPreview ? 'opacity-0' : 'opacity-100'
          }`}
        />

        {video.videoSrc && (
          <video
            ref={videoRef}
            src={video.videoSrc}
            poster={video.thumbnail}
            preload="metadata"
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              isPlayingPreview ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Ambient Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {/* Centered Frosted Play Icon */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-10 h-10 rounded-full bg-black/40 dark:bg-black/50 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
            <Play className="w-4 h-4 fill-white ml-0.5" />
          </div>
        </div>

        {/* Category Pill for Real Posts */}
        {video.category && (
          <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold tracking-wide border border-white/15">
            {video.category}
          </div>
        )}

        {/* Duration Badge */}
        {video.duration && (
          <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-white text-[11px] font-medium tracking-tight border border-white/10">
            {video.duration}
          </div>
        )}
      </div>

      <div className="p-3 sm:p-3.5 flex flex-col justify-between flex-grow gap-2.5">
        <h3 className="font-semibold text-[13px] sm:text-[14px] leading-snug text-neutral-900 dark:text-neutral-100 line-clamp-1 group-hover:text-black dark:group-hover:text-white transition-colors">
          {video.title}
        </h3>

        <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-[12px] font-medium text-neutral-600 dark:text-neutral-400 pt-1 border-t border-black/5 dark:border-white/5">
          <div
            className="flex items-center gap-1 hover:text-neutral-900 dark:hover:text-white transition-colors"
            title={`${(video.views || 0).toLocaleString()} views`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{formatNumber(video.views || 0)}</span>
          </div>

          <div
            className="flex items-center gap-1 hover:text-neutral-900 dark:hover:text-white transition-colors"
            title={`${(video.likes || 0).toLocaleString()} likes`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>{formatNumber(video.likes || 0)}</span>
          </div>

          <div
            className="flex items-center gap-1 hover:text-neutral-900 dark:hover:text-white transition-colors"
            title={`${(video.reposts || 0).toLocaleString()} reposts`}
          >
            <Repeat className="w-3.5 h-3.5" />
            <span>{formatNumber(video.reposts || 0)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

