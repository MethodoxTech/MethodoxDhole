import { type FontWeight, type TextLayout, type TextMeasurer } from "./text";
import { type Colour, type Palette, type Theme } from "./theme";
import type { Sink } from "./sink";
import { RectF } from "../rendering/geometry";
import type { Axis, ColorScale, Legend } from "./axis";
import type { ChartTraining, LegendCollector } from "./contracts";
/** The jobs text does on a chart, each with its own size and weight from the theme. */
export type TextRole = "tick" | "axisTitle" | "chartTitle" | "figureTitle" | "subtitle" | "caption" | "legend" | "legendTitle" | "dataLabel";
/** Which point of a text block is placed at the coordinates given. */
export type TextAnchor = "topLeft" | "top" | "topRight" | "left" | "center" | "right" | "bottomLeft" | "bottom" | "bottomRight";
/** Measures and draws every word on a chart, so what is measured is exactly what is drawn. */
export declare class TextPainter {
    readonly theme: Theme;
    readonly measurer: TextMeasurer;
    private readonly layouts;
    constructor(theme: Theme, measurer: TextMeasurer);
    /** The font size a role is set in. */
    sizeOf(role: TextRole): number;
    static weightOf(role: TextRole): FontWeight;
    /** The laid-out block for a piece of text in a role, on one line. */
    layout(text: string, role: TextRole): TextLayout;
    /** The width and height a piece of text takes in a role. */
    measure(text: string, role: TextRole): {
        width: number;
        height: number;
    };
    /** The height of one line in a role, whatever its text. */
    lineHeight(role: TextRole): number;
    /** The size a block takes once turned through `degrees`. */
    static rotated(size: {
        width: number;
        height: number;
    }, degrees: number): {
        width: number;
        height: number;
    };
    /** Draws text with its `anchor` point at (x, y), turned through `degrees` about that point. */
    draw(sink: Sink, text: string, x: number, y: number, role: TextRole, colour: Colour, anchor: TextAnchor, degrees?: number): void;
    /** The rectangle a block drawn at an anchor would cover, unrotated. */
    bounds(text: string, x: number, y: number, role: TextRole, anchor: TextAnchor): RectF;
}
/** The kind of frame a chart's layers are drawn in: placed by x and y, with axes; placed by angle and radius, with spokes and rings; or laid out by the layer itself in the plotting area, with no axes. */
export type FrameKind = "cartesian" | "polar" | "free";
/** What a layer is told while it is being planned: the theme, the palette its chart deals colours from, and where notes go. */
export interface PlanContext {
    readonly theme: Theme;
    readonly palette: Palette;
    readonly notes: string[];
    readonly measurer: TextMeasurer;
    /** The colour each one-series layer was dealt, by the layer itself rather than by its value: two equal layers are two series with two colours. */
    readonly assigned: Map<Layer, Colour>;
    /** The colour of a layer that is one series: its own, or the palette's next. */
    seriesColor(layer: Layer): Colour;
}
/** What a layer is drawn with: the sink, the theme, the text painter, its plotting area, and - in a chart's frames - its colours and scales. */
export interface DrawContext {
    readonly sink: Sink;
    readonly theme: Theme;
    readonly text: TextPainter;
    readonly plot: RectF;
    readonly notes: string[];
    /** Device pixels per figure pixel on a raster sink; 0 on a vector one such as SVG, where nothing is snapped. */
    readonly deviceScale: number;
    /** The colour the chart is drawn on. */
    readonly surface: Colour;
    /** Whatever a frame adds - scales, colour assignments - for the layers drawn in it. */
    readonly [extra: string]: unknown;
}
/**
 * A layer made ready to draw: its frame, and how it draws. A chart's layers say more of themselves - what they bind to the axes and
 * the colour scale, what they add to the legend, how far their marks reach past the plotting area - through the optional members,
 * which a drawing (a diagram laid out by its own code) has none of.
 */
