import type { FilterCategory } from '../types';

interface Props {
  activeFilter: FilterCategory;
  onFilterChange: (filter: FilterCategory) => void;
  onGenerateReport: () => void;
  isGenerating: boolean;
  spinnerFrame?: string;
}

const filters: { key: string; label: string; value: FilterCategory }[] = [
  { key: '1', label: 'Todos', value: 'all' },
  { key: '2', label: 'Compute', value: 'compute' },
  { key: '3', label: 'Storage', value: 'storage' },
  { key: '4', label: 'Database', value: 'database' },
];

export function FilterBar({ activeFilter, onFilterChange, onGenerateReport, isGenerating, spinnerFrame }: Props) {
  return (
    <div className="bg-term-highlight border-t border-term-border px-2 py-1 flex items-center justify-between flex-wrap gap-1">
      <div className="flex items-center gap-1">
        {filters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            className={`
              px-2 py-0.5 text-xs transition-colors
              ${
                activeFilter === filter.value
                  ? 'bg-term-select text-term-green'
                  : 'text-term-dim hover:text-term-fg'
              }
            `}
          >
            <span className="text-term-yellow">&lt;{filter.key}&gt;</span>
            <span className="ml-1">{filter.label}</span>
          </button>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={onGenerateReport}
          disabled={isGenerating}
          className={`
            px-2 py-0.5 text-xs transition-colors
            ${isGenerating ? 'text-term-yellow' : 'text-term-green hover:bg-term-select'}
          `}
        >
          {isGenerating ? (
            <>
              <span className="mr-1">{spinnerFrame || '⠋'}</span>
              <span>calculando...</span>
            </>
          ) : (
            <>
              <span className="text-term-yellow">&lt;r&gt;</span>
              <span className="ml-1">Gerar Relatório</span>
            </>
          )}
        </button>
        <span className="text-term-dim text-xs">│</span>
        <span className="text-term-dim text-xs">
          <span className="text-term-yellow">&lt;q&gt;</span> sair
        </span>
      </div>
    </div>
  );
}
