import { Exchange } from './Exchange';
import { AlpacaSecurityHeaders } from './AlpacaHeaders';
import { AlpacaOptions } from './AlpacaOptions';
import fetch from 'node-fetch';

export interface PositionEntity {
  asset_id: string;
  symbol: string;
  exchange: Exchange;
  asset_class: string;
  avg_entry_price: number;
  qty: number;
  side: 'long';
  market_value: number;
  cost_basis: number;
  unrealized_pl: number;
  unrealized_plpc: number;
  unrealized_intraday_pl: number;
  unrealized_intraday_plpc: number;
  current_price: number;
  lastday_price: number;
  change_today: number;
}

export class Position {
  private endpoint: string;
  private headers: AlpacaSecurityHeaders;

  constructor(options: AlpacaOptions, endpoint: string) {
    this.endpoint = endpoint;

    this.headers = {
      'APCA-API-KEY-ID': options.publicKey,
      'APCA-API-SECRET-KEY': options.secretKey
    };
  }

  getAll() {
    return fetch(`${this.endpoint}/v1/positions`, { headers: this.headers })
      .then(async res => {
        if (res.status === 200 || res.status === 204) {
          return res.json();
        } else {
          const text = await res.text();
          return Promise.reject(text);
        }
      })
      .then((json: any[]) => json.map(x => this.mapPosition(x)));
  }

  get(symbol: string) {
    return fetch(`${this.endpoint}/v1/positions/${symbol}`, { headers: this.headers })
      .then(async res => {
        if (res.status === 200 || res.status === 204) {
          return res.json();
        } else {
          const text = await res.text();
          return Promise.reject(text);
        }
      })
      .then(json => this.mapPosition(json));
  }

  private mapPosition(json: any) {
    return {
      asset_id: json.asset_id,
      symbol: json.symbol,
      exchange: json.exchange,
      asset_class: json.asset_class,
      avg_entry_price: parseFloat(json.avg_entry_price),
      qty: parseInt(json.qty),
      side: json.side,
      market_value: parseFloat(json.market_value),
      cost_basis: parseFloat(json.cost_basis),
      unrealized_pl: parseFloat(json.unrealized_pl),
      unrealized_plpc: parseFloat(json.unrealized_intraday_plpc),
      unrealized_intraday_pl: parseFloat(json.unrealized_intraday_pl),
      unrealized_intraday_plpc: parseFloat(json.unrealized_intraday_plpc),
      current_price: parseFloat(json.current_price),
      lastday_price: parseFloat(json.lastday_price),
      change_today: parseFloat(json.change_today)
    } as PositionEntity;
  }
}
