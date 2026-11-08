import { AxisLayout } from "./axis-painter";
import { type ChartPlan } from "./figure";
import type { Theme } from "./theme";
import type { TextPainter } from "./figure";
import { RectF } from "../rendering/geometry";
/** A Cartesian chart measured into its cell: its legend, its axes and the plotting area left between them. */
export declare class CartesianFrame {
    cell: RectF;
    xAxis: AxisLayout;
    yAxis: AxisLayout;
    y2Axis: AxisLayout | null;
    legend: RectF | null;
    titleTop: number;
    plot: RectF;
    inner: RectF;
    planOf: ChartPlan;
    /** The room for the vertical axis, stated by the figure when charts in a grid share it. */
    forcedLeft: number | null;
    /** The room for the horizontal axis, stated by the figure when charts in a grid share it. */
    forcedBottom: number | null;
    static measure(plan: ChartPlan, cell: RectF, theme: Theme, text: TextPainter, showX: boolean, showY: boolean, forcedLeft?: number | null, forcedBottom?: number | null): CartesianFrame;
    /** Fits the axes to the room the cell has: label sizes depend on tick counts, which depend on the plotting area's size, which depends on the label sizes, so the loop runs until the bands stop changing. */
    private fit;
}
