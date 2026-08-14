import type { Report } from '../types';

interface Props {
  report: Report;
  onClose: () => void;
}

export function ReportModal({ report, onClose }: Props) {
  const priorityLabels: Record<string, string> = {
    critical: 'CRÍTICA',
    high: 'ALTA',
    medium: 'MÉDIA',
    low: 'BAIXA',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80"
        onClick={onClose}
      />

      {/* Terminal window */}
      <div className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto border border-term-green bg-term-bg">
        {/* Title bar */}
        <div className="sticky top-0 bg-term-bg border-b border-term-green px-3 py-1 flex items-center justify-between z-10">
          <span className="text-term-green font-bold">
            ┤ Relatório de Sustentabilidade ├
          </span>
          <button
            onClick={onClose}
            className="text-term-red hover:term-glow text-sm"
          >
            [✕ fechar]
          </button>
        </div>

        {/* Content */}
        <div className="p-4 font-mono text-xs">
          {/* ASCII header */}
          <pre className="text-term-green mb-4">{`
╔══════════════════════════════════════════════════════╗
║          RELATÓRIO DE SUSTENTABILIDADE              ║
║              Carbon Lens Analysis                   ║
╚══════════════════════════════════════════════════════╝`}</pre>

          {/* Summary metrics */}
          <div className="mb-4 space-y-1">
            <div className="text-term-dim">─── Resumo ───────────────────────────────────────</div>
            <div>
              <span className="text-term-dim">  Score de Sustentabilidade: </span>
              <span className="text-term-yellow font-bold term-glow">{report.sustainabilityScore}/100</span>
            </div>
            <div>
              <span className="text-term-dim">  Economia Estimada:         </span>
              <span className="text-term-green font-bold">US$ {report.estimatedSavings}/mês</span>
            </div>
            <div>
              <span className="text-term-dim">  Redução de CO₂ Estimada:   </span>
              <span className="text-term-cyan font-bold">{report.co2Reduction}%</span>
            </div>
            <div className="text-term-dim">──────────────────────────────────────────────────</div>
          </div>

          {/* Summary text */}
          <div className="mb-4">
            <span className="text-term-green">$ </span>
            <span className="text-term-fg">{report.summary}</span>
            <span className="cursor-blink text-term-green">▊</span>
          </div>

          {/* Top Opportunities Table */}
          <div className="mb-4">
            <div className="text-term-dim">─── Top Oportunidades ────────────────────────────</div>
            <div className="mt-1">
              <div className="flex text-term-dim border-b border-term-border py-1">
                <span className="w-6">#</span>
                <span className="w-16">PRIOR.</span>
                <span className="flex-1">OPORTUNIDADE</span>
                <span className="w-24 text-right">ECONOMIA</span>
                <span className="w-16 text-right">CO₂</span>
              </div>
              {report.topOpportunities.map((opp, i) => (
                <div key={opp.id} className="flex py-1 hover:bg-term-highlight">
                  <span className="text-term-dim w-6">{i + 1}.</span>
                  <span className={`w-16 ${
                    opp.priority === 'critical' ? 'text-term-red' :
                    opp.priority === 'high' ? 'text-term-yellow' :
                    'text-term-cyan'
                  }`}>
                    {priorityLabels[opp.priority]}
                  </span>
                  <span className="text-term-fg flex-1 truncate">{opp.title}</span>
                  <span className="text-term-green w-24 text-right">
                    -US${opp.estimatedSavings}/mês
                  </span>
                  <span className="text-term-cyan w-16 text-right">
                    -{opp.co2Reduction}%
                  </span>
                </div>
              ))}
            </div>
            <div className="text-term-dim mt-1">──────────────────────────────────────────────────</div>
          </div>

          {/* Footer */}
          <div className="text-term-dim text-center">
            Gerado em: {new Date(report.generatedAt).toLocaleString('pt-BR')}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="sticky bottom-0 bg-term-highlight border-t border-term-green px-3 py-1 flex items-center justify-between">
          <span className="text-term-dim text-xs">
            <span className="text-term-yellow">&lt;ESC&gt;</span> fechar
          </span>
          <span className="text-term-green text-xs">
            Carbon Lens v1.0.0
          </span>
        </div>
      </div>
    </div>
  );
}
