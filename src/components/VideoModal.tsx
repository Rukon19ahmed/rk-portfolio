import React, { useEffect, useRef } from 'react';
import type { VideoItem } from '../data/videos';
import { formatNumber } from '../utils/formatters';
import { useTheme } from '../hooks/useTheme';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Eye,
  Heart,
  MessageCircle,
  Repeat,
  Calendar,
} from 'lucide-react';

interface VideoModalProps {
  video: VideoItem | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  video,
  onClose,
  onNext,
  onPrev,
  hasNext = true,
  hasPrev = true,
}) => {
  const { theme } = useTheme();
  const videoPlayerRef = useRef<HTMLVideoElement | null>(null);
  const tweetEmbedContainerRef = useRef<HTMLDivElement | null>(null);

  // Keyboard navigation: ESC, Left, Right
  useEffect(() => {
    if (!video) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && onNext && hasNext) {
        onNext();
      } else if (e.key === 'ArrowLeft' && onPrev && hasPrev) {
        onPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [video, onNext, onPrev, hasNext, hasPrev, onClose]);

  // Dev check: warn in console if a thumbnail is smaller than 480px wide
  useEffect(() => {
    if (!video?.thumbnail) return;
    const testImg = new Image();
    testImg.src = video.thumbnail;
    testImg.onload = () => {
      if (testImg.naturalWidth < 480) {
        console.warn(
          `[Thumbnail Quality Warning] Video "${video.title}" has thumbnail width of ${testImg.naturalWidth}px, which is below the recommended 480px minimum. Recommended: 720px+ WebP.`
        );
      }
    };
  }, [video]);

  // Handle X (Twitter) official embed with widgets.js if no local video exists
  const tweetMatch = video?.postUrl ? video.postUrl.match(/status\/(\d+)/) : null;
  const tweetId = tweetMatch ? tweetMatch[1] : null;

  useEffect(() => {
    if (!video || video.videoSrc || !tweetId || !tweetEmbedContainerRef.current) return;

    const container = tweetEmbedContainerRef.current;
    container.innerHTML = '';

    const renderTweet = () => {
      const twttr = (window as any).twttr;
      if (twttr && twttr.widgets) {
        twttr.widgets.createTweet(tweetId, container, {
          theme: theme === 'dark' ? 'dark' : 'light',
          align: 'center',
          conversation: 'none',
        });
      }
    };

    if (!(window as any).twttr) {
      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      script.onload = renderTweet;
      document.body.appendChild(script);
    } else {
      renderTweet();
    }
  }, [video, tweetId, theme]);

  if (!video) return null;

  const isVertical = video.orientation === 'vertical';
  const isInstagram = video.postUrl.includes('instagram.com');
  const isPostUrlValid = video.postUrl && !video.postUrl.startsWith('TODO');
  const instagramEmbedUrl = isInstagram && isPostUrlValid
    ? `${video.postUrl.replace(/\/$/, '')}/embed/captioned/`
    : null;

  const platformDisplayName = {
    x: 'X',
    instagram: 'Instagram',
    ai: 'X',
    project: 'YouTube',
  }[video.platform] || 'X';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      {/* Previous Nav Arrow */}
      {hasPrev && onPrev && (
        <button
          onClick={e => {
            e.stopPropagation();
            onPrev();
          }}
          title="Previous (Left Arrow)"
          className="hidden sm:flex absolute left-4 z-50 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110 shadow-xl"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {/* Next Nav Arrow */}
      {hasNext && onNext && (
        <button
          onClick={e => {
            e.stopPropagation();
            onNext();
          }}
          title="Next (Right Arrow)"
          className="hidden sm:flex absolute right-4 z-50 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110 shadow-xl"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      {/* Modal Dialog Container */}
      <div
        onClick={e => e.stopPropagation()}
        className={`relative w-full flex flex-col rounded-2xl bg-[#0d0d11] text-white border border-white/10 shadow-2xl overflow-hidden transition-all duration-300 ${
          isVertical
            ? 'max-w-[480px] max-h-[94vh]'
            : 'max-w-[960px] max-h-[94vh]'
        }`}
      >
        {/* ======================================================== */}
        {/* 3. MODAL HEADER: Title and close button only */}
        {/* ======================================================== */}
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-white/10 bg-[#141418] z-20">
          <h2 className="text-sm sm:text-base font-semibold truncate pr-3 text-neutral-100">
            {video.title}
          </h2>

          <button
            onClick={onClose}
            title="Close (Esc)"
            className="p-1.5 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ======================================================== */}
        {/* 1 & 2. MEDIA PLAYER VIEWPORT */}
        {/* ======================================================== */}
        <div
          className={`relative w-full flex items-center justify-center bg-black overflow-hidden ${
            isVertical ? 'h-[75vh] sm:h-[82vh] max-h-[760px]' : 'aspect-[16/9]'
          }`}
        >
          {/* Vertical Backdrop: Blurred Thumbnail on both sides */}
          {isVertical && (
            <div
              className="absolute inset-0 bg-cover bg-center filter blur-3xl opacity-30 scale-125 pointer-events-none"
              style={{ backgroundImage: `url(${video.thumbnail})` }}
            />
          )}

          {/* REAL PLAYER LOGIC */}
          {video.videoSrc ? (
            /* 1. Real <video> with native controls, muted autoplay */
            <video
              ref={videoPlayerRef}
              src={video.videoSrc}
              poster={video.thumbnail}
              controls
              playsInline
              preload="metadata"
              autoPlay
              muted
              className="relative z-10 w-full h-full object-contain"
            />
          ) : isPostUrlValid && tweetId ? (
            /* 2a. Official X Embed */
            <div className="relative z-10 w-full h-full overflow-y-auto p-4 flex items-center justify-center bg-black">
              <div ref={tweetEmbedContainerRef} className="w-full max-w-[460px] mx-auto" />
            </div>
          ) : isPostUrlValid && instagramEmbedUrl ? (
            /* 2b. Official Instagram Embed */
            <div className="relative z-10 w-full h-full flex items-center justify-center bg-black">
              <iframe
                title={video.title}
                src={instagramEmbedUrl}
                className="w-full h-full max-w-[460px] border-none"
                allowFullScreen
              />
            </div>
          ) : (
            /* 3. Static thumbnail without fake controls + Open on X CTA */
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-4">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="max-h-[70%] max-w-[90%] object-contain rounded-lg shadow-lg"
              />
              {isPostUrlValid && (
                <a
                  href={video.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-neutral-200 transition-colors shadow-md"
                >
                  <span>Open on {platformDisplayName}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* 3. MODAL FOOTER: views, likes, comments, reposts, date, button */}
        {/* ======================================================== */}
        <div className="px-4 sm:px-5 py-3 border-t border-white/10 bg-[#121216] z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3 sm:gap-5 text-xs text-neutral-300">
            {/* Views */}
            <div className="flex items-center gap-1.5" title={`${video.views.toLocaleString()} views`}>
              <Eye className="w-3.5 h-3.5 text-neutral-400" />
              <span className="font-semibold text-white">{formatNumber(video.views)}</span>
              <span className="text-neutral-500">views</span>
            </div>

            {/* Likes */}
            <div className="flex items-center gap-1.5" title={`${video.likes.toLocaleString()} likes`}>
              <Heart className="w-3.5 h-3.5 text-rose-400" />
              <span className="font-semibold text-white">{formatNumber(video.likes)}</span>
            </div>

            {/* Comments (New) */}
            {video.comments !== undefined && (
              <div className="flex items-center gap-1.5" title={`${video.comments.toLocaleString()} comments`}>
                <MessageCircle className="w-3.5 h-3.5 text-sky-400" />
                <span className="font-semibold text-white">{formatNumber(video.comments)}</span>
              </div>
            )}

            {/* Reposts */}
            <div className="flex items-center gap-1.5" title={`${video.reposts.toLocaleString()} reposts`}>
              <Repeat className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-semibold text-white">{formatNumber(video.reposts)}</span>
            </div>

            {/* Date */}
            {video.date && (
              <div className="hidden sm:flex items-center gap-1.5 text-neutral-500">
                <Calendar className="w-3 h-3" />
                <span>{video.date}</span>
              </div>
            )}
          </div>

          {/* One "Open on [Platform]" Button */}
          {isPostUrlValid && (
            <a
              href={video.postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-semibold transition-colors self-end sm:self-auto"
            >
              <span>Open on {platformDisplayName}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
