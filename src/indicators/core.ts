/* basic math */

export function mean(series: number[]) {
  let sum = 0;
  for (let i = 0; i < series.length; i++) {
    sum += series[i];
  }
  return sum / series.length;
}

export function sd(series: number[]) {
  const E = mean(series);
  const E2 = mean(pointwise((x: number) => x * x, series));
  return Math.sqrt(E2 - E * E);
}

export function cov(f: number[], g: number[]) {
  const Ef = mean(f),
    Eg = mean(g),
    Efg = mean(pointwise((a: number, b: number) => a * b, f, g));
  return Efg - Ef * Eg;
}

export function cor(f: number[], g: number[]) {
  const Ef = mean(f),
    Eg = mean(g),
    Ef2 = mean(pointwise((a: number) => a * a, f)),
    Eg2 = mean(pointwise((a: number) => a * a, g)),
    Efg = mean(pointwise((a: number, b: number) => a * b, f, g));
  return (Efg - Ef * Eg) / Math.sqrt((Ef2 - Ef * Ef) * (Eg2 - Eg * Eg));
}

export function mad(array: any[]) {
  return mae(array, new Array(array.length).fill(mean(array)));
}

//   /* functional programming */

export function pointwise(operation: (...args: any) => number, ...serieses: number[][]) {
  const result = [];
  for (let i = 0, len = serieses[0].length; i < len; i++) {
    const iseries = (_i: number) => serieses.map(x => x[_i]);
    result[i] = operation(...iseries(i));
  }
  return result;
}

export function rolling(operation: Function, window: any, series: number[]) {
  const result = [];
  for (let i = 0, len = series.length; i < len; i++) {
    const j = i + 1 - window;
    result.push(operation(series.slice(j > 0 ? j : 0, i + 1)));
  }
  return result;
}

//   /* scaled and percentage errors */

export function mae(f: any[], g: any[]) {
  const absDiff = pointwise((a: number, b: number) => Math.abs(a - b), f, g);
  return f.length !== g.length ? Infinity : mean(absDiff);
}

export function rmse(f: number[], g: number[]) {
  const sqrDiff = pointwise((a: number, b: number) => (a - b) * (a - b), f, g);
  return f.length !== g.length ? Infinity : Math.sqrt(mean(sqrDiff));
}

export function nrmse(f: number[], g: number[]) {
  return rmse(f, g) / (Math.max(...f) - Math.min(...f));
}

export function mape(f: number[], g: number[]) {
  const frac = pointwise((a: number, b: number) => Math.abs((a - b) / a), f, g);
  return f.length !== g.length ? Infinity : mean(frac) * 100;
}

//   /* core indicators & overlays */

export function sma(series: number[], window: number) {
  return rolling((x: number[]) => mean(x), window, series);
}

export function ema(series: number[], window: number, start?: number) {
  const weight = 2 / (window + 1); // window(weight) = (2 / weight) - 1;
  const _ema: number[] = [start ? start : mean(series.slice(0, window))];
  for (let i = 1, len = series.length; i < len; i++) {
    _ema.push(series[i] * weight + (1 - weight) * _ema[i - 1]);
  }
  return _ema;
}

export function stdev(series: number[], window: number) {
  return rolling((x: number[]) => sd(x), window, series);
}

export function madev(series: number[], window: number) {
  return rolling((x: number[]) => mad(x), window, series);
}

export function expdev(series: number[], window: number) {
  const sqrDiff = pointwise(
    (a: number, b: number) => (a - b) * (a - b),
    series,
    ema(series, window, undefined)
  );
  return pointwise((x: number) => Math.sqrt(x), ema(sqrDiff, window));
}

//   /* Wilder's functions */

export function atr(high: number[], low: number[], close: number[], window: number) {
  const tr = trueRange(high, low, close);
  return ema(tr, 2 * window - 1);
}

export function wilderSmooth(series: number[], window: number) {
  const result = new Array(window).fill(NaN);
  result.push(
    series.slice(1, window + 1).reduce((sum, item) => {
      return (sum += item);
    }, 0)
  );
  for (let i = window + 1; i < series.length; i++) {
    result.push((1 - 1 / window) * result[i - 1] + series[i]);
  }
  return result;
}

//   /* price transformations */

export function typicalPrice(high: number[], low: number[], close: number[]) {
  return pointwise((a, b, c) => (a + b + c) / 3, high, low, close);
}

export function trueRange(high: number[], low: number[], close: number[]) {
  let tr = [high[0] - low[0]];
  for (let i = 1, len = low.length; i < len; i++) {
    tr.push(
      Math.max(high[i] - low[i], Math.abs(high[i] - close[i - 1]), Math.abs(low[i] - close[i - 1]))
    );
  }
  return tr;
}
