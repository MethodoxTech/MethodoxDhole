import type { AxisSide } from "./axis";
import { TextPainter, type DrawContext } from "./figure";
import { PositionScale, type AxisTick, type ScaleDomain } from "./scales";
import type { Sink } from "./sink";
import type { Theme } from "./theme";
import type { RectF } from "../rendering/geometry";
export declare class AxisLayout {
    domain: ScaleDomain;
    horizontal: boolean;
    side: AxisSide;
    ticks: readonly AxisTick[];
    labelAngle: number;
    labelEvery: number;
    showLabels: boolean;
    showTitle: boolean;
    drawTickMarks: boolean;
    /** The room the axis takes beside the plotting area: tick marks, labels and title. */
    band: number;
    /** How far the first and last labels reach past the ends of the plotting area. */
    overhangStart: number;
    overhangEnd: number;
    tickLength: number;
    /** Whether this axis carries the chart's values (rather than its categories or the second dimension of a scatter), so it takes the theme's primary gridlines. */
    isValueAxis: boolean;
    /** The number of ticks to ask for along an axis this long. */
    static defaultCount(length: number, horizontal: boolean): number;
    /** Measure an axis for a plotting area `length` pixels long. */
    static measure(domain: ScaleDomain, horizontal: boolean, side: AxisSide, length: number, text: TextPainter, theme: Theme, showLabels: boolean, showTitle: boolean): AxisLayout;
    /** The trained scale for this axis over the given pixel range. */
    scaleOver(start: number, end: number, theme: Theme): PositionScale;
    /** Draws the axis' line, ticks, labels and title beside the plotting area. */
    draw(sink: Sink, context: DrawContext, scale: PositionScale, plot: RectF): void;
    /** Draws the gridlines across the plotting area at this axis' major ticks. */
    drawGrid(sink: Sink, context: DrawContext, scale: PositionScale, plot: RectF): void;
    /** Draws the zero line darker than the grid when zero falls inside a value axis, as the baseline bars grow from. */
    drawZero(sink: Sink, context: DrawContext, scale: PositionScale, plot: RectF): void;
}
