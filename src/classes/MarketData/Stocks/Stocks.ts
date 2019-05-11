import { AlpacaOptions } from '../../AlpacaOptions';
import { DailyOpenCloseEntity } from './DailyOpenClose';
import { PolygonEndpoint } from '../MarketDataEndpoint';
import { ExchangeEntity } from './Exchanges';
import { HistoricOptions, HistoricTradeResponse } from './HistoricTrades';
import { LastResponse } from './LastReference';
import { URL } from 'url';
import { PreviousCloseEntity } from './PreviousClose';
import { AggregateOptions, AggregateEntity } from './Aggregates';
import { TickerSnapshotResponse, SingleTickerSnapshotResponse } from './Snapshots';
import fetch from 'node-fetch';
import { BarsResponse, BarsOptions, BarEntityResult } from './Bars';
import { HistoricQuoteResponse } from './HistoricQuotes';

export class Stocks {
  private apikey: string;

  constructor(private options: AlpacaOptions) {
    this.apikey = this.options.publicKey;
  }

  getDailyOpenAndClose(symbol: string, date: Date): Promise<DailyOpenCloseEntity> {
    return fetch(
      `${PolygonEndpoint}/v1/open-close/${symbol.toUpperCase()}/${date.getFullYear()}-${date.getMonth() +
        1}-${date.getDate()}?apiKey=${this.apikey}`
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

  getHistoricQuotes(options: HistoricOptions): Promise<HistoricQuoteResponse> {
    const endpoint = `${PolygonEndpoint}/v1/historic/quotes/${
      options.symbol
    }/${options.date.getFullYear()}-${options.date.getMonth() + 1}-${options.date.getDate()}`;

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

  getHistoricTrades(options: HistoricOptions): Promise<HistoricTradeResponse> {
    const endpoint = `${PolygonEndpoint}/v1/historic/trades/${options.symbol}/${getISODate(
      options.date
    )}`;

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
    const from = getISODate(options.from);

    const to = getISODate(options.to);

    const url = new URL(
      `${PolygonEndpoint}/v2/aggs/ticker/${options.ticker.toUpperCase()}/range/${
        options.multiplier ? options.multiplier : 1
      }/${options.timespan ? options.timespan : 'day'}/${from}/${to}?apiKey=${this.apikey}`
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

  getTickerSnapshots(): Promise<TickerSnapshotResponse> {
    return fetch(
      `${PolygonEndpoint}/v2/snapshot/locale/us/markets/stocks/tickers?apiKey=${this.apikey}`
    ).then(async res => {
      if (res.status === 200 || res.status === 204) {
        return res.json();
      } else {
        const text = await res.text();
        return Promise.reject(text);
      }
    });
  }

  getSingleTickerSnapshot(symbol: string): Promise<SingleTickerSnapshotResponse> {
    return fetch(
      `${PolygonEndpoint}/v2/snapshot/locale/us/markets/stocks/tickers/${symbol.toUpperCase()}?apiKey=${
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

  getMarketGainersSnapshot(): Promise<TickerSnapshotResponse> {
    return fetch(
      `${PolygonEndpoint}/v2/snapshot/locale/us/markets/stocks/gainers?apiKey=${this.apikey}`
    ).then(async res => {
      if (res.status === 200 || res.status === 204) {
        return res.json();
      } else {
        const text = await res.text();
        return Promise.reject(text);
      }
    });
  }

  getMarketLosersSnapshot(): Promise<TickerSnapshotResponse> {
    return fetch(
      `${PolygonEndpoint}/v2/snapshot/locale/us/markets/stocks/losers?apiKey=${this.apikey}`
    ).then(async res => {
      if (res.status === 200 || res.status === 204) {
        return res.json();
      } else {
        const text = await res.text();
        return Promise.reject(text);
      }
    });
  }

  getBars(options: BarsOptions): Promise<BarsResponse> {
    const url = new URL(`https://data.alpaca.markets/v1/bars/${options.timeframe}`);

    url.searchParams.append(
      'symbols',
      Array.isArray(options.symbols)
        ? options.symbols.reduce((acc, cur) => `${acc},${cur}`)
        : options.symbols
    );

    if (options.limit) {
      url.searchParams.append('limit', options.limit.toString());
    }

    if (options.start) {
      url.searchParams.append('start', getISODate(options.start));
    }

    if (options.end) {
      url.searchParams.append('end', getISODate(options.end));
    }

    if (options.until) {
      url.searchParams.append('start', getISODate(options.until));
    }

    return fetch(url.href, {
      headers: {
        'APCA-API-KEY-ID': this.options.publicKey,
        'APCA-API-SECRET-KEY': this.options.secretKey
      }
    })
      .then(res => res.json())
      .then(json => {
        const results = Object.keys(json).map(x => {
          return { symbol: x, results: json[`${x}`] };
        });

        return { results: results };
      });
  }
}

function getISODate(date: Date) {
  return `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}-${
    date.getDate() < 10 ? '0' : ''
  }${date.getDate()}`;
}
