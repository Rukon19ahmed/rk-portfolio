import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { profileData } from '../data/profile';

interface ShowreelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShowreelModal: React.FC<ShowreelModalProps> = ({ isOpen, onClose }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !profileData.showreelVideo) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Showreel"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl rounded-[20px] overflow-hidden bg-[#101010] border border-white/[0.08] shadow-2xl"
      >
        {/* Simple Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06] bg-[#121212]">
          <h2 className="text-sm font-medium text-neutral-200">Showreel</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Real Native Video Player */}
        <div className="relative aspect-video w-full bg-black">
          <video
            ref={videoRef}
            src={profileData.showreelVideo}
            controls
            autoPlay
            playsInline
            preload="metadata"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};
