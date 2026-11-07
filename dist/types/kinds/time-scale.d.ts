/** The UTC date of a year, a zero-based month and a day - with JavaScript's overflow, and years below 100 kept as written. */
export declare function utcDate(year: number, month0: number, day?: number, hour?: number, minute?: number, second?: number, millisecond?: number): number;
/** The day of the week, Sunday 0 - DateTime.DayOfWeek. */
export declare function dayOfWeek(ms: number): number;
/** The date at midnight - DateTime.Date. */
export declare function dateOf(ms: number): number;
/** The time since midnight - DateTime.TimeOfDay. */
export declare function timeOfDay(ms: number): number;
/**
 * A calendar-aware time interval with d3-time's algebra: floor, ceil, offset, range, count, every, and filter.
 *
 * C# adaptation of d3's local/UTC split: every interval here is the UTC one, since a date is UTC milliseconds; the local ones the C# keeps differ only in the kind they stamp on a DateTime.
 */
export declare class TimeInterval {
    private readonly floorOf;
    private readonly offsetOf;
    private readonly countOf;
    private readonly field;
    /** A replacement for every(), for the intervals d3 gives their own. */
    everyOverride: ((step: number) => TimeInterval | null) | null;
    constructor(floorOf: (date: number) => number, offsetOf: (date: number, step: number) => number, countOf?: ((start: number, end: number) => number) | null, field?: ((date: number) => number) | null);
    /** The latest interval boundary at or before the date. */
    floor(date: number): number;
    /** The earliest interval boundary at or after the date. */
    ceil(date: number): number;
    /** The date advanced by step intervals (which may be negative); no rounding. */
    offset(date: number, step?: number): number;
    /** Every boundary in [start, stop), stepping by the given whole number of intervals - interval.range. */
    range(start: number, stop: number, step?: number): number[];
    /** A new interval holding only boundaries that pass the test - interval.filter. */
    filter(test: (date: number) => boolean): TimeInterval;
    /** The number of boundaries after start and at or before end - interval.count. */
    count(start: number, end: number): number;
    /** A filtered interval keeping every step-th boundary, aligned on the interval's natural field (e.g. every 3 months lands on Jan/Apr/Jul/Oct) - interval.every. Null when step is not a positive finite number. */
    every(step: number): TimeInterval | null;
    /** Milliseconds - the atomic interval; floor is the identity. */
    static readonly millisecond: TimeInterval;
    /** Seconds (both local and UTC, like d3's shared second interval). */
    static readonly second: TimeInterval;
    /** UTC minutes. */
    static readonly utcMinute: TimeInterval;
    /** UTC hours. */
    static readonly utcHour: TimeInterval;
    /** UTC calendar days. */
    static readonly utcDay: TimeInterval;
    /** UTC days aligned to the Unix epoch (field is epoch day number) - d3's unixDay. */
    static readonly unixDay: TimeInterval;
    private static makeDay;
    private static weekday;
    static readonly utcSunday: TimeInterval;
    static readonly utcMonday: TimeInterval;
    static readonly utcThursday: TimeInterval;
    /** UTC calendar months. */
    static readonly utcMonth: TimeInterval;
    /** UTC calendar years. */
    static readonly utcYear: TimeInterval;
}
/** The positive step between adjacent tick values (sign follows direction) - d3.tickStep. */
export declare function tickStep(start: number, stop: number, count: number): number;
/** The UTC interval the ladder chooses for about count ticks - d3.utcTickInterval. */
export declare function utcTickInterval(start: number, stop: number, count: number): TimeInterval | null;
/** About count nicely placed UTC ticks in [start, stop] - d3.utcTicks. */
export declare function utcTicks(start: number, stop: number, count: number): number[];
/** A strftime-style UTC format of a date in d3's en-US locale - d3.utcFormat(specifier)(date). */
export declare function utcFormat(specifier: string, date: number): string;
/**
 * The multi-scale tick formatter over UTC intervals: milliseconds show ".%L", seconds ":%S", minutes "%I:%M", hours "%I %p", days "%a %d", weeks "%b %d", months "%B", years "%Y" - choosing the coarsest unit the tick is a boundary of.
 */
export declare function utcMultiScale(date: number): string;
/** A linear scale over UTC dates with calendar-aware ticks and the multi-scale tick format - d3.scaleUtc. */
export declare class TimeScale {
    private domain0;
    private domain1;
    private range0;
    private range1;
    domain(first: number, last: number): this;
    range(first: number, last: number): this;
    /** Map a date to the range: the bimap of d3-scale's continuous.js, with d3.interpolateNumber. */
    apply(date: number): number;
    /** Calendar-aware ticks: about count boundaries from the interval ladder. */
    ticks(count?: number): number[];
    /** The multi-scale tick format when no specifier is given, or a fixed strftime format. */
    tickFormat(specifier?: string | null): (date: number) => string;
}
/** d3.scaleUtc - UTC calendar time; machine independent. */
export declare function scaleUtc(): TimeScale;
