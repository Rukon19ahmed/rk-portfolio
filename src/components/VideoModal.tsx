import React, { useEffect, useRef, useState } from 'react';
import type { VideoItem } from '../data/videos';
import { formatNumber } from '../utils/formatters';
import {
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Eye,
  Heart,
  Repeat,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Calendar,
  Share2,
  Check,
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
  const videoPlayerRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showEmbed, setShowEmbed] = useState(false);

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

  useEffect(() => {
    setIsPlaying(true);
    setProgress(0);
    setShowEmbed(!video?.videoSrc);
    if (videoPlayerRef.current) {
      videoPlayerRef.current.currentTime = 0;
      videoPlayerRef.current.play().catch(() => {
        setIsPlaying(false);
      });
    }
  }, [video]);

  if (!video) return null;

  const togglePlay = () => {
    if (!videoPlayerRef.current) return;
    if (isPlaying) {
      videoPlayerRef.current.pause();
      setIsPlaying(false);
    } else {
      videoPlayerRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoPlayerRef.current) return;
    videoPlayerRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoPlayerRef.current) return;
    const current = videoPlayerRef.current.currentTime;
    const duration = videoPlayerRef.current.duration;
    if (duration > 0) {
      setProgress((current / duration) * 100);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoPlayerRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = clickX / rect.width;
    videoPlayerRef.current.currentTime = newProgress * videoPlayerRef.current.duration;
    setProgress(newProgress * 100);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(video.postUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const platformLabel = {
    x: 'X (Twitter)',
    instagram: 'Instagram',
    ai: 'AI Creation',
    project: 'Editing Project',
  }[video.platform];

  // Helper to extract tweet ID for embedded player
  const tweetMatch = video.postUrl.match(/status\/(\d+)/);
  const tweetId = tweetMatch ? tweetMatch[1] : null;

  // Helper to clean Instagram URL for embed
  const isInstagram = video.postUrl.includes('instagram.com');
  const instagramEmbedUrl = isInstagram
    ? `${video.postUrl.replace(/\/$/, '')}/embed/captioned/`
    : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={video.title}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/85 backdrop-blur-xl animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-3xl overflow-hidden bg-[#101010] text-white border border-white/15 shadow-2xl"
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#161616]/70 backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-white/10 text-white border border-white/15 uppercase tracking-wider">
              {platformLabel}
            </span>
            {video.category && (
              <span className="hidden sm:inline-block px-2.5 py-1 text-xs font-medium rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/25">
                {video.category}
              </span>
            )}
            <h2 className="text-sm sm:text-base font-semibold truncate max-w-[200px] sm:max-w-md">
              {video.title}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {video.videoSrc && (
              <button
                onClick={() => setShowEmbed(!showEmbed)}
                className="px-2.5 py-1 text-xs font-medium rounded-lg bg-white/10 hover:bg-white/20 text-neutral-200 transition-colors hidden sm:block"
              >
                {showEmbed ? 'Watch Video File' : 'View Social Post Embed'}
              </button>
            )}

            <button
              onClick={handleCopyLink}
              title="Copy original link"
              className="p-2 rounded-full hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              title="Close (Esc)"
              className="p-2 rounded-full hover:bg-white/10 text-neutral-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content View */}
        <div className="relative flex-1 min-h-[300px] sm:min-h-[420px] max-h-[64vh] bg-black flex items-center justify-center overflow-hidden">
          {hasPrev && onPrev && (
            <button
              onClick={onPrev}
              title="Previous (Left Arrow)"
              className="absolute left-3 sm:left-4 z-20 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110 shadow-lg"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {hasNext && onNext && (
            <button
              onClick={onNext}
              title="Next (Right Arrow)"
              className="absolute right-3 sm:right-4 z-20 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110 shadow-lg"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {!showEmbed && video.videoSrc ? (
            <div className="relative w-full h-full flex items-center justify-center bg-black group/player">
              <video
                ref={videoPlayerRef}
                src={video.videoSrc}
                poster={video.thumbnail}
                autoPlay
                playsInline
                loop
                onTimeUpdate={handleTimeUpdate}
                onClick={togglePlay}
                className="max-h-[64vh] w-auto max-w-full object-contain cursor-pointer"
              />

              {!isPlaying && (
                <div
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 fill-white ml-1" />
                  </div>
                </div>
              )}

              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col gap-2 opacity-95 group-hover/player:opacity-100 transition-opacity">
                <div
                  onClick={handleSeek}
                  className="w-full h-1.5 hover:h-2.5 bg-white/25 rounded-full cursor-pointer overflow-hidden transition-all relative"
                >
                  <div
                    className="h-full bg-white transition-all duration-100 rounded-full"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-xs text-neutral-300">
                  <div className="flex items-center gap-3">
                    <button onClick={togglePlay} className="hover:text-white transition-colors">
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button onClick={toggleMute} className="hover:text-white transition-colors">
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                    <span className="text-[11px] font-mono text-neutral-400">
                      Duration: {video.duration}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      if (videoPlayerRef.current) {
                        if (document.fullscreenElement) {
                          document.exitFullscreen();
                        } else {
                          videoPlayerRef.current.requestFullscreen();
                        }
                      }
                    }}
                    className="hover:text-white transition-colors"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-[#0a0a0a] overflow-y-auto">
              {tweetId ? (
                <iframe
                  title={video.title}
                  src={`https://platform.twitter.com/embed/Tweet.html?id=${tweetId}&theme=dark`}
                  className="w-full max-w-[500px] h-[480px] border-none rounded-xl"
                  allowFullScreen
                />
              ) : instagramEmbedUrl ? (
                <iframe
                  title={video.title}
                  src={instagramEmbedUrl}
                  className="w-full max-w-[450px] h-[520px] border-none rounded-xl"
                  allowFullScreen
                />
              ) : (
                <div className="max-w-md p-6 rounded-2xl bg-[#141414] border border-white/10 flex flex-col items-center gap-4 text-center">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <ExternalLink className="w-6 h-6 text-neutral-200" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg text-white mb-1">{video.title}</h4>
                    <p className="text-xs text-neutral-400">
                      Live post on {platformLabel}. Click below to view the authentic post on {platformLabel}.
                    </p>
                  </div>
                  <a
                    href={video.postUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-5 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Open on {platformLabel}</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Details Footer */}
        <div className="px-5 py-4 border-t border-white/10 bg-[#121212] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-neutral-300">
            <div className="flex items-center gap-1.5" title="Total Views">
              <Eye className="w-4 h-4 text-neutral-400" />
              <span className="font-semibold text-white">{formatNumber(video.views)}</span>
              <span className="text-neutral-500">views</span>
            </div>

            <div className="flex items-center gap-1.5" title="Total Likes">
              <Heart className="w-4 h-4 text-rose-400" />
              <span className="font-semibold text-white">{formatNumber(video.likes)}</span>
              <span className="text-neutral-500">likes</span>
            </div>

            <div className="flex items-center gap-1.5" title="Total Reposts">
              <Repeat className="w-4 h-4 text-emerald-400" />
              <span className="font-semibold text-white">{formatNumber(video.reposts)}</span>
              <span className="text-neutral-500">reposts</span>
            </div>

            {video.date && (
              <div className="flex items-center gap-1.5 text-neutral-500">
                <Calendar className="w-3.5 h-3.5" />
                <span>{video.date}</span>
              </div>
            )}
          </div>

          <a
            href={video.postUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs sm:text-sm font-medium transition-colors"
          >
            <span>Open on {video.platform === 'x' ? 'X (Twitter)' : video.platform === 'instagram' ? 'Instagram' : 'Platform'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
