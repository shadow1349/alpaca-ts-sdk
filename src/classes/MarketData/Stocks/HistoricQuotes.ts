import { AlpacaOptions } from '../../AlpacaOptions';
import { PolygonEndpoint } from '../MarketDataEndpoint';
import { HistoricOptions } from './HistoricTrades';

export interface HistoricQuotesMap {
  aE: 'askexchange';
  aP: 'askprice';
  aS: 'asksize';
  bE: 'bidexchange';
  bP: 'bidprice';
  bS: 'bidsize';
  c: 'condition';
  t: 'timestamp';
}

export interface HistoricQuotesTick {
  c: number;
  bE: number;
  aE: number;
  aP: number;
  bP: number;
  bS: number;
  aS: number;
  t: number;
}

export interface HistoricQuoteResponse {
  day: string;
  map: HistoricQuotesMap;
  msLatency: number;
  status: string;
  symbol: string;
  ticks: HistoricQuotesTick[];
}

export class HistoricQuote {
  private apikey: string;

  constructor(options: AlpacaOptions) {
    this.apikey = options.publicKey;
  }

  get(options: HistoricOptions) {
    const endpoint = `${PolygonEndpoint}/v1/historic/quotes/${
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
