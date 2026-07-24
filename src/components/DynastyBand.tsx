import React from 'react';
import { DYNASTIES } from '../data/dynasties';
import { DynastyInfo } from '../types';

interface DynastyBandProps {
  totalWidth: number; // width in pixels for horizontal timeline scroll area
  startYear?: number;
  endYear?: number;
  onDynastyClick?: (dynasty: DynastyInfo) => void;
  activeDynasty?: string;
}

export const DynastyBand: React.FC<DynastyBandProps> = ({
  totalWidth,
  startYear = -221,
  endYear = 1949,
  onDynastyClick,
  activeDynasty
}) => {
  const totalYears = endYear - startYear;

  // Filter dynasties that fall into our timeline range
  const visibleDynasties = DYNASTIES.filter(
    d => d.endYear >= startYear && d.startYear <= endYear
  );

  return (
    <div className="w-full bg-[#1C0D08] text-[#F5EDDC] select-none border-b border-[#C4A830]/40 shadow-inner">
      {/* Timeline Ruler & Dynasty Color Band */}
      <div
        className="relative h-12 flex items-stretch overflow-hidden"
        style={{ width: `${totalWidth}px` }}
      >
        {visibleDynasties.map((dynasty, index) => {
          // Clamp start and end to total timeline range
          const clampedStart = Math.max(dynasty.startYear, startYear);
          const clampedEnd = Math.min(dynasty.endYear, endYear);
          const duration = Math.max(clampedEnd - clampedStart, 1);
          const widthPercent = (duration / totalYears) * 100;
          const leftPercent = ((clampedStart - startYear) / totalYears) * 100;

          const isActive = activeDynasty === dynasty.name;

          return (
            <div
              key={dynasty.name}
              onClick={() => onDynastyClick && onDynastyClick(dynasty)}
              className="absolute top-0 bottom-0 flex flex-col items-center justify-center cursor-pointer group transition-all duration-300 hover:brightness-125 border-r border-[#F5EDDC]/20 px-1"
              style={{
                left: `${leftPercent}%`,
                width: `${widthPercent}%`,
                backgroundColor: dynasty.color,
                opacity: activeDynasty && !isActive ? 0.4 : 1
              }}
              title={`${dynasty.name} (${dynasty.startYear < 0 ? `公元前${Math.abs(dynasty.startYear)}` : dynasty.startYear} - ${dynasty.endYear < 0 ? `公元前${Math.abs(dynasty.endYear)}` : dynasty.endYear}年)`}
            >
              {/* Dynasty Name Label */}
              <span className="font-kaiti font-bold text-xs sm:text-sm tracking-widest text-[#F5EDDC] drop-shadow-md truncate px-1 group-hover:scale-105 transition-transform">
                {dynasty.name}
              </span>

              {/* Start - End Year label if space permits */}
              <span className="text-[9px] text-[#F5EDDC]/80 font-mono tracking-tighter hidden md:inline-block">
                {dynasty.startYear < 0 ? `前${Math.abs(dynasty.startYear)}` : dynasty.startYear}
              </span>

              {/* Top accent highlight */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#C4A830]/60 group-hover:bg-[#C4A830]" />
            </div>
          );
        })}
      </div>

      {/* Minor Century Year Markers Bar */}
      <div className="relative h-4 bg-[#2C1810]/90 border-t border-[#C4A830]/20 flex items-center" style={{ width: `${totalWidth}px` }}>
        {Array.from({ length: 22 }).map((_, i) => {
          const year = -200 + i * 100;
          if (year > 1900) return null;
          const leftPercent = ((year - startYear) / totalYears) * 100;
          if (leftPercent < 0 || leftPercent > 100) return null;

          return (
            <div
              key={year}
              className="absolute top-0 bottom-0 flex flex-col items-center justify-center"
              style={{ left: `${leftPercent}%` }}
            >
              <div className="w-[1px] h-2 bg-[#C4A830]/40" />
              <span className="text-[8px] text-[#C4A830]/70 font-mono scale-90">
                {year < 0 ? `前${Math.abs(year)}` : year}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
