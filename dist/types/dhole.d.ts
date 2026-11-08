import type { DholeProblem } from "./syntax/problems";
import { type Figure } from "./plot/figure";
import { type TextMeasurer } from "./plot/text";
import type { Theme } from "./plot/theme";
/** How a text is read and drawn. */
export interface DholeOptions {
    /** What text is measured with; a canvas on a page, Open Sans's metrics elsewhere. */
    readonly measurer?: TextMeasurer;
    /** The theme a diagram has when its text names none; Light, as in Divooka, when not given. */
    readonly defaultTheme?: Theme;
    /** Every diagram's theme changed before it is laid out - how a page sets every word in its own font, or a test in one face. */
    readonly adjustTheme?: (theme: Theme) => Theme;
}
/** What reading Dhole text gave: the figure, what is wrong with the text, and what was drawn, in a sentence. */
export interface DholeResult {
    /** The figure, or null when nothing in the text could be drawn. */
    readonly figure: Figure | null;
    /** Every problem in the text, in the order of its lines. */
    readonly problems: readonly DholeProblem[];
    /** The kind of each diagram drawn - flowchart, pie - in order. */
    readonly kinds: readonly string[];
    /** What was drawn, in a sentence for each diagram: a picture's words for someone who cannot see it. */
    readonly summary: string;
    /** Whether any problem is an error rather than a warning. */
    readonly hasErrors: boolean;
    /** What the text was measured with, which drawing it must use too. */
    readonly measurer: TextMeasurer;
}
/** Thrown when Dhole text holds nothing that can be drawn; its message is the first problem, where it is and what to write instead. */
export declare class DholeError extends Error {
    readonly problems: readonly DholeProblem[];
    constructor(problems: readonly DholeProblem[]);
}
/** Reads Dhole text: the figure it describes, its problems, and what was drawn. */
export declare function read(text: string | null | undefined, options?: DholeOptions): DholeResult;
/** The figure Dhole text describes, drawn as far as the text can be read; throws a DholeError when nothing in it can be drawn. */
export declare function draw(text: string | null | undefined, options?: DholeOptions): Figure;
/** The problems in Dhole text, without drawing it. */
export declare function check(text: string | null | undefined): readonly DholeProblem[];
/** The words that start each kind of diagram, in the order the documentation lists them. */
export declare const kindWords: readonly string[];
/** A figure as an SVG document, its words kept as text in the faces they were measured in. */
export declare function toSvg(figure: Figure, options?: {
    measurer?: TextMeasurer;
    title?: string | null;
    description?: string | null;
    idPrefix?: string;
}): string;
/** Dhole text as an SVG document, with what was drawn as its description; null when nothing in it can be drawn. */
export declare function renderSvg(text: string | null | undefined, options?: DholeOptions): {
    svg: string | null;
    result: DholeResult;
};
