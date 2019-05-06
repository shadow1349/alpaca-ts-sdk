# Market Data Endpoints

You can view the [Polygon Docs](https://polygon.io/docs/#getting-started) for more information. The beta release of the library does not include all endpoints yet, they are being integrated gradually.

## Documentation

### Symbol

```typescript
interface SymbolEntity {
  symbol: string;
  name: string;
  type: string;
  url: string;
  updated: string;
  isOTC: boolean;
}

interface SymbolEndpoints {
  company?: string;
  dividends?: string;
  earnings?: string;
  analysts?: string;
  changes?: string;
  splits?: string;
  news?: string;
}

interface SymbolResponse {
  symbol: SymbolEntity;
  endpoints?: SymbolEndpoints;
}

interface Rating {
  current: number;
  month1: number;
  month2: number;
  month3: number;
  month4: number;
  month5: number;
}

interface AnalystRating {
  symbol: string;
  analysts: number;
  change: number;
  strongBuy: Rating;
  buy: Rating;
  hold: Rating;
  sell: Rating;
  strongSell: Rating;
  updated: string;
}

interface Change {
  symbol: string;
  date: string;
  type: string;
  listingChange: string;
  exchange: string;
  name: string;
}

interface Company {
  logo?: string;
  exchange: string;
  name: string;
  symbol: string;
  listdate: string;
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
  updated: string;
}

interface Dividend {
  symbol: string;
  type: string;
  exDate: string;
  paymentDate: string;
  recordDate: string;
  declaredDate: string;
  amount: number;
  qualified: string;
  flag: string;
}

interface Earning {
  symbol: string;
  EPSReportDate: string;
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

interface Financial {
  symbol: string;
  reportDate: string;
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

interface News {
  symbols: string[];
  title: string;
  url: string;
  source: string;
  summary: string;
  image?: string;
  timestamp: string;
  keywords: string[];
}

interface Split {
  symbol: string;
  exDate: string;
  paymentDate: string;
  recordDate: string;
  declaredDate: string;
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

`getSplits(symbol: string): Promise<Split[]>`

`getNews(symbol: string): Promise<News[]>`

`getFinancials(symbol: string): Promise<Financial[]>`

### Ticker

```typescript
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
```

#### Methods

`query(options?:QueryTickerOptions)` - If no options are provided the default will be:

```typescript
{
  sort: 'ticker';
  perpage, 50;
  page, 1;
  active, true;
}
```
