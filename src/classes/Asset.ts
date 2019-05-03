import { AlpacaOptions } from './AlpacaOptions';
import { AlpacaSecurityHeaders } from './AlpacaHeaders';
import { Exchange } from './Exchange';
import fetch from 'node-fetch';

export type AssetStatus = 'active' | 'inactive';

export interface AssetEntity {
  id: string;
  asset_class: 'us_equity';
  exchange: Exchange;
  symbol: string;
  status: AssetStatus;
  tradable: boolean;
}

export class Asset {
  private endpoint: string;
  private headers: AlpacaSecurityHeaders;

  constructor(options: AlpacaOptions, endpoint: string) {
    this.endpoint = endpoint;

    this.headers = {
      'APCA-API-KEY-ID': options.publicKey,
      'APCA-API-SECRET-KEY': options.secretKey
    };
  }

  getAll(status?: AssetStatus): Promise<AssetEntity[]> {
    let url = `${this.endpoint}/v1/assets`;

    if (status) {
      url = `${url}?status=${status}`;
    }

    return fetch(url, { headers: this.headers }).then(res =>
      res.status === 200 ? res.json() : Promise.reject(`${res.status} - ${res.statusText}`)
    );
  }

  get(symbol: string): Promise<AssetEntity> {
    return fetch(`${this.endpoint}/v1/asset/${symbol}`, { headers: this.headers }).then(res =>
      res.status === 200 ? res.json() : Promise.reject(`${res.status} - ${res.statusText}`)
    );
  }
}
