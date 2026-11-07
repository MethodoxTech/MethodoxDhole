import { type Axis, type ScaleType } from "./axis";
import { type Series, type SeriesKind } from "./series";
/** One tick of a drawn axis: the value it marks (a number, or a category's position in the order), what it says (empty for a minor tick), where it is in pixels along the axis, and whether it is labelled and gets a gridline. */
export interface AxisTick {
    readonly value: number;
    readonly label: string;
    readonly position: number;
    readonly isMajor: boolean;
}
/** The forward and backward transforms of a scale type. */
export declare function transforms(type: ScaleType, logBase: number): [(v: number) => number, (t: number) => number];
/**
 * A trained position scale: the mapping from values to pixels that one axis of one rendered chart used. On a categorical axis `map`
 * takes a category's position in `categories` and answers the middle of its band.
 */
export declare class PositionScale {
    private readonly forward;
    private readonly backward;
    private readonly t0;
    private readonly t1;
    /** The band arithmetic, signed: a vertical axis runs from the bottom up, so its steps are negative pixels. */
    private readonly bandOrigin;
    private readonly signedStep;
    private readonly signedBandwidth;
    /** How the axis maps values: never "auto" once trained. */
    readonly type: ScaleType;
    readonly min: number;
    readonly max: number;
    readonly categories: readonly string[];
    /** Whether each category is a band (bars) rather than a point (lines over categories). */
    readonly banded: boolean;
    readonly logBase: number;
    /** The pixel min maps to (the first category's side). */
    readonly rangeStart: number;
    /** The pixel max maps to (the last category's side). */
    readonly rangeEnd: number;
    /** The ticks drawn, with their pixel positions. */
    readonly ticks: readonly AxisTick[];
    constructor(domain: ScaleDomain, rangeStart: number, rangeEnd: number, ticksInValueSpace: readonly AxisTick[], bandPadding: number);
    /** A category band's width in pixels; 0 on a continuous axis or a point axis. */
    get bandwidth(): number;
    /** The distance in pixels from one category to the next; 0 on a continuous axis. */
    get step(): number;
    get isCategorical(): boolean;
    /** The pixel for a value, or for a category's position in the order (its band's middle). Not a number for a value the scale cannot place. */
    map(value: number): number;
    /** The value at a pixel: the inverse of map; on a categorical axis, the fractional position in the order. */
    invert(pixel: number): number;
    /** The lower pixel edge of category `index`'s band: its left on a horizontal axis, its top on a vertical one. */
    bandStart(index: number): number;
    /** The position of `category` in the order, or -1. */
    indexOf(category: string): number;
    /** The pixel for a category's middle; not a number when the axis has no such category. */
    mapCategory(category: string): number;
    toString(): string;
}
/** Everything a chart's layers said about one axis while it was being trained: the kinds of value bound to it, their extent, their categories, and whether something wants a zero or bands. */
export declare class AxisTraining {
    private readonly seen;
    readonly spec: Axis;
    readonly name: string;
    kind: SeriesKind | null;
    low: number;
    high: number;
    lowPositive: number;
    nonPositiveCount: number;
    readonly categories: string[];
    banded: boolean;
    wantsZero: boolean;
    used: boolean;
    /** Whether a vertical axis of categories should list them from the top down, as horizontal bars read. */
    topDown: boolean;
    /** A label format a layer would like when the axis states none: percentages for a percent-stacked bar. */
    preferredFormat: string | null;
    /** The share of each band left empty, when a layer needs other than the theme's. */
    bandPadding: number | null;
    /** Whether the fitted range should end exactly at the data, with no margin. */
    tight: boolean;
    constructor(spec: Axis, name: string);
    /** Bind a series to this axis. */
    add(series: Series): void;
    /** Bind one more value of the axis' own kind (a stacked total, a fitted line's end). */
    addValue(value: number): void;
    /** Bind a category, keeping the order of first appearance. */
    addCategory(category: string): void;
    /** Say what kind of value the axis carries, refusing a second kind. */
    claim(kind: SeriesKind, seriesName: string | null): void;
}
/**
 * An axis' resolved range, before it has a length in pixels: the scale type, the extent shown, and the categories. Separate from
 * PositionScale because the range is decided by the data and the axis' settings alone, and the layout needs to measure the tick
 * labels it implies before it knows how long the axis will be.
 */
export declare class ScaleDomain {
    type: ScaleType;
    min: number;
    max: number;
    categories: readonly string[];
    banded: boolean;
    logBase: number;
    spec: Axis;
    empty: boolean;
    /** Whether a layer grows from zero on this axis (bars, areas), so zero is its baseline. */
    wantsZero: boolean;
    /** The share of each category band left empty, when a layer said; otherwise the theme's. */
    bandPadding: number | null;
    private static make;
    /** Resolve an axis from what its layers said about it. */
    static resolve(training: AxisTraining, notes: string[]): ScaleDomain;
    /** A domain stated outright rather than trained: a polar radius. */
    static continuous(type: ScaleType, min: number, max: number, spec: Axis): ScaleDomain;
    /** The ticks for about `count` divisions, with labels, in value space (positions are filled in by the scale). */
    ticks(count: number): AxisTick[];
    /** How a stated tick value is labelled when no label is stated with it. */
    private labelFormatter;
}
