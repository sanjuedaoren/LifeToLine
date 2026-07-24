import React from 'react';
import { X, ArrowLeft, ArrowRight, Quote, BookOpen, Compass, Share2 } from 'lucide-react';
import { PersonNode } from '../types';
import { SOCIAL_CLASS_COLORS } from '../data/dynasties';

interface DetailModalProps {
  person: PersonNode | null;
  onClose: () => void;
  onNavigateToPerson: (personId: string) => void;
  onLocateOnTimeline: (personId: string) => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({
  person,
  onClose,
  onNavigateToPerson,
  onLocateOnTimeline
}) => {
  if (!person) return null;

  const classBg = SOCIAL_CLASS_COLORS[person.class] || '#C41A1A';

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 h-[33vh] min-h-[240px] max-h-[35vh] bg-[#FAF5EC] border-t-2 border-[#C4A830] shadow-2xl transition-all duration-300 animate-in slide-in-from-bottom flex flex-col font-sans select-none">
      
      {/* Top Bar / Header */}
      <div className="bg-[#1C0D08] text-[#F5EDDC] px-4 py-2 border-b border-[#C4A830]/40 flex items-center justify-between shrink-0">
        
        {/* Person Identity Header */}
        <div className="flex items-center space-x-3 overflow-hidden">
          {/* Avatar Seal */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#FAF5EC] font-kaiti font-bold text-base shrink-0 border border-[#FAF5EC]"
            style={{ backgroundColor: classBg }}
          >
            {person.avatar || person.name[0]}
          </div>

          <div className="flex items-center space-x-2 truncate">
            <h2 className="text-base sm:text-lg font-bold font-simsun text-[#FAF5EC]">
              {person.name}
            </h2>

            {/* Courtesy Name */}
            {person.courtesyName && (
              <span className="text-xs font-kaiti text-[#C4A830] hidden sm:inline">
                (字 {person.courtesyName})
              </span>
            )}

            {/* Social Class Badge (Colored) */}
            <span
              className="text-[10px] font-kaiti font-bold px-2 py-0.5 rounded text-[#FAF5EC] shrink-0"
              style={{ backgroundColor: classBg }}
            >
              {person.class}
            </span>

            {/* Dynasty Badge */}
            <span className="text-[10px] font-kaiti bg-[#C4A830] text-[#2C1810] font-bold px-2 py-0.5 rounded shrink-0">
              {person.dynasty}
            </span>

            {/* Birth - Death Year */}
            <span className="text-xs font-kaiti text-[#F5EDDC]/80 hidden md:inline">
              ({person.birthYear < 0 ? `公元前${Math.abs(person.birthYear)}` : person.birthYear} - {person.deathYear < 0 ? `公元前${Math.abs(person.deathYear)}` : person.deathYear}年)
            </span>
          </div>
        </div>

        {/* Top Controls */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => onLocateOnTimeline(person.id)}
            className="px-2.5 py-1 bg-[#C4A830] text-[#2C1810] hover:bg-[#d8ba38] rounded text-xs font-kaiti font-bold flex items-center space-x-1 transition shadow-xs"
            title="居中定位"
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">在时间轴定位</span>
          </button>

          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-[#F5EDDC]/80 hover:text-[#FAF5EC] hover:bg-[#8B1A1A] transition"
            title="关闭详情面板"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Main Content Area (3 Columns: Quote, Bio/Summary, Connections) */}
      <div className="flex-1 p-3 sm:p-4 overflow-y-auto grid grid-cols-1 md:grid-cols-12 gap-3 text-[#2C1810]">
        
        {/* Column 1: Ancient Quote Callout (4 Cols) */}
        <div className="md:col-span-5 bg-[#F5EDDC] p-3 rounded-lg border-l-4 border-[#8B1A1A] border-y border-r border-[#C4A830]/30 shadow-xs flex flex-col justify-between">
          <div className="flex items-start space-x-2">
            <Quote className="w-4 h-4 text-[#8B1A1A] shrink-0 mt-0.5" />
            <blockquote className="text-xs sm:text-sm font-kaiti font-bold text-[#2C1810] italic leading-relaxed">
              “{person.quote}”
            </blockquote>
          </div>
          <div className="text-right text-[11px] font-kaiti text-[#8B1A1A] font-bold mt-2">
            —— 出处：{person.quoteSource}
          </div>
        </div>

        {/* Column 2: Bio & Historical Summary (3 Cols) */}
        <div className="md:col-span-3 bg-[#F5EDDC]/70 p-2.5 rounded-lg border border-[#C4A830]/30 flex flex-col justify-between">
          <div>
            <div className="text-[11px] font-bold font-kaiti text-[#8B1A1A] border-b border-[#C4A830]/20 pb-1 mb-1">
              生平与地位:
            </div>
            <p className="text-xs text-[#2C1810]/90 font-body leading-relaxed line-clamp-3">
              {person.summary}
            </p>
          </div>
          <div className="text-[10px] text-[#2C1810]/60 font-kaiti mt-1">
            纪元：{person.dynasty} ({person.birthYear < 0 ? `公元前${Math.abs(person.birthYear)}` : person.birthYear} - {person.deathYear < 0 ? `公元前${Math.abs(person.deathYear)}` : person.deathYear}年)
          </div>
        </div>

        {/* Column 3: Previous / Next Connections in Chain (4 Cols) */}
        <div className="md:col-span-4 grid grid-cols-2 gap-2">
          
          {/* Previous Person */}
          {person.relationships.previous ? (
            <div
              onClick={() => onNavigateToPerson(person.relationships.previous!.id)}
              className="bg-[#F5EDDC] p-2 rounded-lg border border-[#C4A830]/40 hover:border-[#8B1A1A] cursor-pointer transition group shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] text-[#2C1810]/70 font-kaiti pb-1 border-b border-[#C4A830]/20">
                  <span className="flex items-center space-x-1">
                    <ArrowLeft className="w-3 h-3 text-[#8B1A1A] group-hover:-translate-x-0.5 transition-transform" />
                    <span>前承</span>
                  </span>
                  <span className="text-[#8B1A1A] font-bold">{person.relationships.previous.type}</span>
                </div>
                <div className="font-simsun font-bold text-xs text-[#2C1810] mt-1">
                  {person.relationships.previous.name}
                </div>
                <p className="text-[10px] text-[#2C1810]/80 font-body line-clamp-2 mt-0.5">
                  {person.relationships.previous.description}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-[#F5EDDC]/40 p-2 rounded-lg border border-dashed border-[#2C1810]/20 text-[10px] text-[#2C1810]/50 font-kaiti flex items-center justify-center text-center">
              长廊始节点
            </div>
          )}

          {/* Next Person */}
          {person.relationships.next ? (
            <div
              onClick={() => onNavigateToPerson(person.relationships.next!.id)}
              className="bg-[#F5EDDC] p-2 rounded-lg border border-[#C4A830]/40 hover:border-[#8B1A1A] cursor-pointer transition group shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[10px] text-[#2C1810]/70 font-kaiti pb-1 border-b border-[#C4A830]/20">
                  <span className="text-[#8B1A1A] font-bold">{person.relationships.next.type}</span>
                  <span className="flex items-center space-x-1">
                    <span>后启</span>
                    <ArrowRight className="w-3 h-3 text-[#8B1A1A] group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
                <div className="font-simsun font-bold text-xs text-[#2C1810] mt-1">
                  {person.relationships.next.name}
                </div>
                <p className="text-[10px] text-[#2C1810]/80 font-body line-clamp-2 mt-0.5">
                  {person.relationships.next.description}
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-[#F5EDDC]/40 p-2 rounded-lg border border-dashed border-[#2C1810]/20 text-[10px] text-[#2C1810]/50 font-kaiti flex items-center justify-center text-center">
              长廊终节点
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
