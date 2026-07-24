import React, { useRef, useState, useEffect } from 'react';
import { PersonNode, DynastyInfo } from '../types';
import { DYNASTIES, RELATIONSHIP_COLORS, SOCIAL_CLASS_COLORS } from '../data/dynasties';

interface TimelineViewProps {
  persons: PersonNode[];
  activePathIds: string[];
  selectedPersonId: string | null;
  onSelectPerson: (person: PersonNode) => void;
  timelineWidth: number;
  onDynastyClick?: (dynasty: DynastyInfo) => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({
  persons,
  activePathIds,
  selectedPersonId,
  onSelectPerson,
  timelineWidth,
  onDynastyClick
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Drag-to-Pan state
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; scrollLeft: number }>({ x: 0, scrollLeft: 0 });
  const dragDistanceRef = useRef<number>(0);
  const lastPosRef = useRef<{ x: number; time: number }>({ x: 0, time: 0 });
  const velocityRef = useRef<number>(0);
  const animFrameRef = useRef<number | null>(null);

  // 1. Calculate Dynasty Columns
  const totalYears = 1949 - (-221); // 2170 years
  let accumulatedX = 0;

  const dynastyColumns = DYNASTIES.map(d => {
    const duration = d.endYear - d.startYear;
    // Each dynasty gets a min width of 220px + proportional extra width
    const minW = 220;
    const extraW = (duration / totalYears) * (timelineWidth - DYNASTIES.length * minW);
    const width = Math.max(minW, minW + extraW);
    const startX = accumulatedX;
    const endX = accumulatedX + width;
    accumulatedX = endX;

    return {
      ...d,
      startX,
      endX,
      width
    };
  });

  const computedTotalWidth = Math.max(timelineWidth, accumulatedX);

  // 2. Position nodes STRICTLY inside their dynasty's horizontal span
  // Group persons by dynasty
  const personsByDynasty: { [key: string]: PersonNode[] } = {};
  persons.forEach(p => {
    if (!personsByDynasty[p.dynasty]) {
      personsByDynasty[p.dynasty] = [];
    }
    personsByDynasty[p.dynasty].push(p);
  });

  // Calculate strict node positions
  const nodePositions: (PersonNode & { x: number; y: number })[] = [];

  Object.keys(personsByDynasty).forEach(dynastyName => {
    const group = personsByDynasty[dynastyName];
    // Sort group by birthYear
    group.sort((a, b) => a.birthYear - b.birthYear);

    const col = dynastyColumns.find(c => c.name === dynastyName) || dynastyColumns[0];
    const usableWidth = col.width - 100; // 50px padding on each side inside dynasty zone

    group.forEach((person, idx) => {
      let x = col.startX + col.width / 2;

      if (group.length === 1) {
        x = col.startX + col.width / 2;
      } else {
        // Position proportionally by birth year relative to dynasty start/end
        const dDuration = Math.max(1, col.endYear - col.startYear);
        const relativeYear = person.birthYear - col.startYear;
        let pct = relativeYear / dDuration;
        pct = Math.max(0.1, Math.min(0.9, pct));

        x = col.startX + 50 + pct * usableWidth;

        // Ensure minimum spacing between adjacent nodes in same dynasty
        if (idx > 0) {
          const prevX = nodePositions[nodePositions.length - 1].x;
          if (x - prevX < 90) {
            x = prevX + 90;
          }
        }
      }

      // Clamp strictly within dynasty bounds
      x = Math.max(col.startX + 45, Math.min(col.endX - 45, x));

      // Alternate Y positions across 3 vertical tiers
      const tierY = [140, 260, 200][idx % 3];

      nodePositions.push({
        ...person,
        x,
        y: tierY
      });
    });
  });

  // Re-sort nodePositions to match original persons array order for connections
  const orderedNodePositions = persons.map(p =>
    nodePositions.find(np => np.id === p.id) || { ...p, x: 200, y: 200 }
  );

  // Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    dragDistanceRef.current = 0;
    dragStartRef.current = {
      x: e.clientX,
      scrollLeft: containerRef.current.scrollLeft
    };
    lastPosRef.current = { x: e.clientX, time: performance.now() };
    velocityRef.current = 0;
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    dragDistanceRef.current += Math.abs(dx);
    containerRef.current.scrollLeft = dragStartRef.current.scrollLeft - dx;

    const now = performance.now();
    const dt = now - lastPosRef.current.time;
    if (dt > 0) {
      velocityRef.current = (e.clientX - lastPosRef.current.x) / dt;
    }
    lastPosRef.current = { x: e.clientX, time: now };
  };

