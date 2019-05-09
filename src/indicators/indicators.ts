import { ema, sma, madev, pointwise, rolling, trueRange, typicalPrice, wilderSmooth } from './core';
import { bb } from './overlays';

/* indicators */

export function adl(high: number[], low: number[], close: number[], volume: number[]) {
  let adl = [(volume[0] * (2 * close[0] - low[0] - high[0])) / (high[0] - low[0])];
  for (let i = 1, len = high.length; i < len; i++) {
    adl[i] = adl[i - 1] + (volume[i] * (2 * close[i] - low[i] - high[i])) / (high[i] - low[i]);
  }
  return adl;
}

export function adx(high: number[], low: number[], close: number[], window: number) {
  let dmp = [0],
    dmm = [0];
  for (let i = 1, len = low.length; i < len; i++) {
    let hd = high[i] - high[i - 1];
    let ld = low[i - 1] - low[i];
    dmp.push(hd > ld ? Math.max(hd, 0) : 0);
    dmm.push(ld > hd ? Math.max(ld, 0) : 0);
  }
  let str = wilderSmooth(trueRange(high, low, close), window);
  dmp = wilderSmooth(dmp, window);
  dmm = wilderSmooth(dmm, window);
  let dip = pointwise((a, b) => (100 * a) / b, dmp, str);
  let dim = pointwise((a, b) => (100 * a) / b, dmm, str);
  let dx = pointwise((a, b) => (100 * Math.abs(a - b)) / (a + b), dip, dim);
  return {
    dip: dip,
    dim: dim,
    adx: new Array(14).fill(NaN).concat(ema(dx.slice(14), 2 * window - 1))
  };
}

export function bbp(close: number[], window: number, mult: number) {
  let band = bb(close, window, mult);
  return pointwise((p, u, l) => (p - l) / (u - l), close, band.upper, band.lower);
}

export function cci(high: number[], low: number[], close: number[], window: number, mult: number) {
  let tp = typicalPrice(high, low, close);
  let tpsma = sma(tp, window);
  let tpmad = madev(tp, window);
  tpmad[0] = Infinity;
  return pointwise((a, b, c) => (a - b) / (c * mult), tp, tpsma, tpmad);
}

export function cho(
  high: number[],
  low: number[],
  close: number[],
  volume: number[],
  winshort: number,
  winlong: number
) {
  let adli = adl(high, low, close, volume);
  return pointwise((s, l) => s - l, ema(adli, winshort), ema(adli, winlong));
}

export function fi(close: number[], volume: number[], window: number) {
  let delta = rolling((x: number[]) => x[x.length - 1] - x[0], 2, close);
  return ema(pointwise((a, b) => a * b, delta, volume), window);
}

export function kst(
  close: number[],
  w1: number,
  w2: number,
  w3: number,
  w4: number,
  s1: number,
  s2: number,
  s3: number,
  s4: number,
  sig: number
) {
  const rcma1 = sma(roc(close, w1), s1);
  const rcma2 = sma(roc(close, w2), s2);
  const rcma3 = sma(roc(close, w3), s3);
  const rcma4 = sma(roc(close, w4), s4);
  const line = pointwise((a, b, c, d) => a + b * 2 + c * 3 + d * 4, rcma1, rcma2, rcma3, rcma4);
  return { line: line, signal: sma(line, sig) };
}

export function macd(close: number[], winshort: number, winlong: number, winsig: number) {
  const line = pointwise((a, b) => a - b, ema(close, winshort), ema(close, winlong));
  const signal = ema(line, winsig);
  const hist = pointwise((a, b) => a - b, line, signal);
  return { line: line, signal: signal, hist: hist };
}

