# Market Data Endpoints

You can view the [Polygon Docs](https://polygon.io/docs/#getting-started) for more information. The beta release of the library does not include all endpoints yet, they are being integrated gradually.

## Documentation

### Example

```typescript
import { Alpaca } from 'alpaca-ts-sdk'

const sdk = new Alpaca({publicKey: 'MY_PUBLIC_KEY', secretKey: 'MY_SECRET_KEY', paper: true});

(async () {
    const data = await sdk.MarketData.Symbol.get('AAPL');

    console.log(data);
})();
```

### Symbol

#### Interfaces

```typescript
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

export interface Change {
  symbol: string;
  date: Date;
  type: string;
  listingChange: string;
  exchange: string;
  name: string;
}

export interface Company {
  logo?: string;
  exchange: string;
  name: string;
  symbol: string;
  listdate: Date;
  cik: string;
  bloomberg?: string;
  figi?: string;
  lei?: string;
  sic?: number;
  country?: string;
  industry?: string;
  sector?: string;
  marketcap?: number;
  employees?: number;
  phone?: string;
  ceo?: string;
  url?: string;
  description: string;
  similar?: string[];
  tags?: string[];
  updated: Date;
}

export interface Dividend {
  symbol: string;
  type: string;
  exDate: Date;
  paymentDate: Date;
  recordDate: Date;
  declaredDate: Date;
  amount: number;
  qualified: string;
  flag: string;
}

export interface Earning {
  symbol: string;
  EPSReportDate: Date;
  EPSReportDateStr: string;
  fiscalPeriod: string;
  fiscalEndDate: string;
  actualEPS: number;
  consensusEPS: number;
  estimatedEPS: number;
  announceTime: string;
  numberOfEstimates: number;
  EPSSurpriseDollar: number;
  yearAgo: number;
  yearAgoChangePercent: number;
  estimatedChangePercent: number;
}

export interface Financial {
  symbol: string;
  reportDate: Date;
  reportDateStr: string;
  grossProfit: number;
  costOfRevenue: number;
  operatingRevenue: number;
  totalRevenue: number;
  operatingIncome: number;
  netIncome: number;
  researchAndDevelopment: number;
  operatingExpense: number;
  currentAssets: number;
  totalAssets: number;
  totalLiabilities: number;
  currentCash: number;
  currentDebt: number;
  totalCash: number;
  totalDebt: number;
  shareholderEquity: number;
  cashChange: number;
  cashFlow: number;
  operatingGainsLosses: number;
}

export interface News {
  symbols: string[];
  title: string;
  url: string;
  source: string;
  summary: string;
  image?: string;
  timestamp: Date;
  keywords: string[];
}

export interface SplitEntity {
  symbol: string;
  exDate: Date;
  paymentDate: Date;
  recordDate: Date;
  declaredDate: Date;
  ratio: number;
  tofactor: number;
  forfactor: number;
}
```

#### Methods

`get(symbol: string): Promise<SymbolResponse>`

`getCompanyDetails(symbol: string): Promise<Company>`

`getDividends(symbol: string): Promise<Dividend[]>`

`getEarnings(symbol: string): Promise<Earning[]>`

`getAnalystRatings(symbol: string): Promise<AnalystRating>`

`getChanges(symbol: string): Promise<Change[]>`

`getSplits(symbol: string): Promise<SplitEntity[]>`

`getNews(symbol: string): Promise<News[]>`

`getFinancials(symbol: string): Promise<Financial[]>`

### Reference

#### Interfaces

```typescript
export interface LocaleEntity {
  locale: string;
  name: string;
}

export interface LocaleResponse {
  status: string;
  results: LocaleEntity[];
}

export interface MarketEntity {
  market: string;
  desc: string;
}

export interface MarketResponse {
  status: string;
  results: MarketEntity[];
}

export interface SplitResult {
  status: string;
  count: number;
  results: SplitEntity[];
}

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

export interface TypesMap {
  CS: string;
  ADR: string;
  NVDR: string;
  GDR: string;
  SDR: string;
  CEF: string;
  ETP: string;
  REIT: string;
  MLP: string;
  WRT: string;
  PUB: string;
  NYRS: string;
  UNIT: string;
  RIGHT: string;
  TRAK: string;
  LTDP: string;
  RYLT: string;
  MF: string;
  PFD: string;
  FDR: string;
  OST: string;
  FUND: string;
  SP: string;
  SI: string;
}

export interface TypesIndex {
  INDEX: string;
  ETF: string;
  ETN: string;
  ETMF: string;
  SETTLEMENT: string;
  SPOT: string;
  SUBPROD: string;
  WC: string;
  ALPHAINDEX: string;
}

export interface TypesResult {
  types: TypesMap;
  indexTypes: TypesIndex;
}

export interface TypesResponse {
  status: string;
  results: TypesResult;
}
```

#### Methods

`getLocale(): Promise<LocaleResponse>`

`getMarket(): Promise<MarketResponse>`

`getSplit(symbol: string): Promise<SplitResult>`

`queryTicker(options?: QueryTickerOptions): Promise<TickerResponse[]>`

`getTypeMappings(): Promise<TypesResponse>`

### Stocks

#### Interfaces

```typescript
export interface AggregateEntity {
  ticker: string;
  status: string;
  adjusted: boolean;
  queryCount: number;
  resultsCount: number;
  results: PreviousCloseResult[];
}

export type AggregateTimespan = 'minute' | 'hour' | 'day' | 'week' | 'month' | 'quarter' | 'year';

export interface AggregateOptions {
  ticker: string;
  from: Date;
  to: Date;
  unadjusted?: boolean;
  multiplier?: number;
  timespan?: AggregateTimespan;
}

export interface DailyOpenCloseEntity {
  from: string;
  symbol: symbol;
  open: number;
  high: number;
  low: number;
  close: number;
  afterHours: number;
  volume: number;
}

export interface ExchangeEntity {
  id: number;
  type: string;
  market: string;
  mic: string;
  name: string;
  tape: string;
}

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

export interface TickerSnapshotEntity {
  todaysChange: number;
  todaysChangePerc: number;
  updated: number;
  day: TickerSnapshotEntityDay;
  lastTrade: StocksSnapshotAgg;
  min: StocksSnapshotAgg;
  prevDay: StocksSnapshotAgg;
}

export interface TickerSnapshotEntityDay {
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

export interface SingleTickerSnapshotRespinse {
  status: string;
  tickers: TickerSnapshotEntity;
}
```

#### Methods

`getDailyOpenAndClose(symbol: string, date: Date): Promise<DailyOpenCloseEntity>`

`getExchanges(): Promise<ExchangeEntity[]>`

`getHistoricQuotes(options: HistoricOptions)`

`getHistoricTrades(options: HistoricOptions)`

`getLastQuote(symbol: string): Promise<LastResponse>`

`getLastTrade(symbol: string): Promise<LastResponse>`

`getPreviousClose(symbol: string, unadjusted?: boolean): Promise<PreviousCloseEntity>`

`getAggregates(options: AggregateOptions): Promise<AggregateEntity>`

`getTicketSnapshots(): Promise<TickerSnapshotResponse>`

`getSingleTickerSnapshot(symbol: string): Promise<SingleTickerSnapshotRespinse>`

`getMarketGainersSnapshot(): Promise<TickerSnapshotResponse>`

`getMarketLosersSnapshot(): Promise<TickerSnapshotResponse>`
