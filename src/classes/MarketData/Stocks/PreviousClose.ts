export interface PreviousCloseEntity {
  ticker: string;
  status: string;
  adjusted: boolean;
  queryCount: number;
  resultsCount: number;
  results: PreviousCloseResult[];
}

export interface PreviousCloseResult {
  /**
   * Ticker symbol
   */
  T: string;
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
