import type { SustainabilityScore as ScoreType } from '../types';

interface Props {
  score: ScoreType;
}

export function SustainabilityScoreCard({ score }: Props) {
  const filled = Math.round((score.overall / score.maxScore) * 20);
  const empty = 20 - filled;
  const bar = '█'.repeat(filled) + '░'.repeat(empty);

  const getColor = (s: number) => {
    if (s >= 80) return 'text-term-green';
    if (s >= 60) return 'text-term-yellow';
    return 'text-term-red';
  };

  return (
    <div className="border border-term-border">
      {/* Box top */}
      <div className="bg-term-highlight px-2 py-0.5 border-b border-term-border flex items-center justify-between">
        <span className="text-term-cyan text-xs">┤ Score de Sustentabilidade ├</span>
        <span className="text-term-dim text-xs">
          {score.trend === 'up' ? '▲ melhorando' : score.trend === 'down' ? '▼ caindo' : '► estável'}
        </span>
      </div>
      {/* Content */}
      <div className="p-3">
        <div className="text-center mb-2">
          <span className={`text-4xl font-bold term-glow ${getColor(score.overall)}`}>
            {score.overall}
          </span>
          <span className="text-term-dim text-lg">/{score.maxScore}</span>
        </div>
        <div className="text-center">
          <span className={`font-mono tracking-wider ${getColor(score.overall)}`}>
            [{bar}]
          </span>
        </div>
        <div className="text-center mt-2 text-xs text-term-dim">
          Avaliação geral da infraestrutura
        </div>
      </div>
    </div>
  );
}
