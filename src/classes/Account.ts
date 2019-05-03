import { AlpacaOptions } from './AlpacaOptions';
import { AlpacaSecurityHeaders } from './AlpacaHeaders';
import fetch from 'node-fetch';
import { AlpacaTimestamp } from './AlpacaTimestamp';

export type AccountStatus =
  | 'ONBOARDING'
  | 'SUBMISSION_FAILED'
  | 'SUBMITTED'
  | 'ACCOUNT_UPDATED'
  | 'APPROVAL_PENDING'
  | 'ACTIVE'
  | 'REJECTED';

export interface IAccount {
  id: string;
  status: AccountStatus;
  currency: 'USD';
  buying_power: number;
  cash: number;
  cash_withdrawable: number;
  portfolio_value: number;
  pattern_day_trader: boolean;
  trading_blocked: boolean;
  transfers_blocked: boolean;
  account_blocked: boolean;
  created_at: Date;
}

export class Account {
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
    return fetch(`${this.endpoint}/v1/account`, {
      headers: JSON.parse(JSON.stringify(this.headers))
    })
      .then(res =>
        res.status === 200 ? res.json() : Promise.reject(`${res.status} - ${res.statusText}`)
      )
      .then(
        json =>
          ({
            id: json.id,
            status: json.status,
            currency: json.currency,
            buying_power: parseFloat(json.buying_power),
            cash: parseFloat(json.cash),
            cash_withdrawable: parseFloat(json.cash_withdrawable),
            portfolio_value: parseFloat(json.portfolio_value),
            pattern_day_trader: json.pattern_day_trader,
            trading_blocked: json.trading_blocked,
            transfers_blocked: json.transfers_blocked,
            account_blocked: json.account_blocked,
            created_at: new AlpacaTimestamp(json.created_at).getDate()
          } as IAccount)
      );
  }
}
