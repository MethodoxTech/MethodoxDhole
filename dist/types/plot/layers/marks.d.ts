import { PathRecorder, type CurveFactory } from "../d3-shapes";
import type { Sink } from "../sink";
import type { Colour } from "../theme";
import { RectF, VectorPath, type Vec2 } from "../../rendering/geometry";
/** How a line passes through its points: straight segments; a smooth curve that never overshoots; steps changing level halfway between points, at each point (holding the new level after it), or holding each level up to its point; a natural cubic spline. */
export type LineShape = "straight" | "smooth" | "step" | "stepAfter" | "stepBefore" | "spline";
/** The shape of a point. */
export type PointShape = "circle" | "square" | "diamond" | "triangle" | "cross" | "star" | "wye" | "plus" | "times" | "ring";
/** How a line is dashed. */
export type LineDash = "solid" | "dashed" | "dotted" | "dashDot";
/** The D3 curve for a line shape. */
export declare function curveOf(shape: LineShape): CurveFactory;
/** The dash pattern for a dash style at a line width. */
export declare function dashOf(dash: LineDash, width: number): number[] | null;
/** The commands of a path through pixel points, broken at every point that is not a number. */
export declare function polylineCommands(points: readonly Vec2[], shape: LineShape): PathRecorder;
/** A path through pixel points, broken at every point that is not a number. */
export declare function polyline(points: readonly Vec2[], shape: LineShape): VectorPath;
/**
 * The points of a long series thinned to what a plotting area this wide can show: per column of pixels, the first, lowest, highest
 * and last point. Only for x increasing left to right, which is what a signal is; the shape a reader sees is unchanged, because every
 * extreme in every pixel column is kept. A series no denser than four points a pixel is returned whole.
 */
export declare function decimate(points: readonly Vec2[], plotWidth: number): readonly Vec2[];
/** Draws a point symbol of the given diameter, with a ring of the surface colour round a filled one. */
export declare function drawPoint(sink: Sink, x: number, y: number, shape: PointShape, diameter: number, colour: Colour, surface: Colour, ring: number): void;
/**
 * A bar from a baseline to a value end, the value end rounded and the baseline end square. `valueEnd` says which side of the
 * rectangle is the value end: 0 top, 1 right, 2 bottom, 3 left; `radius` is the rounding, reduced to fit a short or narrow bar.
 */
export declare function bar(rect: RectF, valueEnd: number, radius: number): VectorPath;
/** A rectangle from two corners in any order - in single precision, as Divooka's float rectangle holds it, so a bar thinner than a float can tell apart has no height and is not drawn, nor labelled. */
export declare function rectBetween(x0: number, y0: number, x1: number, y1: number): RectF;
