import { videosData } from './videos';

export interface StatItem {
  id: string;
  label: string;
  value: number; // Raw number for animated count-up
  displayOverride?: string; // e.g. "12M+" or "2.9K+"
  icon: 'x' | 'eye' | 'video' | 'heart' | 'repeat';
}

export interface StatsConfig {
  useAutoCalculatedTotalViews: boolean;
  manualTotalViewsOverride?: {
    value: number;
    display: string;
  };
  stats: StatItem[];
}

export const statsConfig: StatsConfig = {
  useAutoCalculatedTotalViews: false,
  manualTotalViewsOverride: {
    value: 12_000_000,
    display: "12M+",
  },
  stats: [
    {
      id: "followers-x",
      label: "Followers on X",
      value: 2900,
      displayOverride: "2.9K+",
      icon: "x",
    },
    {
      id: "total-views",
      label: "Total Video Views",
      value: 12000000,
      displayOverride: "12M+",
      icon: "eye",
    },
    {
      id: "videos-created",
      label: "Videos Created",
      value: 150,
      displayOverride: "150+",
      icon: "video",
    },
    {
      id: "total-likes",
      label: "Total Likes",
      value: 450000,
      displayOverride: "450K+",
      icon: "heart",
    },
    {
      id: "reposts-shares",
      label: "Reposts / Shares",
      value: 25000,
      displayOverride: "25K+",
      icon: "repeat",
    },
  ],
};

/**
 * Helper to get the computed stats list, incorporating the live video sum if enabled.
 */
export function getComputedStats(): StatItem[] {
  return statsConfig.stats.map(stat => {
    if (stat.id === 'total-views') {
      if (statsConfig.useAutoCalculatedTotalViews) {
        const sumViews = videosData.reduce((acc, curr) => acc + (curr.views || 0), 0);
        return {
          ...stat,
          value: sumViews,
          displayOverride: undefined,
        };
      } else if (statsConfig.manualTotalViewsOverride) {
        return {
          ...stat,
          value: statsConfig.manualTotalViewsOverride.value,
          displayOverride: statsConfig.manualTotalViewsOverride.display,
        };
      }
    }
    return stat;
  });
}
