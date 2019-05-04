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
  updated: Date;
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
  updated: Date;
}

interface Change {
  symbol: string;
  date: Date;
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

interface Dividend {
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

interface Earning {
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

interface Financial {
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

interface News {
  symbols: string[];
  title: string;
  url: string;
  source: string;
  summary: string;
  image?: string;
  timestamp: Date;
  keywords: string[];
}

interface Split {
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

`getSplits(symbol: string): Promise<Split[]>`

`getNews(symbol: string): Promise<News[]>`

`getFinancials(symbol: string): Promise<Financial[]>`
