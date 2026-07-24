/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { chainData, PRESET_CHAINS } from './data/chainData';
import { PersonNode, PresetChain } from './types';

import { Header } from './components/Header';
import { TimelineView } from './components/TimelineView';
import { DetailModal } from './components/DetailModal';
import { BottomStatusBar } from './components/BottomStatusBar';
import { ClassFilterLegend } from './components/ClassFilterLegend';
import { MobileViewToggle } from './components/MobileViewToggle';
import { AddPersonModal } from './components/AddPersonModal';
import { LayoutGrid, ListFilter } from 'lucide-react';

export default function App() {
  const [personsList, setPersonsList] = useState<PersonNode[]>(chainData);
  const [selectedPerson, setSelectedPerson] = useState<PersonNode | null>(null);
  const [scrollPercentage, setScrollPercentage] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'timeline' | 'list'>('timeline');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [activePresetTitle, setActivePresetTitle] = useState<string>('');

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Dynamic timeline width based on total number of persons
  const timelineWidth = Math.max(3000, personsList.length * 170);

  // Sync scroll position with slider percentage using requestAnimationFrame
  const handleScroll = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      if (scrollContainerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
        const maxScroll = scrollWidth - clientWidth;
        if (maxScroll > 0) {
          setScrollPercentage(scrollLeft / maxScroll);
        }
      }
    });
  }, []);

  // Handle slider drag
  const handleSliderChange = (percentage: number) => {
    setScrollPercentage(percentage);
    if (scrollContainerRef.current) {
      const { scrollWidth, clientWidth } = scrollContainerRef.current;
      const maxScroll = scrollWidth - clientWidth;
      scrollContainerRef.current.scrollLeft = percentage * maxScroll;
    }
  };

  // Scroll to locate specific node on the timeline
  const handleLocateOnTimeline = (personId: string) => {
    const index = personsList.findIndex(p => p.id === personId);
    if (index !== -1 && scrollContainerRef.current) {
      const nodeSpacing = timelineWidth / (personsList.length + 1);
      const targetX = (index + 0.8) * nodeSpacing;
      const clientWidth = scrollContainerRef.current.clientWidth;
      
      scrollContainerRef.current.scrollTo({
        left: Math.max(0, targetX - clientWidth / 2),
        behavior: 'smooth'
      });
    }
  };

  // Handle adding a new person (from pool or custom)
  const handleAddPerson = (newPerson: PersonNode, insertAfterId?: string) => {
    setPersonsList(prevList => {
      const newList = [...prevList];

      if (insertAfterId) {
        const idx = newList.findIndex(p => p.id === insertAfterId);
        if (idx !== -1) {
          const prevPerson = newList[idx];
          const nextPerson = newList[idx + 1];

          // Setup relationships for new person
          newPerson.relationships = {
            previous: {
              id: prevPerson.id,
              name: prevPerson.name,
              type: '传承',
              description: `与${prevPerson.name}历史相承`
            },
            next: nextPerson ? {
              id: nextPerson.id,
              name: nextPerson.name,
              type: '启后',
              description: `启迪${nextPerson.name}`
            } : undefined
          };

          // Update prevPerson's next relationship
          prevPerson.relationships = {
            ...prevPerson.relationships,
            next: {
              id: newPerson.id,
              name: newPerson.name,
              type: '传承',
              description: `启迪${newPerson.name}`
            }
          };

          // Update nextPerson's previous relationship if exists
          if (nextPerson) {
            nextPerson.relationships = {
              ...nextPerson.relationships,
              previous: {
                id: newPerson.id,
                name: newPerson.name,
                type: '承接',
                description: `继承${newPerson.name}遗风`
              }
            };
          }

          newList.splice(idx + 1, 0, newPerson);
          return newList;
        }
      }

      // Default: insert sorted by birthYear
      newList.push(newPerson);
      newList.sort((a, b) => a.birthYear - b.birthYear);

      // Re-link relationships across chain
      for (let i = 0; i < newList.length; i++) {
        const curr = newList[i];
        const prev = newList[i - 1];
        const next = newList[i + 1];

        curr.relationships = {
          previous: prev ? {
            id: prev.id,
            name: prev.name,
            type: curr.relationships.previous?.type || '承接',
            description: curr.relationships.previous?.description || `继承${prev.name}遗风`
          } : undefined,
          next: next ? {
            id: next.id,
            name: next.name,
            type: curr.relationships.next?.type || '启后',
            description: curr.relationships.next?.description || `影响${next.name}`
          } : undefined
        };
      }

      return newList;
    });

    // Automatically select newly added person node
    setSelectedPerson(newPerson);
    setTimeout(() => {
      handleLocateOnTimeline(newPerson.id);
    }, 100);
  };

  // Select Search Person
  const handleSearchSelectPerson = (personId: string) => {
    const p = personsList.find(n => n.id === personId);
    if (p) {
      setSelectedPerson(p);
      handleLocateOnTimeline(personId);
    }
  };

  // Random Explore
  const handleRandomExplore = () => {
    const randomIndex = Math.floor(Math.random() * PRESET_CHAINS.length);
    const preset = PRESET_CHAINS[randomIndex];
    setActivePresetTitle(preset.title);

    const firstPersonInChain = personsList.find(p => p.id === preset.startId) || personsList[0];
    setSelectedPerson(firstPersonInChain);
    handleLocateOnTimeline(firstPersonInChain.id);
  };

  // Reset all filters
  const handleReset = () => {
    setPersonsList(chainData);
    setSelectedPerson(null);
    setActivePresetTitle('');
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = 0;
    }
  };

  // Select Preset
  const handleSelectPreset = (preset: PresetChain) => {
    setActivePresetTitle(preset.title);
    const firstPerson = personsList.find(p => p.id === preset.startId) || personsList[0];
    setSelectedPerson(firstPerson);
    handleLocateOnTimeline(firstPerson.id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1C0D08] text-[#F5EDDC] font-body selection:bg-[#C4A830]/40 selection:text-[#FAF5EC]">
      
      {/* Header Bar */}
      <Header
        allPersons={personsList}
        presetChains={PRESET_CHAINS}
        onSearchSelectPerson={handleSearchSelectPerson}
        onOpenAddPersonModal={() => setIsAddModalOpen(true)}
        onRandomExplore={handleRandomExplore}
        onReset={handleReset}
        onSelectPreset={handleSelectPreset}
        activePresetTitle={activePresetTitle}
      />

      {/* Class Legend & Info Bar */}
      <ClassFilterLegend />

      {/* Sub-Header Title Bar & View Toggle */}
      <div className="bg-[#1C0D08]/90 border-b border-[#C4A830]/30 px-4 py-1.5 flex items-center justify-between text-xs font-kaiti">
        <div className="text-[#C4A830] font-bold flex items-center space-x-2">
          <span>中国历代人物关联长卷</span>
          {activePresetTitle && (
            <span className="text-[10px] bg-[#8B1A1A] text-[#FAF5EC] px-2 py-0.5 rounded border border-[#C4A830]/40">
              【{activePresetTitle}】
            </span>
          )}
        </div>

        {/* View Switcher */}
        <div className="flex items-center space-x-1 bg-[#2C1810] p-0.5 rounded border border-[#C4A830]/40">
          <button
            onClick={() => setViewMode('timeline')}
            className={`px-2.5 py-0.5 rounded text-[11px] flex items-center space-x-1 transition ${
              viewMode === 'timeline' ? 'bg-[#8B1A1A] text-[#FAF5EC] font-bold' : 'text-[#F5EDDC]/70 hover:text-[#FAF5EC]'
            }`}
          >
            <LayoutGrid className="w-3 h-3" />
            <span>长卷视图</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-2.5 py-0.5 rounded text-[11px] flex items-center space-x-1 transition ${
              viewMode === 'list' ? 'bg-[#8B1A1A] text-[#FAF5EC] font-bold' : 'text-[#F5EDDC]/70 hover:text-[#FAF5EC]'
            }`}
          >
            <ListFilter className="w-3 h-3" />
            <span>纵向列表</span>
          </button>
        </div>
      </div>

      {/* Main Canvas Scroll Area (Full Page Dynasty Colors Background) */}
      <main className="flex-1 relative flex flex-col justify-start overflow-hidden">
        {viewMode === 'timeline' ? (
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="horizontal-timeline-scroll overflow-x-auto overflow-y-hidden w-full relative pb-12"
          >
            <TimelineView
              persons={personsList}
              activePathIds={[]}
              selectedPersonId={selectedPerson?.id || null}
              onSelectPerson={(person) => setSelectedPerson(person)}
              timelineWidth={timelineWidth}
            />
          </div>
        ) : (
          /* Mobile / Vertical List View */
          <div className="flex-1 overflow-y-auto pb-16">
            <MobileViewToggle
              persons={personsList}
              activePathIds={[]}
              selectedPersonId={selectedPerson?.id || null}
              onSelectPerson={(person) => setSelectedPerson(person)}
            />
          </div>
        )}
      </main>

      {/* Bottom 33% Detail Modal Panel (Triggered on Person Click) */}
      <DetailModal
        person={selectedPerson}
        onClose={() => setSelectedPerson(null)}
        onNavigateToPerson={(id) => {
          const target = personsList.find(p => p.id === id);
          if (target) {
            setSelectedPerson(target);
            handleLocateOnTimeline(id);
          }
        }}
        onLocateOnTimeline={(id) => {
          handleLocateOnTimeline(id);
        }}
      />

      {/* Bottom Status Bar & Synchronized Slider */}
      <BottomStatusBar
        personCount={personsList.length}
        startYear={-221}
        endYear={1949}
        scrollPercentage={scrollPercentage}
        onSliderChange={handleSliderChange}
        persons={personsList}
        activePathIds={[]}
      />

      {/* Add Person Modal Dialog */}
      <AddPersonModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddPerson={handleAddPerson}
        existingPersons={personsList}
      />

    </div>
  );
}
