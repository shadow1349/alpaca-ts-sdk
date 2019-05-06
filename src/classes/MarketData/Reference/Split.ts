import { AlpacaOptions } from '../../AlpacaOptions';
import fetch from 'node-fetch';
import { SplitEntity } from '../Symbol/Split';
import { PolygonEndpoint } from '../MarketDataEndpoint';

export interface SplitResult {
  status: string;
  count: number;
  results: SplitEntity[];
}
