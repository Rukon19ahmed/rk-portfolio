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
      case 'chatgpt':
        return (
          <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a4 4 0 0 1 4 4v1.1a4 4 0 0 1 2.5 1.5 4 4 0 0 1 .5 3.4 4 4 0 0 1 2 3.5 4 4 0 0 1-1.5 3.3 4 4 0 0 1-3.4.5 4 4 0 0 1-2.6 1.7V22a4 4 0 0 1-4-4v-1.1a4 4 0 0 1-2.5-1.5 4 4 0 0 1-.5-3.4 4 4 0 0 1-2-3.5 4 4 0 0 1 1.5-3.3 4 4 0 0 1 3.4-.5 4 4 0 0 1 2.6-1.7V2z" />
            <path d="M9 12a3 3 0 1 0 6 0 3 3 0 1 0-6 0" />
          </svg>
        );
      case 'midjourney':
        return (
          <svg viewBox="0 0 32 32" className="w-7 h-7 sm:w-8 sm:h-8 text-white" fill="currentColor">
            <path d="M16 4 C16 4 15 14 11 18 C8.5 20.5 5 21 5 21 C5 21 9 20 12 16 C14 13 15 7 16 4 Z" />
            <path d="M17 6 C17 6 18 15 22 19 C25 22 28 22 28 22 C28 22 24 21 21 17 C19 14 18 8 17 6 Z" />
            <path d="M8 23 C12 24.5 20 24.5 24 23 C26 22.2 28 23 27 24 C23 27 9 27 5 24 C4 23 6 22.2 8 23 Z" />
          </svg>
        );
      default:
        return <span className="font-bold">{tool.shortName}</span>;
    }
  };

  const borderClass =
    tool.iconType === 'pr'
      ? 'border-[#9999ff]/20'
      : tool.iconType === 'ae'
      ? 'border-[#d291ff]/20'
      : tool.iconType === 'ps'
      ? 'border-[#31a8ff]/20'
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
