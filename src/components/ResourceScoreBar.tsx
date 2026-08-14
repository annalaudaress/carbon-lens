import type { ResourceScore } from '../types';
import { getScoreColor, getScoreBarColor, getTrendIcon, getTrendColor } from '../utils';

interface Props {
  resource: ResourceScore;
}

export function ResourceScoreBar({ resource }: Props) {
  const percentage = (resource.score / resource.maxScore) * 100;

  return (
    <div className="bg-terminal-surface border border-terminal-border rounded-lg p-4 hover:border-terminal-accent/30 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">{resource.icon}</span>
          <span className="text-sm font-mono font-medium text-terminal-text">
            {resource.name}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-sm font-mono ${getTrendColor(resource.trend)}`}>
            {getTrendIcon(resource.trend)}
          </span>
          <span className={`text-lg font-mono font-bold ${getScoreColor(resource.score)}`}>
            {resource.score}
          </span>
          <span className="text-xs text-terminal-dim font-mono">/{resource.maxScore}</span>
        </div>
      </div>

      <div className="w-full bg-terminal-bg rounded-full h-2.5 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${getScoreBarColor(resource.score)}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      <div className="mt-2 text-xs text-terminal-dim font-mono">
        {resource.resourceCount} resources analyzed
      </div>
    </div>
  );
}
