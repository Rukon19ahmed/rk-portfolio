# RK CREATIVE — Portfolio

A quiet, minimal, cinematic portfolio website for **RK CREATIVE (Video Editor & AI Creator)** built with **Vite, React 19, TypeScript, and Tailwind CSS**.

Engineered for extreme simplicity: lots of white space, no cluttered badge rows or skill blocks, a full-bleed frameless hero cutout, and a single source of truth for all content.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview build locally
npm run preview
```

---

## 🎬 How to Add a New Video

1. Drop your thumbnail into `/public/thumbnails/` as a clean WebP (e.g. `/public/thumbnails/my-video.webp` — 1280×720 for horizontal, 720×1280 for vertical).
2. *(Optional)* Drop a local MP4 preview into `/public/videos/` (e.g. `/public/videos/my-video.mp4`).
3. Open `src/data/videos.ts` and copy-paste this block:

```typescript
{
  id: "my-unique-video-id",
  title: "Your Clean Title in Sentence Case", // TODO: 3 to 6 words, no emojis, no hashtags
  platform: "x",                              // "x" | "instagram"
  postUrl: "https://x.com/Rukon__Kholifa/status/...", // TODO: your post link
  thumbnail: "/thumbnails/my-video.webp",
  orientation: "horizontal",                 // "horizontal" (16:9) or "vertical" (9:16)
  views: 500000,                              // TODO: view count (displays as 500K)
  likes: 12000,                               // TODO: likes count (displays as 12K)
  comments: 340,                              // TODO: comments count
  reposts: 850,                               // TODO: reposts count
  duration: "0:45",                           // optional duration
  date: "2026-10-29",
}
```

*Note: If `views` is 0 or omitted, the view counter line hides automatically.*

---

## 📊 How to Change Numbers & Stats

Open `src/data/stats.ts`:
- **Total Views**:
  - To automatically sum all views from `videos.ts`: set `useAutoCalculatedTotalViews: true`.
  - To manually set a fixed milestone: set `useAutoCalculatedTotalViews: false` and edit `manualTotalViews: { value: 12000000, display: "12M+" }`.
- **Videos Count**:
  - Edit `manualVideosCount: { value: 150, display: "150+" }` (or set `useAutoCalculatedVideosCount: true`).
- **Followers**:
  - Edit `followersOnX: { value: 2900, display: "2.9K" }`.

---

## 🌐 How to Deploy on Render (Static Site)

1. Push this repository to GitHub or GitLab.
2. Go to [dashboard.render.com](https://dashboard.render.com) and click **"New +"** → **"Static Site"**.
3. Connect your repository.
4. Set the following build settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
5. Click **"Create Static Site"**.
6. The included `public/_redirects` (`/* /index.html 200`) automatically handles SPA routing for `/work` on Render and Netlify.

---

## 🎨 Design Tokens

- **Dark Theme (Default)**: `#070707` background, `#ffffff` text, `#9a9a9a` muted text, `#101010` cards.
- **Light Theme**: `#f7f7f5` background, `#111111` text, `#6b6b6b` muted text, `#ffffff` cards.
- **Radius**: `20px` cards, fully rounded pills.
- **Typography**: Inter (Display Headline, Card Title, Meta).
