import { AlpacaOptions } from '../AlpacaOptions';
import { Ticker, Types, Split, Locale } from './Reference';
import { Exchanges, HistoricQuote, HistoricTrades } from './Stocks';
import { Symbol } from './Symbol';

export class MarketData {
  Symbol: Symbol;
  Ticker: Ticker;
  Types: Types;
  Splits: Split;
  Locales: Locale;
  Exchanges: Exchanges;
  HistoricQuotes: HistoricQuote;
  HistoricTrades: HistoricTrades;

  constructor(private options: AlpacaOptions) {
    this.Symbol = new Symbol(this.options);
    this.Ticker = new Ticker(this.options);
    this.Types = new Types(this.options);
    this.Splits = new Split(this.options);
    this.Locales = new Locale(this.options);
    this.Exchanges = new Exchanges(this.options);
    this.HistoricQuotes = new HistoricQuote(this.options);
    this.HistoricTrades = new HistoricTrades(this.options);
  }
}
