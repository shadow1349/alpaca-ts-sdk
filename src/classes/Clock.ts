import { AlpacaSecurityHeaders } from './AlpacaHeaders';
import { AlpacaOptions } from './AlpacaOptions';
import { AlpacaTimestamp } from './AlpacaTimestamp';
import fetch from 'node-fetch';

export interface ClockEntity {
  timestamp: Date;
  is_open: boolean;
  next_open: Date;
  next_close: Date;
}

export class Clock {
  private endpoint: string;
  private headers: AlpacaSecurityHeaders;

  constructor(options: AlpacaOptions, endpoint: string) {
    this.endpoint = endpoint;

    this.headers = {
      'APCA-API-KEY-ID': options.publicKey,
      'APCA-API-SECRET-KEY': options.secretKey
    };
  }

  get() {
    return fetch(`${this.endpoint}/v1/clock`, { headers: this.headers })
      .then(async res => {
        if (res.status === 200 || res.status === 204) {
          return res.json();
        } else {
          const text = await res.text();
          return Promise.reject(text);
        }
      })
      .then(
        json =>
          ({
            timestamp: new AlpacaTimestamp(json.timestamp).date,
            is_open: json.is_open,
            next_open: new AlpacaTimestamp(json.next_open).date,
            next_close: new AlpacaTimestamp(json.next_close).date
          } as ClockEntity)
      );
  }
}
