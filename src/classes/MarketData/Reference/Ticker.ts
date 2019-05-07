export type TickerMarket = 'STOCKS' | 'INDICIES' | 'CRYPTO' | 'FX' | 'BONDS' | 'MF' | 'MMF';

export type TickerCodes = {
  cik: string;
  figiuid: string;
  scfigi: string;
  cfigi: string;
  figi: string;
};

export type TickerAttributes = {
  currencyName: string;
  currency: string;
  baseName: string;
  base: string;
};

export type QueryTickerOptions = {
  sort: string;
  sortBy?: 'asc' | 'desc';
  type?: string;
  market?: TickerMarket;
  locale?: string;
  search?: string;
  perPage?: number;
  page?: number;
  active?: boolean;
};

export interface TickerEntity {
  ticker: string;
  name: string;
  market: TickerMarket;
  locale: string;
  currency: string;
  active: boolean;
  primaryExch: string;
  type?: string;
  codes?: TickerCodes;
  attrs?: TickerAttributes;
  updated: Date;
  url: string;
}

export interface TickerResponse {
  page: number;
  perPage: number;
  count: number;
  status: string;
  tickers: TickerEntity[];
}
