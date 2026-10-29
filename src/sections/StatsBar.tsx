import React, { useEffect, useRef, useState } from 'react';
import type { StatItem } from '../data/stats';
import { getStats } from '../data/stats';
import { formatNumber } from '../utils/formatters';

export const StatsBar: React.FC = () => {
  const [stats, setStats] = useState<StatItem[]>([]);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setStats(getStats());
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section ref={containerRef} className="py-12 sm:py-16 lg:py-20 relative z-20">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-24">
        {/* One thin line, no card, no boxes, no icons */}
        <div className="flex flex-wrap items-baseline gap-10 sm:gap-16 lg:gap-28">
          {stats.map((stat) => (
            <div key={stat.id} className="flex items-baseline gap-2.5">
              <span className="font-sans font-semibold text-3xl sm:text-4xl md:text-5xl tracking-[-0.02em] text-black dark:text-white leading-none">
                <AnimatedValue
                  targetValue={stat.value}
                  displayOverride={stat.displayOverride}
                  animate={hasAnimated}
                />
              </span>
              <span className="font-sans font-normal text-xs sm:text-sm text-neutral-500 dark:text-[#9a9a9a]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AnimatedValue: React.FC<{
  targetValue: number;
  displayOverride?: string;
  animate: boolean;
}> = ({ targetValue, displayOverride, animate }) => {
  const [count, setCount] = useState(0);

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
        setCount(targetValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [animate, targetValue]);

  if (displayOverride) {
    if (!animate) return <span>0</span>;
    return <span>{displayOverride}</span>;
  }

  return <span>{formatNumber(animate ? count : 0)}</span>;
};
