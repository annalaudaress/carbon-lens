import type { ImpactMetrics as ImpactMetricsType } from '../types';

interface Props {
  metrics: ImpactMetricsType;
}

export function ImpactMetricsPanel({ metrics }: Props) {
  const items = [
    { label: 'Economia Potencial', value: `US$ ${metrics.potentialSavings}/mês`, color: 'text-term-green' },
    { label: 'Redução de CO₂', value: `${metrics.co2ReductionPercent}%`, color: 'text-term-cyan' },
    { label: 'Recursos Analisados', value: `${metrics.resourcesAnalyzed}`, color: 'text-term-yellow' },
    { label: 'Otimizações Encontradas', value: `${metrics.optimizationsFound}`, color: 'text-term-magenta' },
  ];

  return (
    <div className="border border-term-border">
      <div className="bg-term-highlight px-2 py-0.5 border-b border-term-border">
        <span className="text-term-cyan text-xs">┤ Métricas de Impacto ├</span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4">
        {items.map((item, i) => (
          <div
            key={item.label}
            className={`p-3 text-center ${i < items.length - 1 ? 'border-r border-term-border' : ''}`}
          >
            <div className="text-xs text-term-dim mb-1">{item.label}</div>
            <div className={`text-xl font-bold term-glow ${item.color}`}>
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
