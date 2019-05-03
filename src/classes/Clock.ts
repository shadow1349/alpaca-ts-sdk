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
      .then(res =>
        res.status === 200 ? res.json() : Promise.reject(`${res.status} - ${res.statusText}`)
      )
      .then(
        json =>
          ({
            timestamp: new AlpacaTimestamp(json.timestamp).getDate(),
            is_open: json.is_open,
            next_open: new AlpacaTimestamp(json.next_open).getDate(),
            next_close: new AlpacaTimestamp(json.next_close).getDate()
          } as ClockEntity)
      );
  }
}
