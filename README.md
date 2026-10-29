# RK CREATIVE — Portfolio Website

A complete, production-ready portfolio website for **RK CREATIVE (Video Editor × AI Creator)** built with **Vite, React 19, TypeScript, Tailwind CSS, and Framer Motion**.

The design is engineered pixel-close to the reference mockups with a dual **Dark / Light theme system**, responsive layouts, rich micro-interactions, an interactive video showcase modal, and a modular data layer.

---

## ⚡ Tech Stack & Features

- **Framework**: Vite + React 19 + TypeScript
- **Styling**: Tailwind CSS with custom font tokens & dark/light color palettes
- **Theme**: Dark mode default (`#070707`), Light mode (`#f7f7f5`), persists to `localStorage`, respects `prefers-color-scheme`
- **Typography**: Inter (Body), Inter Tight (Headings), Caveat & Mrs Saint Delafield (Handwritten quotes & signature)
- **Video System**:
  - Fullscreen Video Modal with custom playback controls, seekbar, keyboard navigation (`Esc`, `ArrowLeft`, `ArrowRight`).
  - Desktop hover preview with muted autoplay.
  - Social media embeds (X widgets.js, Instagram embed.js) and "Open on Platform" links.
  - Dedicated `/videos` archive page with live search, platform filters, sorting (Most Viewed, Latest, Most Liked), and pagination.
- **Performance & SEO**:
  - Full OpenGraph & Twitter Card metadata, Favicon SVG, `robots.txt`, and `sitemap.xml`.
  - Lazy loading, WebP images, and code-split video & showreel modals.
  - Animated count-up statistics with auto-calculated or manual view sums.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build locally
npm run preview
```

---

## 📂 Project Structure

```
├── public/
│   ├── favicon.svg          # SVG monogram favicon
│   ├── sitemap.xml          # SEO sitemap
│   ├── robots.txt           # SEO robots file
│   ├── logo/                # RK logo assets
│   ├── images/              # Hero images (hero-dark, hero-light, about-me)
│   ├── thumbnails/          # 16:9 & 9:16 video thumbnails
│   └── videos/              # Local preview MP4s & showreel
├── src/
│   ├── components/          # VideoCard, VideoModal, ShowreelModal, ToolIcon, SocialIcons
│   ├── data/
│   │   ├── profile.ts       # Bio, socials, badges, quote, signature
│   │   ├── stats.ts         # Followers, videos created, likes, total views
│   │   ├── tools.ts         # Premiere Pro, After Effects, DaVinci, etc.
│   │   └── videos.ts        # Typed video catalog (views, likes, reposts)
│   ├── hooks/
│   │   └── useTheme.tsx     # Dark/Light theme provider & toggle
│   ├── pages/
│   │   └── VideosGalleryPage.tsx # Full archive with search & filters
│   ├── sections/            # Navbar, Hero, StatsBar, LatestFromX, MediaTriad, AboutAndTools, Footer
│   └── utils/
│       └── formatters.ts    # formatNumber (2.4M, 980K, etc.)
└── scripts/
    └── updateViews.md       # Comprehensive guide on updating video metrics
```

---

## 🎬 How to Add a New Video

1. Place your thumbnail inside `public/thumbnails/` (e.g. `public/thumbnails/my-video.jpg` or `.webp`).
2. *(Optional)* Place a short MP4 preview inside `public/videos/` (e.g. `public/videos/my-video.mp4`).
3. Open `src/data/videos.ts` and append your video object to `videosData`:

```typescript
{
  id: "my-video-id",
  platform: "x", // "x" | "instagram" | "ai" | "project"
  title: "My Viral Video Title",
  thumbnail: "/thumbnails/my-video.jpg",
  duration: "1:15",
  videoSrc: "/videos/my-video.mp4", // optional local preview
  postUrl: "https://x.com/rkcreative_/status/...",
  views: 1500000,    // automatically formatted as 1.5M
  likes: 42000,      // automatically formatted as 42K
  reposts: 5800,     // automatically formatted as 5.8K
  date: "2026-10-29",
  category: "Commercial", // optional (for projects)
  featured: true,
  tags: ["Viral", "Cinematic", "After Effects"]
}
```

---

## 📊 How to Change Views & Stats

- **Individual video metrics**: Edit the `views`, `likes`, or `reposts` integers in `src/data/videos.ts`.
- **Total Views in Stats Bar**:
  - Open `src/data/stats.ts`.
  - Set `useAutoCalculatedTotalViews: true` to automatically sum all views in `videos.ts`.
  - Or set `useAutoCalculatedTotalViews: false` and edit `manualTotalViewsOverride: { value: 12000000, display: "12M+" }`.
- See `scripts/updateViews.md` for details on how to plug in a live external API in the future.

---

## 🌐 How to Deploy (Vercel & Netlify)

This is a 100% static React site and requires no server.

### Deploying to Vercel
1. Push your repository to GitHub, GitLab, or Bitbucket.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your repository.
4. Framework Preset will auto-detect as **Vite**.
5. Click **"Deploy"**.

### Deploying to Netlify
1. Go to [netlify.com](https://netlify.com) and click **"Add new site"** → **"Import an existing project"**.
2. Connect your repository.
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Click **"Deploy site"**.

---

## 🎨 Theme Customization

- Default theme is **Dark** (`#070707`), as requested.
- Clicking the Sun / Moon toggle in the navbar seamlessly toggles between dark and light modes.
- Choices are remembered across sessions via `localStorage` and respect the visitor's operating system preference on their first visit.
