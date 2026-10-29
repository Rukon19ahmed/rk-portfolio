import React, { useEffect, useRef } from 'react';
import type { VideoItem } from '../data/videos';
import { formatNumber } from '../utils/formatters';
import { useTheme } from '../hooks/useTheme';
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

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

  // Keyboard navigation & body scroll lock
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

  // Dev quality check: warn if thumbnail is under 480px
  useEffect(() => {
    if (!video?.thumbnail) return;
    const testImg = new Image();
    testImg.src = video.thumbnail;
    testImg.onload = () => {
      if (testImg.naturalWidth < 480) {
        console.warn(
          `[Quality Warning] Video "${video.title}" thumbnail width is ${testImg.naturalWidth}px (below recommended 480px).`
        );
      }
    };
  }, [video]);

  // Handle X embed if postUrl exists and no videoSrc
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

  const platformDisplayName = video.platform === 'instagram' ? 'Instagram' : 'X';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      {/* Navigation Arrows */}
      {hasPrev && onPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          title="Previous (Left Arrow)"
          className="hidden md:flex absolute left-6 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {hasNext && onNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          title="Next (Right Arrow)"
          className="hidden md:flex absolute right-6 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      {/* Modal Card Container */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full flex flex-col rounded-[20px] bg-[#101010] text-white border border-white/[0.08] shadow-2xl overflow-hidden transition-all duration-300 ${
          isVertical ? 'max-w-[480px] max-h-[90vh]' : 'max-w-[960px] max-h-[90vh]'
        }`}
      >
        {/* Header: Title and close button only */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06] bg-[#121212] z-20">
          <h2 className="text-sm font-medium truncate pr-4 text-neutral-200">
            {video.title}
          </h2>
          <button
            onClick={onClose}
            title="Close (Esc)"
            className="p-1 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Media Player Area */}
        <div
          className={`relative w-full flex items-center justify-center bg-black overflow-hidden ${
            isVertical ? 'h-[75vh] max-h-[720px] aspect-[9/16]' : 'aspect-[16/9]'
          }`}
        >
          {/* Vertical Backdrop: Blurred Thumbnail */}
          {isVertical && (
            <div
              className="absolute inset-0 bg-cover bg-center filter blur-3xl opacity-35 scale-125 pointer-events-none"
              style={{ backgroundImage: `url(${video.thumbnail})` }}
            />
          )}

          {/* Media Rendering */}
          {video.videoSrc ? (
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
            <div className="relative z-10 w-full h-full overflow-y-auto p-4 flex items-center justify-center bg-black">
              <div ref={tweetEmbedContainerRef} className="w-full max-w-[460px] mx-auto" />
            </div>
          ) : isPostUrlValid && instagramEmbedUrl ? (
            <div className="relative z-10 w-full h-full flex items-center justify-center bg-black">
              <iframe
                title={video.title}
                src={instagramEmbedUrl}
                className="w-full h-full max-w-[460px] border-none"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6">
              <img
                src={video.thumbnail}
                alt={video.title}
                className="max-h-[75%] max-w-[90%] object-contain rounded-lg shadow-md"
              />
              {isPostUrlValid && (
                <a
                  href={video.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white text-black text-xs font-medium hover:bg-neutral-200 transition-colors"
                >
                  <span>Open on {platformDisplayName}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          )}
        </div>

        {/* Footer: Views, Likes, Comments, Date + One Button */}
        <div className="px-5 py-3.5 border-t border-white/[0.06] bg-[#121212] z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-400">
            {video.views && video.views > 0 && (
              <span>{formatNumber(video.views)} views</span>
            )}
            {video.likes && video.likes > 0 && (
              <span>{formatNumber(video.likes)} likes</span>
            )}
            {video.comments && video.comments > 0 && (
              <span>{formatNumber(video.comments)} comments</span>
            )}
            {video.date && (
              <span className="text-neutral-500">{video.date}</span>
            )}
          </div>

          {isPostUrlValid && (
            <a
              href={video.postUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors self-end sm:self-auto"
            >
              <span>Open on {platformDisplayName}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
