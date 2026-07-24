import React, { useState } from 'react';
import { SOCIAL_CLASS_COLORS, RELATIONSHIP_COLORS } from '../data/dynasties';
import { Filter, ChevronDown, ChevronUp } from 'lucide-react';

export const ClassFilterLegend: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#FAF5EC]/90 backdrop-blur-xs border-b border-[#C4A830]/30 px-4 py-1.5 text-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        
        {/* Toggle Button for Legend */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-1 font-kaiti font-bold text-[#8B1A1A] hover:text-[#2C1810] transition"
        >
          <Filter className="w-3.5 h-3.5 text-[#C4A830]" />
          <span>阶层与关系图例说明</span>
          {isOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>

        {/* Quick Social Class Dots inline */}
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-kaiti text-[#2C1810]/80">
          <span className="text-[#2C1810]/50">阶层:</span>
          {Object.entries(SOCIAL_CLASS_COLORS).map(([className, color]) => (
            <div key={className} className="flex items-center space-x-1">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
              <span>{className}</span>
            </div>
          ))}
        </div>

      </div>

      {/* Expanded Legend Panel */}
      {isOpen && (
        <div className="max-w-7xl mx-auto mt-2 pt-2 border-t border-[#C4A830]/20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 animate-in fade-in duration-200">
          {/* Relationship Types Legend */}
          <div className="bg-[#F5EDDC] p-2 rounded border border-[#C4A830]/30">
            <h4 className="font-kaiti font-bold text-[#8B1A1A] mb-1">关系线条说明:</h4>
            <div className="space-y-1 text-[11px]">
              {Object.entries(RELATIONSHIP_COLORS).map(([type, config]) => (
                <div key={type} className="flex items-center justify-between">
                  <span className="font-kaiti">{type}:</span>
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-12 h-0.5"
                      style={{
                        backgroundColor: config.color,
                        borderStyle: config.style === 'dashed' ? 'dashed' : config.style === 'dotted' ? 'dotted' : 'solid',
                        borderWidth: config.style !== 'solid' ? '1px' : '0'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Figures Legend */}
          <div className="bg-[#F5EDDC] p-2 rounded border border-[#C4A830]/30">
            <h4 className="font-kaiti font-bold text-[#8B1A1A] mb-1">重点人物说明:</h4>
            <div className="flex items-center space-x-2 mt-1">
              <div className="w-6 h-6 rounded-full bg-[#C41A1A] border-2 border-[#C4A830] gold-glow flex items-center justify-center text-[9px] text-[#FAF5EC] font-bold">
                重点
              </div>
              <span className="text-[11px] font-body text-[#2C1810]/80">
                直径90px附金环光芒节点，代表历史巨擘（如诸葛亮、李白、杜甫、苏轼、鲁迅）。
              </span>
            </div>
          </div>

          {/* Historical Data Source */}
          <div className="bg-[#F5EDDC] p-2 rounded border border-[#C4A830]/30">
            <h4 className="font-kaiti font-bold text-[#8B1A1A] mb-1">交互指引:</h4>
            <p className="text-[11px] font-body text-[#2C1810]/80 leading-snug">
              ① 顶部输入“起点”与“终点”可自动寻路高亮传承脉络；<br />
              ② 点击人物节点可弹出底端典故卡片；<br />
              ③ 支持左右滑动或底部滑块同步长卷视角。
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
