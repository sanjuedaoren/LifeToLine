import React, { useState } from 'react';
import { X, Search, Plus, UserPlus, CheckCircle, Sparkles } from 'lucide-react';
import { PersonNode } from '../types';
import { DYNASTIES, SOCIAL_CLASS_COLORS } from '../data/dynasties';
import { MASTER_PERSONS_POOL } from '../data/masterPersonsPool';

interface AddPersonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPerson: (newPerson: PersonNode, insertAfterId?: string) => void;
  existingPersons: PersonNode[];
}

export const AddPersonModal: React.FC<AddPersonModalProps> = ({
  isOpen,
  onClose,
  onAddPerson,
  existingPersons
}) => {
  const [tab, setTab] = useState<'pool' | 'custom'>('pool');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPoolPerson, setSelectedPoolPerson] = useState<Partial<PersonNode> | null>(null);
  const [insertAfterId, setInsertAfterId] = useState<string>('');

  // Form state for custom person
  const [customName, setCustomName] = useState('');
  const [customCourtesyName, setCustomCourtesyName] = useState('');
  const [customDynasty, setCustomDynasty] = useState('唐');
  const [customBirthYear, setCustomBirthYear] = useState<number>(700);
  const [customDeathYear, setCustomDeathYear] = useState<number>(760);
  const [customClass, setCustomClass] = useState<PersonNode['class']>('士');
  const [customQuote, setCustomQuote] = useState('');
  const [customQuoteSource, setCustomQuoteSource] = useState('');
  const [customSummary, setCustomSummary] = useState('');

  if (!isOpen) return null;

  const filteredPool = MASTER_PERSONS_POOL.filter(p => {
    // Exclude if already in existingPersons
    const exists = existingPersons.some(ep => ep.name === p.name);
    if (exists) return false;
    if (!searchQuery) return true;
    return (
      p.name?.includes(searchQuery) ||
      p.dynasty?.includes(searchQuery) ||
      p.class?.includes(searchQuery)
    );
  });

  const handleConfirmPoolAdd = () => {
    if (!selectedPoolPerson) return;

    const dynastyObj = DYNASTIES.find(d => d.name === selectedPoolPerson.dynasty);
    const newPerson: PersonNode = {
      id: selectedPoolPerson.id || `custom-${Date.now()}`,
      name: selectedPoolPerson.name || '无名氏',
      courtesyName: selectedPoolPerson.courtesyName,
      birthYear: selectedPoolPerson.birthYear || 0,
      deathYear: selectedPoolPerson.deathYear || 50,
      dynasty: selectedPoolPerson.dynasty || '唐',
      dynastyStart: dynastyObj ? dynastyObj.startYear : 618,
      dynastyEnd: dynastyObj ? dynastyObj.endYear : 907,
      class: selectedPoolPerson.class || '士',
      classColor: SOCIAL_CLASS_COLORS[selectedPoolPerson.class || '士'] || '#C41A1A',
      quote: selectedPoolPerson.quote || '苟利国家生死以，岂因祸福避趋之。',
      quoteSource: selectedPoolPerson.quoteSource || '史记',
      avatar: selectedPoolPerson.name ? selectedPoolPerson.name[0] : '士',
      isKeyFigure: true,
      summary: selectedPoolPerson.summary || '著名历史人物。',
      relationships: {}
    };

    onAddPerson(newPerson, insertAfterId || undefined);
    onClose();
  };

  const handleConfirmCustomAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customName.trim()) return;

    const dynastyObj = DYNASTIES.find(d => d.name === customDynasty);
    const newPerson: PersonNode = {
      id: `custom-${Date.now()}`,
      name: customName.trim(),
      courtesyName: customCourtesyName.trim() || undefined,
      birthYear: Number(customBirthYear),
      deathYear: Number(customDeathYear),
      dynasty: customDynasty,
      dynastyStart: dynastyObj ? dynastyObj.startYear : 618,
      dynastyEnd: dynastyObj ? dynastyObj.endYear : 907,
      class: customClass,
      classColor: SOCIAL_CLASS_COLORS[customClass] || '#C41A1A',
      quote: customQuote.trim() || '天行健，君子以自强不息。',
      quoteSource: customQuoteSource.trim() || '《周易》',
      avatar: customName[0],
      isKeyFigure: false,
      summary: customSummary.trim() || `${customDynasty}时期人物`,
      relationships: {}
    };

    onAddPerson(newPerson, insertAfterId || undefined);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-[#1C0D08]/60 backdrop-blur-xs" onClick={onClose} />

      {/* Main Dialog */}
      <div className="relative w-full max-w-2xl rice-paper-card border-2 border-[#C4A830] rounded-xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#1C0D08] text-[#F5EDDC] px-5 py-3 border-b border-[#C4A830]/50 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <UserPlus className="w-5 h-5 text-[#C4A830]" />
            <h3 className="font-kaiti font-bold text-lg text-[#FAF5EC] tracking-wide">
              添加历史人物到关系链
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-[#F5EDDC]/70 hover:text-[#FAF5EC] hover:bg-[#8B1A1A] transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#C4A830]/30 bg-[#F5EDDC]">
          <button
            onClick={() => setTab('pool')}
            className={`flex-1 py-2.5 px-4 font-kaiti font-bold text-sm text-center transition flex items-center justify-center space-x-1.5 ${
              tab === 'pool'
                ? 'bg-[#FAF5EC] text-[#8B1A1A] border-b-2 border-[#8B1A1A]'
                : 'text-[#2C1810]/70 hover:text-[#2C1810]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#C4A830]" />
            <span>从历史名士库选择</span>
          </button>
          <button
            onClick={() => setTab('custom')}
            className={`flex-1 py-2.5 px-4 font-kaiti font-bold text-sm text-center transition flex items-center justify-center space-x-1.5 ${
              tab === 'custom'
                ? 'bg-[#FAF5EC] text-[#8B1A1A] border-b-2 border-[#8B1A1A]'
                : 'text-[#2C1810]/70 hover:text-[#2C1810]'
            }`}
          >
            <Plus className="w-4 h-4 text-[#2B5B84]" />
            <span>自定义新增人物</span>
          </button>
        </div>

        {/* Insert Position Selection */}
        <div className="px-5 py-2.5 bg-[#FAF5EC] border-b border-[#C4A830]/20 flex items-center space-x-3 text-xs font-kaiti text-[#2C1810]">
          <span className="font-bold text-[#8B1A1A] shrink-0">插入位置:</span>
          <select
            value={insertAfterId}
            onChange={e => setInsertAfterId(e.target.value)}
            className="flex-1 bg-[#F5EDDC] border border-[#C4A830]/40 rounded px-2 py-1 focus:outline-none focus:border-[#C4A830] font-simsun text-xs text-[#2C1810]"
          >
            <option value="">自动按朝代/生卒年排序插入</option>
            {existingPersons.map(p => (
              <option key={p.id} value={p.id}>
                插入在 【{p.name} ({p.dynasty})】 之后
              </option>
            ))}
          </select>
        </div>

        {/* Tab Content */}
        <div className="p-5 overflow-y-auto flex-1">
          {tab === 'pool' ? (
            <div className="space-y-4">
              {/* Search input */}
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#2C1810]/40" />
                <input
                  type="text"
                  placeholder="搜索历史名士姓名、朝代或身份 (例如: 秦始皇、司马迁、岳飞)..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-[#F5EDDC] border border-[#C4A830]/40 rounded-lg text-xs font-simsun focus:outline-none focus:border-[#C4A830] text-[#2C1810]"
                />
              </div>

              {/* Pool Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[320px] overflow-y-auto pr-1">
                {filteredPool.length > 0 ? (
                  filteredPool.map(p => {
                    const isSelected = selectedPoolPerson?.id === p.id;
                    const classBg = SOCIAL_CLASS_COLORS[p.class || '士'];

                    return (
                      <div
                        key={p.id}
                        onClick={() => setSelectedPoolPerson(p)}
                        className={`p-3 rounded-lg border cursor-pointer transition flex items-start space-x-3 relative ${
                          isSelected
                            ? 'bg-[#FAF5EC] border-[#8B1A1A] ring-2 ring-[#8B1A1A]/30 shadow-md'
                            : 'bg-[#FAF5EC]/70 border-[#C4A830]/30 hover:border-[#C4A830] hover:bg-[#FAF5EC]'
                        }`}
                      >
                        {/* Avatar */}
                        <div
                          className="w-10 h-10 rounded-full text-[#FAF5EC] font-kaiti font-bold text-lg flex items-center justify-center shrink-0 border border-[#FAF5EC]"
                          style={{ backgroundColor: classBg }}
                        >
                          {p.name ? p.name[0] : '士'}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <span className="font-simsun font-bold text-sm text-[#2C1810]">
                              {p.name}
                            </span>
                            <span
                              className="text-[10px] font-kaiti px-1.5 py-0.2 rounded text-[#FAF5EC]"
                              style={{ backgroundColor: classBg }}
                            >
                              {p.class}
                            </span>
                            <span className="text-[10px] bg-[#2C1810] text-[#C4A830] px-1.5 py-0.2 rounded font-kaiti">
                              {p.dynasty}
                            </span>
                          </div>

                          <div className="text-[10px] text-[#8B1A1A] font-kaiti mt-0.5">
                            {p.birthYear && p.birthYear < 0 ? `公元前${Math.abs(p.birthYear)}` : p.birthYear} - {p.deathYear && p.deathYear < 0 ? `公元前${Math.abs(p.deathYear)}` : p.deathYear}年
                          </div>

                          <p className="text-[11px] text-[#2C1810]/70 font-body line-clamp-1 mt-1">
                            {p.summary}
                          </p>
                        </div>

                        {isSelected && (
                          <CheckCircle className="w-5 h-5 text-[#8B1A1A] absolute top-2 right-2" />
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="col-span-2 py-8 text-center text-xs font-kaiti text-[#2C1810]/60">
                    没有可选择的人物（已全部添加或未搜索到）
                  </div>
                )}
              </div>

              {/* Confirm pool add button */}
              <div className="flex justify-end pt-2 border-t border-[#C4A830]/30">
                <button
                  disabled={!selectedPoolPerson}
                  onClick={handleConfirmPoolAdd}
                  className={`px-5 py-2 rounded-lg font-kaiti font-bold text-xs flex items-center space-x-1.5 shadow-md transition ${
                    selectedPoolPerson
                      ? 'bg-[#8B1A1A] text-[#FAF5EC] hover:bg-[#721515]'
                      : 'bg-[#2C1810]/20 text-[#2C1810]/40 cursor-not-allowed'
                  }`}
                >
                  <Plus className="w-4 h-4" />
                  <span>添加所选人物到时空长廊</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleConfirmCustomAdd} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-kaiti font-bold text-[#2C1810] mb-1">
                    人物姓名 <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="如: 班固"
                    value={customName}
                    onChange={e => setCustomName(e.target.value)}
                    className="w-full px-3 py-1.5 bg-[#F5EDDC] border border-[#C4A830]/40 rounded text-xs font-simsun focus:outline-none focus:border-[#C4A830] text-[#2C1810]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-kaiti font-bold text-[#2C1810] mb-1">
                    字号 / 别称
                  </label>
                  <input
                    type="text"
                    placeholder="如: 字孟坚"
                    value={customCourtesyName}
                    onChange={e => setCustomCourtesyName(e.target.value)}
                    className="w-full px-3 py-1.5 bg-[#F5EDDC] border border-[#C4A830]/40 rounded text-xs font-simsun focus:outline-none focus:border-[#C4A830] text-[#2C1810]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-kaiti font-bold text-[#2C1810] mb-1">
                    所属朝代
                  </label>
                  <select
                    value={customDynasty}
                    onChange={e => setCustomDynasty(e.target.value)}
                    className="w-full px-3 py-1.5 bg-[#F5EDDC] border border-[#C4A830]/40 rounded text-xs font-kaiti focus:outline-none focus:border-[#C4A830] text-[#2C1810]"
                  >
                    {DYNASTIES.map(d => (
                      <option key={d.name} value={d.name}>
                        {d.name} ({d.startYear < 0 ? `前${Math.abs(d.startYear)}` : d.startYear} - {d.endYear})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-kaiti font-bold text-[#2C1810] mb-1">
                    阶层身份
                  </label>
                  <select
                    value={customClass}
                    onChange={e => setCustomClass(e.target.value as PersonNode['class'])}
                    className="w-full px-3 py-1.5 bg-[#F5EDDC] border border-[#C4A830]/40 rounded text-xs font-kaiti focus:outline-none focus:border-[#C4A830] text-[#2C1810]"
                  >
                    <option value="士">士 (赤红)</option>
                    <option value="农">农 (翠绿)</option>
                    <option value="工">工 (琥珀橙)</option>
                    <option value="商">商 (鎏金)</option>
                    <option value="帝王">帝王 (紫红)</option>
                    <option value="武将">武将 (玄青/深蓝)</option>
                    <option value="文人">文人 (黛蓝/青墨)</option>
                    <option value="僧道">僧道 (卡其/墨绿)</option>
                    <option value="其他">其他 (褐灰)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-kaiti font-bold text-[#2C1810] mb-1">
                    生年 (公元，负数为公元前)
                  </label>
                  <input
                    type="number"
                    value={customBirthYear}
                    onChange={e => setCustomBirthYear(Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-[#F5EDDC] border border-[#C4A830]/40 rounded text-xs font-mono focus:outline-none focus:border-[#C4A830] text-[#2C1810]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-kaiti font-bold text-[#2C1810] mb-1">
                    卒年 (公元，负数为公元前)
                  </label>
                  <input
                    type="number"
                    value={customDeathYear}
                    onChange={e => setCustomDeathYear(Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-[#F5EDDC] border border-[#C4A830]/40 rounded text-xs font-mono focus:outline-none focus:border-[#C4A830] text-[#2C1810]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-kaiti font-bold text-[#2C1810] mb-1">
                  传世名言 / 名句
                </label>
                <input
                  type="text"
                  placeholder="如: 论先后，知为先；论轻重，行为重。"
                  value={customQuote}
                  onChange={e => setCustomQuote(e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#F5EDDC] border border-[#C4A830]/40 rounded text-xs font-kaiti focus:outline-none focus:border-[#C4A830] text-[#2C1810]"
                />
              </div>

              <div>
                <label className="block text-xs font-kaiti font-bold text-[#2C1810] mb-1">
                  名句出处
                </label>
                <input
                  type="text"
                  placeholder="如: 《汉书·班固传》"
                  value={customQuoteSource}
                  onChange={e => setCustomQuoteSource(e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#F5EDDC] border border-[#C4A830]/40 rounded text-xs font-kaiti focus:outline-none focus:border-[#C4A830] text-[#2C1810]"
                />
              </div>

              <div>
                <label className="block text-xs font-kaiti font-bold text-[#2C1810] mb-1">
                  生平述要
                </label>
                <textarea
                  rows={2}
                  placeholder="简要描述其历史贡献与地位..."
                  value={customSummary}
                  onChange={e => setCustomSummary(e.target.value)}
                  className="w-full px-3 py-1.5 bg-[#F5EDDC] border border-[#C4A830]/40 rounded text-xs font-body focus:outline-none focus:border-[#C4A830] text-[#2C1810]"
                />
              </div>

              <div className="flex justify-end pt-2 border-t border-[#C4A830]/30">
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#8B1A1A] hover:bg-[#721515] text-[#FAF5EC] rounded-lg font-kaiti font-bold text-xs flex items-center space-x-1.5 shadow-md transition"
                >
                  <Plus className="w-4 h-4" />
                  <span>生成人物节点并添加到时间轴</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
