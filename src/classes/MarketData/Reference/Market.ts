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

export class Market {
  private apikey: string;

  constructor(options: AlpacaOptions) {
    this.apikey = options.publicKey;
  }

  get(): Promise<MarketResponse> {
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
}
