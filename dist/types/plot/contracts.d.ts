import type { ColorScale, LegendItem, LegendSwatch } from "./axis";
import type { DrawContext, FrameKind, Layer, LayerPlan, TextPainter } from "./figure";
import type { Paint } from "./sink";
import type { Colour, Theme } from "./theme";
import { AxisTraining, type AxisTick, type PositionScale, type ScaleDomain } from "./scales";
import { type Series, type SeriesKind } from "./series";
/**
 * A layer made ready to draw: its derived data computed, and the things a chart asks of it - which frame it needs, what values it
 * binds to the axes and the colour scale, how it draws, what it adds to the legend, and how far its marks reach past the plotting
 * area.
 */
export declare abstract class ChartLayerPlan implements LayerPlan {
    readonly [extra: string]: unknown;
    readonly layer: Layer;
    constructor(layer: Layer);
    /** The frame the layer needs. */
    get frame(): FrameKind;
    /** Whether the marks are kept inside the plotting area. */
    get clipToPlot(): boolean;
    /** Tell the chart's axes and colour scale what values this layer binds to them. */
    train(_training: ChartTraining): void;
    /** Draw the marks. */
    abstract draw(context: DrawContext): void;
    /** Contribute legend entries. */
    addLegend(_legend: LegendCollector): void;
    /** The extra room in pixels the marks need beyond the plotting area's edges, such as a label above the tallest bar. */
    overhang(_text: TextPainter): number;
}
/** The axes and colour scale of one chart while its layers are trained. */
export declare class ChartTraining {
    readonly x: AxisTraining;
    readonly y: AxisTraining;
    readonly y2: AxisTraining;
    readonly color: ColorTraining;
    constructor(x: AxisTraining, y: AxisTraining, y2: AxisTraining, color: ColorTraining);
    /** The vertical axis a layer reads its values on. */
    yOf(layer: Layer): AxisTraining;
    /** The axis a layer places its values along, horizontal or vertical. */
    valueAxisOf(layer: Layer, horizontal: boolean): AxisTraining;
    /** The axis a layer places its categories along. */
    categoryAxisOf(layer: Layer, horizontal: boolean): AxisTraining;
}
/** What a chart's colour channel was given: categories or numbers. */
export declare class ColorTraining {
    private readonly seen;
    kind: SeriesKind | null;
    readonly categories: string[];
    low: number;
    high: number;
    title: string | null;
    add(series: Series): void;
    addCategory(category: string): void;
    addValue(value: number): void;
    private claim;
}
/** The trained colour scale of one chart: categories to palette colours. Colouring by numbers along a colour map is not ported - no Dhole chart does it. */
export declare class ColorAssignment {
    private readonly categorical;
    readonly spec: ColorScale;
    readonly categories: readonly string[];
    readonly title: string | null;
    readonly isContinuous: boolean;
    readonly hasCategories: boolean;
    readonly low: number;
    readonly high: number;
    constructor(training: ColorTraining, spec: ColorScale, theme: Theme);
    forCategory(category: string): Colour;
    forValue(_value: number): Colour;
}
/** The legend entries a chart's layers contribute, in order, without duplicates. */
export declare class LegendCollector {
    private readonly labels;
    readonly items: LegendItem[];
    colorBar: ColorAssignment | null;
    /** The chart's trained colours, for entries that stand for a category. */
    readonly colors: ColorAssignment;
    constructor(colors: ColorAssignment);
    add(label: string | null | undefined, color: Colour, swatch: LegendSwatch): void;
    /** An entry for every category of the chart's colour channel that `series` names. */
    addSeriesCategories(series: Series, swatch: LegendSwatch): void;
    /** An entry for each category given. */
    addCategories(categories: Iterable<string>, swatch: LegendSwatch): void;
}
/** The polar frame of a radar chart: where its centre is, how far its rings reach, and which way its spokes point. */
export declare class PolarFrame {
    readonly centerX: number;
    readonly centerY: number;
    readonly radius: number;
    readonly spokes: readonly string[];
    readonly radial: ScaleDomain;
    readonly rings: readonly AxisTick[];
    constructor(centerX: number, centerY: number, radius: number, spokes: readonly string[], radial: ScaleDomain, rings: readonly AxisTick[]);
    /** The angle of spoke `index`, in radians clockwise from straight up. */
    angle(index: number): number;
    /** The distance from the centre for a value. */
    radiusOf(value: number): number;
    /** The point at a spoke and a value. */
    point(index: number, value: number): {
        x: number;
        y: number;
    };
}
/** A layer drawn on spokes and rings. */
export interface PolarLayer {
    trainPolar(training: PolarTraining): void;
}
/** What a radial chart's layers named: their spokes, and the range of their values. */
export declare class PolarTraining {
    private readonly seen;
    readonly spokes: string[];
    low: number;
    high: number;
    addSpoke(spoke: string): void;
    addValue(value: number): void;
}
/** Everything a chart layer draws with: the figure's draw context, with the chart's colours and - in the frames that have them - its scales or its polar frame. */
export interface ChartDrawContext extends DrawContext {
    readonly colors: ColorAssignment;
    readonly x?: PositionScale | null;
    readonly y?: PositionScale | null;
    readonly y2?: PositionScale | null;
    readonly polar?: PolarFrame | null;
}
/** The chart parts of a draw context. */
export declare function chartContext(context: DrawContext): ChartDrawContext;
/** The vertical scale a layer reads its values on. */
export declare function yOf(context: DrawContext, layer: Layer): PositionScale;
/** The horizontal scale. */
export declare function xScale(context: DrawContext): PositionScale;
/** A coordinate moved to where a line of `width` pixels renders crisply: unmoved on a vector sink, which needs no snapping. */
export declare function snap(context: DrawContext, value: number, width?: number): number;
/** The paints a chart draws with. */
export declare const ChartPaints: {
    fill(colour: Colour): Paint;
    stroke(colour: Colour, width: number, dash?: readonly number[] | null, round?: boolean): Paint;
    /** A hairline: gridlines, axis lines, tick marks. */
    hairline(colour: Colour, width: number): Paint;
};
export { AxisTraining };
