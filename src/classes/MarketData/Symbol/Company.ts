export interface Company {
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
  updated: number;
}
