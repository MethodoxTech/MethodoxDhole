import type { Colour } from "./theme";
/** The colour a fraction `t` of the way from `a` to `b`, alpha included, rounded rather than truncated. */
export declare function lerp(a: Colour, b: Colour, t: number): Colour;
/** The colour with its alpha multiplied by `opacity`. */
export declare function withOpacity(colour: Colour, opacity: number): Colour;
/** WCAG relative luminance, 0 for black to 1 for white. */
export declare function luminance(colour: Colour): number;
/** The WCAG contrast ratio between two opaque colours. */
export declare function contrast(a: Colour, b: Colour): number;
/** A translucent colour as it looks over an opaque background. */
export declare function over(colour: Colour, background: Colour): Colour;
/** Whichever of `dark` and `light` reads better on `fill`: the text set inside a bar, a tile or a slice. */
export declare function inkOn(fill: Colour, dark: Colour, light: Colour): Colour;