export interface LayerPlan {
    readonly layer: Layer;
    readonly frame: FrameKind;
    readonly clipToPlot: boolean;
    draw(context: DrawContext): void;
    /** Tell the chart's axes and colour scale what values this layer binds to them. */
    train?(training: ChartTraining): void;
    /** Contribute legend entries. */
    addLegend?(legend: LegendCollector): void;
    /** The extra room in pixels the marks need beyond the plotting area's edges. */
    overhang?(text: TextPainter): number;
    readonly [extra: string]: unknown;
}
/** One layer of a chart: one kind of mark bound to data. A layer without a colour takes the next colour of its chart's palette, in the order layers are added, so the first series is always the first colour. */
export declare abstract class Layer {
    /** The layer's name in the legend. */
    label: string | null;
    /** The layer's colour, instead of the palette's next. */
    color: Colour | null;
    /** How opaque the layer is, from 0 to 1. */
    opacity: number;
    /** Whether the layer's vertical values are read on the chart's second axis, on the right. */
    secondaryAxis: boolean;
    abstract plan(context: PlanContext): LayerPlan;
    /** What kind of layer this is, as the C# type is named. */
    get typeName(): string;
    /** A short description for a chart's text form. */
    describe(): string;
}
/** What a Drawing draws with: the sink, already moved and scaled to where the drawing goes, and the theme. */
export interface DrawingContext {
    readonly sink: Sink;
    readonly theme: Theme;
    /** Figure pixels per drawing pixel: 1, or less where the drawing was scaled down to fit. */
    readonly scale: number;
    readonly surface: Colour;
    note(sentence: string): void;
}
/**
 * A layer that is a picture laid out by the code that made it - a diagram, a board - drawn in its chart's plotting area at its own
 * size, or scaled down to fit a smaller area, and centred. A drawing is never enlarged: its words are set at the sizes it was laid
 * out with, and a figure larger than the drawing leaves room round it.
 */
export declare abstract class DrawingLayer extends Layer {
    /** The drawing's width at its own size, in figure pixels. */
    abstract get width(): number;
    /** The drawing's height at its own size, in figure pixels. */
    abstract get height(): number;
    /** Draws the drawing at its own size, with its top left corner at the origin of the context's sink. */
    protected abstract draw(context: DrawingContext): void;
    /** What the drawing is, in a word or two. */
    get kind(): string;
    describe(): string;
    /** The scale a drawing is drawn at in an area: 1, or less to fit a smaller area. */
    static scaleToFit(width: number, height: number, areaWidth: number, areaHeight: number): number;
    plan(): LayerPlan;
}
/**
 * One chart: layers of marks drawn over shared axes, with a legend and a title. A chart is a value: change it with a spread. Its
 * axes, colour scale and legend are settings of plot/axis, unset for a chart that has none (a diagram), which reads as their
 * defaults.
 */
