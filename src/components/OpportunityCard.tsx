import type { Opportunity } from '../types';

interface Props {
  opportunity: Opportunity;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}

export function OpportunityRow({ opportunity, index, isSelected, onSelect }: Props) {
  const priorityColors: Record<string, string> = {
    critical: 'text-term-red',
    high: 'text-term-yellow',
    medium: 'text-term-cyan',
    low: 'text-term-dim',
  };

  const priorityLabels: Record<string, string> = {
    critical: 'CRÍTICA',
    high: 'ALTA',
    medium: 'MÉDIA',
    low: 'BAIXA',
  };

  const categoryLabels: Record<string, string> = {
    compute: 'Compute',
    storage: 'Storage',
    database: 'Database',
  };

  return (
    <div
      onClick={onSelect}
      className={`
        flex items-center gap-0 px-2 py-1 cursor-pointer text-xs border-b border-term-border
        transition-colors
        ${isSelected ? 'bg-term-select text-term-green' : 'hover:bg-term-highlight'}
      `}
    >
      <span className="text-term-dim w-6 text-right mr-2">{index + 1}.</span>
      <span className={`w-16 ${priorityColors[opportunity.priority]}`}>
        {priorityLabels[opportunity.priority]}
      </span>
      <span className="text-term-blue w-20">{categoryLabels[opportunity.category]}</span>
      <span className="text-term-fg flex-1 truncate">{opportunity.title}</span>
      <span className="text-term-green w-24 text-right">
        -US${opportunity.estimatedSavings}/mês
      </span>
      <span className="text-term-cyan w-16 text-right">
        -{opportunity.co2Reduction}% CO₂
      </span>
      <span className="text-term-dim w-12 text-right">
        {opportunity.affectedResources} rec
      </span>
    </div>
  );
}

interface DetailProps {
  opportunity: Opportunity;
}

export function OpportunityDetail({ opportunity }: DetailProps) {
  const priorityLabels: Record<string, string> = {
    critical: 'CRÍTICA',
    high: 'ALTA',
    medium: 'MÉDIA',
    low: 'BAIXA',
  };

  return (
    <div className="border border-term-border mt-2">
      <div className="bg-term-highlight px-2 py-0.5 border-b border-term-border">
        <span className="text-term-yellow text-xs">┤ Detalhes ├</span>
      </div>
      <div className="p-3 space-y-2 text-xs">
        <div>
          <span className="text-term-dim">Título: </span>
          <span className="text-term-fg">{opportunity.title}</span>
        </div>
        <div>
          <span className="text-term-dim">Descrição: </span>
          <span className="text-term-fg">{opportunity.description}</span>
        </div>
        <div>
          <span className="text-term-dim">Prioridade: </span>
          <span className="text-term-yellow">{priorityLabels[opportunity.priority]}</span>
        </div>
        <div>
          <span className="text-term-dim">Economia: </span>
          <span className="text-term-green">US$ {opportunity.estimatedSavings}/mês</span>
        </div>
        <div>
          <span className="text-term-dim">Redução CO₂: </span>
          <span className="text-term-cyan">{opportunity.co2Reduction}%</span>
        </div>
        <div>
          <span className="text-term-dim">Ação Recomendada:</span>
        </div>
        <div className="pl-2 border-l-2 border-term-green">
          <span className="text-term-green">$ </span>
          <span className="text-term-fg">{opportunity.recommendedAction}</span>
        </div>
      </div>
    </div>
  );
}