export function mfi(
  high: number[],
  low: number[],
  close: number[],
  volume: number[],
  window: number
) {
  let pmf = [0],
    nmf = [0];
  const tp = typicalPrice(high, low, close);
  for (let i = 1, len = close.length; i < len; i++) {
    let diff = tp[i] - tp[i - 1];
    pmf.push(diff >= 0 ? tp[i] * volume[i] : 0);
    nmf.push(diff < 0 ? tp[i] * volume[i] : 0);
  }
  pmf = rolling(
    (x: number[]) =>
      x.reduce((sum, _x) => {
        return sum + _x;
      }, 0),
    window,
    pmf
  );
  nmf = rolling(
    (x: number[]) =>
      x.reduce((sum, _x) => {
        return sum + _x;
      }, 0),
    window,
    nmf
  );
  return pointwise((a, b) => 100 - 100 / (1 + a / b), pmf, nmf);
}

export function obv(close: number[], volume: number[], signal: number) {
  const _obv = [0];
  for (let i = 1, len = close.length; i < len; i++) {
    _obv.push(_obv[i - 1] + Math.sign(close[i] - close[i - 1]) * volume[i]);
  }
  return { line: obv, signal: sma(_obv, signal) };
}

export function roc(close: number[], window: number) {
  const result = new Array(window).fill(NaN);
  for (let i = window, len = close.length; i < len; i++) {
    result.push((100 * (close[i] - close[i - window])) / close[i - window]);
  }
  return result;
}

export function rsi(close: number[], window: number) {
  const gains = [0],
    loss = [1e-14];
  for (let i = 1, len = close.length; i < len; i++) {
    const diff = close[i] - close[i - 1];
    gains.push(diff >= 0 ? diff : 0);
    loss.push(diff < 0 ? -diff : 0);
  }
  return pointwise(
    (a, b) => 100 - 100 / (1 + a / b),
    ema(gains, 2 * window - 1),
    ema(loss, 2 * window - 1)
  );
}

export function stoch(
  high: number[],
  low: number[],
  close: number[],
  window: number,
  signal: number,
  smooth: number
) {
  const lowest = rolling((x: number[]) => Math.min(...x), window, low);
  const highest = rolling((x: number[]) => Math.max(...x), window, high);
  let K = pointwise((h, l, c) => (100 * (c - l)) / (h - l), highest, lowest, close);
  if (smooth > 1) {
    K = sma(K, smooth);
  }
  return { line: K, signal: sma(K, signal) };
}

export function stochRsi(close: number[], window: number, signal: number, smooth: number) {
  const _rsi = rsi(close, window);
  const extreme = rolling(
    (x: number[]) => {
      return { low: Math.min(...x), high: Math.max(...x) };
    },
    window,
    _rsi
  );
  let K = pointwise((rsi, e) => (rsi - e.low) / (e.high - e.low), _rsi, extreme);
  K[0] = 0;
  if (smooth > 1) {
    K = sma(K, smooth);
  }
  return { line: K, signal: sma(K, signal) };
}

export function vi(high: number[], low: number[], close: number[], window: number) {
  const pv = [(high[0] - low[0]) / 2],
    nv = [pv[0]];
  for (let i = 1, len = high.length; i < len; i++) {
    pv.push(Math.abs(high[i] - low[i - 1]));
    nv.push(Math.abs(high[i - 1] - low[i]));
  }
  const apv = rolling(
    (x: number[]) =>
      x.reduce((sum, _x) => {
        return sum + _x;
      }, 0),
    window,
    pv
  );
  const anv = rolling(
    (x: number[]) =>
      x.reduce((sum, _x) => {
        return sum + _x;
      }, 0),
    window,
    nv
  );
  const atr = rolling(
    (x: number[]) =>
      x.reduce((sum, _x) => {
        return sum + _x;
      }, 0),
    window,
    trueRange(high, low, close)
  );
  return {
    plus: pointwise((a, b) => a / b, apv, atr),
    minus: pointwise((a, b) => a / b, anv, atr)
  };
}

export function williams(high: number[], low: number[], close: number[], window: number) {
  return pointwise(x => x - 100, stoch(high, low, close, window, 1, 1).line);
}
