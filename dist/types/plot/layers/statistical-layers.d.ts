import { ChartLayerPlan, type ChartTraining, type LegendCollector } from "../contracts";
import { Layer, type DrawContext, type PlanContext } from "../figure";
import { Series } from "../series";
import { type TrendFit, type TrendKind } from "../statistics";
import type { Colour } from "../theme";
export declare class TrendLine extends Layer {
    readonly x: Series;
    readonly y: Series;
    /** What kind of curve is fitted. */
    kind: TrendKind;
    /** A polynomial's degree. */
    degree: number;
    /** A smooth fit's span: the share of the points each local fit uses. */
    span: number;
    /** Whether the 95% confidence band of a formula fit is shaded. */
    confidenceBand: boolean;
    /** Whether the fitted equation and R² are written at the line's end. */
    showEquation: boolean;
    constructor(x: readonly number[], y: readonly number[]);
    /** The fit itself, for a caller that wants the numbers rather than the line. */
    fit(): TrendFit;
    plan(context: PlanContext): TrendPlan;
}
declare class TrendPlan extends ChartLayerPlan {
    private readonly trendLine;
    private readonly color;
    private readonly fit;
    constructor(trendLine: TrendLine, color: Colour, fit: TrendFit);
    train(training: ChartTraining): void;
    draw(context: DrawContext): void;
    addLegend(legend: LegendCollector): void;
}
export {};
