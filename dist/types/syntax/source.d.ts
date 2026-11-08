/** Whether a character is white space, as .NET's char.IsWhiteSpace answers. */
export declare function isWhiteSpace(c: string): boolean;
/** One line of Dhole text: where it is, how far it is indented, and what it says once the indentation is gone. */
export declare class SourceLine {
    /** How many columns a tab indents by. */
    static readonly TabWidth = 4;
    /** The line's number, counted from 1. */
    readonly number: number;
    /** The line as written, without its line break. */
    readonly text: string;
    /** How many columns the line is indented by, a tab counting to the next multiple of four. */
    readonly indent: number;
    /** Whether the indentation has a tab in it. */
    readonly hasTab: boolean;
    /** Whether the indentation has a space in it. */
    readonly hasSpace: boolean;
    /** What the line says, without its indentation or trailing spaces. */
    readonly content: Span;
    constructor(number: number, text: string);
    /** Whether the line says nothing. */
    get isBlank(): boolean;
    /** Whether the line is a comment: its first character after the indentation is #. */
    get isComment(): boolean;
    /** Whether the line separates one diagram from the next: three or more dashes and nothing else. */
    get isSeparator(): boolean;
    toString(): string;
}
/** A stretch of one line: what it says, and the column it starts at, for a problem that points at it. */
export declare class Span {
    readonly line: SourceLine;
    readonly start: number;
    readonly length: number;
    constructor(line: SourceLine, start: number, length: number);
    /** The text of the stretch. */
    get text(): string;
    /** The column the stretch starts at, counted from 1. */
    get column(): number;
    /** The index just past the stretch. */
    get end(): number;
    /** Whether the stretch is empty. */
    get isEmpty(): boolean;
    /** The character at an offset into the stretch. */
    at(offset: number): string;
    /** The part of the stretch from `offset` on. */
    from(offset: number): Span;
    /** The part of the stretch of `length` characters from `offset`. */
    slice(offset: number, length: number): Span;
    /** The stretch without white space at either end. */
    trim(): Span;
    /** Whether the stretch starts with `prefix`, ignoring case. */
    startsWith(prefix: string): boolean;
    /** A stretch from the start of this one to the end of `other`. */
    to(other: Span): Span;
    toString(): string;
}
/** A line and the lines indented under it: the shape groups, composite states, members, branches and columns are written in. */
export declare class Block {
    readonly line: SourceLine;
    /** The lines indented under it, in order. */
    readonly children: Block[];
    /** The line it is indented under, or null at the top. */
    parent: Block | null;
    constructor(line: SourceLine);
    /** What the line says. */
    get content(): Span;
    /**
     * The lines of one diagram as a forest: each line's parent is the nearest line above it that is indented less.
     *
     * A line indented less than the line above but more than that line's parent is a sibling of the line above, not a child of the parent's sibling: indentation is read as nesting, not measured, which is what a person who indents by eye means.
     */
    static forest(lines: Iterable<SourceLine>): Block[];
    toString(): string;
}
