/** A colour, each channel 0 to 255. */
export interface Colour {
    readonly r: number;
    readonly g: number;
    readonly b: number;
    readonly a: number;
}
/** A colour written as #rrggbb or #rrggbbaa. */
export declare function parseHex(hex: string): Colour;
/** A colour as SVG writes one: #rrggbb, with its opacity separately. */
export declare function hexOf(colour: Colour): string;
export declare function sameColour(a: Colour, b: Colour): boolean;
/** An ordered set of colours for telling series and categories apart; past the last colour the palette starts again from the first. */
export declare class Palette {
    readonly name: string;
    readonly colors: readonly Colour[];
    constructor(name: string, colors: readonly Colour[]);
    /** The colour for the series or category in position `index`, starting again from the first past the end. */
    at(index: number): Colour;
    static fromHex(name: string, ...hex: string[]): Palette;
    /** Divooka's own eight colours for a light background, in the order validated for colour-blind separation of neighbours. */
    static readonly Divooka: Palette;
    /** The same eight hues stepped for a dark background. */
    static readonly DivookaDark: Palette;
    /** D3's and Matplotlib's Category10. */
    static readonly Category10: Palette;
    /** Shades of grey from dark to light, for a figure that will be printed without colour. */
    static readonly Grays: Palette;
}
/** Everything about a figure's look that is not its data. A value: change it with a spread. */
export interface Theme {
    readonly name: string;
    readonly fontFamilies: readonly string[];
    /** Tick labels and legend entries. */
    readonly fontSize: number;
    readonly axisTitleSize: number;
    readonly titleSize: number;
    readonly figureTitleSize: number;
    readonly subtitleSize: number;
    readonly captionSize: number;
    /** Labels set on or beside the data: values on bars, names on slices, notes. */
    readonly dataLabelSize: number;
    readonly background: Colour;
    /** The plotting area's background, under the gridlines; transparent shows the figure's. */
    readonly plotBackground: Colour;
    /** Titles and labels on the data. */
    readonly ink: Colour;
    /** Axis titles, tick labels, legend entries and subtitles. */
    readonly secondaryInk: Colour;
    /** Captions and anything meant to recede. */
    readonly mutedInk: Colour;
    readonly grid: Colour;
    readonly axisLine: Colour;
    readonly palette: Palette;
    readonly rising: Colour;
    readonly falling: Colour;
    readonly lineWidth: number;
    readonly pointSize: number;
    readonly pointRing: number;
    readonly areaOpacity: number;
    readonly barRadius: number;
    readonly barPadding: number;
    readonly maxBarWidth: number;
    readonly barGap: number;
    readonly gridX: boolean;
    readonly gridY: boolean;
    readonly axisLines: boolean;
    readonly frame: boolean;
    readonly tickLength: number;
    readonly hairlineWidth: number;
    /** The empty margin round the whole figure. */
    readonly padding: number;
    /** The space between charts in a grid. */
    readonly chartGap: number;
    /** The space between a text block and what it labels. */
    readonly textGap: number;
}
/** Dark ink on white: the default. */
export declare const Light: Theme;
/** A copy with every text size multiplied by `factor`. */
export declare function withTextScale(theme: Theme, factor: number): Theme;
/** A copy that sets text in `family` first, keeping the others as fallbacks. */
export declare function withFont(theme: Theme, family: string): Theme;
/** Light ink on a near-black surface, with the palette stepped for it. */
export declare const Dark: Theme;
/** Larger text and heavier marks, for a slide seen from across a room. */
export declare const Presentation: Theme;
/** No gridlines and no axis lines: the data, its labels and nothing else. */
export declare const Minimal: Theme;
/** A framed plotting area with gridlines both ways and Category10 colours: the look of a classic scientific plot. */
export declare const Classic: Theme;
/** Black ink, grey marks and a framed plotting area, for a page printed without colour. */
export declare const Print: Theme;
/** The editor's Golden: dark bronze ink on a champagne ground, the deep gold of its lines first among the series' colours. */
export declare const Golden: Theme;
/** The editor's Quiet Gold: warm ink on a near-black ground, a muted gold first among the series' colours. */
export declare const QuietGold: Theme;
/** The editor's Silver-Gold theme file: cool silver ink on a graphite ground, a bright gold first among the series' colours. */
export declare const SilverGold: Theme;
/** The editor's Light High Contrast: near-black ink on white, every colour deep enough to read as a line on it. */
export declare const HighContrast: Theme;
/** Every preset, by name. */
export declare const Presets: readonly Theme[];
/** The preset called `name` (case, spaces and hyphens ignored), or null when there is none. */
export declare function findTheme(name: string | null | undefined): Theme | null;
