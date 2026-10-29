export interface ProfileData {
  name: string;
  brand: string;
  headline: string;
  email: string;
  x: string;
  instagram: string;
  youtube?: string;
  tiktok?: string;
  showreelVideo?: string; // If set, "Watch Showreel" button appears in hero. If empty/undefined, button hides.
  heroCutout: string;
}

export const profileData: ProfileData = {
  name: "Md Rukon Kholifa",
  brand: "RK CREATIVE",
  headline: "Turning ideas into visual stories",
  email: "mdrukon6789@gmail.com",
  x: "https://x.com/Rukon__Kholifa",
  instagram: "https://www.instagram.com/rk.creative.ai/",
  youtube: "", // optional, leave empty to hide
  tiktok: "",  // optional, leave empty to hide
  showreelVideo: "/videos/showreel.mp4",
  heroCutout: "/images/hero-cutout.png",
};
