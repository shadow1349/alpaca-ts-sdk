import { AlpacaOptions } from '../AlpacaOptions';
import { Reference } from './Reference';
import { Stocks } from './Stocks';
import { Symbol } from './Symbol';

export class MarketData {
  Symbol: Symbol;
  Reference: Reference;
  Stocks: Stocks;

  constructor(private options: AlpacaOptions) {
    this.Reference = new Reference(this.options);
    this.Symbol = new Symbol(this.options);
    this.Stocks = new Stocks(this.options);
  }
}
