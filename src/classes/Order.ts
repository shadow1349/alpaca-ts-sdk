import { AlpacaSecurityHeaders } from './AlpacaHeaders';
import { AlpacaOptions } from './AlpacaOptions';
import { AlpacaTimestamp, GetAlpacaTimestamp } from './AlpacaTimestamp';
import { URL } from 'url';
import fetch from 'node-fetch';

export type OrderType = 'market' | 'limit' | 'stop' | 'stop_limit';
export type OrderSide = 'buy' | 'sell';
export type OrderTimeInForce = 'day' | 'gtc' | 'opg';
export type OrderStatus =
  | 'new'
  | 'partially_filled'
  | 'filled'
  | 'done_for_day'
  | 'canceled'
  | 'expired'
  | 'accepted'
  | 'pending_new'
  | 'accepted_for_bidding'
  | 'pending_cancel'
  | 'stopped'
  | 'rejected'
  | 'suspended'
  | 'calculated';

export interface GetAllOrdersOptions {
  status?: 'open' | 'closed' | 'all';
  limit?: number;
  after?: Date;
  until?: Date;
  direction?: 'asc' | 'desc';
}

export type SubmitOrderOptions = {
  symbol: string;
  qty: number;
  side: OrderSide;
  type: OrderType;
  time_in_force: OrderTimeInForce;

  // required if type is limit or stop_limit
  limit_price?: number;
  // required if type is stop or stop_limit
  stop_price?: number;
};

export interface OrderEntity {
  id: string;
  client_order_id: string;
  created_at: Date;
  updated_at?: Date;
  submitted_at?: Date;
  filled_at?: Date;
  expired_at?: Date;
  canceled_at?: Date;
  failed_at?: Date;
  asset_id: string;
  symbol: string;
  asset_class: string;
  qty: number;
  filled_qty: number;
  type: OrderType;
  side: OrderSide;
  time_in_force: OrderTimeInForce;
  limit_price?: number;
  stop_price?: number;
  filled_avg_price: number;
  status: OrderStatus;
}

export class Order {
  private endpoint: string;
  private headers: AlpacaSecurityHeaders;

  constructor(options: AlpacaOptions, endpoint: string) {
    this.endpoint = endpoint;

    this.headers = {
      'APCA-API-KEY-ID': options.publicKey,
      'APCA-API-SECRET-KEY': options.secretKey
    };
  }

  getAll(options?: GetAllOrdersOptions) {
    const url = new URL(`${this.endpoint}/v1/orders`);

    if (options) {
      if (options.after) {
        url.searchParams.append('after', GetAlpacaTimestamp(options.after));
      }

      if (options.direction) {
        url.searchParams.append('direction', options.direction);
      }

      if (options.limit) {
        url.searchParams.append('limit', JSON.stringify(options.limit));
      }

      if (options.status) {
        url.searchParams.append('status', options.status);
      }

      if (options.until) {
        url.searchParams.append('until', GetAlpacaTimestamp(options.until));
      }
    }

    return fetch(url.href, { headers: this.headers })
      .then(async res => {
        if (res.status === 200) {
          return res.json();
        } else {
          const text = await res.text();
          return Promise.reject(text);
        }
      })
      .then((json: any[]) => json.map(x => this.mapOrder(x)));
  }

  get(order_id: string) {
    return fetch(`${this.endpoint}/v1/orders/${order_id}`, { headers: this.headers })
      .then(async res => {
        if (res.status === 200) {
          return res.json();
        } else {
          const text = await res.text();
          return Promise.reject(text);
        }
      })
      .then(json => this.mapOrder(json));
  }

  submit(options: SubmitOrderOptions) {
    const body: any = {
      symbol: options.symbol.toUpperCase(),
      qty: JSON.stringify(options.qty),
      side: options.side,
      type: options.type,
      time_in_force: options.time_in_force
    };

    if (options.type === 'limit' && !options.limit_price) {
      return Promise.reject('Limit orders must have a limit_price');
    } else {
      body['limit_price'] = options.limit_price;
    }

    if (options.type === 'stop' && !options.stop_price) {
      return Promise.reject('Stop orders must have a stop_price');
    } else {
      body['stop_price'] = options.stop_price;
    }

    if (options.type === 'stop_limit' && (!options.stop_price && !options.limit_price)) {
      return Promise.reject('Stop Limit orders must have a stop price and a limit price');
    } else {
      body['limit_price'] = options.limit_price;
      body['stop_price'] = options.stop_price;
    }

    return fetch(`${this.endpoint}/v1/orders`, {
      headers: this.headers,
      body: JSON.stringify(body),
      method: 'POST'
    })
      .then(async res => {
        if (res.status === 200) {
          return res.json();
        } else {
          const text = await res.text();
          return Promise.reject(text);
        }
      })
      .then(json => this.mapOrder(json));
  }

  delete(order_id: string) {
    return fetch(`${this.endpoint}/v1/orders/${order_id}`, {
      headers: this.headers,
      method: 'DELETE'
    }).then(async res => {
      if (res.status === 200 || res.status === 204) {
        return Promise.resolve(true);
      } else {
        const text = await res.text();
        return Promise.reject(text);
      }
    });
  }

  private mapOrder(json: any) {
    return {
      id: json.id,
      client_order_id: json.client_order_id,
      created_at: json.created_at,
      updated_at: json.updated_at,
      submitted_at: json.submitted_at,
      filled_at: json.filled_at,
      expired_at: json.expired_at,
      canceled_at: json.canceled_at,
      failed_at: json.failed_at,
      asset_id: json.asset_id,
      symbol: json.symbol,
      asset_class: json.asset_class,
      qty: parseInt(json.qty),
      filled_qty: parseInt(json.filled_qty),
      type: json.type,
      side: json.side,
      time_in_force: json.time_in_force,
      limit_price: json.limit_price ? parseFloat(json.limit_price) : null,
      stop_price: json.stop_price ? parseFloat(json.stop_price) : null,
      filled_avg_price: json.filled_avg_price ? parseFloat(json.filled_avg_price) : null,
      status: json.status
    } as OrderEntity;
  }
}
