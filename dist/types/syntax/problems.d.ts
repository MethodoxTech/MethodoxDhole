import type { Span } from "./source";
/** A word Dhole says in two languages, for a problem that names it: a kind of diagram, a setting. */
export declare class Said {
    readonly english: string;
    readonly chinese: string;
    constructor(english: string, chinese: string);
    in(language: string): string;
    toString(): string;
}
/** The language name for English. */
export declare const English = "English";
/** The language name for Chinese. */
export declare const Chinese = "Chinese";
/** Whether `language` names Chinese - "Chinese", a culture name such as zh-CN, or a code such as zh. */
export declare function isChinese(language: string | null | undefined): boolean;
/** How much a problem in Dhole text matters. */
export type DholeSeverity = "error" | "warning";
/** Every kind of problem Dhole reports; the words for each are in the table below. */
export declare const ProblemCodes: readonly ["Empty", "NoKind", "KindGuessed", "SettingRepeated", "SettingNeedsValue", "MixedIndentation", "BadTheme", "BadDirection", "BadSize", "BadSwitch", "BadNumber", "BadRange", "BadDate", "BadDuration", "BadChoice", "UnclosedQuote", "UnclosedBracket", "EmptyName", "UnknownAttribute", "AttributeGuessed", "SettingGuessed", "ArrowFromNothing", "ArrowToNothing", "UnknownArrow", "LabelBetweenBars", "MermaidShape", "IndentedUnderNothing", "EmptyGroup", "MemberOutsideClass", "AttributeOutsideEntity", "BadCardinality", "StartInsideNothing", "NoteNeedsTarget", "MessageNeedsArrow", "ElseWithoutIf", "AndWithoutPar", "UnknownBlock", "SeveralRoots", "EventWithoutTime", "UnknownTask", "NoStartDate", "StartsAfterItself", "EndsBeforeStart", "TaskRepeated", "NoData", "ValueCountMismatch", "SliceNotPositive", "PointNotPair", "OutsideRange", "MixedSeries", "FlowNeedsAmount", "FlowsInACircle", "RowLengthMismatch", "SeparatorWithoutDiagram", "CouldNotDraw", "NotDrawnHere"];
export type ProblemCode = (typeof ProblemCodes)[number];
/** What a problem's words are filled in with: a word, a number, a word in two languages, or a list of either. */
export type ProblemArgument = string | number | Said | readonly string[] | readonly Said[];
/** A number written as .NET writes "0.###": at most three decimals, none when it is whole. */
export declare function formatNumber(value: number): string;
/** A template with its arguments, a Said argument in the template's language. */
export declare function formatWords(template: string, args: readonly ProblemArgument[], language: string): string;
/**
 * One problem in Dhole text: where it is, what is wrong, and what to write instead.
 *
 * A problem never stops the rest of the text from being read: the line it is on is skipped or read as far as it makes sense, and every other line is drawn. Its words are English by default and Chinese on request.
 */
export declare class DholeProblem {
    /** Whether it is an error or a warning. */
    readonly severity: DholeSeverity;
    /** The line it is on, counted from 1. */
    readonly line: number;
    /** The column it starts at, counted from 1. */
    readonly column: number;
    /** How many characters it covers. */
    readonly length: number;
    /** Which problem it is. */
    readonly code: ProblemCode;
    private readonly args;
    constructor(severity: DholeSeverity, line: number, column: number, length: number, code: ProblemCode, args: readonly ProblemArgument[]);
    /** What is wrong, in a sentence. */
    get message(): string;
    /** What to write instead, in a sentence; empty when there is nothing more to say. */
    get hint(): string;
    /** What is wrong, in `language` - English or Chinese. */
    messageIn(language: string): string;
    /** What to write instead, in `language`. */
    hintIn(language: string): string;
    /** The problem as one line: where, what and what to do, in `language`. */
    describe(language?: string): string;
    /** The problem as one line in English: "Line 3, column 7: ..." followed by the hint. */
    toString(): string;
}
/** The problems found while reading one text, in the order of the lines they are on. */
export declare class ProblemList {
    private readonly problems;
    private readonly seen;
    /** Every problem, by line and then by column; problems on one spot keep the order they were found in. */
    get all(): DholeProblem[];
    get hasErrors(): boolean;
    get count(): number;
    error(where: Span, code: ProblemCode, ...args: ProblemArgument[]): void;
    warning(where: Span, code: ProblemCode, ...args: ProblemArgument[]): void;
    errorAt(line: number, column: number, length: number, code: ProblemCode, ...args: ProblemArgument[]): void;
    warningAt(line: number, column: number, length: number, code: ProblemCode, ...args: ProblemArgument[]): void;
    private add;
}
