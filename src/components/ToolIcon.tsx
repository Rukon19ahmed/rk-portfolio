import React from 'react';
import type { ToolItem } from '../data/tools';

interface ToolIconProps {
  tool: ToolItem;
  size?: 'sm' | 'md' | 'lg';
}

export const ToolIcon: React.FC<ToolIconProps> = ({ tool, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-10 h-10 rounded-xl text-xs',
    md: 'w-14 h-14 sm:w-16 sm:h-16 rounded-2xl text-base',
    lg: 'w-16 h-16 sm:w-20 sm:h-20 rounded-2xl text-lg',
  }[size];

  const renderIconContent = () => {
    switch (tool.iconType) {
      case 'pr':
        return (
          <div className="flex items-center justify-center font-bold tracking-tight text-[#9999ff] font-sans">
            <span className="text-xl sm:text-2xl font-black">Pr</span>
          </div>
        );
      case 'ae':
        return (
          <div className="flex items-center justify-center font-bold tracking-tight text-[#d291ff] font-sans">
            <span className="text-xl sm:text-2xl font-black">Ae</span>
          </div>
        );
      case 'ps':
        return (
          <div className="flex items-center justify-center font-bold tracking-tight text-[#31a8ff] font-sans">
            <span className="text-xl sm:text-2xl font-black">Ps</span>
          </div>
        );
      case 'davinci':
        return (
          <svg viewBox="0 0 100 100" className="w-8 h-8 sm:w-9 sm:h-9" fill="none">
            <path
              d="M 50 15 C 60 15 75 25 70 42 C 65 38 58 36 50 38 C 42 36 35 38 30 42 C 25 25 40 15 50 15 Z"
              fill="#ff3b30"
            />
            <path
              d="M 28 45 C 32 42 42 42 48 48 C 45 55 45 64 42 70 C 26 65 20 52 28 45 Z"
              fill="#007aff"
            />
            <path
              d="M 72 45 C 80 52 74 65 58 70 C 55 64 55 55 52 48 C 58 42 68 42 72 45 Z"
              fill="#34c759"
            />
            <circle cx="50" cy="50" r="5" fill="#ffffff" opacity="0.3" />
          </svg>
        );
      case 'claude':
        return (
          <div className="flex flex-col items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7" fill="none">
              <path
                d="M12 2.5V21.5M2.5 12H21.5M5.28 5.28L18.72 18.72M18.72 5.28L5.28 18.72"
                stroke="#d97757"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              <circle cx="12" cy="12" r="2.2" fill="#d97757" />
            </svg>
            <span className="text-[9px] sm:text-[10px] font-bold text-[#d97757] tracking-tight mt-0.5">Claude</span>
          </div>
        );
      case 'seedance':
        return (
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-5 h-5 rounded-md bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 shadow-sm">
              <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
            <span className="text-[8.5px] sm:text-[9.5px] font-black tracking-tighter text-emerald-400 mt-0.5 leading-none">Seedance 2.5</span>
          </div>
        );
      default:
        return <span className="font-bold">{tool.shortName}</span>;
    }
  };

  const borderClass =
    tool.iconType === 'pr'
      ? 'border-[#9999ff]/25'
      : tool.iconType === 'ae'
      ? 'border-[#d291ff]/25'
      : tool.iconType === 'ps'
      ? 'border-[#31a8ff]/25'
      : tool.iconType === 'claude'
      ? 'border-[#d97757]/30'
      : tool.iconType === 'seedance'
      ? 'border-emerald-400/30'
      : 'border-white/10 dark:border-white/10 border-black/10';

  return (
    <div
      title={tool.name}
      className={`${sizeClasses} bg-gradient-to-br ${tool.bgGradient} flex items-center justify-center shadow-md border ${borderClass} transition-transform duration-300 hover:scale-105 select-none`}
    >
      {renderIconContent()}
    </div>
  );
};
