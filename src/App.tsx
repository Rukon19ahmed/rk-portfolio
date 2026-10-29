import React, { useState, useEffect, useMemo, Suspense, lazy } from 'react';
import { ThemeProvider } from './hooks/useTheme';
import { Navbar } from './sections/Navbar';
import { Hero } from './sections/Hero';
import { StatsBar } from './sections/StatsBar';
import { WorkSection } from './sections/WorkSection';
import { Footer } from './sections/Footer';
import { WorkGalleryPage } from './pages/WorkGalleryPage';
import type { VideoItem } from './data/videos';
import { videosData } from './data/videos';

// Code-split Modals for Lighthouse 90+ performance
const VideoModal = lazy(() =>
  import('./components/VideoModal').then((m) => ({ default: m.VideoModal }))
);
const ShowreelModal = lazy(() =>
  import('./components/ShowreelModal').then((m) => ({ default: m.ShowreelModal }))
);

export const AppContent: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState<'home' | 'work'>('home');

  // Handle SPA routing & URL changes
  useEffect(() => {
    const handleLocationChange = () => {
      const pathname = window.location.pathname;
      const hash = window.location.hash;
      if (pathname === '/work' || hash === '#work-gallery' || pathname === '/videos') {
        setCurrentRoute('work');
      } else {
        setCurrentRoute('home');
      }
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateTo = (route: string) => {
    if (route === 'work') {
      window.history.pushState({}, '', '/work');
      setCurrentRoute('work');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.history.pushState({}, '', '/');
      setCurrentRoute('home');
    }
  };

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
    <div className="min-h-screen bg-[#f7f7f5] text-[#111111] dark:bg-[#070707] dark:text-[#ffffff] transition-colors duration-300">
      {/* 1. NAVBAR */}
      <Navbar currentRoute={currentRoute} onNavigate={navigateTo} />

      {/* MAIN SECTIONS */}
      <main>
        {currentRoute === 'home' ? (
          <>
            {/* 2. HERO */}
            <Hero onWatchShowreel={() => setIsShowreelOpen(true)} />

            {/* 3. STATS */}
            <StatsBar />

            {/* 4. WORK */}
            <WorkSection
              onSelectVideo={setSelectedVideo}
              onViewAll={() => navigateTo('work')}
            />
          </>
        ) : (
          <WorkGalleryPage
            onSelectVideo={setSelectedVideo}
            onBackToHome={() => navigateTo('home')}
          />
        )}
      </main>

      {/* 5. FOOTER */}
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
