import { AlpacaOptions } from '../../AlpacaOptions';
import fetch from 'node-fetch';
import { SplitEntity } from '../Symbol/Split';
import { PolygonEndpoint } from '../MarketDataEndpoint';

export interface SplitResult {
  status: string;
  count: number;
  results: SplitEntity[];
}

export class Split {
  private apikey: string;

  constructor(options: AlpacaOptions) {
    this.apikey = options.publicKey;
  }

  get(symbol: string) {
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
}
