export interface ToolItem {
  id: string;
  name: string;
  shortName: string;
  category: string;
  iconType: 'pr' | 'ae' | 'davinci' | 'claude' | 'seedance' | 'ps';
  bgGradient: string;
  textColor: string;
}

export const toolsData: ToolItem[] = [
  {
    id: 'pr',
    name: 'Adobe Premiere Pro',
    shortName: 'Pr',
    category: 'Cinematic Editing',
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
    id: 'seedance',
    name: 'Seedance 2.5',
    shortName: 'Seedance',
    category: 'AI Video & Film Engine',
    iconType: 'seedance',
    bgGradient: 'from-[#062419] to-[#03130d]',
    textColor: '#34d399',
  },
  {
    id: 'claude',
    name: 'Claude AI',
    shortName: 'Claude',
    category: 'AI Story & Scripts',
    iconType: 'claude',
    bgGradient: 'from-[#2b1610] to-[#140b08]',
    textColor: '#d97757',
  },
  {
    id: 'ps',
    name: 'Adobe Photoshop',
    shortName: 'Ps',
    category: 'Asset & Frame Design',
    iconType: 'ps',
    bgGradient: 'from-[#001833] to-[#000d1a]',
    textColor: '#31a8ff',
  },
];
