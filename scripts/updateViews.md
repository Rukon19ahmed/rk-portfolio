# Guide: Updating Video Views & Statistics

Because both X (formerly Twitter) and Instagram do not provide unauthenticated, free public APIs for real-time view counts, this portfolio manages video statistics through a typed, modular data layer located in `src/data/videos.ts` and `src/data/stats.ts`.

---

## 1. How to Update Video Views & Stats Manually

Open `src/data/videos.ts` in your code editor. Each video has numeric fields for `views`, `likes`, and `reposts`:

```typescript
{
  id: "x-messi",
  platform: "x",
  title: "Why Messi is Different? 🐐",
  thumbnail: "/thumbnails/x-messi.jpg",
  duration: "1:20",
  videoSrc: "/videos/x-messi.mp4",
  postUrl: "https://x.com/rkcreative_/status/1789012345678901234",
  views: 2400000,    // <--- Change this raw number (e.g. 2500000 -> displays as 2.5M)
  likes: 48000,      // <--- Change raw likes (displays as 48K)
  reposts: 6200,     // <--- Change raw reposts (displays as 6.2K)
  date: "2026-10-24",
  featured: true,
  tags: ["Sports", "Storytelling", "Messi"],
}
```

- Raw numbers are automatically formatted by `formatNumber()` in `src/utils/formatters.ts`:
  - `2400000` -> `2.4M`
  - `980000` -> `980K`
  - `48000` -> `48K`
  - `6200` -> `6.2K`

---

## 2. Automatic vs Manual Total Video Views

Open `src/data/stats.ts`:

- If you want the "Total Video Views" in the stats counter bar to **automatically sum** all the individual views in `videos.ts`:
  ```typescript
  export const statsConfig: StatsConfig = {
    useAutoCalculatedTotalViews: true, // <-- set to true
    ...
  };
  ```

- If you want a fixed milestone display (e.g., `12M+`):
  ```typescript
  export const statsConfig: StatsConfig = {
    useAutoCalculatedTotalViews: false,
    manualTotalViewsOverride: {
      value: 12_000_000,
      display: "12M+",
    },
    ...
  };
  ```

---

## 3. How to Connect a Real-Time API in the Future

The application is structured to easily integrate an external API endpoint or serverless function:

1. Create a fetcher function in `src/utils/api.ts` or a hook in `src/hooks/useLiveStats.ts`:
   ```typescript
   export async function fetchLiveVideoStats(): Promise<Record<string, { views: number; likes: number; reposts: number }>> {
     const res = await fetch('https://api.yourdomain.com/social-stats');
     return await res.json();
   }
   ```
2. In your state or App wrapper, merge the returned live metrics with `videosData` by matching `video.id`.
3. The frontend components consume whichever array of `VideoItem[]` you pass, meaning no UI changes are needed when you switch from static data to an API!

---

## 4. Adding a New Video

1. Place your thumbnail in `public/thumbnails/` (e.g. `my-new-video.jpg` or `.webp`).
2. (Optional) Place your preview MP4 in `public/videos/` (e.g. `my-new-video.mp4`).
3. Add a new object to the `videosData` array in `src/data/videos.ts`.
4. Run `npm run build` or commit to GitHub; your site will automatically update on Vercel/Netlify.

