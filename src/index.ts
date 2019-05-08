// export * from './classes';
// export * from './sdk';

import { Alpaca } from './sdk';

const publicKey = 'PKQFIR8DITLM4BAQ1I81';
const secretKey = '8mNzK2Y3UKRl7yvEc67EPRaxFHwn80DFrGlQZENx';

const api = new Alpaca({ publicKey: publicKey, secretKey: secretKey, paper: true });

(async () => {
  const test = await api.MarketData.Stocks.getAggregates({
    ticker: 'AAPL',
    from: new Date('2018-1-1'),
    to: new Date()
  });

  console.log(test);
})();
