import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Share2, Search, RotateCcw, Compass, Plus, UserPlus, Check } from 'lucide-react';
import { PersonNode, PresetChain } from '../types';

interface HeaderProps {
  allPersons: PersonNode[];
  presetChains: PresetChain[];
  onSearchSelectPerson: (personId: string) => void;
  onOpenAddPersonModal: () => void;
  onRandomExplore: () => void;
  onReset: () => void;
  onSelectPreset: (preset: PresetChain) => void;
  activePresetTitle?: string;
}

export const Header: React.FC<HeaderProps> = ({
  allPersons,
  presetChains,
  onSearchSelectPerson,
  onOpenAddPersonModal,
  onRandomExplore,
  onReset,
  onSelectPreset,
  activePresetTitle
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showPresetMenu, setShowPresetMenu] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  // Handle click outside search dropdown
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredPersons = allPersons.filter(p =>
    p.name.includes(searchQuery) ||
    p.dynasty.includes(searchQuery) ||
    (p.courtesyName && p.courtesyName.includes(searchQuery)) ||
    p.class.includes(searchQuery)
  );

  const handleSelectPerson = (p: PersonNode) => {
    setSearchQuery(p.name);
    setShowSearchDropdown(false);
    onSearchSelectPerson(p.id);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {
      alert('已复制链接到剪贴板！');
    });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#1C0D08]/95 text-[#F5EDDC] backdrop-blur-md border-b border-[#C4A830]/40 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-3">
        
        {/* Brand & Logo */}
        <div className="flex items-center space-x-3 cursor-pointer select-none" onClick={onReset}>
          <div className="w-9 h-9 rounded-sm bg-[#8B1A1A] text-[#F5EDDC] flex items-center justify-center font-kaiti font-bold text-xl shadow-md border border-[#C4A830]/70 relative">
            <span>链</span>
            <span className="absolute -bottom-1 -right-1 text-[8px] bg-[#C4A830] text-[#2C1810] px-1 rounded-xs font-sans font-bold">史</span>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-bold font-kaiti tracking-wide text-[#FAF5EC]">
                链史 <span className="text-[10px] font-normal font-sans text-[#C4A830] border border-[#C4A830]/40 px-1.5 py-0.2 rounded bg-[#C4A830]/10">History Chain</span>
              </h1>
            </div>
            <p className="text-[10px] text-[#F5EDDC]/70 font-body hidden md:block">
              中国历代人物关系演进时空长廊
            </p>
          </div>
        </div>

        {/* Person Quick Search Bar */}
        <div className="relative flex-1 max-w-xs min-w-[180px]" ref={searchRef}>
          <div className="flex items-center px-2.5 py-1.5 bg-[#2C1810] rounded-md border border-[#C4A830]/50 focus-within:border-[#C4A830] shadow-inner">
            <Search className="w-3.5 h-3.5 text-[#C4A830] shrink-0 mr-1.5" />
            <input
              type="text"
              placeholder="寻找名士 (如 诸葛亮 / 陆迅)..."
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setShowSearchDropdown(true);
              }}
              onFocus={() => setShowSearchDropdown(true)}
              className="w-full text-xs bg-transparent focus:outline-none text-[#F5EDDC] placeholder-[#F5EDDC]/40 font-simsun"
            />
          </div>

          {/* Search Dropdown */}
          {showSearchDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 max-h-56 overflow-y-auto bg-[#2C1810] border border-[#C4A830] rounded-md shadow-2xl z-50 py-1 divide-y divide-[#C4A830]/10">
              {filteredPersons.length > 0 ? (
                filteredPersons.map(p => (
                  <div
                    key={p.id}
                    onClick={() => handleSelectPerson(p)}
                    className="px-3 py-1.5 hover:bg-[#C4A830]/20 cursor-pointer flex items-center justify-between text-xs transition"
                  >
                    <span className="font-simsun font-bold text-[#FAF5EC]">{p.name}</span>
                    <span className="text-[10px] text-[#C4A830] font-kaiti">
                      {p.dynasty} · {p.class}
                    </span>
                  </div>
                ))
              ) : (
                <div className="px-3 py-2 text-xs text-[#F5EDDC]/50 text-center">未搜索到匹配人物</div>
              )}
            </div>
          )}
        </div>

        {/* Actions & Modes */}
        <div className="flex items-center space-x-2">
          
          {/* Add Person Button */}
          <button
            onClick={onOpenAddPersonModal}
            className="px-3 py-1.5 bg-[#8B1A1A] hover:bg-[#A31E1E] text-[#FAF5EC] rounded-md border border-[#C4A830]/60 text-xs font-kaiti font-bold flex items-center space-x-1 shadow-sm transition active:scale-95"
            title="放置或新增历史人物节点"
          >
            <UserPlus className="w-3.5 h-3.5 text-[#C4A830]" />
            <span>添加人物</span>
          </button>

          {/* Theme Preset Chains Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowPresetMenu(!showPresetMenu)}
              className="px-3 py-1.5 bg-[#2C1810] hover:bg-[#3D2217] text-[#FAF5EC] rounded-md border border-[#C4A830]/60 text-xs font-kaiti flex items-center space-x-1 shadow-sm transition"
            >
              <Compass className="w-3.5 h-3.5 text-[#C4A830]" />
              <span className="hidden sm:inline">{activePresetTitle || '主题脉络'}</span>
              <span className="sm:hidden">脉络</span>
            </button>

            {showPresetMenu && (
              <div className="absolute right-0 mt-1 w-64 bg-[#2C1810] border border-[#C4A830] rounded-md shadow-2xl z-50 p-2 divide-y divide-[#C4A830]/20">
                <div className="text-[11px] font-bold font-kaiti text-[#C4A830] pb-1.5 px-1">
                  精选华夏历史脉络:
                </div>
                {presetChains.map(preset => (
                  <div
                    key={preset.id}
                    onClick={() => {
                      onSelectPreset(preset);
                      setShowPresetMenu(false);
                    }}
                    className="py-1.5 px-2 hover:bg-[#C4A830]/20 rounded cursor-pointer transition"
                  >
                    <div className="text-xs font-bold font-kaiti text-[#FAF5EC] flex items-center justify-between">
                      <span>{preset.title}</span>
                      <span className="text-[10px] text-[#C4A830]">{preset.chainIds.length}位</span>
                    </div>
                    <div className="text-[10px] text-[#F5EDDC]/60 font-body line-clamp-1">{preset.subtitle}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Random Explore Button */}
          <button
            onClick={onRandomExplore}
            title="随机探寻一段传承脉络"
            className="px-2.5 py-1.5 bg-[#C4A830] hover:bg-[#D8BA38] text-[#2C1810] rounded-md text-xs font-kaiti font-bold flex items-center space-x-1 shadow-sm transition active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#2C1810]" />
            <span className="hidden md:inline">随机探索</span>
          </button>

          {/* Reset View */}
          <button
            onClick={onReset}
            title="重置视角与节点"
            className="p-1.5 rounded-md bg-[#2C1810] hover:bg-[#8B1A1A] text-[#C4A830] hover:text-[#FAF5EC] border border-[#C4A830]/40 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="px-2.5 py-1.5 bg-[#2B5B84] hover:bg-[#386F9E] text-[#FAF5EC] rounded-md text-xs font-body flex items-center space-x-1 transition shadow-sm"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-300" /> : <Share2 className="w-3.5 h-3.5" />}
            <span className="hidden lg:inline">{copied ? '已复制' : '分享'}</span>
          </button>
        </div>

      </div>
    </header>
  );
};
