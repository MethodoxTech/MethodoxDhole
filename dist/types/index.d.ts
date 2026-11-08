import "./kinds";
export { read, draw, check, toSvg, renderSvg, kindWords, DholeError, type DholeOptions, type DholeResult } from "./dhole";
export { render, renderAll, defineElement, fontsReady, problemsHtml, type RenderOptions } from "./element";
export { drawnKinds, Kinds, type KindInfo } from "./syntax/reader";
export { DholeProblem, English, Chinese, isChinese, type DholeSeverity, type ProblemCode } from "./syntax/problems";
export { Presets as themes, findTheme, withFont, Light, Dark, type Theme, type Colour } from "./plot/theme";
export { CanvasMeasurer, MetricsMeasurer, getDefaultMeasurer, setDefaultMeasurer, type TextMeasurer, type FontSpec } from "./plot/text";
export type { Figure, Chart } from "./plot/figure";
/** The version of the Dhole language this draws: the C# package's (Divooka.Visualization.Dhole). */
export declare const languageVersion = "0.2.0";