  const handleMouseUpOrLeave = () => {
    if (!isDragging) return;
    setIsDragging(false);

    let v = velocityRef.current * 16;
    const step = () => {
      if (Math.abs(v) < 0.5 || !containerRef.current) return;
      containerRef.current.scrollLeft -= v;
      v *= 0.92;
      animFrameRef.current = requestAnimationFrame(step);
    };
    step();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current || e.touches.length === 0) return;
    setIsDragging(true);
    dragDistanceRef.current = 0;
    const touch = e.touches[0];
    dragStartRef.current = {
      x: touch.clientX,
      scrollLeft: containerRef.current.scrollLeft
    };
    lastPosRef.current = { x: touch.clientX, time: performance.now() };
    velocityRef.current = 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const dx = touch.clientX - dragStartRef.current.x;
    dragDistanceRef.current += Math.abs(dx);
    containerRef.current.scrollLeft = dragStartRef.current.scrollLeft - dx;

    const now = performance.now();
    const dt = now - lastPosRef.current.time;
    if (dt > 0) {
      velocityRef.current = (touch.clientX - lastPosRef.current.x) / dt;
    }
    lastPosRef.current = { x: touch.clientX, time: now };
  };

  const handleNodeClick = (p: PersonNode) => {
    // Only select if user was not actively dragging a long distance
    if (dragDistanceRef.current < 10) {
      onSelectPerson(p);
    }
  };

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUpOrLeave}
      className={`relative w-full overflow-x-auto select-none min-h-[520px] transition-cursor ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
      style={{ scrollbarWidth: 'thin', scrollbarColor: '#C4A830 #1C0D08' }}
    >
      <div
        className="relative min-h-[520px] flex items-stretch"
        style={{ width: `${computedTotalWidth}px` }}
      >
        {/* FULL-PAGE DYNASTY COLOR BACKGROUND COLUMNS */}
        <div className="absolute inset-0 flex items-stretch pointer-events-auto">
          {dynastyColumns.map(dynasty => {
            return (
              <div
                key={dynasty.name}
                onClick={() => onDynastyClick && onDynastyClick(dynasty)}
                className="relative flex flex-col justify-between border-r border-[#C4A830]/30 hover:brightness-110 transition-all group"
                style={{
                  width: `${dynasty.width}px`,
                  backgroundColor: dynasty.color,
                  backgroundImage: `linear-gradient(180deg, ${dynasty.color}f0 0%, ${dynasty.color}c0 40%, ${dynasty.color}e0 100%)`
                }}
              >
                {/* Dynasty Top Header Bar */}
                <div className="bg-[#1C0D08]/80 text-[#FAF5EC] py-2 px-3 border-b border-[#C4A830]/40 flex flex-col items-center justify-center backdrop-blur-xs">
                  <span className="font-kaiti font-bold text-sm sm:text-base tracking-widest text-[#FAF5EC] group-hover:text-[#C4A830] transition">
                    {dynasty.name}
                  </span>
                  <span className="text-[10px] text-[#C4A830] font-mono tracking-tight">
                    {dynasty.startYear < 0 ? `公元前${Math.abs(dynasty.startYear)}` : dynasty.startYear} - {dynasty.endYear < 0 ? `公元前${Math.abs(dynasty.endYear)}` : dynasty.endYear}年
                  </span>
                </div>

                {/* Background Watermark Dynasty Character */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                  <span className="text-[120px] font-kaiti font-bold text-[#FAF5EC]/5 select-none transform rotate-12">
                    {dynasty.name[0]}
                  </span>
                </div>

                {/* Bottom Era Marker */}
                <div className="bg-[#1C0D08]/70 py-1 px-2 text-center text-[9px] text-[#FAF5EC]/60 font-kaiti border-t border-[#C4A830]/20">
                  {dynasty.name}纪元
                </div>
              </div>
            );
          })}
        </div>

        {/* SVG CANVAS FOR RELATIONSHIP CONNECTIONS */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          style={{ width: `${computedTotalWidth}px` }}
        >
          <defs>
            <filter id="gold-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Draw Connection Lines between consecutive figures in chain */}
          {orderedNodePositions.map((currNode, i) => {
            if (i === orderedNodePositions.length - 1) return null;
            const nextNode = orderedNodePositions[i + 1];

            const relation = currNode.relationships.next;
            const relType = relation?.type || '关联';
            const relConfig = RELATIONSHIP_COLORS[relType] || RELATIONSHIP_COLORS['其他'];

            const isPathEdge =
              activePathIds.length > 0 &&
              activePathIds.includes(currNode.id) &&
              activePathIds.includes(nextNode.id);

            const strokeColor = isPathEdge ? '#C4A830' : relConfig.color;
            const strokeWidth = isPathEdge ? 3.5 : 2;
            const strokeDash =
              relConfig.style === 'dashed'
                ? '6, 6'
                : relConfig.style === 'dotted'
                ? '3, 3'
                : 'none';

            // Bezier Curve Control Point
            const midX = (currNode.x + nextNode.x) / 2;
            const midY = (currNode.y + nextNode.y) / 2 - (i % 2 === 0 ? 40 : -40);

            const pathD = `M ${currNode.x} ${currNode.y} Q ${midX} ${midY}, ${nextNode.x} ${nextNode.y}`;

            return (
              <g key={`line-${currNode.id}-${nextNode.id}`}>
                {/* Curve */}
                <path
                  d={pathD}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={strokeWidth}
                  strokeDasharray={strokeDash}
                  className="opacity-85 hover:opacity-100 transition-opacity"
                  style={{
                    filter: isPathEdge ? 'url(#gold-glow-filter)' : 'none'
                  }}
                />

                {/* Relationship Type Badge */}
                <g transform={`translate(${midX}, ${midY})`} className="pointer-events-auto cursor-pointer">
                  <rect
                    x="-32"
                    y="-11"
                    width="64"
                    height="22"
                    rx="4"
                    fill="#1C0D08"
                    stroke={strokeColor}
                    strokeWidth="1.2"
                    className="shadow-md"
                  />
                  <text
                    x="0"
                    y="4"
                    textAnchor="middle"
                    fill={strokeColor}
                    fontSize="10"
                    fontWeight="bold"
                    className="font-kaiti select-none"
                  >
                    {relType}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        {/* PERSON NODES (NO CLASS NAME TEXT ON NODE) */}
        <div className="relative z-20 w-full h-full pointer-events-none">
          {orderedNodePositions.map(person => {
            const isKey = person.isKeyFigure;
            const isSelected = selectedPersonId === person.id;
            const isPathNode = activePathIds.length === 0 || activePathIds.includes(person.id);

            const nodeSize = isKey ? 88 : 72;
            const classBg = SOCIAL_CLASS_COLORS[person.class] || '#C41A1A';

            return (
              <div
                key={person.id}
                onClick={() => handleNodeClick(person)}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer pointer-events-auto transition-all duration-300 group ${
                  isPathNode ? 'opacity-100 scale-100' : 'opacity-40 hover:opacity-90 scale-95'
                }`}
                style={{
                  left: `${person.x}px`,
                  top: `${person.y}px`,
                }}
              >
                {/* Node Circle */}
                <div
                  className={`relative rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                    isSelected ? 'ring-4 ring-[#C4A830] ring-offset-2 ring-offset-[#1C0D08] scale-105 shadow-2xl' : ''
                  }`}
                  style={{
                    width: `${nodeSize}px`,
                    height: `${nodeSize}px`,
                    backgroundColor: classBg,
                    boxShadow: isSelected
                      ? '0 0 30px rgba(196, 168, 48, 0.9)'
                      : '0 6px 20px rgba(0, 0, 0, 0.4)'
                  }}
                >
                  {/* Inner Rice Paper Disc */}
                  <div
                    className="rounded-full bg-[#FAF5EC] border-2 border-[#FAF5EC] flex flex-col items-center justify-center p-1 text-center shadow-inner"
                    style={{
                      width: `${nodeSize - 8}px`,
                      height: `${nodeSize - 8}px`,
                    }}
                  >
                    {/* Character Seal */}
                    <span
                      className="font-kaiti font-bold text-lg sm:text-xl leading-none tracking-tight"
                      style={{ color: classBg }}
                    >
                      {person.avatar || person.name[0]}
                    </span>

                    {/* Name */}
                    <span className="font-simsun font-bold text-xs sm:text-sm text-[#2C1810] mt-0.5 truncate max-w-[62px]">
                      {person.name}
                    </span>
                  </div>

                  {/* Dynasty Tag at bottom of circle */}
                  <span className="absolute -bottom-2 bg-[#1C0D08] text-[#C4A830] text-[9px] font-kaiti px-2 py-0.5 rounded-full border border-[#C4A830]/50 shadow-md">
                    {person.dynasty}
                  </span>
                </div>

                {/* Info Card Below Node */}
                <div className="mt-3.5 text-center w-36 -ml-5 sm:-ml-2 bg-[#1C0D08]/90 text-[#FAF5EC] backdrop-blur-md p-1.5 rounded-md border border-[#C4A830]/40 shadow-lg group-hover:border-[#C4A830] transition-colors">
                  <div className="text-[10px] text-[#C4A830] font-kaiti font-bold">
                    {person.birthYear < 0 ? `公元前${Math.abs(person.birthYear)}` : person.birthYear} - {person.deathYear < 0 ? `公元前${Math.abs(person.deathYear)}` : person.deathYear}年
                  </div>
                  <div className="text-[11px] text-[#FAF5EC]/90 font-kaiti italic line-clamp-1 mt-0.5">
                    “{person.quote}”
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
