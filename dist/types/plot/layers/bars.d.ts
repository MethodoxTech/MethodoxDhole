import { ChartLayerPlan, type ChartTraining, type LegendCollector } from "../contracts";
import { Layer, type DrawContext, type PlanContext, type TextPainter } from "../figure";
import { Series } from "../series";
import type { Colour } from "../theme";
import { type StackMode } from "./lines";
export declare class Bars extends Layer {
    /** The categories, one per bar (or per group of bars). */
    readonly categories: Series;
    /** The bars' lengths. */
    readonly values: Series;
    /** Splits each category into a bar per group, coloured by group. */
    colorBy: Series | null;
    /** How the groups of a category are combined. */
    mode: StackMode;
    /** Whether the bars run left to right, with the categories down the side. */
    horizontal: boolean;
    /** Whether each bar's value is written at its end. */
    valueLabels: boolean;
    /** How value labels are written: a D3 number format. */
    labelFormat: string | null;
    constructor(categories: Series | readonly string[], values: Series | readonly number[]);
    plan(context: PlanContext): BarsPlan;
}
declare class BarsPlan extends ChartLayerPlan {
    private readonly bars;
    private readonly color;
    private readonly categories;
    private readonly groups;
    private readonly values;
    private readonly spans;
    constructor(bars: Bars, color: Colour);
    private get stacked();
    train(training: ChartTraining): void;
    draw(context: DrawContext): void;
    private fill;
    private drawBar;
    get clipToPlot(): boolean;
    overhang(text: TextPainter): number;
    addLegend(legend: LegendCollector): void;
}
export {};
