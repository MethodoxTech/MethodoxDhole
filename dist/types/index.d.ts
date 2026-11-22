import "./kinds/index.js";
export { read, draw, check, toSvg, renderSvg, kindWords, DholeError, type DholeOptions, type DholeResult } from "./dhole.js";
export { render, renderAll, defineElement, fontsReady, problemsHtml, type RenderOptions } from "./element.js";
export { drawnKinds, Kinds, type KindInfo } from "./syntax/reader.js";
export { DholeProblem, English, Chinese, isChinese, type DholeSeverity, type ProblemCode } from "./syntax/problems.js";
export { Presets as themes, findTheme, withFont, Light, Dark, type Theme, type Colour } from "./plot/theme.js";
export { CanvasMeasurer, MetricsMeasurer, getDefaultMeasurer, setDefaultMeasurer, type TextMeasurer, type FontSpec } from "./plot/text.js";
export type { Figure, Chart } from "./plot/figure.js";
/** The version of the Dhole language this draws: the C# package's (Divooka.Visualization.Dhole). */
export declare const languageVersion = "0.2.0";
