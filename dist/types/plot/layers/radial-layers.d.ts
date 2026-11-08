import { ChartLayerPlan, type ChartTraining, type LegendCollector, type PolarLayer, type PolarTraining } from "../contracts";
import { Layer, type DrawContext, type FrameKind, type PlanContext } from "../figure";
import { Series } from "../series";
import type { Colour } from "../theme";
/** What a pie's slices say: each slice's share of the whole, its value, its name, its name and share, or nothing (the legend names the slices). */
export type SliceLabel = "percent" | "value" | "name" | "nameAndPercent" | "none";
/**
 * A pie or, with a hole, a donut: parts of a whole as slices, largest first from twelve o'clock. Each slice is a category in the
 * palette's colours, taken in the order the slices go round, and the legend lists them in that order too; its share is written on it
 * when it fits, or beside it with a leader line when it does not. A pie reads well for a few parts of one whole and badly for close
 * values: past six slices, bars say it better.
 */
export declare class Pie extends Layer {
    /** Each slice's name; a value with no name is left out, since the legend could not say what its slice is. */
    readonly categories: Series;
    /** Each slice's size; zero and negative sizes are left out. */
    readonly values: Series;
    /** The hole's radius as a share of the pie's: 0 for a pie, about 0.6 for a donut. */
    hole: number;
    /** Whether slices keep the order given instead of largest first. */
    keepOrder: boolean;
    /** What each slice says. */
    sliceLabels: SliceLabel;
    /** A line of text in the hole of a donut: a total, a title. */
    centerText: string | null;
    constructor(categories: readonly string[], values: readonly number[]);
    plan(_context: PlanContext): PiePlan;
}
declare class PiePlan extends ChartLayerPlan {
    private readonly pie;
    private readonly slices;
    private arcsCache;
    constructor(pie: Pie);
    get frame(): FrameKind;
    /** The slices' angles, which depend on their sizes alone: largest first from twelve o'clock, or in the order given. */
    private arcs;
    /** The slices' names in the order they go round. The colours are dealt and the legend is written in this order, so the legend reads down the way the pie reads round - in the data's order it listed the smallest region of Sales first, beside the largest slice. */
    private roundThePie;
    train(training: ChartTraining): void;
    draw(context: DrawContext): void;
    addLegend(legend: LegendCollector): void;
}
/** A radar (spider) chart: one value per spoke, joined into a shape; several layers compare several subjects across the same spokes. */
export declare class Radar extends Layer {
    /** Each value's spoke, in order round the circle from twelve o'clock. */
    readonly spokes: Series;
    /** The values, measured out from the centre. */
    readonly values: Series;
    /** Whether the shape is washed with its colour. */
    fill: boolean;
    /** Whether each value is marked with a point. */
    markers: boolean;
    constructor(spokes: readonly string[], values: readonly number[]);
    plan(context: PlanContext): RadarPlan;
}
declare class RadarPlan extends ChartLayerPlan implements PolarLayer {
    private readonly radar;
    private readonly color;
    constructor(radar: Radar, color: Colour);
    get frame(): FrameKind;
    get clipToPlot(): boolean;
    trainPolar(training: PolarTraining): void;
    draw(context: DrawContext): void;
    addLegend(legend: LegendCollector): void;
}
export {};
