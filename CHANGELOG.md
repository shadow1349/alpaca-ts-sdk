# Alpaca TypeScript SDK Changelog

## 1.0.8-beta.1

Addition of technical indicators

### Technical Overlays

| Function | Technical Overlay                 |    Developed by    |      Year      |
| :------- | :-------------------------------- | :----------------: | :------------: |
| bb       | Bollinger Band                    |   John Bollinger   |     1980s      |
| dema     | Double Exponential Moving Average |       ️ ✔️️        | Patrick Mulloy | 1994 |
| ema      | Exponential Moving Average        |                    |                |
| ebb      | Exponential Bollinger Band        | Based on Welford's |                |
| keltner  | Keltner Channels                  |  Chester Keltner   |      1960      |
| psar     | Parabolic SAR                     |     :suspect:      | Welles Wilder  | 1978 |
| sma      | Simple Moving Average             |                    |                |
| tema     | Triple Exponential Moving Average |       ️ ✔️️        | Patrick Mulloy | 1994 |
| vbp      | Volume by Price                   |                    |                |
| vwap     | Volume Weighted Average Price     |    James Elkins    |      1984      |
| zigzag   | ZigZag Indicator                  |   Arthur Merrill   |      1977      |

### Technical Indicators

| Function | Technical Indicator                    |           Developed by            | Year  |
| :------- | :------------------------------------- | :-------------------------------: | :---: |
| adl      | Accumulation / Distribution line       |           Marc Chaikin            | 1970s |
| atr      | Average True Range                     |           Welles Wilder           | 1978  |
| adx      | Average Directional Index              |           Welles Wilder           | 1978  |
| bbp      | Bollinger Bands Percent Bandwidth %B   |                                   |       |
| cci      | Commodity Channel Index                |          Donald Lambert           | 1980  |
| cho      | Chaikin Oscillator                     |           Marc Chaikin            |       |
| expdev   | Exponential Weighted Deviation         |                                   |       |
| fi       | Force Index                            |                                   |       |
| kst      | Know Sure Thing                        |                                   |       |
| macd     | Moving Average Convergence/Divergence  |           Gerald Appel            | 1979  |
| madev    | Mean Absolute Deviation                |                                   |       |
| mfi      | Money Flow Index (volume-weighted RSI) |   Gene Quong and Avrum Soudack    | 1989  |
| obv      | On Balance Volume                      |         Joseph Granville          | 1963  |
| roc      | Rate-of-Change                         |                                   |       |
| rsi      | Relative Strength Index                |           Welles Wilder           | 1978  |
| stdev    | Standard Deviation                     |                                   |       |
| stoch    | Stochastic Oscillator (Full)           |            George Lane            | 1950s |
| stochRsi | Combines Stochastics with the RSI      |           Welles Wilder           | 1994  |
| vi       | Vortex Indicator                       | Etienne Botes and Douglas Siepman | 2010  |
| williams | Williams %R                            |                                   |       |

### Error methods

| Function | Error methods                     |
| :------- | :-------------------------------- |
| mae      | Mean Absolute Error               |
| mape     | Mean Absulute Percentage Error    |
| nrmse    | Normalized Root-Mean-Square Error |
| rmse     | Root-Mean-Square Error            |

### Price transformations

| Function     | Price transformation |
| :----------- | :------------------- |
| trueRange    | True Range           |
| typicalPrice | Typical Price        |

### Statistical methods

| Function | Statistical methods |
| :------- | :------------------ |
| cov      | Covariation         |
| cor      | Correlation         |
| mean     | Mean (Average)      |
| sd       | Standard deviation  |

## 1.0.7-beta.9

Bugfixes

## 1.0.7-beta.7

Finished stocks Polygon intragration

## 1.0.7-beta.6

Added Polygon to it's own Market Data class

## 1.0.7-beta.1 - 1.0.7.beta.5

Beginning integration with Polygon for market data

## 1.0.0 - 1.0.7

Started the inital project and ironing out some bugs
