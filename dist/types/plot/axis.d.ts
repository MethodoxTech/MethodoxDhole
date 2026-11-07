import type { Colour, Palette } from "./theme";
/** How an axis maps values to positions. */
export type ScaleType = "auto" | "linear" | "log" | "symlog" | "sqrt" | "time" | "category";
/** Which side of the plotting area an axis is drawn on. */
export type AxisSide = "auto" | "bottom" | "top" | "left" | "right";
/** One axis of a chart. */
export interface Axis {
    /** The axis' title, written along it. */
    readonly title: string | null;
    /** How values become positions; "auto" lets the data decide. */
    readonly scale: ScaleType;
    /** The lowest value shown, instead of one fitted to the data. */
    readonly min: number | null;
    /** The highest value shown, instead of one fitted to the data. */
    readonly max: number | null;
    /** Whether the range must include zero; unset, bars and areas ask for it and other marks do not. */
    readonly includeZero: boolean | null;
    /** Whether the fitted range is widened to round numbers at both ends. */
    readonly nice: boolean;
    /** The share of the data's span added at each end of a fitted range, so marks at the extremes are not cut in half; unset, a small margin, and none on a side that starts at zero. */
    readonly margin: number | null;
    /** Whether the axis runs from high to low. */
    readonly reverse: boolean;
    /** The base of a logarithmic axis. */
    readonly logBase: number;
    /** About how many ticks to draw; unset, as many as fit comfortably. */
    readonly tickCount: number | null;
    /** The distance between ticks, instead of one chosen for the room available. */
    readonly tickStep: number | null;
    /** Exactly where the ticks go. */
    readonly tickValues: readonly number[] | null;
    /** The label for each of tickValues, in the same order. */
    readonly tickLabels: readonly string[] | null;
    /** How tick labels are written: a D3 number format such as ",.0f" or ".0%". */
    readonly format: string | null;
    /** How tick labels are written, from code; wins over format. */
    readonly formatter: ((value: number) => string) | null;
    /** The order categories are shown in, instead of their order of first appearance; categories in the data and not listed follow, in their own order. */
    readonly categories: readonly string[] | null;
    /** Whether gridlines run across the chart at this axis' ticks; unset, the theme decides. */
    readonly grid: boolean | null;
    /** Whether the axis is drawn at all. */
    readonly visible: boolean;
    /** Which side the axis is drawn on. */
    readonly side: AxisSide;
    /** The angle tick labels are turned through, in degrees; unset, they turn only when they would otherwise collide. */
    readonly labelAngle: number | null;
}
/** An axis with everything automatic. */
export declare const defaultAxis: Axis;
/** Where a legend sits. */
export type LegendPosition = "right" | "top" | "bottom" | "left" | "insideTopLeft" | "insideTopRight" | "insideBottomLeft" | "insideBottomRight";
/** The little picture beside a legend entry: a filled rounded square (bars, areas, slices), a short line (lines), a short line with a point on it (lines with markers), a point (scatter marks). */
export type LegendSwatch = "fill" | "line" | "lineAndPoint" | "point";
/** One entry of a legend. */
export interface LegendItem {
    readonly label: string;
    readonly color: Colour;
    readonly swatch: LegendSwatch;
}
/**
 * A chart's legend: whether it is shown, where, and what it lists. Unset, a legend appears when there is something to tell apart -
 * two or more named series, or a colour channel bound to categories - and not otherwise: a single series is named by the chart's
 * title, and a box with one swatch restates it.
 */
export interface Legend {
    /** Whether the legend is shown; unset, when there is more than one thing to tell apart. */
    readonly visible: boolean | null;
    readonly position: LegendPosition;
    /** A title above the entries. */
    readonly title: string | null;
    /** Entries to show instead of the ones collected from the layers. */
    readonly items: readonly LegendItem[] | null;
}
export declare const defaultLegend: Legend;
/** How a colour channel bound to data becomes colours. Colour maps for numbers are not ported: no Dhole chart colours by a number. */
export interface ColorScale {
    /** The colours for categories; unset, the theme's palette. */
    readonly palette: Palette | null;
    readonly min: number | null;
    readonly max: number | null;
    readonly middle: number | null;
    /** The colour bar's or legend's title. */
    readonly title: string | null;
    /** How the colour bar's labels are written: a D3 number format. */
    readonly format: string | null;
}
export declare const defaultColorScale: ColorScale;
