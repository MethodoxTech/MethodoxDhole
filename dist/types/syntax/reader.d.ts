import { Block, SourceLine, type Span } from "./source";
import { ProblemList, Said } from "./problems";
import type { Direction } from "../layout/direction";
import { type Theme } from "../plot/theme";
import type { Chart } from "../plot/figure";
import type { TextMeasurer } from "../plot/text";
/** What a parser is given: where its problems go, which kind it reads, and the line that named it. */
export interface ReadContext {
    readonly problems: ProblemList;
    readonly kind: KindInfo;
    readonly kindLine: SourceLine;
    /** The text after the kind's word on its line, or null. */
    readonly title: string | null;
    /** The first word as written, as a key - "donut" for a pie written as a donut. */
    readonly kindWord: string;
}
/** One kind of diagram: its word, the other words it answers to, what it is called in a sentence. */
export interface KindInfo {
    readonly word: string;
    readonly name: Said;
    readonly aliases: readonly string[];
}
/** Every kind, in the order the language's documentation lists them. */
export declare const Kinds: readonly KindInfo[];
/** The kind a word names - its own word or one of its others - or null. */
export declare function findKind(word: string): KindInfo | null;
/** The small words a summary needs: "a" or "an", one or many. */
export declare const Grammar: {
    /** "a" or "an" before a word. */
    a(word: string): string;
    /** A count with its noun, the noun made plural by `plural` when the count is not one. */
    count(count: number, one: string, plural?: string): string;
};
/** What a diagram builds into: one chart of the figure, the size its content wants when it has one, and a sentence saying what it holds. */
export interface Built {
    readonly chart: Chart;
    readonly naturalWidth: number | null;
    readonly naturalHeight: number | null;
    readonly summary: string;
}
/** What building a diagram has to hand: what its text is measured with. */
export interface BuildContext {
    readonly measurer: TextMeasurer;
}
/** One diagram as read: its kind, its titles, its theme and size, and how it becomes a chart. */
export declare abstract class DiagramSpec {
    readonly kind: KindInfo;
    readonly kindLine: SourceLine;
    title: string | null;
    subtitle: string | null;
    caption: string | null;
    theme: Theme;
    width: number | null;
    height: number | null;
    constructor(kind: KindInfo, kindLine: SourceLine);
    /** The diagram as a chart. */
    abstract build(problems: ProblemList, context: BuildContext): Built;
    /** Whether the text gave the diagram nothing to draw - no slices, no steps - so the text draws nothing rather than an empty frame. */
    get isEmpty(): boolean;
}
/** A setting a kind takes: the words it answers to and what it does with its value. */
export interface Setting {
    readonly names: readonly string[];
    apply(value: Span): void;
}
export declare function setting(names: readonly string[], apply: (value: Span) => void): Setting;
/** What every kind's parser has: the settings every diagram takes, the readers for setting values, and the order lines are read in. */
export declare abstract class KindParser {
    private readonly set;
    protected readonly context: ReadContext;
    protected readonly problems: ProblemList;
    private font;
    constructor(context: ReadContext);
    abstract get spec(): DiagramSpec;
    /** The settings of this kind, besides the ones every kind takes. */
    protected get settings(): Setting[];
    /** Reads the lines after the kind's own line. */
    read(roots: Block[]): void;
    /** Called once the first line's title is known, for a kind that reads something else there. */
    protected titled(): void;
    /** Reads one line at the top - and the lines under it - that is not a setting. */
    protected abstract content(block: Block): void;
    /** Called once every line is read. */
    protected finish(): void;
    private get common();
    /** The words every setting of this kind answers to, for a hint. */
    protected get settingNames(): string[];
    /** Reads a line as a setting when its words before the colon name one; false when they do not. */
    protected trySetting(block: Block): boolean;
    protected text(value: Span): string;
    /** Whether a line of data is a setting with a slip in its name - "titel: Sales" - which it says, so the caller leaves the line out: its name is near a setting's, and its value has no digit for data to be read from. */
    protected settingSlip(head: Span, value: Span): boolean;
    /** Warns of an attribute no word answers to: with the word it was probably meant to be when one is near, or else with the words it can be. */
    protected unknownAttribute(attribute: Span, what: Said, choices: readonly string[], hint?: readonly string[]): void;
    /** Sets the font a font setting named on the diagram's theme, whichever line came first. */
    applyFont(): void;
    private readTheme;
    private readSize;
    /** A direction: down, right, up or left, in the words people use for them. */
    protected readDirection(value: Span): Direction | null;
    /** On or off. */
    protected readSwitch(value: Span): boolean | null;
    /** A number, or null when it is not one (said). */
    protected readNumber(value: Span, percentAsFraction?: boolean): number | null;
    /** A range: 0..100. */
    protected readRange(value: Span): {
        low: number;
        high: number;
    } | null;
    /** One of a setting's choices, by any of its words. */
    protected readChoice<T>(value: Span, settingName: string, ...choices: [readonly string[], T][]): T | null;
    /** Reads the lines under a line that holds nothing as if they were not indented, and says so once. */
    protected unindent(block: Block, read: (b: Block) => void): void;
}
type ParserFactory = (context: ReadContext) => KindParser;
/** Registers the parser of a kind, by its word: each kind's module does, so the reader knows only the kinds a page loaded. */
export declare function registerKind(word: string, create: ParserFactory): void;
/** The words of the kinds this page can draw. */
export declare function drawnKinds(): string[];
/** How a text is read. */
export interface ReadOptions {
    /** The theme a diagram has when its text names none - Light, as in Divooka, unless a page says otherwise. */
    readonly defaultTheme?: Theme;
}
/** Reads Dhole text: the diagrams it describes, and every problem in it. */
export declare function readDhole(text: string | null | undefined, options?: ReadOptions): {
    specs: DiagramSpec[];
    problems: ProblemList;
};
export {};
