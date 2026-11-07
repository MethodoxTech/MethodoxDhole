import type { Colour, Theme } from "../plot/theme";
/** The neutral colours of a theme a diagram draws with. */
export type Ink = "background" | "ink" | "secondary" | "muted" | "grid" | "axis";
/** A colour asked for by name, found in whatever palette the theme has: the palette colour nearest that hue. Accent is the palette's first colour - the theme's own. */
export type NamedHue = "accent" | "blue" | "orange" | "green" | "yellow" | "pink" | "purple" | "red" | "teal" | "grey";
/**
 * A colour as a diagram asks for it - a neutral ink, the palette's n-th colour, or a named hue - washed toward the background
 * and made translucent as it says.
 */
export declare class Tone {
    private readonly kind;
    private readonly inkValue;
    private readonly index;
    private readonly named;
    /** How much of the colour is used against the background: 1 the colour itself, 0 the background. */
    readonly strength: number;
    /** How opaque it is drawn. */
    readonly opacity: number;
    /** How much of the theme's ink is mixed in, so a pale hue still reads as text on a wash of itself. */
    readonly deepen: number;
    private constructor();
    static of(ink: Ink, opacity?: number): Tone;
    static palette(index: number, strength?: number, opacity?: number): Tone;
    static hue(hue: NamedHue, strength?: number, opacity?: number): Tone;
    /** The same colour washed to `strength`. */
    washed(strength: number): Tone;
    /** The same colour at `opacity`. */
    faded(opacity: number): Tone;
    /** The same colour with `amount` of the theme's ink in it. */
    deepened(amount: number): Tone;
    /** Whether this is a hue rather than a neutral ink. */
    get isHue(): boolean;
    /** Whether two tones ask for the same colour. */
    equals(other: Tone | null | undefined): boolean;
    /** The colour in a theme. */
    in(theme: Theme): Colour;
}
/** .NET's Math.Round: halves to the even neighbour. */
export declare function roundHalfEven(v: number): number;
/** Two colours mixed: 0 is the first, 1 the second. */
export declare function mix(from: Colour, to: Colour, amount: number): Colour;
/** Whether a colour is dark: what a theme's background says about which way to wash. */
export declare function isDark(colour: Colour): boolean;
/** The palette colour of a theme nearest a named hue; grey is the theme's muted ink. */
export declare function nearest(theme: Theme, hue: NamedHue): Colour;
