import React, { useState } from 'react';
import { PriceHistory } from '../types';

interface PriceHistoryChartProps {
  priceHistory: PriceHistory;
  currency?: string;
}

export const PriceHistoryChart: React.FC<PriceHistoryChartProps> = ({
  priceHistory,
  currency = '₹',
}) => {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'30d' | '90d' | '1y'>('90d');
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; date: string; price: number } | null>(null);

  const data = selectedTimeframe === '30d'
    ? priceHistory.period30d
    : selectedTimeframe === '90d'
    ? priceHistory.period90d
    : priceHistory.period1y;

  const prices = data.map((d) => d.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceRange = maxPrice - minPrice || 1;

  // Chart coordinates
  const svgWidth = 460;
  const svgHeight = 160;
  const paddingX = 25;
  const paddingTop = 25;
  const paddingBottom = 25;
  const usableWidth = svgWidth - paddingX * 2;
  const usableHeight = svgHeight - paddingTop - paddingBottom;

  const points = data.map((d, index) => {
    const x = paddingX + (index / (data.length - 1 || 1)) * usableWidth;
    // higher price = lower y (svg coordinate system)
    const normalizedPrice = (d.price - minPrice) / priceRange;
    const y = paddingTop + (1 - normalizedPrice) * usableHeight;
    return { x, y, date: d.date, price: d.price, label: d.label };
  });

  // Build SVG path
  let pathD = '';
  if (points.length > 0) {
    pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cx = (p0.x + p1.x) / 2;
      pathD += ` C ${cx} ${p0.y}, ${cx} ${p1.y}, ${p1.x} ${p1.y}`;
    }
  }

  const fillAreaD = points.length > 0
    ? `${pathD} L ${points[points.length - 1].x} ${svgHeight - 10} L ${points[0].x} ${svgHeight - 10} Z`
    : '';

  return (
    <div className="bg-white rounded-2xl p-6 border border-[#c6c5d4]/30 shadow-[0_4px_20px_rgba(26,35,126,0.03)]">
      {/* Header with Timeframe selector */}
      <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#e0e0ff] text-[#000666] flex items-center justify-center font-bold text-xs">
            📊
          </div>
          <div>
            <h3 className="font-bold text-[#071e27] text-base leading-tight">Price History & Trends</h3>
            <p className="text-xs text-[#5b5f61]">Tracked daily across verified merchants</p>
          </div>
        </div>

        <div className="flex bg-[#f3faff] p-1 rounded-xl border border-[#c6c5d4]/40">
          {(['30d', '90d', '1y'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setSelectedTimeframe(tf)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                selectedTimeframe === tf
                  ? 'bg-[#000666] text-white shadow-sm'
                  : 'text-[#454652] hover:text-[#000666] hover:bg-white/60'
              }`}
            >
              {tf === '30d' ? '30 Days' : tf === '90d' ? '90 Days' : '1 Year'}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
        <div className="bg-[#10b981]/5 border border-[#10b981]/20 p-3.5 rounded-xl">
          <p className="text-[10px] font-bold text-[#005236] uppercase tracking-wider mb-0.5">
            LOWEST ({selectedTimeframe.toUpperCase()})
          </p>
          <p className="text-lg font-bold text-[#071e27]">
            {currency}{priceHistory.lowest90d.toLocaleString('en-IN')}
          </p>
        </div>

        <div className="bg-[#f3faff] border border-[#c6c5d4]/30 p-3.5 rounded-xl">
          <p className="text-[10px] font-bold text-[#5b5f61] uppercase tracking-wider mb-0.5">
            AVERAGE ({selectedTimeframe.toUpperCase()})
          </p>
          <p className="text-lg font-bold text-[#454652]">
            {currency}{priceHistory.average90d.toLocaleString('en-IN')}
          </p>
        </div>

        <div className="bg-[#f3faff] border border-[#c6c5d4]/30 p-3.5 rounded-xl col-span-2 sm:col-span-1">
          <p className="text-[10px] font-bold text-[#5b5f61] uppercase tracking-wider mb-0.5">
            PRICE TREND
          </p>
          <p className="text-sm font-bold text-[#10b981] flex items-center gap-1 mt-1">
            <span className="inline-block w-2 h-2 rounded-full bg-[#10b981] animate-pulse"></span>
            8% Below Average
          </p>
        </div>
      </div>

      {/* Interactive SVG Chart */}
      <div className="relative w-full overflow-hidden pt-2">
        <svg
          className="w-full h-44 overflow-visible"
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="dealoraChartGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#000666" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#000666" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid horizontal lines */}
          <line x1={paddingX} y1={paddingTop} x2={svgWidth - paddingX} y2={paddingTop} stroke="#e0e3e5" strokeWidth="1" strokeDasharray="3,3" />
          <line x1={paddingX} y1={svgHeight / 2} x2={svgWidth - paddingX} y2={svgHeight / 2} stroke="#e0e3e5" strokeWidth="1" strokeDasharray="3,3" />
          <line x1={paddingX} y1={svgHeight - paddingBottom} x2={svgWidth - paddingX} y2={svgHeight - paddingBottom} stroke="#e0e3e5" strokeWidth="1" strokeDasharray="3,3" />

          {/* Area fill under the line */}
          {fillAreaD && (
            <path d={fillAreaD} fill="url(#dealoraChartGrad)" />
          )}

          {/* Main Price Line */}
          {pathD && (
            <path
              d={pathD}
              fill="none"
              stroke="#000666"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}

          {/* Data interactive points */}
          {points.map((pt, i) => {
            const isLowest = pt.price === minPrice;
            const isCurrent = i === points.length - 1;
            return (
              <g
                key={i}
                className="cursor-pointer group"
                onMouseEnter={() => setHoveredPoint({ x: pt.x, y: pt.y, date: pt.date, price: pt.price })}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isLowest || isCurrent ? 6 : 4}
                  fill={isLowest ? '#10b981' : isCurrent ? '#000666' : '#ffffff'}
                  stroke={isLowest ? '#10b981' : '#000666'}
                  strokeWidth="2.5"
                  className="transition-transform duration-200 group-hover:scale-150"
                />
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip */}
        {hoveredPoint && (
          <div
            className="absolute z-20 pointer-events-none transform -translate-x-1/2 -translate-y-full mb-2 bg-[#071e27] text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xl border border-white/20"
            style={{
              left: `${(hoveredPoint.x / svgWidth) * 100}%`,
              top: `${(hoveredPoint.y / svgHeight) * 100}%`,
            }}
          >
            <div className="text-[10px] text-[#bdc2ff]">{hoveredPoint.date}</div>
            <div className="font-bold text-white">{currency}{hoveredPoint.price.toLocaleString('en-IN')}</div>
          </div>
        )}

        {/* Date labels on bottom */}
        <div className="flex justify-between items-center px-4 mt-2 text-[11px] font-semibold text-[#5b5f61]">
          {data.map((item, idx) => (
            <span key={idx} className={idx % 2 === 1 && data.length > 5 ? 'hidden sm:inline' : 'inline'}>
              {item.date}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
