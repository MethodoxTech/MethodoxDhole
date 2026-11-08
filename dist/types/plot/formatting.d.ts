/** A number as .NET's custom formats "0.###" (no grouping) or "#,##0.###" (grouped thousands) write it: up to `decimals` decimals, trailing zeros dropped, rounded half away from zero on the number's shortest digits. */
export declare function customDecimal(value: number, decimals: number, grouping: boolean): string;
/** A number as a label: grouped thousands and up to three decimals, or scientific notation when that is shorter. */
export declare function formatNumber(value: number): string;
/** A number through a D3 format specifier such as ",.2f" or ".0%". */
export declare function formatWith(value: number, specifier: string): string;
/** The compiled formatter for a D3 number specifier, cached. */
export declare function numberFormatter(specifier: string | null | undefined): (value: number) => string;
/** Whether a specifier is a time format (it has a % directive) rather than a number format: a time directive is a % followed by a letter (%Y, %b); in a number format a % is the percentage type and ends the specifier. */
export declare function isTimeSpecifier(specifier: string | null | undefined): boolean;
