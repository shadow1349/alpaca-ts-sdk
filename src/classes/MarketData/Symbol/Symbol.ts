import { AlpacaOptions } from '../../AlpacaOptions';
import fetch from 'node-fetch';
import { PolygonEndpoint } from '../MarketDataEndpoint';
import { Company } from './Company';
import { Dividend } from './Dividend';
import { Earning } from './Earning';
import { AnalystRating } from './AnalystRating';
import { Financial } from './Financial';
import { News } from './News';
import { Split } from './Split';
import { Change } from './Change';
import { AlpacaTimestamp } from '../../AlpacaTimestamp';

export interface SymbolEntity {
  symbol: string;
  name: string;
  type: string;
  url: string;
  updated: Date;
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
    return fetch(`${PolygonEndpoint}/v1/meta/symbols/${symbol.toUpperCase()}?apiKey=${this.apikey}`)
      .then(async res => {
        if (res.status === 200 || res.status === 204) {
          return res.json();
        } else {
          const text = await res.text();
          return Promise.reject(text);
        }
      })
      .then(json => {
        json.symbol.updated = new AlpacaTimestamp(json.symbol.updated).getDate();
        return json;
      });
  }

  getCompanyDetails(symbol: string): Promise<Company> {
    return fetch(
      `${PolygonEndpoint}/v1/meta/symbols/${symbol.toUpperCase()}/company?apiKey=${this.apikey}`
    )
      .then(async res => {
        if (res.status === 200 || res.status === 204) {
          return res.json();
        } else {
          const text = await res.text();
          return Promise.reject(text);
        }
      })
      .then(json => {
        json['listdate'] = new AlpacaTimestamp(json.listdate).getDate();
        json['updated'] = new AlpacaTimestamp(json.updated).getDate();

        return json;
      });
  }

  getDividends(symbol: string): Promise<Dividend[]> {
    return fetch(
      `${PolygonEndpoint}/v1/meta/symbols/${symbol.toUpperCase()}/dividends?apiKey=${this.apikey}`
    )
      .then(async res => {
        if (res.status === 200 || res.status === 204) {
          return res.json();
        } else {
          const text = await res.text();
          return Promise.reject(text);
        }
      })
      .then((json: any[]) =>
        json.map(x => {
          x.exDate = new AlpacaTimestamp(x.exDate).getDate();
          x.paymentDate = new AlpacaTimestamp(x.paymentDate).getDate();
          x.recordDate = new AlpacaTimestamp(x.recordDate).getDate();
          x.declaredDate = new AlpacaTimestamp(x.declaredDate).getDate();
          return x;
        })
      );
  }

  getEarnings(symbol: string): Promise<Earning[]> {
    return fetch(
      `${PolygonEndpoint}/v1/meta/symbols/${symbol.toUpperCase()}/earnings?apiKey=${this.apikey}`
    )
      .then(async res => {
        if (res.status === 200 || res.status === 204) {
          return res.json();
        } else {
          const text = await res.text();
          return Promise.reject(text);
        }
      })
      .then((json: any[]) =>
        json.map(x => {
          x.EPSReportDate = new AlpacaTimestamp(x.EPSReportDate).getDate();
          x.fiscalEndDate = new AlpacaTimestamp(x.fiscalEndDate).getDate();
          return x;
        })
      );
  }

  getAnalystRatings(symbol: string): Promise<AnalystRating> {
    return fetch(
      `${PolygonEndpoint}/v1/meta/symbols/${symbol.toUpperCase()}/analysts?apiKey=${this.apikey}`
    )
      .then(async res => {
        if (res.status === 200 || res.status === 204) {
          return res.json();
        } else {
          const text = await res.text();
          return Promise.reject(text);
        }
      })
      .then(json => {
        json.updated = new AlpacaTimestamp(json.updated).getDate();
        return json;
      });
  }

  getChanges(symbol: string): Promise<Change[]> {
    return fetch(
      `${PolygonEndpoint}/v1/meta/symbols/${symbol.toUpperCase()}/changes?apiKey=${this.apikey}`
    )
      .then(async res => {
        if (res.status === 200 || res.status === 204) {
          return res.json();
        } else {
          const text = await res.text();
          return Promise.reject(text);
        }
      })
      .then((json: any[]) =>
        json.map(x => {
          x.date = new AlpacaTimestamp(x.date).getDate();
          return x;
        })
      );
  }

  getSplits(symbol: string): Promise<Split[]> {
    return fetch(
      `${PolygonEndpoint}/v1/meta/symbols/${symbol.toUpperCase()}/splits?apiKey=${this.apikey}`
    )
      .then(async res => {
        if (res.status === 200 || res.status === 204) {
          return res.json();
        } else {
          const text = await res.text();
          return Promise.reject(text);
        }
      })
      .then((json: any[]) =>
        json.map(x => {
          x.exDate = new AlpacaTimestamp(x.exDate).getDate();
          x.paymentDate = new AlpacaTimestamp(x.paymentDate).getDate();
          x.recordDate = new AlpacaTimestamp(x.recordDate).getDate();
          x.declaredDate = new AlpacaTimestamp(x.declaredDate).getDate();
          return x;
        })
      );
  }

  getNews(symbol: string): Promise<News[]> {
    return fetch(
      `${PolygonEndpoint}/v1/meta/symbols/${symbol.toUpperCase()}/news?apiKey=${this.apikey}`
    )
      .then(async res => {
        if (res.status === 200 || res.status === 204) {
          return res.json();
        } else {
          const text = await res.text();
          return Promise.reject(text);
        }
      })
      .then((json: any[]) =>
        json.map(x => {
          x.timestamp = new AlpacaTimestamp(x.timestamp).getDate();
          return x;
        })
      );
  }

  getFinancials(symbol: string): Promise<Financial[]> {
    return fetch(
      `${PolygonEndpoint}/v1/meta/symbols/${symbol.toUpperCase()}/financials?apiKey=${this.apikey}`
    )
      .then(async res => {
        if (res.status === 200 || res.status === 204) {
          return res.json();
        } else {
          const text = await res.text();
          return Promise.reject(text);
        }
      })
      .then((json: any[]) =>
        json.map(x => {
          x.reportDate = new AlpacaTimestamp(x.reportDate).getDate();
          return x;
        })
      );
  }
}
