import { PreviousCloseResult } from './PreviousClose';

export interface AggregateEntity {
  ticker: string;
  status: string;
  adjusted: boolean;
  queryCount: number;
  resultsCount: number;
  results: PreviousCloseResult[];
}

export type AggregateTimespan = 'minute' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year';

export interface AggregateOptions {
  ticker: string;
  from: Date;
  to: Date;
  unadjusted?: boolean;
  multiplier?: number;
  timespan?: AggregateTimespan;
}
