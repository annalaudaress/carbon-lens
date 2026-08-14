import type { ImpactMetrics as ImpactMetricsType } from '../types';
import { formatCurrency } from '../utils';

interface Props {
  metrics: ImpactMetricsType;
}

export function ImpactMetricsPanel({ metrics }: Props) {
  const cards = [
    {
      label: 'Potential Savings',
      value: `${formatCurrency(metrics.potentialSavings)}/mo`,
      icon: '💰',
      color: 'text-green-400',
      bgColor: 'from-green-500/10 to-transparent',
    },
    {
      label: 'CO₂ Reduction',
      value: `${metrics.co2ReductionPercent}%`,
      icon: '🌱',
      color: 'text-emerald-400',
      bgColor: 'from-emerald-500/10 to-transparent',
    },
    {
      label: 'Resources Analyzed',
      value: metrics.resourcesAnalyzed.toString(),
      icon: '🔍',
      color: 'text-blue-400',
      bgColor: 'from-blue-500/10 to-transparent',
    },
    {
      label: 'Optimizations Found',
      value: metrics.optimizationsFound.toString(),
      icon: '⚙️',
      color: 'text-yellow-400',
      bgColor: 'from-yellow-500/10 to-transparent',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-terminal-surface border border-terminal-border rounded-lg p-4 relative overflow-hidden hover:border-terminal-accent/30 transition-colors"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${card.bgColor} pointer-events-none`} />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">{card.icon}</span>
              <span className="text-xs font-mono text-terminal-dim uppercase tracking-wider">
                {card.label}
              </span>
            </div>
            <p className={`text-xl md:text-2xl font-bold font-mono ${card.color}`}>
              {card.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
