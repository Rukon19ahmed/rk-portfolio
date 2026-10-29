export interface ToolItem {
  id: string;
  name: string;
  shortName: string;
  category: string;
  iconType: 'pr' | 'ae' | 'davinci' | 'chatgpt' | 'midjourney' | 'ps';
  bgGradient: string;
  textColor: string;
}

export const toolsData: ToolItem[] = [
  {
    id: 'pr',
    name: 'Adobe Premiere Pro',
    shortName: 'Pr',
    category: 'Video Editing',
    iconType: 'pr',
    bgGradient: 'from-[#17002e] to-[#0d001a]',
    textColor: '#9999ff',
  },
  {
    id: 'ae',
    name: 'Adobe After Effects',
    shortName: 'Ae',
    category: 'Motion Graphics & VFX',
    iconType: 'ae',
    bgGradient: 'from-[#1d0033] to-[#0c0017]',
    textColor: '#d291ff',
  },
  {
    id: 'davinci',
    name: 'DaVinci Resolve',
    shortName: 'DaVinci',
    category: 'Color Grading & Audio',
    iconType: 'davinci',
    bgGradient: 'from-[#151c24] to-[#0f141a]',
    textColor: '#ffffff',
  },
  {
    id: 'chatgpt',
    name: 'ChatGPT',
    shortName: 'GPT',
    category: 'Scriptwriting & Ideas',
    iconType: 'chatgpt',
    bgGradient: 'from-[#101010] to-[#080808]',
    textColor: '#ffffff',
  },
  {
    id: 'midjourney',
    name: 'Midjourney',
    shortName: 'MJ',
    category: 'AI Image Generation',
    iconType: 'midjourney',
    bgGradient: 'from-[#121418] to-[#0a0c0e]',
    textColor: '#ffffff',
  },
  {
    id: 'ps',
    name: 'Adobe Photoshop',
    shortName: 'Ps',
    category: 'Thumbnails & Assets',
    iconType: 'ps',
    bgGradient: 'from-[#001833] to-[#000d1a]',
    textColor: '#31a8ff',
  },
];

