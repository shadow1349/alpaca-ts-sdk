import { AlpacaOptions, Account, Asset, Calendar, Clock, Order, Position, Symbol } from './classes';

export class Alpaca {
  private options: AlpacaOptions;

  // Instantiate Classes
  Account: Account;
  Asset: Asset;
  Calendar: Calendar;
  Clock: Clock;
  Order: Order;
  Position: Position;

  // Market Data Classes
  Symbol: Symbol;

  constructor(options: AlpacaOptions) {
    this.options = options;
    const endpoint = options.paper
      ? 'https://paper-api.alpaca.markets'
      : 'https://api.alpaca.markets';

    // Initialize Classes
    this.Account = new Account(this.options, endpoint);
    this.Asset = new Asset(this.options, endpoint);
    this.Calendar = new Calendar(this.options, endpoint);
    this.Clock = new Clock(this.options, endpoint);
    this.Order = new Order(this.options, endpoint);
    this.Position = new Position(this.options, endpoint);

    // Market Data Classes
    this.Symbol = new Symbol(this.options);
  }
}
