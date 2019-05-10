# Alpaca TypeScript SDK

This is an UnOfficial TypeScript SDK for the popular Alpaca Platform.

<b>NOTE: At the moment this does not have Market Data integration, but it is on the Roadmap.</b>

## Installation

`npm install alpaca-ts-sdk`

## Example Usage

```typescript
import { Alpaca } from 'alpaca-ts-sdk'

const sdk = new Alpaca({publicKey: 'MY_PUBLIC_KEY', secretKey: 'MY_SECRET_KEY', paper: true});

(async () {
    const account = await sdk.Account.get();

    console.log(account);
})();
```

## Documentation

Check out the official [Alpaca Documentation](https://docs.alpaca.markets/api-documentation/web-api/)

If you want to use Market Data check out the [Market Data](MarketData.md) docs.

### Exchange

These are the available exchanges as detailed in the Alpaca Documentation. This type is used in a few of the interfaces

```typescript
type Exchange = 'AMEX' | 'ARCA' | 'BATS' | 'NYSE' | 'NASDAQ' | 'NYSEARCA';
```

### Account

```typescript
interface IAccount {
  id: string;
  status: AccountStatus;
  currency: 'USD';
  buying_power: number;
  cash: number;
  cash_withdrawable: number;
  portfolio_value: number;
  pattern_day_trader: boolean;
  trading_blocked: boolean;
  transfers_blocked: boolean;
  account_blocked: boolean;
  created_at: string;
}
```

#### Methods

`get(): Promise<IAccount>`

### Asset

```typescript
interface AssetEntity {
  id: string;
  asset_class: 'us_equity';
  exchange: Exchange;
  symbol: string;
  status: AssetStatus;
  tradable: boolean;
  Archives?: AssetArchive[];
}

interface AssetArchive {
  ID: string;
  AsOf: string;
  Exchange: Exchange;
  Symbol: string;
  Cusip: string;
  Status: AssetStatus;
  Tradable: boolean;
  Shortable: boolean;
  ClosingPrice: number;
  PrevClosingPrice: number;
}

type AssetStatus = 'active' | 'inactive';
```

#### Methods

`getAll(status?: AssetStatus): Promise<AssetEntity[]>`

`get(symbol: string): Promise<AssetEntity>`

### Calendar

```typescript
interface CalendarEntity {
  date: string;
  open: AlpacaTime;
  close: AlpacaTime;
}
```

#### Methods

`get(start: Date, end: Date): Promise<CalendarEntity>`

### Clock

```typescript
interface ClockEntity {
  timestamp: string;
  is_open: boolean;
  next_open: string;
  next_close: string;
}
```

#### Methods

`get(): Promise<ClockEntity>`

### Order

```typescript
interface OrderEntity {
  id: string;
  client_order_id: string;
  created_at: string;
  updated_at?: string;
  submitted_at?: string;
  filled_at?: string;
  expired_at?: string;
  canceled_at?: string;
  failed_at?: string;
  asset_id: string;
  symbol: string;
  asset_class: string;
  qty: number;
  filled_qty: number;
  type: OrderType;
  side: OrderSide;
  time_in_force: OrderTimeInForce;
  limit_price?: number;
  stop_price?: number;
  filled_avg_price: number;
  status: OrderStatus;
}

interface SubmitOrderOptions {
  symbol: string;
  qty: number;
  side: OrderSide;
  type: OrderType;
  time_in_force: OrderTimeInForce;

  // required if type is limit or stop_limit
  limit_price?: number;
  // required if type is stop or stop_limit
  stop_price?: number;
}

interface GetAllOrdersOptions {
  status?: 'open' | 'closed' | 'all';
  limit?: number;
  after?: string;
  until?: string;
  direction?: 'asc' | 'desc';
}
```

#### Methods

`getAll(options: GetAllOrdersOptions): Promise<OrderEntity[]>`

`get(order_id: string): Promise<OrderEntity>`

`submit(options: SubmitOrderOptions): Promise<OrderEntity>`

`delete(order_id: string): Promise<OrderEntity>`

### Position

```typescript
interface PositionEntity {
  asset_id: string;
  symbol: string;
  exchange: Exchange;
  asset_class: string;
  avg_entry_price: number;
  qty: number;
  side: 'long';
  market_value: number;
  cost_basis: number;
  unrealized_pl: number;
  unrealized_plpc: number;
  unrealized_intraday_pl: number;
  unrealized_intraday_plpc: number;
  current_price: number;
  lastday_price: number;
  change_today: number;
}
```

#### Methods

`getAll(): Promise<PositionEntity[]>`

`get(symbol: string): Promise<PositionEntity>`

### Market Data

Beta release includes Market Data Polygon integration

### Technical Analysis

These methods have been taken from: [https://github.com/munrocket/ta-math](https://github.com/munrocket/ta-math)

#### Technical Overlays

| Function | Technical Overlay                 |    Developed by    |      Year      |
| :------- | :-------------------------------- | :----------------: | :------------: |
| bb       | Bollinger Band                    |   John Bollinger   |     1980s      |
| dema     | Double Exponential Moving Average |       ️ ✔️️        | Patrick Mulloy | 1994 |
| ema      | Exponential Moving Average        |                    |                |
| ebb      | Exponential Bollinger Band        | Based on Welford's |                |
| keltner  | Keltner Channels                  |  Chester Keltner   |      1960      |
| psar     | Parabolic SAR                     |     :suspect:      | Welles Wilder  | 1978 |
| sma      | Simple Moving Average             |                    |                |
| tema     | Triple Exponential Moving Average |       ️ ✔️️        | Patrick Mulloy | 1994 |
| vbp      | Volume by Price                   |                    |                |
| vwap     | Volume Weighted Average Price     |    James Elkins    |      1984      |
| zigzag   | ZigZag Indicator                  |   Arthur Merrill   |      1977      |

#### Technical Indicators

| Function | Technical Indicator                    |           Developed by            | Year  |
| :------- | :------------------------------------- | :-------------------------------: | :---: |
| adl      | Accumulation / Distribution line       |           Marc Chaikin            | 1970s |
| atr      | Average True Range                     |           Welles Wilder           | 1978  |
| adx      | Average Directional Index              |           Welles Wilder           | 1978  |
| bbp      | Bollinger Bands Percent Bandwidth %B   |                                   |       |
| cci      | Commodity Channel Index                |          Donald Lambert           | 1980  |
| cho      | Chaikin Oscillator                     |           Marc Chaikin            |       |
| expdev   | Exponential Weighted Deviation         |                                   |       |
| fi       | Force Index                            |                                   |       |
| kst      | Know Sure Thing                        |                                   |       |
| macd     | Moving Average Convergence/Divergence  |           Gerald Appel            | 1979  |
| madev    | Mean Absolute Deviation                |                                   |       |
| mfi      | Money Flow Index (volume-weighted RSI) |   Gene Quong and Avrum Soudack    | 1989  |
| obv      | On Balance Volume                      |         Joseph Granville          | 1963  |
| roc      | Rate-of-Change                         |                                   |       |
| rsi      | Relative Strength Index                |           Welles Wilder           | 1978  |
| stdev    | Standard Deviation                     |                                   |       |
| stoch    | Stochastic Oscillator (Full)           |            George Lane            | 1950s |
| stochRsi | Combines Stochastics with the RSI      |           Welles Wilder           | 1994  |
| vi       | Vortex Indicator                       | Etienne Botes and Douglas Siepman | 2010  |
| williams | Williams %R                            |                                   |       |

#### Error methods

| Function | Error methods                     |
| :------- | :-------------------------------- |
| mae      | Mean Absolute Error               |
| mape     | Mean Absulute Percentage Error    |
| nrmse    | Normalized Root-Mean-Square Error |
| rmse     | Root-Mean-Square Error            |

#### Price transformations

| Function     | Price transformation |
| :----------- | :------------------- |
| trueRange    | True Range           |
| typicalPrice | Typical Price        |

#### Statistical methods

| Function | Statistical methods |
| :------- | :------------------ |
| cov      | Covariation         |
| cor      | Correlation         |
| mean     | Mean (Average)      |
| sd       | Standard deviation  |

#### Technical Analysis Usage

**NOTE** - The original library is initialized with an array of `[c,h,l,o,v]` where there is no initialization, these methods are all called without a class.

```typescript
import * as ta from 'alpaca-ts-sdk';
const ema = ta.ema([1, 2, 3, 4, 5], 10);
```