export interface Chart {
    readonly layers: readonly Layer[];
    readonly title?: string | null;
    /** The horizontal axis. */
    readonly x?: Axis;
    /** The vertical axis. */
    readonly y?: Axis;
    /** The second vertical axis, on the right, used by layers placed on it. */
    readonly y2?: Axis;
    /** How a colour channel bound to data becomes colours. */
    readonly color?: ColorScale;
    /** The legend. */
    readonly legend?: Legend;
    /** The plotting area's background, instead of the theme's. */
    readonly plotBackground?: Colour | null;
    /** Whether one unit along x is as long on screen as one unit along y. */
    readonly equalAspect?: boolean;
    readonly [extra: string]: unknown;
}
export declare function chartOf(...layers: Layer[]): Chart;
/** A finished picture: one chart or a grid of them, with a title, a caption, a size and a theme. */
export interface Figure {
    /** The figure's width, in 96-dpi pixels. */
    readonly width: number;
    /** The figure's height, in 96-dpi pixels. */
    readonly height: number;
    /** The charts, filling the grid row by row. */
    readonly charts: readonly Chart[];
    /** How many charts sit side by side; 0 picks a near-square grid. */
    readonly columns: number;
    readonly title: string | null;
    /** A line under the title saying what the figure shows. */
    readonly subtitle: string | null;
    /** A note at the foot: the source, a definition, a caveat. */
    readonly caption: string | null;
    readonly theme: Theme;
}
export declare function figureOf(...charts: Chart[]): Figure;
/** This figure at another size, in 96-dpi pixels. */
export declare function withSize(figure: Figure, width: number, height: number): Figure;
/** The grid the charts are arranged in: columns and rows. */
export declare function gridOf(figure: Figure): {
    columns: number;
    rows: number;
};
/** A chart's legend as the renderer lays it out: whether there is anything in it, how big it is, and how it draws (a LegendPainter of plot/legend-painter). */
export interface PlanLegend {
    readonly isEmpty: boolean;
    measureColumn(maxHeight: number): {
        width: number;
        height: number;
    };
    measureRow(maxWidth: number): {
        width: number;
        height: number;
    };
    drawColumn(sink: Sink, box: RectF): void;
    drawRows(sink: Sink, box: RectF): void;
}
/** One chart's plan: its layers made ready, its frame - and, once a chart's machinery has trained it, its axes, colours and legend. */
export interface ChartPlan {
    readonly chart: Chart;
    readonly layers: LayerPlan[];
    readonly frame: FrameKind;
    /** The colour each one-series layer was dealt while it was planned. */
    readonly seriesColors: Map<Layer, Colour>;
    /** The legend, empty until a chart's machinery collects one. */
    legend: PlanLegend;
    /** Whatever the machinery adds to the context its layers are drawn with: the chart's colours. */
    drawExtras: Record<string, unknown>;
    [extra: string]: unknown;
}
/** What a render made: the figure's size, and anything it approximated or left out, in plain sentences. */
export interface FigureRendering {
    readonly width: number;
    readonly height: number;
    readonly notes: readonly string[];
}
/** The renderer's own state, for a frame drawing one chart in its cell. */
export interface FigureJob {
    readonly figure: Figure;
    readonly sink: Sink;
    readonly theme: Theme;
    readonly text: TextPainter;
    readonly notes: string[];
    readonly measurer: TextMeasurer;
    /** The draw context for a chart's plotting area, with the chart's colours and whatever the frame adds. */
    context(plan: ChartPlan, plot: RectF, extra?: Record<string, unknown>): DrawContext;
    /** The room left for a frameless chart's plotting area once its title and legend have theirs. */
    reserve(plan: ChartPlan, cell: RectF): {
        area: RectF;
        legend: RectF | null;
        titleTop: number;
    };
    /** Draws a chart's title, and its legend in the box reserved for it. */
    drawLegendAndTitle(plan: ChartPlan, cell: RectF, plot: RectF, legend: RectF | null, titleTop: number): void;
}
/**
 * What charts with axes, spokes or legends need beyond a drawing: training each chart's axes, colours and legend from its layers,
 * and drawing the frames with axes and spokes. The chart kinds' module registers it (plot/frames), so a page that draws only diagrams
 * carries none of it: a drawing binds nothing to axes, and its one legend entry would make no legend.
 */
export interface Charting {
    /** Trains every chart of the figure: its layers' values bound to its axes and colours, the axes resolved, the legend collected. */
    train(job: FigureJob, plans: ChartPlan[]): void;
    /** Draws one chart of a frame with axes or spokes in its cell. */
    draw(job: FigureJob, plan: ChartPlan, cell: RectF): void;
}
/** Registers the machinery of charts with axes, spokes and legends. */
export declare function registerCharting(machinery: Charting): void;
/**
 * Lays a figure out and draws it onto a sink. The order is fixed and every step is deterministic: each chart's layers are planned
 * and trained; the figure is divided into its title, its grid of charts and its caption; each chart measures its legend and its
 * axes' labels for the room it has, and what remains is its plotting area; then everything is drawn once, back to front.
 */
export declare function renderFigure(figure: Figure, sink: Sink, measurer: TextMeasurer, options?: {
    paintBackground?: boolean;
    clipToFigure?: boolean;
}): FigureRendering;
/** Where a legend inside the plotting area goes. */
export declare function insideBox(position: string, plot: RectF, size: {
    width: number;
    height: number;
}): RectF;
/**
 * The figure at the size that gives each of its charts a plotting area of `plotWidth` by `plotHeight` once the figure's titles and
 * caption and each chart's title have their room - for charts whose content has a size of its own, such as a drawing. Legends and
 * axes are not counted: a chart that has them takes whatever room it is given and lays them out in that. A title wider than the
 * charts widens the figure, so it is not cut at the edge.
 */
export declare function sizedFor(figure: Figure, plotWidth: number, plotHeight: number, measurer: TextMeasurer): Figure;
