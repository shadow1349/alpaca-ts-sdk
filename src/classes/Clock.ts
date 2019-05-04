import { AlpacaSecurityHeaders } from './AlpacaHeaders';
import { AlpacaOptions } from './AlpacaOptions';
import { AlpacaTimestamp } from './AlpacaTimestamp';
import fetch from 'node-fetch';

export interface ClockEntity {
  timestamp: string;
  is_open: boolean;
  next_open: string;
  next_close: string;
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
            timestamp: json.timestamp,
            is_open: json.is_open,
            next_open: json.next_open,
            next_close: json.next_close
          } as ClockEntity)
      );
  }
}
