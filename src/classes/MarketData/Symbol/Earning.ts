export interface Earning {
  symbol: string;
  EPSReportDate: number;
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
