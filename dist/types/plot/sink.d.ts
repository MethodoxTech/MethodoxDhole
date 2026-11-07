import { type TextLayout } from "./text";
import { type Colour } from "./theme";
import { identity, multiply, rotationDegrees, type Matrix, RectF, VectorPath } from "../rendering/geometry";
/** How a shape is painted: filled, or stroked with a width, a dash, caps and joins. */
export interface Paint {
    readonly colour: Colour;
    readonly style: "fill" | "stroke";
    readonly strokeWidth?: number;
    readonly dash?: readonly number[];
    readonly cap?: "butt" | "round" | "square";
    readonly join?: "miter" | "round" | "bevel";
}
export declare const Paints: {
    fill(colour: Colour): Paint;
    stroke(colour: Colour, width: number, cap?: Paint["cap"], join?: Paint["join"], dash?: readonly number[]): Paint;
    hairline(colour: Colour, width?: number): Paint;
};
/** What a figure is drawn onto. */
export interface Sink {
    save(): number;
    restoreToCount(count: number): void;
    translate(dx: number, dy: number): void;
    scale(sx: number, sy: number): void;
    concat(matrix: Matrix): void;
    clipRect(rect: RectF): void;
    drawPath(path: VectorPath, paint: Paint): void;
    drawRect(rect: RectF, paint: Paint): void;
    drawLine(x1: number, y1: number, x2: number, y2: number, paint: Paint): void;
    /** Laid-out text with its block's top left at (x, y). */
    drawText(layout: TextLayout, x: number, y: number, colour: Colour): void;
}
/** A sink that writes SVG. Transforms and clips open groups, and restoring closes them, so the document nests as the drawing did. */
export declare class SvgSink implements Sink {
    private readonly body;
    private readonly defs;
    private readonly frames;
    private openGroups;
    private clips;
    private readonly idPrefix;
    constructor(idPrefix?: string);
    save(): number;
    restoreToCount(count: number): void;
    translate(dx: number, dy: number): void;
    scale(sx: number, sy: number): void;
    concat(matrix: Matrix): void;
    clipRect(rect: RectF): void;
    private paintAttributes;
    drawPath(path: VectorPath, paint: Paint): void;
    drawRect(rect: RectF, paint: Paint): void;
    drawLine(x1: number, y1: number, x2: number, y2: number, paint: Paint): void;
    drawText(layout: TextLayout, x: number, y: number, colour: Colour): void;
    /** The SVG document of everything drawn, `width` by `height` pixels, with a title for a reader who cannot see it. */
    toSvg(width: number, height: number, title?: string | null, description?: string | null): string;
}
/** A rotation about a point, as a sink's concat takes it. */
export { rotationDegrees, identity, multiply };
