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
  fullName: string;
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
    heroCutout: string;
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
  fullName: "Md Rukon Kholifa",
  roleTagline: "DEDICATED AI FILM CREATOR  ×  VIDEO EDITOR",
  heroTitle: {
    line1: "TURNING IDEAS",
    line2: "INTO VISUAL STORIES",
  },
  heroSubtitle: {
    line1: "Dedicated AI Film Creator  |  Cinematic Visual Storyteller",
    line2: "AI Generated Films  |  Short Form  |  Long Form  |  Motion Graphics",
  },
  quote: "Edit.\nCreate.\nExplore.\nRepeat.",
  signature: "RK Creative",
  hoodieText: "Good Videos Better Stories.",
  location: "Bangladesh",
  bioHeading: "Hi, I'm RK — AI Film Creator & Editor.",
  bio: "A dedicated AI Film Creator and Video Editor from Bangladesh. I craft cinematic short films, atmospheric narratives, and viral visual stories using cutting-edge AI film pipelines (Seedance 2.5, Claude) paired with professional editing and color grading (Premiere Pro, After Effects, DaVinci Resolve). My mission is to push the boundaries of storytelling through AI cinema.",
  images: {
    heroDark: "/images/hero-dark.jpg",
    heroLight: "/images/hero-light.jpg",
    about: "/images/about-me.jpg",
    heroCutout: "/images/hero-cutout.png",
  },
  showreelVideo: "/videos/showreel.mp4",
  socials: {
    x: "https://x.com/Rukon__Kholifa",
    instagram: "https://www.instagram.com/rk.creative.ai/",
    youtube: "https://youtube.com/@rkcreative",
    tiktok: "https://tiktok.com/@rkcreative",
    website: "https://rkcreative.studio",
    email: "mdrukon6789@gmail.com",
    xDm: "https://x.com/messages/compose?recipient_id=Rukon__Kholifa",
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
    { label: "AI Film Creation", icon: "film" },
    { label: "Cinematic Direction", icon: "video" },
    { label: "Seedance 2.5", icon: "sparkles" },
    { label: "Claude AI", icon: "layers" },
    { label: "DaVinci Grading", icon: "play" },
    { label: "Motion Graphics", icon: "file-text" },
  ],
};
