import React from 'react';

interface BuyScoreGaugeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  verdict?: string;
  animate?: boolean;
}

export const BuyScoreGauge: React.FC<BuyScoreGaugeProps> = ({
  score,
  size = 'md',
  showLabel = true,
  verdict,
  animate = true,
}) => {
  // Color calculation
  let color = '#10b981'; // Green (80+)
  let bgColor = 'rgba(16, 185, 129, 0.15)';
  let textColor = '#005236';

  if (score < 60) {
    color = '#ba1a1a'; // Red
    bgColor = 'rgba(186, 26, 26, 0.15)';
    textColor = '#93000a';
  } else if (score < 75) {
    color = '#f59e0b'; // Amber
    bgColor = 'rgba(245, 158, 11, 0.15)';
    textColor = '#92400e';
  } else if (score < 85) {
    color = '#00ad78'; // Emerald
    bgColor = 'rgba(0, 173, 120, 0.15)';
    textColor = '#003824';
  }

  // Dimensions based on size
  const config = {
    sm: { size: 38, strokeWidth: 3.5, fontSize: 'text-xs', labelSize: 'text-[9px]' },
    md: { size: 48, strokeWidth: 4, fontSize: 'text-sm', labelSize: 'text-[10px]' },
    lg: { size: 96, strokeWidth: 8, fontSize: 'text-3xl', labelSize: 'text-xs' },
  }[size];

  const radius = (config.size - config.strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="flex items-center gap-2.5">
      <div
        className="relative flex items-center justify-center flex-shrink-0"
        style={{ width: config.size, height: config.size }}
      >
        <svg
          className="w-full h-full transform -rotate-90"
          viewBox={`0 0 ${config.size} ${config.size}`}
        >
          {/* Background track */}
          <circle
            cx={config.size / 2}
            cy={config.size / 2}
            r={radius}
            fill="none"
            stroke="#e0e3e6"
            strokeWidth={config.strokeWidth}
          />
          {/* Progress circle */}
          <circle
            cx={config.size / 2}
            cy={config.size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={config.strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={animate ? offset : circumference}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <span
          className={`absolute font-bold ${config.fontSize}`}
          style={{ color: textColor }}
        >
          {score}
        </span>
      </div>

      {showLabel && (
        <div className="flex flex-col">
          <span className={`font-semibold tracking-wider uppercase text-[#5b5f61] ${config.labelSize}`}>
            Buy Score
          </span>
          <span className="text-xs font-bold leading-tight" style={{ color }}>
            {verdict || (score >= 85 ? 'Strong Buy' : score >= 75 ? 'Buy Now' : score >= 60 ? 'Average' : 'Wait')}
          </span>
        </div>
      )}
    </div>
  );
};
