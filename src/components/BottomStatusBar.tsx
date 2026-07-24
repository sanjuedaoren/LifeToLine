import React, { useRef } from 'react';
import { PersonNode } from '../types';
import { SOCIAL_CLASS_COLORS, RELATIONSHIP_COLORS } from '../data/dynasties';

interface BottomStatusBarProps {
  personCount: number;
  startYear: number;
  endYear: number;
  scrollPercentage: number; // 0 to 1
  onSliderChange: (percentage: number) => void;
  persons: PersonNode[];
  activePathIds: string[];
}

export const BottomStatusBar: React.FC<BottomStatusBarProps> = ({
  personCount,
  startYear,
  endYear,
  scrollPercentage,
  onSliderChange,
  persons,
  activePathIds
}) => {
  const sliderRef = useRef<HTMLInputElement>(null);
  const totalYears = endYear - startYear;

  return (
    <footer className="sticky bottom-0 z-30 bg-[#1C0D08] text-[#F5EDDC] border-t border-[#C4A830]/40 shadow-lg px-4 py-2 select-none">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        
        {/* Total Time Span & Person Count */}
        <div className="flex items-center space-x-3 text-xs font-kaiti">
          <span className="text-[#C4A830] font-bold">
            跨越 <strong className="text-sm font-sans">{totalYears}</strong> 年
          </span>
          <span className="text-[#F5EDDC]/40">|</span>
          <span>
            收录先贤 <strong className="text-sm font-sans text-[#C4A830]">{personCount}</strong> 位
          </span>
          <span className="text-[#F5EDDC]/40 hidden sm:inline">|</span>
          <span className="text-[11px] text-[#F5EDDC]/60 hidden sm:inline">
            诸葛亮(181) ➔ 鲁迅(1936)
          </span>
        </div>

        {/* Draggable Sync Slider / Mini Map Bar */}
        <div className="flex-1 max-w-xl w-full px-2 flex items-center space-x-2">
          <span className="text-[10px] text-[#C4A830] font-mono shrink-0">
            {startYear < 0 ? `前${Math.abs(startYear)}` : startYear}
          </span>

          <div className="relative flex-1 flex items-center">
            {/* Mini Map Nodes Dots Background */}
            <div className="absolute inset-x-0 h-1.5 bg-[#2C1810] rounded-full overflow-hidden flex items-center px-1">
              {persons.map((p, idx) => {
                const percent = (idx / (persons.length - 1)) * 100;
                const isPathNode = activePathIds.length === 0 || activePathIds.includes(p.id);
                return (
                  <div
                    key={`mini-${p.id}`}
                    className={`absolute w-1.5 h-1.5 rounded-full ${
                      isPathNode ? 'bg-[#C4A830]' : 'bg-[#FAF5EC]/30'
                    }`}
                    style={{ left: `${percent}%` }}
                  />
                );
              })}
            </div>

            {/* Draggable Range Slider */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.001"
              value={scrollPercentage || 0}
              onChange={e => onSliderChange(parseFloat(e.target.value))}
              className="w-full accent-[#C4A830] bg-transparent cursor-pointer relative z-10 opacity-80 hover:opacity-100 h-4"
              title="滑动定位长卷"
            />
          </div>

          <span className="text-[10px] text-[#C4A830] font-mono shrink-0">
            {endYear}
          </span>
        </div>

        {/* Footer Copyright Credit */}
        <div className="text-[11px] text-[#F5EDDC]/70 font-body text-center md:text-right">
          © 2026 链史 · 数据来源: <span className="text-[#C4A830] font-kaiti">CBDB 中国历代人物传记资料库</span>
        </div>

      </div>
    </footer>
  );
};
