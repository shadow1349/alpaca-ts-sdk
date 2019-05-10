export interface BarsOptions {
  timeframe: 'minute' | '1Min' | '5Min' | '15Min' | 'day' | '1D';
  symbols: string | string[];
  limit?: number;
  start?: Date;
  end?: Date;
  after?: Date;
  until?: Date;
}

export interface BarsResponse {
  results: BarEntityResult[];
}

export interface BarEntityResult {
  symbol: string;
  results: BarEntity[];
}

export interface BarEntity {
  /**
   * Volume
   */
  v: number;
  /**
   * Open
   */
  o: number;
  /**
   * Close
   */
  c: number;
  /**
   * High
   */
  h: number;
  /**
   * Low
   */
  l: number;
  /**
   * Unix Msec Timestamp ( Start of Aggregate window )
   */
  t: number;
  /**
   * Number of items in aggregate window
   */
  n: number;
}
