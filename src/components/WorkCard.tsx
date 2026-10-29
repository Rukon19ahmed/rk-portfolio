import React, { useRef, useState } from 'react';
import type { VideoItem } from '../data/videos';
import { formatNumber } from '../utils/formatters';
import { Play } from 'lucide-react';

interface WorkCardProps {
  video: VideoItem;
  onClick: () => void;
  variant?: 'x-video' | 'reel';
}

export const WorkCard: React.FC<WorkCardProps> = ({ video, onClick, variant = 'x-video' }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [imgError, setImgError] = useState(false);

  const isReel = variant === 'reel' || video.orientation === 'vertical';

  const handleMouseEnter = () => {
    if (video.videoSrc && videoRef.current) {
      videoRef.current.currentTime = 0;
      const promise = videoRef.current.play();
      if (promise !== undefined) {
        promise
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

  // -------------------------------------------------------------
  // REEL CARD (Vertical 9:16)
  // -------------------------------------------------------------
  if (isReel) {
    return (
      <div
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group relative cursor-pointer aspect-[9/16] rounded-[20px] overflow-hidden bg-neutral-900 border border-black/[0.04] dark:border-white/[0.08] shadow-card-light dark:shadow-none transition-transform duration-300 hover:-translate-y-1"
      >
        {/* Thumbnail or Fallback Shimmer */}
        {!imgError && video.thumbnail ? (
          <img
            src={video.thumbnail}
            alt={video.title}
            loading="lazy"
            onError={() => setImgError(true)}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              isPlayingPreview ? 'opacity-0' : 'opacity-100'
            }`}
          />
        ) : (
          <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800 animate-pulse flex items-center justify-center">
            <Play className="w-6 h-6 text-neutral-400 dark:text-neutral-600" />
          </div>
        )}

        {/* Hover preview video */}
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

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

        {/* Subtle play icon on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white">
            <Play className="w-4 h-4 fill-white ml-0.5" />
          </div>
        </div>

        {/* Bottom: View count badge + Title on hover */}
        <div className="absolute bottom-3 left-3 right-3 flex flex-col gap-1 z-10">
          {video.views && video.views > 0 && (
            <span className="text-[11px] font-normal text-white/90">
              {formatNumber(video.views)} views
            </span>
          )}
          <h4 className="text-xs font-medium text-white truncate opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {video.title}
          </h4>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // X VIDEO CARD (Horizontal 16:9)
  // -------------------------------------------------------------
  return (
    <div
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group cursor-pointer flex flex-col gap-3 transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[16/9] w-full rounded-[20px] overflow-hidden bg-neutral-900 border border-black/[0.04] dark:border-white/[0.08] shadow-card-light dark:shadow-none">
        {!imgError && video.thumbnail ? (
          <img
            src={video.thumbnail}
            alt={video.title}
            loading="lazy"
            onError={() => setImgError(true)}
            className={`w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90 ${
              isPlayingPreview ? 'opacity-0' : 'opacity-100'
            }`}
          />
        ) : (
          <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800 animate-pulse flex items-center justify-center">
            <Play className="w-8 h-8 text-neutral-400 dark:text-neutral-600" />
          </div>
        )}

        {/* Hover preview video */}
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

        {/* Subtle Play Button in Center */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/90 transition-transform duration-300 group-hover:scale-105">
            <Play className="w-4 h-4 fill-white/90 ml-0.5" />
          </div>
        </div>

        {/* Duration pill (only if provided) */}
        {video.duration && (
          <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-normal">
            {video.duration}
          </div>
        )}
      </div>

      {/* Under Card: Title + Views only */}
      <div className="flex flex-col gap-0.5 px-0.5">
        <h3 className="font-sans font-medium text-sm sm:text-[15px] leading-snug text-neutral-900 dark:text-neutral-100 line-clamp-2">
          {video.title}
        </h3>
        {video.views && video.views > 0 && (
          <span className="text-xs text-neutral-500 dark:text-[#9a9a9a]">
            {formatNumber(video.views)} views
          </span>
        )}
      </div>
    </div>
  );
};
