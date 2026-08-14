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
    icon: '🗄️',
    trend: 'down',
  },
];

export const opportunities: Opportunity[] = [
  {
    id: 'opp-1',
    title: 'Optimize compute workloads',
    description:
      'Several EC2 instances are running at less than 15% CPU utilization during off-peak hours. Consider rightsizing or implementing auto-scaling policies.',
    category: 'compute',
    priority: 'high',
    estimatedSavings: 128,
    co2Reduction: 12,
    recommendedAction:
      'Implement auto-scaling with target tracking at 60% CPU. Downsize i3.xlarge to i3.large for batch workloads.',
    affectedResources: 12,
    status: 'open',
  },
  {
    id: 'opp-2',
    title: 'Identify underutilized resources',
    description:
      'Found 8 EBS volumes with no attached instances and 3 Elastic IPs not associated with running instances.',
    category: 'compute',
    priority: 'critical',
    estimatedSavings: 67,
    co2Reduction: 5,
    recommendedAction:
      'Delete unattached EBS volumes after backup verification. Release unused Elastic IPs.',
    affectedResources: 11,
    status: 'open',
  },
  {
    id: 'opp-3',
    title: 'Review storage lifecycle policies',
    description:
      'S3 buckets contain 2.3TB of data older than 90 days without lifecycle policies. Transitioning to Glacier could reduce costs significantly.',
    category: 'storage',
    priority: 'medium',
    estimatedSavings: 45,
    co2Reduction: 4,
    recommendedAction:
      'Configure S3 lifecycle rules: move to IA after 30 days, Glacier after 90 days, delete after 365 days.',
    affectedResources: 15,
    status: 'open',
  },
  {
    id: 'opp-4',
    title: 'Optimize database capacity',
    description:
      'RDS instances are over-provisioned. Multi-AZ deployments found for non-critical dev/staging databases.',
    category: 'database',
    priority: 'high',
    estimatedSavings: 52,
    co2Reduction: 4,
    recommendedAction:
      'Disable Multi-AZ for staging databases. Switch to Aurora Serverless v2 for variable workloads.',
    affectedResources: 6,
    status: 'open',
  },
  {
    id: 'opp-5',
    title: 'Prioritize actions by cost and CO₂ impact',
    description:
      'Cross-region data transfer accounts for 18% of network costs. Consolidating to fewer regions reduces both cost and carbon footprint.',
    category: 'compute',
    priority: 'medium',
    estimatedSavings: 28,
    co2Reduction: 3,
    recommendedAction:
      'Consolidate workloads to us-east-1 and eu-west-1. Use CloudFront for content delivery instead of cross-region replication.',
    affectedResources: 8,
    status: 'open',
  },
  {
    id: 'opp-6',
    title: 'Enable S3 Intelligent-Tiering',
    description:
      'High-frequency buckets with unpredictable access patterns would benefit from automatic cost optimization.',
    category: 'storage',
    priority: 'low',
    estimatedSavings: 18,
    co2Reduction: 2,
    recommendedAction:
      'Enable Intelligent-Tiering for buckets with mixed access patterns. No retrieval fees apply.',
    affectedResources: 5,
    status: 'open',
  },
  {
    id: 'opp-7',
    title: 'Migrate to Graviton instances',
    description:
      'x86-based instances can be migrated to ARM-based Graviton3 for 40% better price-performance and lower energy consumption.',
    category: 'compute',
    priority: 'high',
    estimatedSavings: 85,
    co2Reduction: 8,
    recommendedAction:
      'Test workloads on Graviton3 (c7g/m7g). Migrate non-x86-dependent services first.',
    affectedResources: 14,
    status: 'open',
  },
  {
    id: 'opp-8',
    title: 'Consolidate database read replicas',
    description:
      'Multiple read replicas with less than 10% query load. Reducing replicas saves cost and energy.',
    category: 'database',
    priority: 'medium',
    estimatedSavings: 34,
    co2Reduction: 3,
    recommendedAction:
      'Remove 2 underutilized read replicas. Use ElastiCache for read-heavy patterns instead.',
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
    summary: `Analysis complete. Found ${opportunities.length} optimization opportunities across ${impactMetrics.resourcesAnalyzed} resources. Implementing all recommendations could save $272/month and reduce CO₂ emissions by 32%.`,
  };
}
