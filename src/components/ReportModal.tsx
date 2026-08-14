import type { Report } from '../types';
import { formatCurrency, formatDate, getPriorityColor, getPriorityLabel } from '../utils';

interface Props {
  report: Report;
  onClose: () => void;
}

export function ReportModal({ report, onClose }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative bg-terminal-surface border border-terminal-border rounded-xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-terminal-surface border-b border-terminal-border px-6 py-4 flex items-center justify-between rounded-t-xl">
          <div>
            <h2 className="text-lg font-mono font-semibold text-terminal-text flex items-center gap-2">
              <span className="text-green-400">📋</span>
              Sustainability Report
            </h2>
            <p className="text-xs font-mono text-terminal-dim mt-0.5">
              Generated: {formatDate(report.generatedAt)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-terminal-dim hover:text-terminal-text transition-colors text-xl font-mono w-8 h-8 flex items-center justify-center rounded hover:bg-terminal-bg"
            aria-label="Close report"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Score Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-terminal-bg rounded-lg p-4 text-center border border-terminal-border">
              <p className="text-xs font-mono text-terminal-dim uppercase mb-1">Score</p>
              <p className="text-3xl font-mono font-bold text-yellow-400">
                {report.sustainabilityScore}
                <span className="text-sm text-terminal-dim">/100</span>
              </p>
            </div>
            <div className="bg-terminal-bg rounded-lg p-4 text-center border border-terminal-border">
              <p className="text-xs font-mono text-terminal-dim uppercase mb-1">Est. Savings</p>
              <p className="text-2xl font-mono font-bold text-green-400">
                {formatCurrency(report.estimatedSavings)}
                <span className="text-xs text-terminal-dim">/mo</span>
              </p>
            </div>
            <div className="bg-terminal-bg rounded-lg p-4 text-center border border-terminal-border">
              <p className="text-xs font-mono text-terminal-dim uppercase mb-1">CO₂ Reduction</p>
              <p className="text-2xl font-mono font-bold text-emerald-400">
                {report.co2Reduction}%
              </p>
            </div>
          </div>

          {/* Summary text */}
          <div className="bg-terminal-bg/50 rounded-lg p-4 border border-terminal-border">
            <p className="text-sm font-mono text-terminal-text leading-relaxed">
              <span className="text-green-400">$</span> {report.summary}
            </p>
          </div>

          {/* Top Opportunities */}
          <div>
            <h3 className="text-sm font-mono font-semibold text-terminal-text mb-3 flex items-center gap-2">
              <span className="text-yellow-400">⚡</span>
              Top Opportunities
            </h3>
            <div className="space-y-2">
              {report.topOpportunities.map((opp, index) => (
                <div
                  key={opp.id}
                  className="flex items-center justify-between bg-terminal-bg rounded-lg px-4 py-3 border border-terminal-border"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-terminal-dim w-5">
                      #{index + 1}
                    </span>
                    <div>
                      <p className="text-sm font-mono text-terminal-text">{opp.title}</p>
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${getPriorityColor(opp.priority)}`}
                      >
                        {getPriorityLabel(opp.priority)}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono text-green-400 font-medium">
                      -{formatCurrency(opp.estimatedSavings)}/mo
                    </p>
                    <p className="text-xs font-mono text-emerald-400">
                      -{opp.co2Reduction}% CO₂
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-terminal-surface border-t border-terminal-border px-6 py-4 rounded-b-xl">
          <button
            onClick={onClose}
            className="w-full py-2.5 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 font-mono text-sm font-medium hover:bg-green-500/30 transition-colors"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
}
