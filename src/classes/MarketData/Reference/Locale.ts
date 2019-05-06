import { AlpacaOptions } from '../../AlpacaOptions';
import fetch from 'node-fetch';
import { PolygonEndpoint } from '../MarketDataEndpoint';

export interface LocaleEntity {
  locale: string;
  name: string;
}

export interface LocaleResponse {
  status: string;
  results: LocaleEntity[];
}

export class Locale {
  private apikey: string;

  constructor(options: AlpacaOptions) {
    this.apikey = options.publicKey;
  }

  get() {
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
}
