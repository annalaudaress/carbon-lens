import { useState } from 'react';
import type { FilterCategory, Report } from '../types';
import {
  Header,
  SustainabilityScoreCard,
  ResourceScoreBar,
  ImpactMetricsPanel,
  OpportunityCard,
  FilterBar,
  ReportModal,
} from '../components';
import {
  sustainabilityScore,
  resourceScores,
  opportunities,
  impactMetrics,
  generateReport,
} from '../data';

export function Dashboard() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [report, setReport] = useState<Report | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const filteredOpportunities =
    activeFilter === 'all'
      ? opportunities
      : opportunities.filter((o) => o.category === activeFilter);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    // Simulate async generation
    setTimeout(() => {
      setReport(generateReport());
      setIsGenerating(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-terminal-bg">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Top section: Score + Resource Scores */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sustainability Score */}
          <div className="lg:col-span-4">
            <SustainabilityScoreCard score={sustainabilityScore} />
          </div>

          {/* Resource Scores */}
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-mono text-terminal-dim uppercase tracking-wider">
                Resource Scores
              </h2>
              <button
                onClick={handleGenerateReport}
                disabled={isGenerating}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-mono font-medium
                  border transition-all duration-200
                  ${
                    isGenerating
                      ? 'bg-terminal-surface border-terminal-border text-terminal-dim cursor-wait'
                      : 'bg-green-500/20 border-green-500/50 text-green-400 hover:bg-green-500/30 hover:shadow-sm hover:shadow-green-500/10 active:scale-95'
                  }
                `}
              >
                {isGenerating ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <span>📊</span>
                    <span>Generate Report</span>
                  </>
                )}
              </button>
            </div>
            {resourceScores.map((resource) => (
              <ResourceScoreBar key={resource.id} resource={resource} />
            ))}
          </div>
        </div>

        {/* Impact Metrics */}
        <section>
          <h2 className="text-sm font-mono text-terminal-dim uppercase tracking-wider mb-3">
            Impact Overview
          </h2>
          <ImpactMetricsPanel metrics={impactMetrics} />
        </section>

        {/* Opportunities */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <h2 className="text-sm font-mono text-terminal-dim uppercase tracking-wider">
              Optimization Opportunities
              <span className="ml-2 text-terminal-text">
                ({filteredOpportunities.length})
              </span>
            </h2>
            <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredOpportunities.map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>
          {filteredOpportunities.length === 0 && (
            <div className="text-center py-12 text-terminal-dim font-mono text-sm">
              No opportunities found for this category.
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="border-t border-terminal-border pt-6 pb-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-terminal-dim">
            <p>
              Carbon Lens v1.0.0 — Cloud + DevOps + FinOps + Sustainability
            </p>
            <p>
              Data refreshed: {new Date().toLocaleDateString('en-US')} • Mock data for demonstration
            </p>
          </div>
        </footer>
      </main>

      {/* Report Modal */}
      {report && <ReportModal report={report} onClose={() => setReport(null)} />}
    </div>
  );
}
