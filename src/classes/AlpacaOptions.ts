export interface AlpacaOptions {
  /**
   * @param {string} publicKey Public key provided by Alpaca
   */
  publicKey: string;
  /**
   * @param {string} privateKey Private key provided by Alpaca
   */
  secretKey: string;
  /**
   * @param {boolean} paper Tell the library whether to use the paper account or live account
   */
  paper: boolean;
}
