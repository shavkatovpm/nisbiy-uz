export const CRITERIA_KEYS = [
  'site',
  'identity',
  'contact',
  'pricing',
  'refund',
  'quality',
  'support',
  'ux',
  'social',
  'history',
] as const;

export type CriterionKey = (typeof CRITERIA_KEYS)[number];

export type Criteria = Partial<Record<CriterionKey, number>>;

export type RatingBucket = 'recommended' | 'caution' | 'avoid' | 'unrated';

const NEUTRAL_SCORE = 5; // N/A holatda har mezon uchun

export interface ScoredCriterion {
  key: CriterionKey;
  score: number;
  provided: boolean;
}

export function scoreCriteria(criteria: Criteria | undefined): ScoredCriterion[] {
  return CRITERIA_KEYS.map((key) => {
    const raw = criteria?.[key];
    const provided = typeof raw === 'number';
    return {
      key,
      score: provided ? raw! : NEUTRAL_SCORE,
      provided,
    };
  });
}

export function totalScore(criteria: Criteria | undefined): number | null {
  if (!criteria) return null;
  const scored = scoreCriteria(criteria);
  // Hech qaysi mezon yozilmagan bo'lsa — null (unrated)
  if (scored.every((c) => !c.provided)) return null;
  return scored.reduce((sum, c) => sum + c.score, 0);
}

export function bucketFromScore(score: number | null): RatingBucket {
  if (score === null) return 'unrated';
  if (score >= 80) return 'recommended';
  if (score >= 60) return 'caution';
  return 'avoid';
}

export function resolveRating(args: {
  criteria?: Criteria;
  manual?: RatingBucket;
}): { bucket: RatingBucket; score: number | null } {
  const score = totalScore(args.criteria);
  if (score !== null) return { bucket: bucketFromScore(score), score };
  return { bucket: args.manual ?? 'unrated', score: null };
}
