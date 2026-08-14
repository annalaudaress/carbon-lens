import { useState, useEffect } from 'react';
import type { FilterCategory, Report } from '../types';
import {
  Header,
  SustainabilityScoreCard,
  ResourceScoreBar,
  ImpactMetricsPanel,
  OpportunityRow,
  OpportunityDetail,
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
  const [selectedOpp, setSelectedOpp] = useState<string | null>(null);

  const filteredOpportunities =
    activeFilter === 'all'
      ? opportunities
      : opportunities.filter((o) => o.category === activeFilter);

  const selectedOpportunity = opportunities.find((o) => o.id === selectedOpp);

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setReport(generateReport());
      setIsGenerating(false);
    }, 1500);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (report) {
        if (e.key === 'Escape') setReport(null);
        return;
      }
      switch (e.key) {
        case '1': setActiveFilter('all'); break;
        case '2': setActiveFilter('compute'); break;
        case '3': setActiveFilter('storage'); break;
        case '4': setActiveFilter('database'); break;
        case 'r': handleGenerateReport(); break;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  });

  return (
    <div className="min-h-screen bg-term-bg flex flex-col scanlines">
      <Header />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top panels row */}
        <div className="grid grid-cols-1 md:grid-cols-12 border-b border-term-border">
          {/* Score panel */}
          <div className="md:col-span-4 border-r border-term-border">
            <SustainabilityScoreCard score={sustainabilityScore} />
          </div>

          {/* Resource scores panel */}
          <div className="md:col-span-8">
            <div className="bg-term-highlight px-2 py-0.5 border-b border-term-border">
              <span className="text-term-cyan text-xs">┤ Scores por Recurso ├</span>
            </div>
            <div className="divide-y divide-term-border">
              {resourceScores.map((resource) => (
                <ResourceScoreBar key={resource.id} resource={resource} />
              ))}
            </div>
          </div>
        </div>

        {/* Impact metrics */}
        <ImpactMetricsPanel metrics={impactMetrics} />

        {/* Opportunities table */}
        <div className="flex-1 flex flex-col border-t border-term-border overflow-hidden">
          <div className="bg-term-highlight px-2 py-0.5 border-b border-term-border flex items-center justify-between">
            <span className="text-term-cyan text-xs">
              ┤ Oportunidades de Otimização ├
              <span className="text-term-dim ml-2">
                [{filteredOpportunities.length} encontradas]
              </span>
            </span>
            <span className="text-term-dim text-xs">
              clique para ver detalhes
            </span>
          </div>

          {/* Table header */}
          <div className="flex items-center gap-0 px-2 py-1 text-xs text-term-dim border-b border-term-border bg-term-highlight/50">
            <span className="w-6 text-right mr-2">#</span>
            <span className="w-16">PRIOR.</span>
            <span className="w-20">CATEG.</span>
            <span className="flex-1">OPORTUNIDADE</span>
            <span className="w-24 text-right">ECONOMIA</span>
            <span className="w-16 text-right">CO₂</span>
            <span className="w-12 text-right">REC.</span>
          </div>

          {/* Table body */}
          <div className="flex-1 overflow-y-auto">
            {filteredOpportunities.map((opp, i) => (
              <OpportunityRow
                key={opp.id}
                opportunity={opp}
                index={i}
                isSelected={selectedOpp === opp.id}
                onSelect={() => setSelectedOpp(selectedOpp === opp.id ? null : opp.id)}
              />
            ))}
            {filteredOpportunities.length === 0 && (
              <div className="text-center py-8 text-term-dim text-xs">
                Nenhuma oportunidade encontrada para esta categoria.
              </div>
            )}
          </div>

          {/* Detail panel */}
          {selectedOpportunity && (
            <div className="border-t border-term-border max-h-48 overflow-y-auto">
              <OpportunityDetail opportunity={selectedOpportunity} />
            </div>
          )}
        </div>
      </main>

      {/* Bottom hotkey bar */}
      <FilterBar
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        onGenerateReport={handleGenerateReport}
        isGenerating={isGenerating}
      />

      {/* Report Modal */}
      {report && <ReportModal report={report} onClose={() => setReport(null)} />}
    </div>
  );
}
