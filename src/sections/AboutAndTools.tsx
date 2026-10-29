import React from 'react';
import { profileData } from '../data/profile';
import { toolsData } from '../data/tools';
import { ToolIcon } from '../components/ToolIcon';
import { XIcon, InstagramIcon, YouTubeIcon, TikTokIcon } from '../components/SocialIcons';
import {
  User,
  Settings,
  Mail,
  Video,
  Sparkles,
  Layers,
  Play,
  Film,
  FileText,
  Globe,
  Send,
} from 'lucide-react';

export const AboutAndTools: React.FC = () => {
  const getSkillIcon = (iconName: string) => {
    switch (iconName) {
      case 'video':
        return <Video className="w-3 h-3 text-indigo-400" />;
      case 'sparkles':
        return <Sparkles className="w-3 h-3 text-amber-400" />;
      case 'layers':
        return <Layers className="w-3 h-3 text-cyan-400" />;
      case 'play':
        return <Play className="w-3 h-3 text-emerald-400" />;
      case 'film':
        return <Film className="w-3 h-3 text-rose-400" />;
      case 'file-text':
        return <FileText className="w-3 h-3 text-blue-400" />;
      default:
        return null;
    }
  };

  return (
    <section id="about" className="py-8 sm:py-12">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* BLOCK 1: About Me */}
          <div className="lg:col-span-5 rounded-3xl p-5 sm:p-6 bg-white/90 dark:bg-[#101014]/90 border border-black/[0.08] dark:border-white/[0.08] shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 flex items-center justify-center text-black dark:text-white">
                  <User className="w-4 h-4" />
                </div>
                <h3 className="font-heading font-black text-lg text-black dark:text-white">
                  About Me
                </h3>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-start mb-5">
                <div className="w-28 sm:w-32 aspect-square rounded-2xl overflow-hidden flex-shrink-0 border border-black/10 dark:border-white/10 bg-neutral-900 shadow-sm">
                  <img
                    src={profileData.images.about}
                    alt={profileData.creatorName}
                    loading="lazy"
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                <div className="flex-1">
                  <h4 className="font-bold text-sm sm:text-base text-black dark:text-white mb-1.5">
                    {profileData.bioHeading}
                  </h4>
                  <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-600 dark:text-neutral-400">
                    {profileData.bio}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 pt-3 border-t border-black/5 dark:border-white/5">
              {profileData.skills.map(skill => (
                <div
                  key={skill.label}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-[11px] font-medium text-neutral-800 dark:text-neutral-300"
                >
                  {getSkillIcon(skill.icon)}
                  <span>{skill.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* BLOCK 2: Tools I Use */}
          <div className="lg:col-span-3 rounded-3xl p-5 sm:p-6 bg-white/90 dark:bg-[#101014]/90 border border-black/[0.08] dark:border-white/[0.08] shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 flex items-center justify-center text-black dark:text-white">
                  <Settings className="w-4 h-4" />
                </div>
                <h3 className="font-heading font-black text-lg text-black dark:text-white">
                  Tools I Use
                </h3>
              </div>

              <div className="grid grid-cols-3 gap-3 sm:gap-3.5 place-items-center py-2">
                {toolsData.map(tool => (
                  <ToolIcon key={tool.id} tool={tool} size="md" />
                ))}
              </div>
            </div>

            <p className="text-[11px] text-center text-neutral-500 dark:text-neutral-500 pt-3 border-t border-black/5 dark:border-white/5">
              Adobe Creative Cloud • DaVinci • Generative AI
            </p>
          </div>

          {/* BLOCK 3: Let's Work Together */}
          <div id="contact" className="lg:col-span-4 rounded-3xl p-5 sm:p-6 bg-white/90 dark:bg-[#101014]/90 border border-black/[0.08] dark:border-white/[0.08] shadow-md flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-5 h-5 flex items-center justify-center text-black dark:text-white">
                  <Mail className="w-4 h-4" />
                </div>
                <h3 className="font-heading font-black text-lg text-black dark:text-white">
                  Let's Work Together
                </h3>
              </div>

              <div className="text-xs sm:text-[13px] text-neutral-600 dark:text-neutral-400 mb-5 leading-relaxed">
                <p>Have a project, idea or collaboration in mind?</p>
                <p>Feel free to reach out.</p>
              </div>

              <div className="flex flex-col sm:flex-row lg:flex-row gap-2.5 mb-6">
                <a
                  href={`mailto:${profileData.socials.email}?subject=Collaboration%20with%20RK%20CREATIVE`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 bg-black text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 shadow-sm"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Email Me</span>
                </a>

                <a
                  href={profileData.socials.xDm}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 bg-white/60 dark:bg-white/5 border border-black/15 dark:border-white/15 text-neutral-800 dark:text-neutral-200 hover:bg-black/5 dark:hover:bg-white/10"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>DM on X</span>
                </a>
              </div>
            </div>

            <div className="pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between sm:justify-start sm:gap-3 text-neutral-600 dark:text-neutral-400">
              <a
                href={profileData.socials.x}
                target="_blank"
                rel="noopener noreferrer"
                title="X (Twitter)"
                className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/15 transition-colors"
              >
                <XIcon className="w-3.5 h-3.5" />
              </a>

              <a
                href={profileData.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/15 transition-colors"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
              </a>

              <a
                href={profileData.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                title="YouTube"
                className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/15 transition-colors"
              >
                <YouTubeIcon className="w-3.5 h-3.5" />
              </a>

              <a
                href={profileData.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                title="TikTok"
                className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/15 transition-colors"
              >
                <TikTokIcon className="w-3.5 h-3.5" />
              </a>

              <a
                href={profileData.socials.website}
                target="_blank"
                rel="noopener noreferrer"
                title="Portfolio Website"
                className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center hover:text-black dark:hover:text-white hover:bg-black/10 dark:hover:bg-white/15 transition-colors"
              >
                <Globe className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
