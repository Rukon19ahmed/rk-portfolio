import React, { useState, useMemo, Suspense, lazy } from 'react';
import { ThemeProvider } from './hooks/useTheme';
import { Navbar } from './sections/Navbar';
import { Hero } from './sections/Hero';
import { StatsBar } from './sections/StatsBar';
import { LatestFromX } from './sections/LatestFromX';
import { InstagramReels } from './sections/InstagramReels';
import { AboutAndTools } from './sections/AboutAndTools';
import { Footer } from './sections/Footer';
import type { VideoItem } from './data/videos';
import { videosData } from './data/videos';

// Lazy-load Modals for fast initial paint
const VideoModal = lazy(() =>
  import('./components/VideoModal').then((m) => ({ default: m.VideoModal }))
);
const ShowreelModal = lazy(() =>
  import('./components/ShowreelModal').then((m) => ({ default: m.ShowreelModal }))
);

export const AppContent: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);

  const currentIndex = useMemo(() => {
    if (!selectedVideo) return -1;
    return videosData.findIndex((v) => v.id === selectedVideo.id);
  }, [selectedVideo]);

  const handleNextVideo = () => {
    if (currentIndex >= 0 && currentIndex < videosData.length - 1) {
      setSelectedVideo(videosData[currentIndex + 1]);
    } else if (currentIndex === videosData.length - 1) {
      setSelectedVideo(videosData[0]);
    }
  };

  const handlePrevVideo = () => {
    if (currentIndex > 0) {
      setSelectedVideo(videosData[currentIndex - 1]);
    } else if (currentIndex === 0) {
      setSelectedVideo(videosData[videosData.length - 1]);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-[#111111] dark:bg-[#070709] dark:text-[#ffffff] transition-colors duration-300 selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      {/* 1. NAVBAR */}
      <Navbar />

      {/* MAIN SECTIONS */}
      <main>
        {/* 2. HERO */}
        <Hero onWatchShowreel={() => setIsShowreelOpen(true)} />

        {/* 3. STATS BAR (Overlapping Hero) */}
        <StatsBar />

        {/* 4. LATEST FROM X (TWITTER) */}
        <LatestFromX onSelectVideo={setSelectedVideo} />

        {/* 5. INSTAGRAM REELS (From @rk.creative.ai) */}
        <InstagramReels onSelectVideo={setSelectedVideo} />

        {/* 6. ABOUT ME, TOOLS I USE, LET'S WORK TOGETHER */}
        <AboutAndTools />
      </main>

      {/* 7. FOOTER */}
      <Footer />

      {/* Fullscreen Video Modal */}
      {selectedVideo && (
        <Suspense fallback={null}>
          <VideoModal
            video={selectedVideo}
            onClose={() => setSelectedVideo(null)}
            onNext={handleNextVideo}
            onPrev={handlePrevVideo}
            hasNext={videosData.length > 1}
            hasPrev={videosData.length > 1}
          />
        </Suspense>
      )}

      {/* Showreel Modal */}
      {isShowreelOpen && (
        <Suspense fallback={null}>
          <ShowreelModal
            isOpen={isShowreelOpen}
            onClose={() => setIsShowreelOpen(false)}
          />
        </Suspense>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
