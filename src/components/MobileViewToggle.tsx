import React from 'react';
import { PersonNode } from '../types';
import { SOCIAL_CLASS_COLORS } from '../data/dynasties';
import { ArrowDown } from 'lucide-react';

interface MobileViewProps {
  persons: PersonNode[];
  activePathIds: string[];
  selectedPersonId: string | null;
  onSelectPerson: (person: PersonNode) => void;
}

export const MobileViewToggle: React.FC<MobileViewProps> = ({
  persons,
  activePathIds,
  selectedPersonId,
  onSelectPerson,
}) => {
  return (
    <div className="px-4 py-6 space-y-4 max-w-lg mx-auto">
      <div className="text-center pb-2 border-b border-[#C4A830]/30">
        <h3 className="font-kaiti font-bold text-base text-[#8B1A1A]">
          中国历代人物相续长卷 (纵向视图)
        </h3>
        <p className="text-xs text-[#2C1810]/70 font-body">点击人物节点可展开底端典故与关联详情</p>
      </div>

      <div className="space-y-3 relative">
        {persons.map((person, index) => {
          const isPathNode = activePathIds.length === 0 || activePathIds.includes(person.id);
          const isSelected = selectedPersonId === person.id;
          const classBg = SOCIAL_CLASS_COLORS[person.class] || '#C41A1A';

          return (
            <React.Fragment key={person.id}>
              {/* Person Node Card */}
              <div
                onClick={() => onSelectPerson(person)}
                className={`p-3 rounded-lg border transition-all cursor-pointer ${
                  isPathNode ? 'rice-paper-card' : 'bg-[#FAF5EC]/40 opacity-50'
                } ${
                  isSelected ? 'border-2 border-[#8B1A1A] ring-2 ring-[#C4A830]' : 'border-[#C4A830]/40'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {/* Circle Avatar (Class color background, no text label) */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-[#FAF5EC] font-kaiti font-bold text-lg shrink-0 shadow-md border-2 border-[#FAF5EC]"
                    style={{ backgroundColor: classBg }}
                  >
                    {person.avatar || person.name[0]}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="font-simsun font-bold text-base text-[#2C1810]">
                          {person.name}
                        </span>
                        {person.courtesyName && (
                          <span className="text-xs font-kaiti text-[#2C1810]/60">
                            (字 {person.courtesyName})
                          </span>
                        )}
                      </div>
                      <span className="text-xs font-kaiti bg-[#1C0D08] text-[#C4A830] px-2 py-0.5 rounded">
                        {person.dynasty}
                      </span>
                    </div>

                    <div className="text-[11px] text-[#8B1A1A] font-kaiti mt-0.5">
                      {person.birthYear < 0 ? `公元前${Math.abs(person.birthYear)}` : person.birthYear} - {person.deathYear < 0 ? `公元前${Math.abs(person.deathYear)}` : person.deathYear}年
                    </div>
                  </div>
                </div>

                <div className="mt-2 text-xs font-kaiti italic text-[#2C1810] line-clamp-1 bg-[#FAF5EC] p-1.5 rounded border border-[#C4A830]/20">
                  “{person.quote}”
                </div>
              </div>

              {/* Connecting arrow if not last */}
              {index < persons.length - 1 && (
                <div className="flex items-center justify-center my-1">
                  <div className="px-2.5 py-0.5 bg-[#1C0D08] text-[#FAF5EC] rounded border border-[#C4A830]/40 text-[10px] font-kaiti flex items-center space-x-1 shadow-2xs">
                    <span className="text-[#C4A830]">{person.relationships.next?.type || '传承'}</span>
                    <ArrowDown className="w-3 h-3 text-[#C4A830]" />
                  </div>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
