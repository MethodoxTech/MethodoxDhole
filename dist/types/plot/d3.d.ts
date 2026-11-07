/** Approximately count nicely rounded values between start and stop (inclusive where the rounding lands inside). Each tick is a power of ten times 1, 2, or 5 — d3.ticks. */
export declare function ticks(start: number, stop: number, count: number): number[];
/** The tick increment `ticks` would use. Negative means an inverse increment: -100 stands for a step of 1/100 — d3.tickIncrement. */
export declare function tickIncrement(start: number, stop: number, count: number): number;
/** The positive step between adjacent tick values (sign follows direction) — d3.tickStep. */
export declare function tickStep(start: number, stop: number, count: number): number;
/** A linear scale's domain extended to nice round values — scale.nice: at most ten passes, and the domain left as it was when they do not settle. */
export declare function linearNice(domain: readonly number[], count?: number): number[];
/** d3-scale's tickFormat: a format whose precision suits the tick step. */
export declare function scaleTickFormat(start: number, stop: number, count: number, specifier: string | null | undefined): (value: number) => string;
/** A parsed d3-format specifier. */
export declare class FormatSpecifier {
    fill: string;
    align: string;
    sign: string;
    symbol: string;
    zero: boolean;
    width: number | null;
    comma: boolean;
    precision: number | null;
    trim: boolean;
    type: string;
    constructor(specifier?: string);
    copy(): FormatSpecifier;
    toString(): string;
}
/**
 * JavaScript's toFixed as Divooka's port computes it, with .NET's fixed-point formatting: correctly rounded like JavaScript's, except
 * at an exact decimal tie (…5 exactly at the cutoff), which JavaScript rounds up and .NET rounds to the even neighbour - so a slice of
 * 12.5% reads 12% in Divooka, and here.
 */
export declare function toFixed(x: number, p: number): string;
/** The en-US number formatter for a d3-format specifier - d3.format. */
export declare function format(specifier: string | FormatSpecifier): (value: number) => string;
/** A formatter for values near `value` with a fixed SI prefix - d3.formatPrefix. */
export declare function formatPrefix(specifier: string | FormatSpecifier, value: number): (value: number) => string;
export declare function precisionFixed(step: number): number;
export declare function precisionPrefix(step: number, value: number): number;
export declare function precisionRound(step: number, max: number): number;
