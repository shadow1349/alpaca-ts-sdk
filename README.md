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
  created_at: Date;
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
  date: Date;
  open: AlpacaTime;
  close: AlpacaTime;
}
```

#### Methods

`get(start: Date, end: Date): Promise<CalendarEntity>`

### Clock

```typescript
interface ClockEntity {
  timestamp: Date;
  is_open: boolean;
  next_open: Date;
  next_close: Date;
}
```

#### Methods

`get(): Promise<ClockEntity>`

### Order

```typescript
interface OrderEntity {
  id: string;
  client_order_id: string;
  created_at: Date;
  updated_at?: Date;
  submitted_at?: Date;
  filled_at?: Date;
  expired_at?: Date;
  canceled_at?: Date;
  failed_at?: Date;
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
  after?: Date;
  until?: Date;
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
