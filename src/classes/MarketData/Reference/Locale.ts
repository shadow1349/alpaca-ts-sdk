import { AlpacaOptions } from '../../AlpacaOptions';
import fetch from 'node-fetch';
import { PolygonEndpoint } from '../MarketDataEndpoint';

export interface LocaleEntity {
  locale: string;
  name: string;
}

export interface LocaleResponse {
  status: string;
  results: LocaleEntity[];
}
