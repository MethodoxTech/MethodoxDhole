import { VectorPath } from "../rendering/geometry";
/** One command of a path as a d3 path context receives it. */
export type PathCommand = {
    readonly verb: "M";
    readonly x: number;
    readonly y: number;
} | {
    readonly verb: "L";
    readonly x: number;
    readonly y: number;
} | {
    readonly verb: "C";
    readonly x1: number;
    readonly y1: number;
    readonly x2: number;
    readonly y2: number;
    readonly x: number;
    readonly y: number;
} | {
    readonly verb: "Z";
};
/** A path context that records what a generator draws. */
export declare class PathRecorder {
    readonly commands: PathCommand[];
    moveTo(x: number, y: number): void;
    lineTo(x: number, y: number): void;
    bezierCurveTo(x1: number, y1: number, x2: number, y2: number, x: number, y: number): void;
    closePath(): void;
    /** The recorded commands as a vector path. */
    toPath(path?: VectorPath): VectorPath;
}
/** A d3 curve: told where each defined run of points starts and ends, and each point in between. */
export interface Curve {
    lineStart(): void;
    lineEnd(): void;
    point(x: number, y: number): void;
}
export type CurveFactory = (context: PathRecorder) => Curve;
/** Straight segments from point to point - d3.curveLinear. */
export declare const curveLinear: CurveFactory;
export declare const curveStep: CurveFactory;
export declare const curveStepAfter: CurveFactory;
export declare const curveStepBefore: CurveFactory;
/** A smooth curve that never overshoots, monotone in x: it rises where the data rises and falls where it falls - d3.curveMonotoneX (Steffen's method). */
export declare const curveMonotoneX: CurveFactory;
/** A line through points, broken where `defined` says a point is not drawn - d3.line. */
export declare function linePath<T>(points: readonly T[], x: (p: T) => number, y: (p: T) => number, defined: (p: T) => boolean, curve: CurveFactory, context: PathRecorder): void;
/** One slice of a pie: its datum, its place in the order the slices go round, and its angles from twelve o'clock, clockwise. */
export interface PieArc<T> {
    readonly data: T;
    readonly value: number;
    readonly index: number;
    readonly startAngle: number;
    readonly endAngle: number;
    readonly padAngle: number;
}
/** The angles of a pie's slices - d3.pie, from 0 to 2π with no padding, sorted by descending value unless `keepOrder`, which keeps the data's order. */
export declare function pie<T>(data: readonly T[], value: (d: T) => number, keepOrder: boolean): PieArc<T>[];
/** An annular sector - d3.arc with no corner rounding and no padding - centred on (cx, cy). */
export declare function arcPath(cx: number, cy: number, innerRadius: number, outerRadius: number, startAngle: number, endAngle: number): VectorPath;
