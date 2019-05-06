import fetch from 'node-fetch';
import { URL } from 'url';
import { AlpacaOptions } from '../../AlpacaOptions';
import { PolygonEndpoint } from '../MarketDataEndpoint';

export type TickerMarket = 'STOCKS' | 'INDICIES' | 'CRYPTO' | 'FX' | 'BONDS' | 'MF' | 'MMF';

export type TickerCodes = {
  cik: string;
  figiuid: string;
  scfigi: string;
  cfigi: string;
  figi: string;
};

export type TickerAttributes = {
  currencyName: string;
  currency: string;
  baseName: string;
  base: string;
};

export type QueryTickerOptions = {
  sort: string;
  sortBy?: 'asc' | 'desc';
  type?: string;
  market?: TickerMarket;
  locale?: string;
  search?: string;
  perPage?: number;
  page?: number;
  active?: boolean;
};

export interface TickerEntity {
  ticker: string;
  name: string;
  market: TickerMarket;
  locale: string;
  currency: string;
  active: boolean;
  primaryExch: string;
  type?: string;
  codes?: TickerCodes;
  attrs?: TickerAttributes;
  updated: Date;
  url: string;
}

export interface TickerResponse {
  page: number;
  perPage: number;
  count: number;
  status: string;
  tickers: TickerEntity[];
}

export class Ticker {
  private apikey: string;

  constructor(options: AlpacaOptions) {
    this.apikey = options.publicKey;
  }

  query(options?: QueryTickerOptions): Promise<TickerResponse[]> {
    const url = new URL(`${PolygonEndpoint}/v2/reference/tickers`);

    url.searchParams.append('apiKey', this.apikey);

    if (options) {
      url.searchParams.append(
        'sort',
        options.sortBy ? `${options.sortBy === 'desc' ? '-' : ''}${options.sort}` : options.sort
      );

      if (options.active) {
        url.searchParams.append('active', JSON.stringify(options.active));
      }

      if (options.locale) {
        url.searchParams.append('locale', options.locale);
      }

      if (options.market) {
        url.searchParams.append('market', options.market);
      }

      if (options.page) {
        url.searchParams.append('page', JSON.stringify(options.page));
      }

      if (options.perPage) {
        url.searchParams.append('perpage', JSON.stringify(options.perPage));
      }

      if (options.search) {
        url.searchParams.append('search', options.search);
      }

      if (options.type) {
        url.searchParams.append('type', options.type);
      }
    } else {
      url.searchParams.append('sort', 'ticker');
      url.searchParams.append('perpage', '50');
      url.searchParams.append('page', '1');
      url.searchParams.append('active', 'true');
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
