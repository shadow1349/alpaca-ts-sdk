export interface AlpacaOptions {
  /**
   * Public key provided by Alpaca
   */
  publicKey: string;
  /**
   * Private key provided by Alpaca
   */
  secretKey: string;
  /**
   * Tell the library whether to use the paper account or live account
   */
  paper: boolean;
}
