import { AlpacaOptions } from '../../AlpacaOptions';
import { DailyOpenCloseEntity } from './DailyOpenClose';
import { PolygonEndpoint } from '../MarketDataEndpoint';
import { ExchangeEntity } from './Exchanges';
import { HistoricOptions } from './HistoricTrades';
import { LastResponse } from './LastReference';
import { URL } from 'url';
import { PreviousCloseEntity } from './PreviousClose';
import { AggregateOptions, AggregateEntity } from './Aggregates';

export class Stocks {
  private apikey: string;

  constructor(options: AlpacaOptions) {
    this.apikey = options.publicKey;
  }

  getDailyOpenAndClose(symbol: string, date: Date): Promise<DailyOpenCloseEntity> {
    return fetch(
      `${PolygonEndpoint}/v1/open-close/${symbol.toUpperCase()}/${date.getFullYear()}-${date.getMonth()}-${date.getDate()}?apiKey=${
        this.apikey
      }`
    ).then(async res => {
      if (res.status === 200 || res.status === 204) {
        return res.json();
      } else {
        const text = await res.text();
        return Promise.reject(text);
      }
    });
  }

  getExchanges(): Promise<ExchangeEntity[]> {
    return fetch(`${PolygonEndpoint}/v1/meta/exchanges?apiKey=${this.apikey}`).then(async res => {
      if (res.status === 200 || res.status === 204) {
        return res.json();
      } else {
        const text = await res.text();
        return Promise.reject(text);
      }
    });
  }

  getHistoricQuotes(options: HistoricOptions) {
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

  getHistoricTrades(options: HistoricOptions) {
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

  getLastQuote(symbol: string): Promise<LastResponse> {
    return fetch(
      `${PolygonEndpoint}/v1/last_quote/stocks/${symbol.toUpperCase()}?apiKey=${this.apikey}`
    ).then(async res => {
      if (res.status === 200 || res.status === 204) {
        return res.json();
      } else {
        const text = await res.text();
        return Promise.reject(text);
      }
    });
  }

  getLastTrade(symbol: string): Promise<LastResponse> {
    return fetch(
      `${PolygonEndpoint}/v1/last/stocks/${symbol.toUpperCase()}?apiKey=${this.apikey}`
    ).then(async res => {
      if (res.status === 200 || res.status === 204) {
        return res.json();
      } else {
        const text = await res.text();
        return Promise.reject(text);
      }
    });
  }

  /**
   * @param symbol
   * @param unadjusted Set to true if the results should NOT be adjusted for splits.
   */
  getPreviousClose(symbol: string, unadjusted?: boolean): Promise<PreviousCloseEntity> {
    const url = new URL(`${PolygonEndpoint}/v1/last/stocks/${symbol.toUpperCase()}`);
    url.searchParams.append('apiKey', this.apikey);

    if (unadjusted !== undefined && unadjusted !== null) {
      url.searchParams.append('unadjusted', JSON.stringify(unadjusted));
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

  getAggregates(options: AggregateOptions): Promise<AggregateEntity> {
    const url = new URL(
      `${PolygonEndpoint}/v2/aggs/ticker/${options.ticker.toUpperCase()}/range/${
        options.multiplier ? options.multiplier : 1
      }/${
        options.timespan ? options.timespan : 'day'
      }/${options.from.getFullYear()}-${options.from.getMonth()}-${options.from.getDate()}/${options.to.getFullYear()}-${options.to.getMonth()}-${options.to.getDate()}`
    );
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
