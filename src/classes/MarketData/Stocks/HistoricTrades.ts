import { AlpacaOptions } from '../../AlpacaOptions';
import fetch from 'node-fetch';
import { PolygonEndpoint } from '../MarketDataEndpoint';
import { URL } from 'url';

export interface HistoricTradesMap {
  c1: string;
  c2: string;
  c3: string;
  c4: string;
  e: string;
  p: string;
  s: string;
  t: string;
}

export interface HistoricTradeTick {
  c1: number;
  c2: number;
  c3: number;
  c4: number;
  e: number;
  p: number;
  s: number;
  t: number;
}

export interface HistoricTradeResponse {
  day: string;
  map: HistoricTradesMap;
  msLatency: number;
  status: string;
  symbol: string;
  ticks: HistoricTradeTick[];
}

export interface HistoricOptions {
  symbol: string;
  /**
   * Must Be In Format YYYY-MM-DD
   */
  date: Date;
  offset?: number;
  limit?: number;
}

export class HistoricTrades {
  private apikey: string;

  constructor(options: AlpacaOptions) {
    this.apikey = options.publicKey;
  }

  get(options: HistoricOptions) {
    const endpoint = `${PolygonEndpoint}/v1/historic/trades/${
      options.symbol
    }/${options.date.getFullYear()}-${options.date.getMonth()}-${options.date.getDate()}`;

    const url = new URL(endpoint);

    url.searchParams.append('apiKey', this.apikey);

    if (options.limit) {
      url.searchParams.append('limit', options.limit.toString());
    }

    if (options.offset) {
      url.searchParams.append('offset', options.offset.toString());
    }

    return fetch(url.href).then(async res => {
      if (res.status === 200 || res.status === 204) {
        return res.json();
      } else {
        const text = await res.text();
        return Promise.reject(text);
      }
    });
  }
}
