import type { ResourceScore } from '../types';

interface Props {
  resource: ResourceScore;
}

export function ResourceScoreBar({ resource }: Props) {
  const width = 30;
  const filled = Math.round((resource.score / resource.maxScore) * width);
  const empty = width - filled;
  const bar = '█'.repeat(filled) + '░'.repeat(empty);

  const getColor = (s: number) => {
    if (s >= 90) return 'text-term-green';
    if (s >= 75) return 'text-term-cyan';
    if (s >= 60) return 'text-term-yellow';
    return 'text-term-red';
  };

  const trendIcon = resource.trend === 'up' ? '▲' : resource.trend === 'down' ? '▼' : '►';
  const trendColor = resource.trend === 'up' ? 'text-term-green' : resource.trend === 'down' ? 'text-term-red' : 'text-term-dim';

  return (
    <div className="flex items-center gap-2 px-2 py-1 hover:bg-term-highlight transition-colors">
      <span className="text-term-dim w-4 text-right">{resource.icon}</span>
      <span className="text-term-fg w-24 truncate">{resource.name}</span>
      <span className={`font-mono text-xs ${getColor(resource.score)}`}>
        {bar}
      </span>
      <span className={`w-12 text-right font-bold ${getColor(resource.score)}`}>
        {resource.score}
        <span className="text-term-dim font-normal">%</span>
      </span>
      <span className={`text-xs ${trendColor}`}>{trendIcon}</span>
      <span className="text-term-dim text-xs ml-2">
        {resource.resourceCount} recursos
      </span>
    </div>
  );
}
