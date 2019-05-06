import { AlpacaOptions } from '../../AlpacaOptions';
import fetch from 'node-fetch';
import { PolygonEndpoint } from '../MarketDataEndpoint';
import { LocaleResponse } from './Locale';
import { MarketResponse } from './Market';
import { SplitResult } from './Split';
import { QueryTickerOptions, TickerResponse } from './Ticker';
import { TypesResponse } from './TypeMapping';

export class Reference {
  private apikey: string;

  constructor(options: AlpacaOptions) {
    this.apikey = options.publicKey;
  }

  getLocale(): Promise<LocaleResponse> {
    return fetch(`${PolygonEndpoint}/v2/reference/locales?apiKey=${this.apikey}`).then(
      async res => {
        if (res.status === 200 || res.status === 204) {
          return res.json();
        } else {
          const text = await res.text();
          return Promise.reject(text);
        }
      }
    );
  }

  getMarket(): Promise<MarketResponse> {
    return fetch(`${PolygonEndpoint}/v2/reference/markets?apiKey=${this.apikey}`).then(
      async res => {
        if (res.status === 200 || res.status === 204) {
          return res.json();
        } else {
          const text = await res.text();
          return Promise.reject(text);
        }
      }
    );
  }

  getSplit(symbol: string): Promise<SplitResult> {
    return fetch(
      `${PolygonEndpoint}/v2/reference/splits/${symbol.toUpperCase()}?apiKey=${this.apikey}`
    ).then(async res => {
      if (res.status === 200 || res.status === 204) {
        return res.json();
      } else {
        const text = await res.text();
        return Promise.reject(text);
      }
    });
  }

  queryTicker(options?: QueryTickerOptions): Promise<TickerResponse[]> {
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

  getTypeMappings(): Promise<TypesResponse> {
    return fetch(`${PolygonEndpoint}/v2/reference/types?apiKey=${this.apikey}`).then(async res => {
      if (res.status === 200 || res.status === 204) {
        return res.json();
      } else {
        const text = await res.text();
        return Promise.reject(text);
      }
    });
  }
}
