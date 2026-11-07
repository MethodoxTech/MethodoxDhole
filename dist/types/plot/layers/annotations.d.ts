import { ChartLayerPlan, type ChartTraining } from "../contracts";
import { Layer, type DrawContext, type PlanContext } from "../figure";
import { Series } from "../series";
/** Which point of a label sits on its data point. */
export type LabelAnchor = "center" | "above" | "below" | "left" | "right";
/** Text placed at data points, set in the theme's ink rather than a series colour so it reads on any background; the layer's colour overrides that when the words must match something. */
export declare class Labels extends Layer {
    readonly x: Series;
    readonly y: Series;
    readonly text: Series;
    /** Which side of its point each label sits on. */
    anchor: LabelAnchor;
    /** How far from its point a label sits, in pixels. */
    offset: number;
    /** Whether a dot marks each point as well. */
    dots: boolean;
    constructor(x: readonly number[], y: readonly number[], text: readonly string[]);
    plan(_context: PlanContext): LabelsPlan;
}
declare class LabelsPlan extends ChartLayerPlan {
    private readonly labels;
    constructor(labels: Labels);
    train(training: ChartTraining): void;
    get clipToPlot(): boolean;
    draw(context: DrawContext): void;
}
export {};
