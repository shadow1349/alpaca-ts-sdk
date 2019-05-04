import { AlpacaSecurityHeaders } from './AlpacaHeaders';
import { AlpacaOptions } from './AlpacaOptions';
import fetch from 'node-fetch';
import { AlpacaTimestamp } from './AlpacaTimestamp';
import { URL } from 'url';

export class AlpacaTime {
  hour: number;
  minute: number;

  constructor(time: string) {
    const parts = time.split(':');
    this.hour = parseInt(parts[0]);
    this.minute = parseInt(parts[1]);
  }
}

export interface CalendarEntity {
  date: Date;
  open: AlpacaTime;
  close: AlpacaTime;
}

export class Calendar {
  private endpoint: string;
  private headers: AlpacaSecurityHeaders;

  constructor(options: AlpacaOptions, endpoint: string) {
    this.endpoint = endpoint;

    this.headers = {
      'APCA-API-KEY-ID': options.publicKey,
      'APCA-API-SECRET-KEY': options.secretKey
    };
  }

  get(start: Date, end: Date) {
    const url = new URL(`${this.endpoint}/v1/calendar`);

    url.searchParams.append('start', new AlpacaTimestamp(start).dateString);
    url.searchParams.append('end', new AlpacaTimestamp(end).dateString);

    return fetch(url.href, { headers: this.headers })
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
            date: new AlpacaTimestamp(json.date).date,
            open: new AlpacaTime(json.open),
            close: new AlpacaTime(json.close)
          } as CalendarEntity)
      );
  }
}
