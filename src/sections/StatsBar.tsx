import React, { useEffect, useRef, useState } from 'react';
import type { StatItem } from '../data/stats';
import { getComputedStats } from '../data/stats';
import { formatNumber } from '../utils/formatters';
import { Eye, Video, Heart, Repeat } from 'lucide-react';
import { XIcon } from '../components/SocialIcons';

export const StatsBar: React.FC = () => {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setStats(getComputedStats());
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <div
      ref={containerRef}
      className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 md:-mt-10 mb-12 sm:mb-16 relative z-20"
    >
      <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 bg-white/90 dark:bg-[#101014]/90 border border-black/[0.08] dark:border-white/[0.08] shadow-xl backdrop-blur-xl">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-0 divide-y lg:divide-y-0 lg:divide-x divide-black/5 dark:divide-white/10">
          {stats.map((stat, idx) => (
            <div
              key={stat.id}
              className={`flex items-center gap-3.5 sm:gap-4 px-2 sm:px-5 ${
                idx > 0 && idx % 2 === 0 ? 'pt-4 sm:pt-0' : ''
              } ${idx > 0 ? 'lg:pl-6' : ''}`}
            >
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 flex items-center justify-center flex-shrink-0 text-black dark:text-white shadow-sm">
                {stat.icon === 'x' && <XIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
                {stat.icon === 'eye' && <Eye className="w-4 h-4 sm:w-5 sm:h-5 text-sky-500 dark:text-sky-400" />}
                {stat.icon === 'video' && <Video className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-500 dark:text-indigo-400" />}
                {stat.icon === 'heart' && <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 dark:text-rose-400" />}
                {stat.icon === 'repeat' && <Repeat className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 dark:text-emerald-400" />}
              </div>

              <div className="flex flex-col">
                <span className="font-heading font-black text-xl sm:text-2xl lg:text-[26px] tracking-tight text-black dark:text-white leading-tight">
                  <AnimatedCounter
                    targetValue={stat.value}
                    displayOverride={stat.displayOverride}
                    animate={hasAnimated}
                  />
                </span>
                <span className="text-[11px] sm:text-[12px] font-medium text-neutral-500 dark:text-neutral-400 whitespace-nowrap">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface CounterProps {
  targetValue: number;
  displayOverride?: string;
  animate: boolean;
}

const AnimatedCounter: React.FC<CounterProps> = ({
  targetValue,
  displayOverride,
  animate,
}) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!animate) return;

    let start = 0;
    const duration = 1200;
    const steps = 30;
    const increment = targetValue / steps;
    const intervalTime = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= targetValue) {
        setCurrent(targetValue);
        clearInterval(timer);
      } else {
        setCurrent(Math.floor(start));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [animate, targetValue]);

  if (displayOverride) {
    if (!animate) return <span>0+</span>;
    return <span>{displayOverride}</span>;
  }

  return <span>{formatNumber(animate ? current : 0)}+</span>;
};
