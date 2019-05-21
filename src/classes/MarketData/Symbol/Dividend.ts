export interface Dividend {
  symbol: string;
  type: string;
  exDate: number;
  paymentDate: number;
  recordDate: number;
  declaredDate: number;
  amount: number;
  qualified: string;
  flag: string;
}
