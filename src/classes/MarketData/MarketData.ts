import { AlpacaOptions } from '../AlpacaOptions';
import { Reference } from './Reference';
import { Exchanges, HistoricQuote, HistoricTrades, DailyOpenClose, LastReference } from './Stocks';
import { Symbol } from './Symbol';

export class MarketData {
  Symbol: Symbol;
  Reference: Reference;
  Exchanges: Exchanges;
  HistoricQuotes: HistoricQuote;
  HistoricTrades: HistoricTrades;
  MarketOpenClose: DailyOpenClose;
  LastTradeQuote: LastReference;

  constructor(private options: AlpacaOptions) {
    this.Reference = new Reference(this.options);
    
    this.Symbol = new Symbol(this.options); 
    this.Exchanges = new Exchanges(this.options);
    this.HistoricQuotes = new HistoricQuote(this.options);
    this.HistoricTrades = new HistoricTrades(this.options);
    this.MarketOpenClose = new DailyOpenClose(this.options);
    this.LastTradeQuote = new LastReference(this.options);
  }
}
