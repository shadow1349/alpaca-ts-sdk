import { AlpacaOptions } from '../../AlpacaOptions';
import fetch from 'node-fetch';
import { PolygonEndpoint } from '../MarketDataEndpoint';

export interface TypesMap {
  CS: string;
  ADR: string;
  NVDR: string;
  GDR: string;
  SDR: string;
  CEF: string;
  ETP: string;
  REIT: string;
  MLP: string;
  WRT: string;
  PUB: string;
  NYRS: string;
  UNIT: string;
  RIGHT: string;
  TRAK: string;
  LTDP: string;
  RYLT: string;
  MF: string;
  PFD: string;
  FDR: string;
  OST: string;
  FUND: string;
  SP: string;
  SI: string;
}

export interface TypesIndex {
  INDEX: string;
  ETF: string;
  ETN: string;
  ETMF: string;
  SETTLEMENT: string;
  SPOT: string;
  SUBPROD: string;
  WC: string;
  ALPHAINDEX: string;
}

export interface TypesResult {
  types: TypesMap;
  indexTypes: TypesIndex;
}

export interface TypesResponse {
  status: string;
  results: TypesResult;
}

export class Types {
  private apikey: string;

  constructor(options: AlpacaOptions) {
    this.apikey = options.publicKey;
  }

  get(): Promise<TypesResponse> {
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
