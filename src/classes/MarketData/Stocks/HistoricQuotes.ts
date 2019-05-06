export interface HistoricQuotesMap {
  /**
   * Ask Exchange
   */
  aE: string;
  /**
   * Ask Price
   */
  aP: string;
  /**
   * Ask Size
   */
  aS: string;
  /**
   * Bid Exchange
   */
  bE: string;
  /**
   * Big Price
   */
  bP: string;
  /**
   * Big Size
   */
  bS: string;
  /**
   * Condition
   */
  c: string;
  /**
   * Timestamp
   */
  t: string;
}

export interface HistoricQuotesTick {
  /**
   * Condition of this quote
   */
  c: number;
  /**
   * Bid Exchange
   */
  bE: number;
  /**
   * Ask Exchange
   */
  aE: number;
  /**
   * Ask Price
   */
  aP: number;
  /**
   * Bid Price
   */
  bP: number;
  /**
   * Bid Size
   */
  bS: number;
  /**
   * Ask Size
   */
  aS: number;
  /**
   * Timestamp of this trade
   */
  t: number;
}

export interface HistoricQuoteResponse {
  day: string;
  map: HistoricQuotesMap;
  msLatency: number;
  status: string;
  symbol: string;
  ticks: HistoricQuotesTick[];
}
