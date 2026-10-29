export type PlatformType = "x" | "instagram";
export type VideoOrientation = "vertical" | "horizontal";

export interface VideoItem {
  id: string;
  title: string; // 3 to 6 words, Title Case, no emoji, no hashtags
  platform: PlatformType;
  postUrl: string;
  thumbnail: string; // /thumbnails/xxx.webp (clean frame, no baked-in text)
  videoSrc?: string; // Optional local mp4 in /public/videos
  orientation: VideoOrientation;
  views?: number;
  likes?: number;
  comments?: number;
  reposts?: number;
  duration?: string;
  caption?: string;
  date?: string;
}

export const videosData: VideoItem[] = [
  // -------------------------------------------------------------
  // X (TWITTER) POSTS - Real links from profile
  // -------------------------------------------------------------
  {
    id: "x-post-1",
    title: "Visual Narrative and Motion Breakdown", // TODO: replace with your real post title
    platform: "x",
    postUrl: "https://x.com/Rukon__Kholifa/status/2115483653782511988",
    thumbnail: "/thumbnails/x-post-1.webp",
    orientation: "horizontal",
    views: 2400000, // TODO: update with real view count
    likes: 48000,   // TODO: update with real likes count
    comments: 1420, // TODO: update with real comments count
    reposts: 6200,  // TODO: update with real reposts count
    duration: "1:20",
    date: "2026-10-24",
  },
  {
    id: "x-post-2",
    title: "Cinematic Atmosphere and World Design", // TODO: replace with your real post title
    platform: "x",
    postUrl: "https://x.com/Rukon__Kholifa/status/2115375486348280062",
    thumbnail: "/thumbnails/x-post-2.webp",
    orientation: "horizontal",
    views: 1100000,
    likes: 32000,
    comments: 890,
    reposts: 4800,
    duration: "0:42",
    date: "2026-10-20",
  },
  {
    id: "x-post-3",
    title: "Night Sequence Lighting and Sound", // TODO: replace with your real post title
    platform: "x",
    postUrl: "https://x.com/Rukon__Kholifa/status/2115112537314463749",
    thumbnail: "/thumbnails/x-post-3.webp",
    orientation: "horizontal",
    views: 980000,
    likes: 28000,
    comments: 730,
    reposts: 3100,
    duration: "0:38",
    date: "2026-10-18",
  },
  {
    id: "x-post-4",
    title: "Historical Archival Story Edit", // TODO: replace with your real post title
    platform: "x",
    postUrl: "https://x.com/Rukon__Kholifa/status/2114988943095840998",
    thumbnail: "/thumbnails/x-post-4.webp",
    orientation: "horizontal",
    views: 840000,
    likes: 21000,
    comments: 540,
    reposts: 3500,
    duration: "1:18",
    date: "2026-10-14",
  },
  {
    id: "x-post-5",
    title: "Creative Visual Experiments in Motion", // TODO: replace with your real post title
    platform: "x",
    postUrl: "https://x.com/Rukon__Kholifa/status/2110989958823756114",
    thumbnail: "/thumbnails/x-post-5.webp",
    orientation: "horizontal",
    views: 610000,
    likes: 18000,
    comments: 420,
    reposts: 2400,
    duration: "0:36",
    date: "2026-10-27",
  },
  {
    id: "x-post-6",
    title: "Mythical Scale Scene Generation", // TODO: replace with your real post title
    platform: "x",
    postUrl: "https://x.com/Rukon__Kholifa/status/2105548109296304187",
    thumbnail: "/thumbnails/x-post-6.webp",
    orientation: "horizontal",
    views: 520000,
    likes: 15000,
    comments: 310,
    reposts: 1900,
    duration: "0:45",
    date: "2026-10-10",
  },
  {
    id: "x-post-7",
    title: "Floral Aesthetics and Color Gradients", // TODO: replace with your real post title
    platform: "x",
    postUrl: "https://x.com/Rukon__Kholifa/status/2100911995096887367",
    thumbnail: "/thumbnails/x-post-7.webp",
    orientation: "horizontal",
    views: 470000,
    likes: 13000,
    comments: 280,
    reposts: 1600,
    duration: "0:32",
    date: "2026-10-05",
  },
  {
    id: "x-post-8",
    title: "Futuristic Metropolis Perspective Shift", // TODO: replace with your real post title
    platform: "x",
    postUrl: "https://x.com/Rukon__Kholifa/status/2048830511230111751",
    thumbnail: "/thumbnails/x-post-8.webp",
    orientation: "horizontal",
    views: 390000,
    likes: 11000,
    comments: 210,
    reposts: 1400,
    duration: "0:40",
    date: "2026-09-28",
  },

  // -------------------------------------------------------------
  // INSTAGRAM REELS - Real links from profile
  // -------------------------------------------------------------
  {
    id: "reel-1",
    title: "Urban Speed and Pacing Study", // TODO: replace with your real reel title
    platform: "instagram",
    postUrl: "https://www.instagram.com/p/DfEYLsFxNzs/",
    thumbnail: "/thumbnails/reel-1.webp",
    orientation: "vertical",
    views: 1300000,
    likes: 64000,
    comments: 980,
    reposts: 8200,
    duration: "0:25",
    date: "2026-10-15",
  },
  {
    id: "reel-2",
    title: "Portrait Color Separation Grade", // TODO: replace with your real reel title
    platform: "instagram",
    postUrl: "https://www.instagram.com/p/DfC_hBJMI1N/",
    thumbnail: "/thumbnails/reel-2.webp",
    orientation: "vertical",
    views: 820000,
    likes: 42000,
    comments: 610,
    reposts: 5100,
    duration: "0:15",
    date: "2026-10-12",
  },
  {
    id: "reel-3",
    title: "Backlit Silhouette Motion Effects", // TODO: replace with your real reel title
    platform: "instagram",
    postUrl: "https://www.instagram.com/p/Dd_gyKDhDPg/",
    thumbnail: "/thumbnails/reel-3.webp",
    orientation: "vertical",
    views: 640000,
    likes: 31000,
    comments: 480,
    reposts: 3900,
    duration: "0:30",
    date: "2026-10-08",
  },
  {
    id: "reel-4",
    title: "High Energy Rhythm Cut", // TODO: replace with your real reel title
    platform: "instagram",
    postUrl: "https://www.instagram.com/p/DeGe1gotieT/",
    thumbnail: "/thumbnails/reel-4.webp",
    orientation: "vertical",
    views: 510000,
    likes: 27000,
    comments: 390,
    reposts: 2900,
    duration: "0:22",
    date: "2026-10-04",
  },
  {
    id: "reel-5",
    title: "Stylized Character Animation", // TODO: replace with your real reel title
    platform: "instagram",
    postUrl: "https://www.instagram.com/p/DeNGpy1Nk1f/",
    thumbnail: "/thumbnails/reel-5.webp",
    orientation: "vertical",
    views: 420000,
    likes: 19000,
    comments: 260,
    reposts: 1800,
    duration: "0:18",
    date: "2026-09-28",
  },
];
