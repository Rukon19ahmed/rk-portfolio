export interface MiniBadge {
  title: string;
  subtitle: string;
  icon: 'briefcase' | 'settings' | 'user';
}

export interface SkillChip {
  label: string;
  icon: 'video' | 'sparkles' | 'layers' | 'play' | 'film' | 'file-text';
}

export interface ProfileData {
  brandName: string;
  creatorName: string;
  roleTagline: string;
  heroTitle: {
    line1: string;
    line2: string;
  };
  heroSubtitle: {
    line1: string;
    line2: string;
  };
  quote: string;
  signature: string;
  hoodieText: string;
  location: string;
  bioHeading: string;
  bio: string;
  images: {
    heroDark: string;
    heroLight: string;
    about: string;
  };
  showreelVideo: string;
  socials: {
    x: string;
    instagram: string;
    youtube: string;
    tiktok: string;
    website: string;
    email: string;
    xDm: string;
  };
  miniBadges: MiniBadge[];
  skills: SkillChip[];
}

export const profileData: ProfileData = {
  brandName: "RK CREATIVE",
  creatorName: "RK",
  roleTagline: "VIDEO EDITOR  ×  AI CREATOR",
  heroTitle: {
    line1: "TURNING IDEAS",
    line2: "INTO VISUAL STORIES",
  },
  heroSubtitle: {
    line1: "Professional Video Editing  |  AI Generated Content",
    line2: "Short Form  |  Long Form  |  Motion Graphics",
  },
  quote: "Edit.\nCreate.\nExplore.\nRepeat.",
  signature: "R.K. Creative",
  hoodieText: "Good Videos Better Stories.",
  location: "Bangladesh",
  bioHeading: "Hi, I'm RK.",
  bio: "A Video Editor and AI Creator from Bangladesh. I create engaging short-form and long-form content using professional editing and AI tools. My goal is to turn ideas into visual stories that people love to watch and share.",
  images: {
    heroDark: "/images/hero-dark.jpg",
    heroLight: "/images/hero-light.jpg",
    about: "/images/about-me.jpg",
  },
  showreelVideo: "/videos/showreel.mp4",
  socials: {
    x: "https://x.com/rkcreative_",
    instagram: "https://instagram.com/rkcreative_",
    youtube: "https://youtube.com/@rkcreative",
    tiktok: "https://tiktok.com/@rkcreative",
    website: "https://rkcreative.studio",
    email: "rkcreative.studio@gmail.com",
    xDm: "https://x.com/messages/compose?recipient_id=rkcreative_",
  },
  miniBadges: [
    {
      title: "Available for",
      subtitle: "Freelance Projects",
      icon: "briefcase",
    },
    {
      title: "Fast Delivery",
      subtitle: "& Professional Quality",
      icon: "settings",
    },
    {
      title: "Open for",
      subtitle: "Collaboration",
      icon: "user",
    },
  ],
  skills: [
    { label: "Video Editing", icon: "video" },
    { label: "AI Content", icon: "sparkles" },
    { label: "Motion Graphics", icon: "layers" },
    { label: "Social Media Content", icon: "play" },
    { label: "Cinematic Edits", icon: "film" },
    { label: "Documentary", icon: "file-text" },
  ],
};
