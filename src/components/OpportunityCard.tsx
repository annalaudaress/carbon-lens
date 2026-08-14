import type { Opportunity } from '../types';
import { getPriorityColor, getPriorityLabel, formatCurrency } from '../utils';

interface Props {
  opportunity: Opportunity;
}

export function OpportunityCard({ opportunity }: Props) {
  return (
    <div className="bg-terminal-surface border border-terminal-border rounded-lg p-5 hover:border-terminal-accent/30 transition-all group">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <h3 className="text-sm font-mono font-semibold text-terminal-text group-hover:text-green-400 transition-colors">
              {opportunity.title}
            </h3>
            <span
              className={`text-[10px] font-mono font-medium px-2 py-0.5 rounded border ${getPriorityColor(opportunity.priority)}`}
            >
              {getPriorityLabel(opportunity.priority)}
            </span>
          </div>
          <p className="text-xs text-terminal-dim leading-relaxed">
            {opportunity.description}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-3 text-xs font-mono">
        <div className="flex items-center gap-1">
          <span className="text-green-400">💰</span>
          <span className="text-terminal-dim">Save:</span>
          <span className="text-green-400 font-medium">
            {formatCurrency(opportunity.estimatedSavings)}/mo
          </span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-emerald-400">🌱</span>
          <span className="text-terminal-dim">CO₂:</span>
          <span className="text-emerald-400 font-medium">-{opportunity.co2Reduction}%</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-blue-400">📦</span>
          <span className="text-terminal-dim">Resources:</span>
          <span className="text-blue-400 font-medium">{opportunity.affectedResources}</span>
        </div>
      </div>

      <div className="bg-terminal-bg/50 border border-terminal-border rounded p-3">
        <p className="text-xs font-mono text-terminal-dim">
          <span className="text-yellow-400">→</span>{' '}
          <span className="text-terminal-text">{opportunity.recommendedAction}</span>
        </p>
      </div>
    </div>
  );
}
