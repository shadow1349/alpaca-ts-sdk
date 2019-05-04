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
