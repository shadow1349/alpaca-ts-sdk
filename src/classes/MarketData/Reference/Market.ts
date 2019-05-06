import { AlpacaOptions } from '../../AlpacaOptions';
import fetch from 'node-fetch';
import { PolygonEndpoint } from '../MarketDataEndpoint';

export interface MarketEntity {
  market: string;
  desc: string;
}

export interface MarketResponse {
  status: string;
  results: MarketEntity[];
}
