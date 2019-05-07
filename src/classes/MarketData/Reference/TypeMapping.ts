export interface TypesMap {
  CS: string;
  ADR: string;
  NVDR: string;
  GDR: string;
  SDR: string;
  CEF: string;
  ETP: string;
  REIT: string;
  MLP: string;
  WRT: string;
  PUB: string;
  NYRS: string;
  UNIT: string;
  RIGHT: string;
  TRAK: string;
  LTDP: string;
  RYLT: string;
  MF: string;
  PFD: string;
  FDR: string;
  OST: string;
  FUND: string;
  SP: string;
  SI: string;
}

export interface TypesIndex {
  INDEX: string;
  ETF: string;
  ETN: string;
  ETMF: string;
  SETTLEMENT: string;
  SPOT: string;
  SUBPROD: string;
  WC: string;
  ALPHAINDEX: string;
}

export interface TypesResult {
  types: TypesMap;
  indexTypes: TypesIndex;
}

export interface TypesResponse {
  status: string;
  results: TypesResult;
}
