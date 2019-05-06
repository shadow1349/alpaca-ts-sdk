import { AlpacaOptions } from '../../AlpacaOptions';
import fetch from 'node-fetch';
import { PolygonEndpoint } from '../MarketDataEndpoint';

export interface ExchangeEntity {
  id: number;
  type: string;
  market: string;
  mic: string;
  name: string;
  tape: string;
}

export class Exchanges {
  private apikey: string;

  constructor(options: AlpacaOptions) {
    this.apikey = options.publicKey;
  }

  get(): Promise<ExchangeEntity[]> {
    return fetch(`${PolygonEndpoint}/v1/meta/exchanges?apiKey=${this.apikey}`).then(async res => {
      if (res.status === 200 || res.status === 204) {
        return res.json();
      } else {
        const text = await res.text();
        return Promise.reject(text);
      }
    });
  }
}
