export interface MarketEntity {
  market: string;
  desc: string;
}

export interface MarketResponse {
  status: string;
  results: MarketEntity[];
}
