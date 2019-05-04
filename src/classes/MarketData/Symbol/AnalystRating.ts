export interface Rating {
  current: number;
  month1: number;
  month2: number;
  month3: number;
  month4: number;
  month5: number;
}

export interface AnalystRating {
  symbol: string;
  analysts: number;
  change: number;
  strongBuy: Rating;
  buy: Rating;
  hold: Rating;
  sell: Rating;
  strongSell: Rating;
  updated: Date;
}
