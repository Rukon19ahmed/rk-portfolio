import React from 'react';
import type { VideoItem } from '../data/videos';
import { videosData } from '../data/videos';
import { VideoCard } from '../components/VideoCard';
import { Sparkles, Film, ArrowRight } from 'lucide-react';
import { profileData } from '../data/profile';
import { InstagramIcon } from '../components/SocialIcons';

interface MediaTriadProps {
  onSelectVideo: (video: VideoItem) => void;
  onNavigateToGallery?: () => void;
}

export const MediaTriad: React.FC<MediaTriadProps> = ({
  onSelectVideo,
}) => {
  const instagramReels = videosData.filter(v => v.platform === 'instagram');
  const aiCreations = videosData.filter(v => v.platform === 'ai');
  const editingProjects = videosData.filter(v => v.platform === 'project');

  return (
    <section id="ai-creations" className="py-8 sm:py-12">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6">
          
          {/* COLUMN 1: Instagram Reels */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <a
                href={profileData.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] flex items-center justify-center text-white shadow-sm">
                  <InstagramIcon className="w-3.5 h-3.5 text-white" />
                </div>
                <h3 className="font-heading font-black text-lg text-black dark:text-white flex items-center gap-1 group-hover:underline">
                  <span>Instagram Reels</span>
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </h3>
              </a>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">
              Short & creative reels on Instagram.
            </p>

            <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-2">
              {instagramReels.slice(0, 5).map(video => (
                <div key={video.id} className="w-[82px] sm:w-[94px] lg:w-[72px] xl:w-[78px] flex-shrink-0">
                  <VideoCard
                    video={video}
                    variant="reel"
                    onSelect={onSelectVideo}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* COLUMN 2: Featured AI Creations */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <a
                href={profileData.socials.x}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 hover:opacity-80 transition-opacity text-left"
              >
                <div className="w-6 h-6 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <h3 className="font-heading font-black text-lg text-black dark:text-white flex items-center gap-1 group-hover:underline">
                  <span>Featured AI Creations</span>
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </h3>
              </a>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">
              AI generated videos, cinematic scenes and experiments.
            </p>

            <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-2">
              {aiCreations.slice(0, 4).map(video => (
                <div key={video.id} className="w-[102px] sm:w-[115px] lg:w-[90px] xl:w-[98px] flex-shrink-0">
                  <VideoCard
                    video={video}
                    variant="ai-card"
                    onSelect={onSelectVideo}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* COLUMN 3: Editing Projects */}
          <div id="projects" className="flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <a
                href={`mailto:${profileData.socials.email}?subject=Project%20Inquiry`}
                className="group inline-flex items-center gap-2 hover:opacity-80 transition-opacity text-left"
              >
                <div className="w-6 h-6 rounded-lg bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shadow-sm">
                  <Film className="w-3.5 h-3.5" />
                </div>
                <h3 className="font-heading font-black text-lg text-black dark:text-white flex items-center gap-1 group-hover:underline">
                  <span>Editing Projects</span>
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </h3>
              </a>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">
              Client work, documentaries, promos and more.
            </p>

            <div className="flex items-start gap-2.5 overflow-x-auto no-scrollbar pb-2">
              {editingProjects.slice(0, 4).map(video => (
                <div key={video.id} className="w-[102px] sm:w-[115px] lg:w-[90px] xl:w-[98px] flex-shrink-0">
                  <VideoCard
                    video={video}
                    variant="project"
                    onSelect={onSelectVideo}
                  />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
