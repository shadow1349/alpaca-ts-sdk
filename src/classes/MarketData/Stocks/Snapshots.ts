export interface TickerSnapshotEntity {
  todaysChange: number;
  todaysChangePerc: number;
  updated: number;
  day: TickerSnapshotEntityAgg;
  lastTrade: StocksSnapshotAgg;
  min: TickerSnapshotEntityAgg;
  prevDay: TickerSnapshotEntityAgg;
  ticker: string;
}

export interface TickerSnapshotEntityAgg {
  /**
   * Close Price
   */
  c: number;
  /**
   * High Price
   */
  h: number;
  /**
   * Low Price
   */
  l: number;
  /**
   * Open Price
   */
  o: number;
  /**
   * Volume
   */
  v: number;
}

export interface StocksSnapshotAgg {
  /**
   * Condition 1 of this trade
   */
  c1: number;
  /**
   * Condition 2 of this trade
   */
  c2: number;
  /**
   * Condition 3 of this trade
   */
  c3: number;
  /**
   * Condition 4 of this trade
   */
  c4: number;
  /**
   * The exchange this trade happened on
   */
  e: number;
  /**
   * Price of the trade
   */
  p: number;
  /**
   * Size of the trade
   */
  s: number;
  /**
   * Timestamp of the trade
   */
  t: number;
}

export interface TickerSnapshotResponse {
  status: string;
  tickers: TickerSnapshotEntity[];
}

export interface SingleTickerSnapshotResponse {
  status: string;
  ticker: TickerSnapshotEntity;
}
