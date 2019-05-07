import { SplitEntity } from '../Symbol';

export interface SplitResult {
  status: string;
  count: number;
  results: SplitEntity[];
}
