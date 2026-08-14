export interface SustainabilityScore {
  overall: number;
  maxScore: number;
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
}

export interface ResourceScore {
  id: string;
  category: ResourceCategory;
  name: string;
  score: number;
  maxScore: number;
  resourceCount: number;
  icon: string;
  trend: 'up' | 'down' | 'stable';
}

export type ResourceCategory = 'compute' | 'storage' | 'database';

export type Priority = 'critical' | 'high' | 'medium' | 'low';

export interface Opportunity {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  priority: Priority;
  estimatedSavings: number;
  co2Reduction: number;
  recommendedAction: string;
  affectedResources: number;
  status: 'open' | 'in-progress' | 'completed';
}

export interface ImpactMetrics {
  potentialSavings: number;
  co2ReductionPercent: number;
  resourcesAnalyzed: number;
  optimizationsFound: number;
  monthlyCost: number;
  monthlyEmissions: number;
}

export interface Report {
  generatedAt: string;
  sustainabilityScore: number;
  estimatedSavings: number;
  co2Reduction: number;
  topOpportunities: Opportunity[];
  summary: string;
}

export type FilterCategory = 'all' | ResourceCategory;
