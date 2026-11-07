import { ChartLayerPlan, type ChartTraining, type LegendCollector } from "../contracts";
import { Layer, type DrawContext, type PlanContext } from "../figure";
import type { PositionScale } from "../scales";
import { Series } from "../series";
import type { Colour } from "../theme";
import { type LineDash, type LineShape, type PointShape } from "./marks";
/** How bars or areas per category are combined: side by side (bars) or overlapping (areas), each from zero; piled up, each starting where the one before ended; or piled up and scaled so each pile reaches 100%. */
export type StackMode = "grouped" | "stacked" | "percent";
/**
 * A line through points in order: a series over time, a function, a trace. A not-a-number value breaks the line, so a gap in the data
 * is a gap on the chart rather than a straight segment across it. With `colorBy` one layer draws one line per category, each in its
 * category's colour.
 */
export declare class Line extends Layer {
    readonly x: Series;
    readonly y: Series;
    /** How the line passes through its points. */
    shape: LineShape;
    /** The line's width; unset, the theme's. */
    width: number | null;
    /** How the line is dashed. */
    dash: LineDash;
    /** Whether each point is marked. */
    markers: boolean;
    /** The marks' shape. */
    markerShape: PointShape;
    /** Draws one line per category of this series, each in its category's colour. */
    colorBy: Series | null;
    /** Whether the line's name is written at its last point, as well as in the legend. */
    endLabel: boolean;
    constructor(x: Series | readonly number[] | readonly string[], y: Series | readonly number[]);
    plan(context: PlanContext): LinePlan;
}
declare class LinePlan extends ChartLayerPlan {
    private readonly line;
    private readonly color;
    constructor(line: Line, color: Colour);
    train(training: ChartTraining): void;
    draw(context: DrawContext): void;
    private groups;
    addLegend(legend: LegendCollector): void;
}
/** Points placed by x and y: a scatter plot, a strip of observations. `colorBy` colours each point by a category. */
export declare class Points extends Layer {
    readonly x: Series;
    readonly y: Series;
    /** The points' shape. */
    shape: PointShape;
    /** The points' diameter in pixels; unset, the theme's. */
    size: number | null;
    /** Colours each point by a category, or along the chart's colour map by a number. */
    colorBy: Series | null;
    constructor(x: Series | readonly number[], y: Series | readonly number[]);
    plan(context: PlanContext): PointsPlan;
}
declare class PointsPlan extends ChartLayerPlan {
    private readonly points;
    private readonly color;
    constructor(points: Points, color: Colour);
    train(training: ChartTraining): void;
    draw(context: DrawContext): void;
    addLegend(legend: LegendCollector): void;
}
/**
 * A filled band between a line and a baseline: an area chart, a range between two series, a stacked area. The band runs from `y0`
 * (zero when unset) up to `y`. With `colorBy` one layer draws a band per category, and `stack` piles them up - each category's band
 * starting where the one below ended - on the x values they share. A single area is a wash of its colour under a full-strength line;
 * stacked areas are solid, separated by a hairline of the background.
 */
export declare class Area extends Layer {
    readonly x: Series;
    readonly y: Series;
    /** The bottom of the band; unset, zero. */
    y0: Series | null;
    /** How the edges pass through their points. */
    shape: LineShape;
    /** Draws a band per category of this series. */
    colorBy: Series | null;
    /** How bands per category are combined. */
    stack: StackMode;
    /** Whether the top edge is drawn as a line. */
    outline: boolean;
    /** How opaque the fill is; unset, a wash for one band and nearly solid for stacked ones. */
    fillOpacity: number | null;
    constructor(x: Series | readonly number[] | readonly string[], y: Series | readonly number[]);
    plan(context: PlanContext): AreaPlan;
}
declare class AreaPlan extends ChartLayerPlan {
    private readonly area;
    private readonly color;
    private readonly stacking;
    constructor(area: Area, color: Colour);
    train(training: ChartTraining): void;
    draw(context: DrawContext): void;
    private fillBand;
    addLegend(legend: LegendCollector): void;
}
/** Long data pivoted into a table of groups by keys, with the stacked span of every cell. */
export declare class Stacking {
    readonly keys: number[];
    readonly groups: string[];
    private readonly values;
    private readonly spans;
    private constructor();
    value(group: number, key: number): number;
    span(group: number, key: number): [number, number];
    extent(): Iterable<number>;
    /** Pivot long data: one row per x key (sorted), one column per group (in order of appearance), summing repeats and treating absences as zero. */
    static pivot(x: Series, y: Series, groupBy: Series, mode: StackMode): Stacking;
}
/** The pixel of value `i` of a series placed with a scale: a category's middle, or a number. */
export declare function project(scale: PositionScale, series: Series, i: number): number;
/** A series' indices grouped by category, in order of first appearance. */
export declare function groupBy(series: Series): {
    category: string;
    indices: number[];
}[];
/** The argument checks every layer makes. */
export declare const Check: {
    sameLength(a: Series, b: Series, nameA: string, nameB: string): void;
    numbers(series: Series, name: string): void;
};
export {};
