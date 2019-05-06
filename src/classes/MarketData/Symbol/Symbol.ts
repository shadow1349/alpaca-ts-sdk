import { AlpacaOptions } from '../../AlpacaOptions';
import fetch from 'node-fetch';
import { PolygonEndpoint } from '../MarketDataEndpoint';
import { Company } from './Company';
import { Dividend } from './Dividend';
import { Earning } from './Earning';
import { AnalystRating } from './AnalystRating';
import { Financial } from './Financial';
import { News } from './News';
import { SplitEntity } from './Split';
import { Change } from './Change';

export interface SymbolEntity {
  symbol: string;
  name: string;
  type: string;
  url: string;
  updated: string;
  isOTC: boolean;
}

export interface SymbolEndpoints {
  company?: string;
  dividends?: string;
  earnings?: string;
  analysts?: string;
  changes?: string;
  splits?: string;
  news?: string;
}

export interface SymbolResponse {
  symbol: SymbolEntity;
  endpoints?: SymbolEndpoints;
}

export class Symbol {
  private apikey: string;

  constructor(options: AlpacaOptions) {
    this.apikey = options.publicKey;
  }

  get(symbol: string): Promise<SymbolResponse> {
    return fetch(
      `${PolygonEndpoint}/v1/meta/symbols/${symbol.toUpperCase()}?apiKey=${this.apikey}`
    ).then(async res => {
      if (res.status === 200 || res.status === 204) {
        return res.json();
      } else {
        const text = await res.text();
        return Promise.reject(text);
      }
    });
  }

  getCompanyDetails(symbol: string): Promise<Company> {
    return fetch(
      `${PolygonEndpoint}/v1/meta/symbols/${symbol.toUpperCase()}/company?apiKey=${this.apikey}`
    ).then(async res => {
      if (res.status === 200 || res.status === 204) {
        return res.json();
      } else {
        const text = await res.text();
        return Promise.reject(text);
      }
    });
  }

  getDividends(symbol: string): Promise<Dividend[]> {
    return fetch(
      `${PolygonEndpoint}/v1/meta/symbols/${symbol.toUpperCase()}/dividends?apiKey=${this.apikey}`
    ).then(async res => {
      if (res.status === 200 || res.status === 204) {
        return res.json();
      } else {
        const text = await res.text();
        return Promise.reject(text);
      }
    });
  }

  getEarnings(symbol: string): Promise<Earning[]> {
    return fetch(
      `${PolygonEndpoint}/v1/meta/symbols/${symbol.toUpperCase()}/earnings?apiKey=${this.apikey}`
    ).then(async res => {
      if (res.status === 200 || res.status === 204) {
        return res.json();
      } else {
        const text = await res.text();
        return Promise.reject(text);
      }
    });
  }

  getAnalystRatings(symbol: string): Promise<AnalystRating> {
    return fetch(
      `${PolygonEndpoint}/v1/meta/symbols/${symbol.toUpperCase()}/analysts?apiKey=${this.apikey}`
    ).then(async res => {
      if (res.status === 200 || res.status === 204) {
        return res.json();
      } else {
        const text = await res.text();
        return Promise.reject(text);
      }
    });
  }

  getChanges(symbol: string): Promise<Change[]> {
    return fetch(
      `${PolygonEndpoint}/v1/meta/symbols/${symbol.toUpperCase()}/changes?apiKey=${this.apikey}`
    ).then(async res => {
      if (res.status === 200 || res.status === 204) {
        return res.json();
      } else {
        const text = await res.text();
        return Promise.reject(text);
      }
    });
  }

  getSplits(symbol: string): Promise<SplitEntity[]> {
    return fetch(
      `${PolygonEndpoint}/v1/meta/symbols/${symbol.toUpperCase()}/splits?apiKey=${this.apikey}`
    ).then(async res => {
      if (res.status === 200 || res.status === 204) {
        return res.json();
      } else {
        const text = await res.text();
        return Promise.reject(text);
      }
    });
  }

  getNews(symbol: string): Promise<News[]> {
    return fetch(
      `${PolygonEndpoint}/v1/meta/symbols/${symbol.toUpperCase()}/news?apiKey=${this.apikey}`
    ).then(async res => {
      if (res.status === 200 || res.status === 204) {
        return res.json();
      } else {
        const text = await res.text();
        return Promise.reject(text);
      }
    });
  }

  getFinancials(symbol: string): Promise<Financial[]> {
    return fetch(
      `${PolygonEndpoint}/v1/meta/symbols/${symbol.toUpperCase()}/financials?apiKey=${this.apikey}`
    ).then(async res => {
      if (res.status === 200 || res.status === 204) {
        return res.json();
      } else {
        const text = await res.text();
        return Promise.reject(text);
      }
    });
  }
}
