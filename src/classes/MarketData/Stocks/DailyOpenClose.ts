import { AlpacaOptions } from '../../AlpacaOptions';
import fetch from 'node-fetch';
import { PolygonEndpoint } from '../MarketDataEndpoint';

export interface DailyOpenCloseEntity {
  from: string;
  symbol: symbol;
  open: number;
  high: number;
  low: number;
  close: number;
  afterHours: number;
  volume: number;
}
