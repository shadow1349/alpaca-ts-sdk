export interface LastTradeEntity {
  price: number;
  size: number;
  exchange: number;
  cond1: number;
  cond2: number;
  cond3: number;
  cond4: number;
  timestamp: number;
}

export interface LastResponse {
  status: string;
  symbol: string;
  last: LastTradeEntity;
}

export interface LastQuoteEntity {
  askprice: number;
  asksize: number;
  askexchange: number;
  bidprice: number;
  bidsize: number;
  bidexchange: number;
  timestamp: number;
}
