import { AlpacaSecurityHeaders } from './AlpacaHeaders';
import { AlpacaOptions } from './AlpacaOptions';
import { AlpacaTimestamp } from './AlpacaTimestamp';

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

export interface SubmitOrderOptions {
  symbol: string;
  qty: number;
  side: OrderSide;
  type: OrderType;
  time_in_force: OrderTimeInForce;

  // required if type is limit or stop_limit
  limit_price?: number;
  // required if type is stop or stop_limit
  stop_price?: number;
}

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

  getAll(options: GetAllOrdersOptions) {
    const url = new URL(`${this.endpoint}/v1/orders`);

    if (options.after) {
      url.searchParams.append('after', new AlpacaTimestamp(options.after).getTimestamp());
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
      url.searchParams.append('until', new AlpacaTimestamp(options.until).getTimestamp());
    }

    return fetch(url.href, { headers: this.headers })
      .then(res =>
        res.status === 200 ? res.json() : Promise.reject(`${res.status} - ${res.statusText}`)
      )
      .then((json: any[]) => json.map(x => this.mapOrder(x)));
  }

  get(order_id: string) {
    return fetch(`${this.endpoint}/v1/orders/${order_id}`, { headers: this.headers }).then(res =>
      res.status === 200 ? res.json() : Promise.reject(`${res.status} - ${res.statusText}`)
    );
  }

  submit(options: SubmitOrderOptions) {
    return fetch(`${this.endpoint}/v1/orders`, {
      headers: this.headers,
      body: JSON.stringify(options),
      method: 'POST'
    })
      .then(res =>
        res.status === 200 ? res.json() : Promise.reject(`${res.status} - ${res.statusText}`)
      )
      .then(json => this.mapOrder(json));
  }

  delete(order_id: string) {
    return fetch(`${this.endpoint}/v1/orders/${order_id}`, {
      headers: this.headers,
      method: 'DELETE'
    }).then(res =>
      res.status === 200 ? res.json() : Promise.reject(`${res.status} - ${res.statusText}`)
    );
  }

  private mapOrder(json: any) {
    return {
      id: json.id,
      client_order_id: json.client_order_id,
      created_at: new AlpacaTimestamp(json.created_at).getDate(),
      updated_at: json.updated_at ? new AlpacaTimestamp(json.updated_at).getDate() : null,
      submitted_at: json.submitted_at ? new AlpacaTimestamp(json.submitted_at).getDate() : null,
      filled_at: json.filled_at ? new AlpacaTimestamp(json.filled_at).getDate() : null,
      expired_at: json.expired_at ? new AlpacaTimestamp(json.expired_at).getDate() : null,
      canceled_at: json.canceled_at ? new AlpacaTimestamp(json.canceled_at).getDate() : null,
      failed_at: json.failed_at ? new AlpacaTimestamp(json.failed_at).getDate() : null,
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
      filled_avg_price: parseFloat(json.filled_avg_price),
      status: json.status
    } as OrderEntity;
  }
}
