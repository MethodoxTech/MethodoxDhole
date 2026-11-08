import type { LineStyle } from "../syntax/scan";
import { RectF, type Vec2, type VectorPath } from "./geometry";
import type { Tone } from "./tones";
import { FontWeights, type FontWeight, type ParagraphAlignment, type TextLayout, type TextMeasurer } from "../plot/text";
import type { Theme } from "../plot/theme";
import { DrawingLayer, type DrawingContext } from "../plot/figure";
/** A shape: filled, outlined, or both. */
export interface ShapeMark {
    readonly type: "shape";
    /** Its outline, in the diagram's pixels. */
    readonly path: VectorPath;
    /** What it is filled with, or null. */
    readonly fill: Tone | null;
    /** What it is outlined with, or null. */
    readonly stroke: Tone | null;
    /** The outline's width. */
    readonly width: number;
    /** How the outline is drawn. */
    readonly line: LineStyle;
}
/** A block of text, already broken into lines at layout. */
export interface TextMark {
    readonly type: "text";
    readonly text: string;
    /** The block's left edge. */
    readonly x: number;
    /** The block's top edge. */
    readonly y: number;
    /** How wide the block was measured. */
    readonly width: number;
    /** How tall the block was measured. */
    readonly height: number;
    /** The width the lines are set in - the widest line, so each lines up within the block - or infinity for text on one line. */
    readonly measure: number;
    /** The font size, in pixels. */
    readonly size: number;
    readonly weight: FontWeight;
    readonly colour: Tone;
    readonly align: ParagraphAlignment;
    readonly italic: boolean;
    /** Degrees the block is turned through, clockwise about its centre: -90 reads up the page. */
    readonly rotation: number;
}
export type Mark = ShapeMark | TextMark;
/** A shape mark. */
export declare function shapeMark(path: VectorPath, fill: Tone | null, stroke: Tone | null, width?: number, line?: LineStyle): ShapeMark;
/** The rectangle a text block covers, as it was measured - turned with it when it is turned a quarter. */
export declare function textBounds(text: TextMark): RectF;
/** A laid-out diagram: its marks in the order they are drawn, its size, and the faces its text was measured in. */
export declare class Scene {
    /** The faces the text was measured in, and is drawn in whatever the figure's theme says, so it fits where it was laid out. */
    readonly fontFamilies: readonly string[];
    readonly marks: Mark[];
    width: number;
    height: number;
    constructor(fontFamilies: readonly string[]);
    add(mark: Mark): void;
    get texts(): TextMark[];
    get shapes(): ShapeMark[];
    /** Every mark moved by (dx, dy). */
    offset(dx: number, dy: number): void;
    /** The rectangle every mark lies in. */
    bounds(): RectF;
    /** Moves every mark so the scene starts at `margin` from its top left, and sizes it to end the same distance from its bottom right; how far everything moved, for a layout that keeps positions of its own beside the marks. */
    frame(margin: number): Vec2;
}
/** The width and height a block of text takes. */
export interface SizeF {
    readonly width: number;
    readonly height: number;
}
/**
 * Measures and lays out every word of a diagram in one set of faces, so what is measured at layout is exactly what is drawn.
 */
export declare class TextSetter {
    readonly families: readonly string[];
    readonly measurer: TextMeasurer;
    private readonly cache;
    constructor(families: readonly string[], measurer: TextMeasurer);
    /** The block laid out, its lines broken to fit `maxWidth`. */
    layout(text: string, size: number, weight: FontWeight, maxWidth?: number, italic?: boolean, align?: ParagraphAlignment): TextLayout;
    /** The width and height a block takes, its lines broken to fit `maxWidth`. */
    measure(text: string, size: number, weight: FontWeight, maxWidth?: number, italic?: boolean): SizeF;
    /** A text mark for `text`, its lines broken to fit `maxWidth` and aligned within the widest of them, with its top left at (x, y). */
    mark(text: string, x: number, y: number, size: number, weight: FontWeight, colour: Tone, maxWidth?: number, align?: ParagraphAlignment, italic?: boolean): TextMark;
    /** A text mark whose block is centred on (cx, cy). */
    centred(text: string, cx: number, cy: number, size: number, weight: FontWeight, colour: Tone, maxWidth?: number, italic?: boolean): TextMark;
}
/** A setter for a theme's faces, measuring with `measurer`. */
export declare function setterFor(theme: Theme, measurer: TextMeasurer): TextSetter;
export { FontWeights };
/** A laid-out diagram as a layer of the plotting framework: it reaches every output a chart reaches, and takes its colours from the figure's theme as it is drawn. */
export declare class DiagramLayer extends DrawingLayer {
    readonly scene: Scene;
    readonly kindName: string;
    private readonly measurer;
    constructor(scene: Scene, kindName: string, measurer: TextMeasurer);
    get width(): number;
    get height(): number;
    get kind(): string;
    protected draw(context: DrawingContext): void;
}
