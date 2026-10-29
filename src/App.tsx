import React, { useState, useEffect, useMemo, Suspense, lazy } from 'react';
import { ThemeProvider } from './hooks/useTheme';
import { Navbar } from './sections/Navbar';
import { Hero } from './sections/Hero';
import { StatsBar } from './sections/StatsBar';
import { LatestFromX } from './sections/LatestFromX';
import { MediaTriad } from './sections/MediaTriad';
import { AboutAndTools } from './sections/AboutAndTools';
import { Footer } from './sections/Footer';
import { VideosGalleryPage } from './pages/VideosGalleryPage';
import type { VideoItem } from './data/videos';
import { videosData } from './data/videos';

// Code-split Video Modal & Showreel Modal for optimal Lighthouse performance
const VideoModal = lazy(() =>
  import('./components/VideoModal').then(m => ({ default: m.VideoModal }))
);
const ShowreelModal = lazy(() =>
  import('./components/ShowreelModal').then(m => ({ default: m.ShowreelModal }))
);

export const AppContent: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [isShowreelOpen, setIsShowreelOpen] = useState(false);
  const [currentRoute, setCurrentRoute] = useState<'home' | 'videos'>('home');

  useEffect(() => {
    const handleLocationChange = () => {
      const pathname = window.location.pathname;
      const hash = window.location.hash;
      if (pathname === '/videos' || hash === '#videos-gallery') {
        setCurrentRoute('videos');
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
    if (route === 'videos') {
      window.history.pushState({}, '', '/videos');
      setCurrentRoute('videos');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.history.pushState({}, '', '/');
      setCurrentRoute('home');
    }
  };

  const currentIndex = useMemo(() => {
    if (!selectedVideo) return -1;
    return videosData.findIndex(v => v.id === selectedVideo.id);
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
    <div className="min-h-screen bg-[#f7f7f5] text-[#0d0d11] dark:bg-[#070707] dark:text-[#ffffff] transition-colors duration-300 selection:bg-neutral-800 selection:text-white dark:selection:bg-white dark:selection:text-black">
      <Navbar currentRoute={currentRoute} onNavigate={navigateTo} />

      <main>
        {currentRoute === 'home' ? (
          <>
            <Hero onWatchShowreel={() => setIsShowreelOpen(true)} />
            <StatsBar />
            <LatestFromX onSelectVideo={setSelectedVideo} />
            <MediaTriad
              onSelectVideo={setSelectedVideo}
              onNavigateToGallery={() => navigateTo('videos')}
            />
            <AboutAndTools />
          </>
        ) : (
          <VideosGalleryPage
            onSelectVideo={setSelectedVideo}
            onBackToHome={() => navigateTo('home')}
          />
        )}
      </main>

      <Footer onNavigate={navigateTo} />

      {/* Code-split Fullscreen Video Modal */}
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

      {/* Code-split Cinematic Showreel Modal */}
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
