import type {
  SustainabilityScore,
  ResourceScore,
  Opportunity,
  ImpactMetrics,
  Report,
} from '../types';

export const sustainabilityScore: SustainabilityScore = {
  overall: 84,
  maxScore: 100,
  trend: 'up',
  lastUpdated: '2026-08-14T15:30:00Z',
};

export const resourceScores: ResourceScore[] = [
  {
    id: 'compute-1',
    category: 'compute',
    name: 'Compute',
    score: 82,
    maxScore: 100,
    resourceCount: 47,
    icon: '⚡',
    trend: 'up',
  },
  {
    id: 'storage-1',
    category: 'storage',
    name: 'Storage',
    score: 91,
    maxScore: 100,
    resourceCount: 38,
    icon: '💾',
    trend: 'stable',
  },
  {
    id: 'database-1',
    category: 'database',
    name: 'Database',
    score: 76,
    maxScore: 100,
    resourceCount: 39,
    icon: '🗄',
    trend: 'down',
  },
];

export const opportunities: Opportunity[] = [
  {
    id: 'opp-1',
    title: 'Otimizar workloads de compute',
    description:
      'Várias instâncias EC2 estão rodando abaixo de 15% de CPU em horários de baixa demanda. Considere rightsizing ou auto-scaling.',
    category: 'compute',
    priority: 'high',
    estimatedSavings: 128,
    co2Reduction: 12,
    recommendedAction:
      'Implementar auto-scaling com target tracking em 60% CPU. Reduzir i3.xlarge para i3.large em workloads batch.',
    affectedResources: 12,
    status: 'open',
  },
  {
    id: 'opp-2',
    title: 'Identificar recursos subutilizados',
    description:
      'Encontrados 8 volumes EBS sem instâncias attached e 3 Elastic IPs não associados a instâncias em execução.',
    category: 'compute',
    priority: 'critical',
    estimatedSavings: 67,
    co2Reduction: 5,
    recommendedAction:
      'Deletar volumes EBS não utilizados após verificação de backup. Liberar Elastic IPs não utilizados.',
    affectedResources: 11,
    status: 'open',
  },
  {
    id: 'opp-3',
    title: 'Revisar políticas de ciclo de vida de storage',
    description:
      'Buckets S3 contêm 2.3TB de dados com mais de 90 dias sem políticas de lifecycle. Transição para Glacier reduziria custos significativamente.',
    category: 'storage',
    priority: 'medium',
    estimatedSavings: 45,
    co2Reduction: 4,
    recommendedAction:
      'Configurar lifecycle rules no S3: mover para IA após 30 dias, Glacier após 90 dias, deletar após 365 dias.',
    affectedResources: 15,
    status: 'open',
  },
  {
    id: 'opp-4',
    title: 'Otimizar capacidade de database',
    description:
      'Instâncias RDS estão super-provisionadas. Deploy Multi-AZ encontrado para databases não-críticos de dev/staging.',
    category: 'database',
    priority: 'high',
    estimatedSavings: 52,
    co2Reduction: 4,
    recommendedAction:
      'Desabilitar Multi-AZ para databases de staging. Migrar para Aurora Serverless v2 para workloads variáveis.',
    affectedResources: 6,
    status: 'open',
  },
  {
    id: 'opp-5',
    title: 'Priorizar ações por custo e impacto CO₂',
    description:
      'Transferência de dados cross-region representa 18% dos custos de rede. Consolidar em menos regiões reduz custo e pegada de carbono.',
    category: 'compute',
    priority: 'medium',
    estimatedSavings: 28,
    co2Reduction: 3,
    recommendedAction:
      'Consolidar workloads em us-east-1 e eu-west-1. Usar CloudFront para entrega de conteúdo ao invés de replicação cross-region.',
    affectedResources: 8,
    status: 'open',
  },
  {
    id: 'opp-6',
    title: 'Habilitar S3 Intelligent-Tiering',
    description:
      'Buckets de alta frequência com padrões de acesso imprevisíveis se beneficiariam de otimização automática de custos.',
    category: 'storage',
    priority: 'low',
    estimatedSavings: 18,
    co2Reduction: 2,
    recommendedAction:
      'Habilitar Intelligent-Tiering para buckets com padrões de acesso mistos. Sem taxas de retrieval.',
    affectedResources: 5,
    status: 'open',
  },
  {
    id: 'opp-7',
    title: 'Migrar para instâncias Graviton',
    description:
      'Instâncias x86 podem ser migradas para Graviton3 baseado em ARM com 40% melhor relação preço-performance e menor consumo energético.',
    category: 'compute',
    priority: 'high',
    estimatedSavings: 85,
    co2Reduction: 8,
    recommendedAction:
      'Testar workloads em Graviton3 (c7g/m7g). Migrar primeiro os serviços sem dependência x86.',
    affectedResources: 14,
    status: 'open',
  },
  {
    id: 'opp-8',
    title: 'Consolidar read replicas de database',
    description:
      'Múltiplas read replicas com menos de 10% de carga de queries. Reduzir replicas economiza custo e energia.',
    category: 'database',
    priority: 'medium',
    estimatedSavings: 34,
    co2Reduction: 3,
    recommendedAction:
      'Remover 2 read replicas subutilizadas. Usar ElastiCache para padrões read-heavy.',
    affectedResources: 4,
    status: 'open',
  },
];

export const impactMetrics: ImpactMetrics = {
  potentialSavings: 320,
  co2ReductionPercent: 28,
  resourcesAnalyzed: 124,
  optimizationsFound: opportunities.length,
  monthlyCost: 4850,
  monthlyEmissions: 2.4,
};

export function generateReport(): Report {
  const topOpportunities = [...opportunities]
    .sort((a, b) => b.estimatedSavings - a.estimatedSavings)
    .slice(0, 5);

  return {
    generatedAt: new Date().toISOString(),
    sustainabilityScore: 68,
    estimatedSavings: 272,
    co2Reduction: 32,
    topOpportunities,
    summary: `Análise completa. Encontradas ${opportunities.length} oportunidades de otimização em ${impactMetrics.resourcesAnalyzed} recursos. Implementando todas as recomendações, a economia seria de US$272/mês com redução de 32% nas emissões de CO₂.`,
  };
}
