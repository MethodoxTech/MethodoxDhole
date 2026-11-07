/** How heavy a face is, as CSS numbers it: 400 normal, 600 semi-bold, 700 bold. */
export type FontWeight = number;
export declare const FontWeights: {
    readonly Normal: 400;
    readonly Medium: 500;
    readonly SemiBold: 600;
    readonly Bold: 700;
};
/** The face and size a piece of text is set in. */
export interface FontSpec {
    /** The font families to use, first available wins. */
    readonly families: readonly string[];
    /** The size, in pixels. */
    readonly size: number;
    readonly weight: FontWeight;
    readonly italic?: boolean;
}
/** How tall a face's lines are, in pixels at its size. */
export interface LineMetrics {
    /** From the top of a line to its baseline. */
    readonly ascent: number;
    /** From the baseline to the bottom of a line. */
    readonly descent: number;
}
/** What text is measured with: the width of a run of text on one line, and the height of a line. */
export interface TextMeasurer {
    width(text: string, font: FontSpec): number;
    metrics(font: FontSpec): LineMetrics;
}
/** A CSS font shorthand for a font spec. */
export declare function cssFont(font: FontSpec): string;
/** The family list as an SVG font-family attribute. */
export declare function cssFamilies(families: readonly string[]): string;
/**
 * Measures with a canvas, in whatever face the browser resolves the families to: the face the SVG's text will be drawn in.
 */
export declare class CanvasMeasurer implements TextMeasurer {
    private readonly context;
    private readonly widths;
    private readonly lineMetrics;
    constructor(context?: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D);
    /** Whether this page can measure with a canvas at all. */
    static get available(): boolean;
    width(text: string, font: FontSpec): number;
    metrics(font: FontSpec): LineMetrics;
}
/**
 * Measures by a table of Open Sans's advance widths, without a browser: for a page with no canvas, a Worker, and tests, which need
 * the same measurement on every machine. Characters outside the table are measured as their kind usually is - an ideograph a
 * whole em, anything else an average letter. Kerning is not applied, so a word measures a little wider than a browser sets it.
 */
export declare class MetricsMeasurer implements TextMeasurer {
    width(text: string, font: FontSpec): number;
    metrics(font: FontSpec): LineMetrics;
}
/** The measurer text is set with when none is given: a canvas where the page has one, the metrics table where it has not. */
export declare function getDefaultMeasurer(): TextMeasurer;
/** Sets the measurer text is set with when none is given. */
export declare function setDefaultMeasurer(measurer: TextMeasurer | null): void;
/** How lines line up in a block. */
export type ParagraphAlignment = "left" | "center" | "right";
/** One line of a laid-out block: its words, how wide they are, and where the line starts within the block. */
export interface TextLine {
    readonly text: string;
    readonly width: number;
    /** The line's left edge within the block, for its alignment. */
    readonly left: number;
    /** The line's top within the block. */
    readonly top: number;
    /** The line's baseline within the block. */
    readonly baseline: number;
}
/** A block of text laid out: its lines, its size, and the face it was set in. */
export interface TextLayout {
    readonly font: FontSpec;
    readonly lines: readonly TextLine[];
    /** The widest line. */
    readonly width: number;
    /** Every line's height together. */
    readonly height: number;
    readonly align: ParagraphAlignment;
}
/**
 * Lays text out: lines broken greedily to fit `maxWidth` (or only at line breaks when it is infinite), each aligned within the
 * widest, each as tall as the face's line.
 */
export declare function layoutText(measurer: TextMeasurer, text: string, font: FontSpec, maxWidth?: number, align?: ParagraphAlignment): TextLayout;
