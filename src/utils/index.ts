import type { Priority } from '../types';

export function getScoreColor(score: number): string {
  if (score >= 90) return 'text-green-400';
  if (score >= 75) return 'text-emerald-400';
  if (score >= 60) return 'text-yellow-400';
  if (score >= 40) return 'text-orange-400';
  return 'text-red-400';
}

export function getScoreBarColor(score: number): string {
  if (score >= 90) return 'bg-green-400';
  if (score >= 75) return 'bg-emerald-400';
  if (score >= 60) return 'bg-yellow-400';
  if (score >= 40) return 'bg-orange-400';
  return 'bg-red-400';
}

export function getPriorityColor(priority: Priority): string {
  switch (priority) {
    case 'critical':
      return 'text-red-400 bg-red-400/10 border-red-400/30';
    case 'high':
      return 'text-orange-400 bg-orange-400/10 border-orange-400/30';
    case 'medium':
      return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
    case 'low':
      return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
  }
}

export function getPriorityLabel(priority: Priority): string {
  return priority.charAt(0).toUpperCase() + priority.slice(1);
}

export function formatCurrency(value: number): string {
  return `US$ ${value.toLocaleString('en-US')}`;
}

export function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function getTrendIcon(trend: 'up' | 'down' | 'stable'): string {
  switch (trend) {
    case 'up':
      return '↑';
    case 'down':
      return '↓';
    case 'stable':
      return '→';
  }
}

export function getTrendColor(trend: 'up' | 'down' | 'stable'): string {
  switch (trend) {
    case 'up':
      return 'text-green-400';
    case 'down':
      return 'text-red-400';
    case 'stable':
      return 'text-terminal-dim';
  }
}
