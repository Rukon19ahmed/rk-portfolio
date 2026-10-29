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

  if (variant === 'reel') {
    return (
      <div
        onClick={() => onSelect(video)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative cursor-pointer flex-shrink-0 w-full aspect-[9/16] rounded-2xl overflow-hidden bg-[#101010] border border-black/10 dark:border-white/10 shadow-card-light dark:shadow-card-dark transition-all duration-300 hover:scale-[1.03] hover:border-black/25 dark:hover:border-white/25 hover:shadow-lg"
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

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-md">
            <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
          </div>
        </div>

        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-start">
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white text-[10px] font-semibold tracking-wide shadow-sm">
            <Eye className="w-2.5 h-2.5 text-white/90" />
            <span>{formatNumber(video.views)}</span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'ai-card') {
    return (
      <div
        onClick={() => onSelect(video)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative cursor-pointer flex-shrink-0 w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#101010] border border-black/10 dark:border-white/10 shadow-card-light dark:shadow-card-dark transition-all duration-300 hover:scale-[1.03] hover:border-black/25 dark:hover:border-white/25 hover:shadow-lg"
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

        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-md">
            <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
          </div>
        </div>

        <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white text-[10px] font-semibold tracking-wide">
            <Eye className="w-2.5 h-2.5 text-white/90" />
            <span>{formatNumber(video.views)}</span>
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'project') {
    return (
      <div
        onClick={() => onSelect(video)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group cursor-pointer flex-shrink-0 w-full flex flex-col gap-1.5"
      >
        <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#101010] border border-black/10 dark:border-white/10 shadow-card-light dark:shadow-card-dark transition-all duration-300 hover:scale-[1.03] hover:border-black/25 dark:hover:border-white/25 hover:shadow-lg">
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

          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-md">
              <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
            </div>
          </div>
        </div>

        <div className="text-center">
          <span className="text-[12px] sm:text-[13px] font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-black dark:group-hover:text-white transition-colors block truncate">
            {video.category || video.title}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => onSelect(video)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group cursor-pointer flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-[#101010] border border-black/8 dark:border-white/10 shadow-card-light dark:shadow-card-dark transition-all duration-300 hover:-translate-y-1 hover:border-black/20 dark:hover:border-white/20 hover:shadow-card-light-hover dark:hover:shadow-card-dark-hover"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-900">
        <img
          src={video.thumbnail}
          alt={video.title}
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
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

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/25 flex items-center justify-center text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
            <Play className="w-4 h-4 fill-white ml-0.5" />
          </div>
        </div>

        {video.duration && (
          <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-white text-[11px] font-medium tracking-tight border border-white/10">
            {video.duration}
          </div>
        )}
      </div>

      <div className="p-3 sm:p-3.5 flex flex-col justify-between flex-grow gap-2">
        <h3 className="font-semibold text-[13px] sm:text-[14px] leading-tight text-neutral-900 dark:text-neutral-100 line-clamp-1 group-hover:text-black dark:group-hover:text-white transition-colors">
          {video.title}
        </h3>

        <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-[12px] font-medium text-neutral-600 dark:text-neutral-400">
          <div className="flex items-center gap-1 hover:text-neutral-900 dark:hover:text-white transition-colors" title={`${video.views.toLocaleString()} views`}>
            <Eye className="w-3.5 h-3.5" />
            <span>{formatNumber(video.views)}</span>
          </div>

          <div className="flex items-center gap-1 hover:text-neutral-900 dark:hover:text-white transition-colors" title={`${video.likes.toLocaleString()} likes`}>
            <Heart className="w-3.5 h-3.5" />
            <span>{formatNumber(video.likes)}</span>
          </div>

          <div className="flex items-center gap-1 hover:text-neutral-900 dark:hover:text-white transition-colors" title={`${video.reposts.toLocaleString()} reposts`}>
            <Repeat className="w-3.5 h-3.5" />
            <span>{formatNumber(video.reposts)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
