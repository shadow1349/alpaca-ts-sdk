import { StocksSnapshotAgg } from './Snapshots';

export interface HistoricTradeResponse {
  day: string;
  map: StocksSnapshotAgg;
  msLatency: number;
  status: string;
  symbol: string;
  ticks: StocksSnapshotAgg[];
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
