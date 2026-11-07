import { type Span } from "./source";
import type { ProblemList } from "./problems";
/** How a line between two things is drawn. */
export type LineStyle = "solid" | "dashed" | "thick";
/** What an end of a line carries: nothing, a filled arrowhead, a hollow triangle (inheritance), a filled diamond (composition) or a hollow one (aggregation). */
export type Head = "none" | "arrow" | "triangle" | "diamond" | "hollowDiamond";
/** One way of writing an arrow, and what it draws. `spaced`: the arrow is only an arrow with a space on each side - true for the arrows that could be part of a name, such as -- or o-. */
export interface ArrowForm {
    readonly token: string;
    readonly line: LineStyle;
    readonly tail: Head;
    readonly tip: Head;
    readonly spaced: boolean;
}
/** An arrow found in a line. */
export interface Arrow {
    readonly token: Span;
    readonly form: ArrowForm;
    readonly tailCard?: string | null;
    readonly tipCard?: string | null;
}
/** The arrows one kind of diagram has. */
export declare class ArrowSet {
    readonly forms: readonly ArrowForm[];
    /** Whether a line with a cardinality at each end - 1-* - is an arrow here. */
    readonly cardinalities: boolean;
    constructor(forms: Iterable<ArrowForm>, cardinalities?: boolean);
    /** The arrows, as a person would read them in a hint. */
    get names(): string[];
    /** The plain arrows every diagram of boxes and lines has. */
    static readonly plain: ArrowSet;
    /** A class diagram's: the plain arrows, UML's triangles and diamonds, and multiplicities. */
    static readonly classes: ArrowSet;
    /** An entity diagram's: a line with a cardinality at each end, and the plain ones. */
    static readonly entities: ArrowSet;
}
/** A thing named on a line, with the attributes in brackets after it. */
export interface Ref {
    /** Everything written for it. */
    readonly whole: Span;
    /** Where its name is. */
    readonly nameSpan: Span;
    /** The name, unquoted. */
    readonly name: string;
    /** Each word in its brackets. */
    readonly attributes: readonly Span[];
}
/** Where the first `c` outside quotation marks and brackets is, or -1. */
export declare function indexOf(s: Span, c: string, skipParentheses?: boolean): number;
/**
 * A line cut at its colon outside quotation marks and brackets: what comes before, and what comes after (null when there is no colon).
 *
 * The colon that cuts is the first one followed by a space or ending the line, so a time of day or an address keeps its own colons - `09:00: Gates open` is the time 09:00 - and only a line with no such colon is cut at its first colon of any kind.
 */
export declare function splitColon(s: Span, skipParentheses?: boolean): {
    head: Span;
    tail: Span | null;
};
/** A stretch cut at every `separator` outside quotation marks, brackets and parentheses. */
export declare function list(s: Span, separator?: string): Span[];
/** A name as written: unquoted when it is in quotation marks, with an unclosed quotation mark reported. */
export declare function name(span: Span, problems: ProblemList): string;
/** A thing named on a line: its name, and the attributes in brackets at its end. */
export declare function reference(span: Span, problems: ProblemList): Ref;
/** The attributes in brackets at the end of a stretch, and the stretch before them. */
export declare function trailingAttributes(s: Span, problems: ProblemList): {
    remainder: Span;
    attributes: Span[];
};
/** The head of a line cut at its arrows: the things between them, and the arrows themselves - one more thing than arrows when the line is well formed. */
export declare function arrows(head: Span, set: ArrowSet): {
    pieces: Span[];
    arrows: Arrow[];
};
/** The first word of a stretch written as a line with a count at each end that is not one of the four counts - 2-*, 1..5-1 - or null. */
export declare function badCardinality(s: Span): Span | null;
/**
 * The first word of a stretch that is drawn like an arrow but is none of `set`'s - -.->, --x, ~~~ - or null.
 *
 * A word of dashes, equals signs, dots and tildes, with at most an arrowhead, a bar, a star, an o or an x at either end, and two strokes of line, a head or a drawn end; a single dash between words - Step - one - is a dash, and anything with another letter in it is a name.
 */
export declare function unknownArrow(s: Span, set: ArrowSet): Span | null;
/** A label written between bars after an arrow, as Mermaid writes one - A -->|yes| B - where the piece after the arrow starts: the bars and what is between them, or null. */
export declare function labelBetweenBars(pieces: readonly Span[]): Span | null;
/** A word as settings and kinds are compared: lower case, letters and digits only. */
export declare function key(text: string): string;
/** Whether a character is a decimal digit, as .NET's char.IsDigit answers. */
export declare function isDigit(c: string): boolean;
/** Whether a character is a letter or a digit, as .NET's char.IsLetterOrDigit answers. */
export declare function isLetterOrDigit(c: string): boolean;
/** A number written in the invariant way - a dot for decimals - with an optional thousands separator of underscores, and a percent sign read as hundredths when `percentAsFraction`. NaN when it is not one. */
export declare function tryNumber(text: string, percentAsFraction?: boolean): number;
/** A date written as year-month-day, with an optional time, as milliseconds since 1970 in UTC; NaN when it is not one. */
export declare function tryDate(text: string): number;
/** One day in milliseconds. */
export declare const DayMs = 86400000;
/** A length of time as days, weeks, hours or minutes - 3d, 2w, 1d 4h - in milliseconds; NaN when it is not one. */
export declare function tryDuration(text: string): number;
/** On or off: on, yes, true or off, no, false; null for anything else. */
export declare function switchValue(text: string): boolean | null;
/** A range written as two numbers with two dots, a dash or "to" between them: 0..100; null when it is not one. */
export declare function tryRange(text: string): {
    low: number;
    high: number;
} | null;
/** A size in pixels: 800 x 600; null when it is not one, or is under 50 or over 20000 either way. */
export declare function trySize(text: string): {
    width: number;
    height: number;
} | null;
/** How many single-character changes turn one word into another, two letters swapped counting as one - "titel" is one slip from "title", as it is to the person who typed it. */
export declare function distance(a: string, b: string): number;
/** The choice nearest to `word`, when it is close enough to be a slip: within two changes, and fewer than a third of the word's letters. */
export declare function nearest(word: string, choices: Iterable<string>): string | null;
