import type { SustainabilityScore as ScoreType } from '../types';
import { getScoreColor, getTrendIcon, getTrendColor } from '../utils';

interface Props {
  score: ScoreType;
}

export function SustainabilityScoreCard({ score }: Props) {
  const percentage = (score.overall / score.maxScore) * 100;
  const circumference = 2 * Math.PI * 58;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-terminal-surface border border-terminal-border rounded-xl p-6 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent pointer-events-none" />
      
      <h2 className="text-sm font-mono text-terminal-dim uppercase tracking-wider mb-4 relative">
        Sustainability Score
      </h2>

      <div className="relative w-36 h-36 mb-4">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 128 128">
          {/* Background circle */}
          <circle
            cx="64"
            cy="64"
            r="58"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-terminal-border"
          />
          {/* Score circle */}
          <circle
            cx="64"
            cy="64"
            r="58"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="text-green-400 transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-bold font-mono ${getScoreColor(score.overall)}`}>
            {score.overall}
          </span>
          <span className="text-xs text-terminal-dim font-mono">
            / {score.maxScore}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 relative">
        <span className={`text-sm font-mono ${getTrendColor(score.trend)}`}>
          {getTrendIcon(score.trend)}
        </span>
        <span className="text-xs text-terminal-dim font-mono">
          {score.trend === 'up' ? 'Improving' : score.trend === 'down' ? 'Declining' : 'Stable'}
        </span>
      </div>
    </div>
  );
}
