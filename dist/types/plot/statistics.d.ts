/** What kind of curve a trend line fits: a straight line by least squares, a polynomial of the stated degree, or a smooth local fit (LOESS) that follows the data's shape without a formula. */
export type TrendKind = "linear" | "polynomial" | "smooth";
/** A fitted trend: its curve, sampled, and for a formula fit its coefficients and how well it fits. */
export declare class TrendFit {
    readonly kind: TrendKind;
    /** Where the curve was sampled. */
    readonly x: readonly number[];
    /** The curve at each sample. */
    readonly y: readonly number[];
    /** The lower edge of the 95% confidence band at each sample, for a formula fit. */
    readonly lower: readonly number[] | null;
    /** The upper edge of the 95% confidence band at each sample, for a formula fit. */
    readonly upper: readonly number[] | null;
    /** The polynomial's coefficients from the constant term up, in the data's own units; empty for a smooth fit. */
    readonly coefficients: readonly number[];
    /** The share of the variance the fit explains, from 0 to 1; not a number for a smooth fit. */
    readonly rSquared: number;
    constructor(kind: TrendKind, 
    /** Where the curve was sampled. */
    x: readonly number[], 
    /** The curve at each sample. */
    y: readonly number[], 
    /** The lower edge of the 95% confidence band at each sample, for a formula fit. */
    lower: readonly number[] | null, 
    /** The upper edge of the 95% confidence band at each sample, for a formula fit. */
    upper: readonly number[] | null, 
    /** The polynomial's coefficients from the constant term up, in the data's own units; empty for a smooth fit. */
    coefficients: readonly number[], 
    /** The share of the variance the fit explains, from 0 to 1; not a number for a smooth fit. */
    rSquared: number);
    /** The formula as text: y = 2.31x + 0.40. */
    get equation(): string;
}
/** The 97.5th percentile of Student's t with `df` degrees of freedom: the multiplier of a two-sided 95% interval. */
export declare function studentT975(df: number): number;
/** Fits a trend to points: a straight line or a polynomial by least squares, with a 95% confidence band for the fitted mean, or a smooth local fit. */
export declare function trend(x: readonly number[], y: readonly number[], kind?: TrendKind, degree?: number, span?: number, samples?: number): TrendFit;
