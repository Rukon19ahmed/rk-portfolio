import { videosData } from './videos';

export interface StatItem {
  id: string;
  value: number;
  label: string;
  displayOverride?: string;
}

export interface StatsConfig {
  useAutoCalculatedTotalViews: boolean;
  manualTotalViews?: {
    value: number;
    display: string;
  };
  useAutoCalculatedVideosCount: boolean;
  manualVideosCount?: {
    value: number;
    display: string;
  };
  followersOnX: {
    value: number;
    display: string;
  };
}

export const statsConfig: StatsConfig = {
  // If true, automatically sums up views in videos.ts. If false, uses manualTotalViews.
  useAutoCalculatedTotalViews: false,
  manualTotalViews: {
    value: 12_000_000,
    display: "12M+",
  },
  // If true, automatically counts videos in videos.ts. If false, uses manualVideosCount.
  useAutoCalculatedVideosCount: false,
  manualVideosCount: {
    value: 150,
    display: "150+",
  },
  followersOnX: {
    value: 2900,
    display: "2.9K",
  },
};

export function getStats(): StatItem[] {
  // 1. Total Views
  let totalViewsValue = statsConfig.manualTotalViews?.value || 0;
  let totalViewsDisplay = statsConfig.manualTotalViews?.display;
  if (statsConfig.useAutoCalculatedTotalViews) {
    totalViewsValue = videosData.reduce((acc, curr) => acc + (curr.views || 0), 0);
    totalViewsDisplay = undefined;
  }

  // 2. Videos Count
  let videosCountValue = statsConfig.manualVideosCount?.value || 0;
  let videosCountDisplay = statsConfig.manualVideosCount?.display;
  if (statsConfig.useAutoCalculatedVideosCount) {
    videosCountValue = videosData.length;
    videosCountDisplay = `${videosData.length}+`;
  }

  return [
    {
      id: "views",
      value: totalViewsValue,
      label: "Views",
      displayOverride: totalViewsDisplay,
    },
    {
      id: "videos",
      value: videosCountValue,
      label: "Videos",
      displayOverride: videosCountDisplay,
    },
    {
      id: "followers",
      value: statsConfig.followersOnX.value,
      label: "Followers",
      displayOverride: statsConfig.followersOnX.display,
    },
  ];
}
