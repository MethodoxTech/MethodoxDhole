/** What a series holds: numbers, text categories, or dates and times. */
export type SeriesKind = "number" | "text" | "time";
export declare class Series {
    readonly name: string;
    readonly kind: SeriesKind;
    private readonly numbers;
    private readonly texts;
    private constructor();
    /** A series of numbers. Not-a-number entries are gaps: a line breaks there and a point is not drawn. */
    static ofNumbers(values: Iterable<number>, name?: string | null): Series;
    /** A series of text categories, in the order given; a null entry is a gap. */
    static ofTexts(categories: Iterable<string | null>, name?: string | null): Series;
    /** The numbers 0, 1, 2 ... up to one less than `count`: the x positions of a series given without any. */
    static index(count: number, name?: string | null): Series;
    /** A series of numbers or of text, by what the array holds - C#'s implicit conversions from double[] and string[]. */
    static of(values: readonly number[] | readonly string[] | Series): Series;
    /** How many values the series holds. */
    get count(): number;
    /** The numbers of a number series. */
    get numbersOf(): readonly number[];
    /** The categories of a text series. */
    get textsOf(): readonly string[];
    /** The value at `index` as a number on a continuous axis; not a number for text, and for a gap. */
    position(index: number): number;
    /** The value at `index` as text, whatever the kind - what a label or a legend shows for it. */
    text(index: number): string;
    /** The distinct categories of a text series in the order they first appear. */
    distinctTexts(): string[];
    private wrongKind;
    toString(): string;
}
export declare function describeKind(kind: SeriesKind): string;
