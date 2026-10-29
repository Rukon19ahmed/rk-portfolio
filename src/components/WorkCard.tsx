import React, { useRef, useState } from 'react';
import type { VideoItem } from '../data/videos';
import { formatNumber } from '../utils/formatters';
import { Play, Eye, Heart, MessageCircle } from 'lucide-react';

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
        className="group relative cursor-pointer aspect-[9/16] rounded-[20px] overflow-hidden bg-[#101014] border border-black/8 dark:border-white/10 shadow-sm dark:shadow-[0_8px_30px_rgba(0,0,0,0.6)] transition-all duration-300 hover:-translate-y-1.5 hover:border-black/20 dark:hover:border-white/25 hover:shadow-xl dark:hover:shadow-[0_12px_40px_rgba(255,255,255,0.06)]"
      >
        {/* Thumbnail Image */}
        {!imgError && video.thumbnail ? (
          <img
            src={video.thumbnail}
            alt={video.title}
            loading="lazy"
            onError={() => setImgError(true)}
            className={`w-full h-full object-cover object-bottom transition-all duration-500 group-hover:scale-105 ${
              isPlayingPreview ? 'opacity-0' : 'opacity-100'
            }`}
          />
        ) : (
          <div className="w-full h-full bg-neutral-200 dark:bg-neutral-800 animate-pulse flex items-center justify-center">
            <Play className="w-6 h-6 text-neutral-400 dark:text-neutral-600" />
          </div>
        )}

        {/* Video Preview */}
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

        {/* Gradient shadow overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 pointer-events-none" />

        {/* Top Category Badge */}
        {video.category && (
          <div className="absolute top-3 left-3 z-10">
            <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-semibold tracking-wider text-white uppercase">
              {video.category}
            </span>
          </div>
        )}

        {/* Center Frosted Play Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
          <div className="w-12 h-12 rounded-full bg-white/25 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
            <Play className="w-5 h-5 fill-white ml-0.5" />
          </div>
        </div>

        {/* Bottom Details Bar */}
        <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10 flex flex-col gap-1">
          <div className="flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-medium text-white shadow-sm">
              <Eye className="w-3 h-3 text-neutral-300" />
              <span>{formatNumber(video.views)}</span>
            </span>
            {video.likes && video.likes > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-medium text-rose-300 shadow-sm">
                <Heart className="w-2.5 h-2.5 fill-rose-400" />
                <span>{formatNumber(video.likes)}</span>
              </span>
            )}
          </div>
          <h4 className="text-xs font-semibold text-white truncate drop-shadow-sm mt-0.5">
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
      className="group cursor-pointer flex flex-col gap-3 rounded-[22px] p-2 sm:p-2.5 bg-white dark:bg-[#101014] border border-black/8 dark:border-white/10 shadow-sm dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1.5 hover:border-black/20 dark:hover:border-white/25 hover:shadow-xl dark:hover:shadow-[0_12px_40px_rgba(255,255,255,0.06)]"
    >
      {/* 16:9 Thumbnail Viewport */}
      <div className="relative aspect-[16/9] w-full rounded-[18px] overflow-hidden bg-neutral-900 border border-black/[0.04] dark:border-white/[0.06]">
        {!imgError && video.thumbnail ? (
          <img
            src={video.thumbnail}
            alt={video.title}
            loading="lazy"
            onError={() => setImgError(true)}
            className={`w-full h-full object-cover object-bottom transition-all duration-500 group-hover:scale-105 ${
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

        {/* Ambient Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

        {/* Top Category Badge */}
        {video.category && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] font-semibold tracking-wider text-white uppercase">
              {video.category}
            </span>
          </div>
        )}

        {/* Center Frosted Play Button */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-black">
            <Play className="w-4 h-4 fill-current ml-0.5" />
          </div>
        </div>

        {/* Duration pill */}
        {video.duration && (
          <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-white text-[11px] font-medium font-mono border border-white/10">
            {video.duration}
          </div>
        )}
      </div>

      {/* Details Area */}
      <div className="flex flex-col gap-1.5 px-1 py-1">
        {/* Title */}
        <h3 className="font-sans font-semibold text-sm sm:text-[15px] leading-snug text-neutral-900 dark:text-neutral-100 line-clamp-1 group-hover:text-black dark:group-hover:text-white transition-colors">
          {video.title}
        </h3>

        {/* Caption Snippet */}
        {video.caption && (
          <p className="text-xs text-neutral-500 dark:text-[#9a9a9a] line-clamp-1 leading-relaxed">
            {video.caption}
          </p>
        )}

        {/* Metrics Row */}
        <div className="flex items-center justify-between pt-1 border-t border-black/[0.04] dark:border-white/[0.06] text-[11px] sm:text-xs text-neutral-500 dark:text-[#9a9a9a]">
          <div className="flex items-center gap-3">
            {video.views && video.views > 0 && (
              <span className="flex items-center gap-1 font-medium text-neutral-800 dark:text-neutral-200" title={`${video.views.toLocaleString()} views`}>
                <Eye className="w-3.5 h-3.5 text-neutral-400" />
                <span>{formatNumber(video.views)}</span>
              </span>
            )}
            {video.likes && video.likes > 0 && (
              <span className="flex items-center gap-1" title={`${video.likes.toLocaleString()} likes`}>
                <Heart className="w-3 h-3 text-rose-400" />
                <span>{formatNumber(video.likes)}</span>
              </span>
            )}
            {video.comments && video.comments > 0 && (
              <span className="flex items-center gap-1" title={`${video.comments.toLocaleString()} comments`}>
                <MessageCircle className="w-3 h-3 text-sky-400" />
                <span>{formatNumber(video.comments)}</span>
              </span>
            )}
          </div>

          <span className="text-[11px] font-medium text-neutral-400 group-hover:text-black dark:group-hover:text-white transition-colors flex items-center gap-0.5">
            Watch <span className="transform group-hover:translate-x-0.5 transition-transform">→</span>
          </span>
        </div>
      </div>
    </div>
  );
};
