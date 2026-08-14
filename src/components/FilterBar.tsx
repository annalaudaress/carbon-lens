import type { FilterCategory } from '../types';

interface Props {
  activeFilter: FilterCategory;
  onFilterChange: (filter: FilterCategory) => void;
}

const filters: { label: string; value: FilterCategory; icon: string }[] = [
  { label: 'All', value: 'all', icon: '📊' },
  { label: 'Compute', value: 'compute', icon: '⚡' },
  { label: 'Storage', value: 'storage', icon: '💾' },
  { label: 'Database', value: 'database', icon: '🗄️' },
];

export function FilterBar({ activeFilter, onFilterChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`
            flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium
            border transition-all duration-200
            ${
              activeFilter === filter.value
                ? 'bg-green-500/20 border-green-500/50 text-green-400 shadow-sm shadow-green-500/10'
                : 'bg-terminal-surface border-terminal-border text-terminal-dim hover:border-terminal-accent/30 hover:text-terminal-text'
            }
          `}
          aria-pressed={activeFilter === filter.value}
        >
          <span>{filter.icon}</span>
          <span>{filter.label}</span>
        </button>
      ))}
    </div>
  );
}
