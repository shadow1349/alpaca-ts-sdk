export interface LocaleEntity {
  locale: string;
  name: string;
}

export interface LocaleResponse {
  status: string;
  results: LocaleEntity[];
}
