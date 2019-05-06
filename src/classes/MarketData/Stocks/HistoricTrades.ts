export interface HistoricTradesMap {
  c1: string;
  c2: string;
  c3: string;
  c4: string;
  e: string;
  p: string;
  s: string;
  t: string;
}

export interface HistoricTradeTick {
  c1: number;
  c2: number;
  c3: number;
  c4: number;
  e: number;
  p: number;
  s: number;
  t: number;
}

export interface HistoricTradeResponse {
  day: string;
  map: HistoricTradesMap;
  msLatency: number;
  status: string;
  symbol: string;
  ticks: HistoricTradeTick[];
}

export interface HistoricOptions {
  symbol: string;
  /**
   * Must Be In Format YYYY-MM-DD
   */
  date: Date;
  offset?: number;
  limit?: number;
}
