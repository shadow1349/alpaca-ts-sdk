import { sma, ema, stdev, expdev, pointwise, atr, typicalPrice } from './core';

// /* overlays */

export function bb(close: number[], window: number, mult: number) {
  const ma = sma(close, window);
  const dev = stdev(close, window);
  const upper = pointwise((a, b) => a + b * mult, ma, dev);
  const lower = pointwise((a, b) => a - b * mult, ma, dev);
  return { lower: lower, middle: ma, upper: upper };
}

export function dema(close: number[], window: number) {
  const ema1 = ema(close, window);
  return pointwise((a, b) => 2 * a - b, ema1, ema(ema1, window));
}

export function ebb(close: number[], window: number, mult: number) {
  const ma = ema(close, window);
  const dev = expdev(close, window);
  const upper = pointwise((a, b) => a + b * mult, ma, dev);
  const lower = pointwise((a, b) => a - b * mult, ma, dev);
  return { lower: lower, middle: ma, upper: upper };
}

export function keltner(
  high: number[],
  low: number[],
  close: number[],
  window: number,
  mult: number
) {
  const middle = ema(close, window);
  const upper = pointwise((a, b) => a + mult * b, middle, atr(high, low, close, window));
  const lower = pointwise((a, b) => a - mult * b, middle, atr(high, low, close, window));
  return { lower: lower, middle: middle, upper: upper };
}

export function psar(high: number[], low: number[], stepfactor: number, maxfactor: number) {
  let isUp = true;
  let factor = stepfactor;
  let extreme = Math.max(high[0], high[1]);
  const _psar = [low[0], Math.min(low[0], low[1])];
  let cursar = _psar[1];
  for (let i = 2, len = high.length; i < len; i++) {
    cursar = cursar + factor * (extreme - cursar);
    if ((isUp && high[i] > extreme) || (!isUp && low[i] < extreme)) {
      factor = factor <= maxfactor ? factor + stepfactor : maxfactor;
      extreme = isUp ? high[i] : low[i];
    }
    if ((isUp && low[i] < cursar) || (!isUp && cursar > high[i])) {
      isUp = !isUp;
      factor = stepfactor;
      cursar = isUp ? Math.min(...low.slice(i - 2, i + 1)) : Math.max(...high.slice(i - 2, i + 1));
    }
    //console.log(`isUp=${isUp}, c=${low[i]}, extreme=${extreme.toFixed(2)}, factor=${factor}, sar=${cursar.toFixed(2)}`);
    _psar.push(cursar);
  }
  return _psar;
}

export function tema(close: number[], window: number) {
  const ema1 = ema(close, window);
  const ema2 = ema(ema1, window);
  return pointwise((a, b, c) => 3 * a - 3 * b + c, ema1, ema2, ema(ema2, window));
}

export function vbp(close: number[], volume: number[], zones: number, left: number, right: number) {
  let total = 0;
  let bottom = Infinity;
  let top = -Infinity;
  const _vbp = new Array(zones).fill(0);
  right = !isNaN(right) ? right : close.length;
  for (let i = left; i < right; i++) {
    total += volume[i];
    top = top < close[i] ? close[i] : top;
    bottom = bottom > close[i] ? close[i] : bottom;
  }
  for (let i = left; i < right; i++) {
    _vbp[Math.floor(((close[i] - bottom) / (top - bottom)) * (zones - 1))] += volume[i];
  }
  return {
    bottom: bottom,
    top: top,
    volumes: _vbp.map(x => {
      return x / total;
    })
  };
}

export function vwap(high: number[], low: number[], close: number[], volume: number[]) {
  const tp = typicalPrice(high, low, close),
    cumulVTP = [volume[0] * tp[0]],
    cumulV = [volume[0]];
  for (let i = 1, len = close.length; i < len; i++) {
    cumulVTP[i] = cumulVTP[i - 1] + volume[i] * tp[i];
    cumulV[i] = cumulV[i - 1] + volume[i];
  }
  return pointwise((a, b) => a / b, cumulVTP, cumulV);
}

export function zigzag(time: number[], high: number[], low: number[], percent: number) {
  let lowest = low[0],
    thattime = time[0],
    isUp = false;
  let highest = high[0];
  const _time = [],
    _zigzag = [];
  for (let i = 1, len = time.length; i < len; i++) {
    if (isUp) {
      if (high[i] > highest) {
        thattime = time[i];
        highest = high[i];
      } else if (low[i] < lowest + ((highest - lowest) * (100 - percent)) / 100) {
        isUp = false;
        _time.push(thattime);
        _zigzag.push(highest);
        lowest = low[i];
      }
    } else {
      if (low[i] < lowest) {
        thattime = time[i];
        lowest = low[i];
      } else if (high[i] > lowest + ((highest - lowest) * percent) / 100) {
        isUp = true;
        _time.push(thattime);
        _zigzag.push(lowest);
        highest = high[i];
      }
    }
  }
  return { time: time, price: _zigzag };
}
