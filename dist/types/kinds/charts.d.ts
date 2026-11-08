import { DiagramSpec, type Built, type BuildContext, type ReadContext } from "../syntax/reader";
import { type ProblemList } from "../syntax/problems";
import { Scene } from "../rendering/scene";
import { Tone } from "../rendering/tones";
import type { Theme } from "../plot/theme";
import { type SliceLabel } from "../plot/layers/radial-layers";
import { type StackMode } from "../plot/layers/lines";
import type { LineShape } from "../plot/layers/marks";
import "../plot/frames";
export declare class PieSpec extends DiagramSpec {
    readonly slices: {
        name: string;
        value: number;
    }[];
    hole: number;
    labels: SliceLabel;
    keepOrder: boolean;
    centre: string | null;
    get isEmpty(): boolean;
    build(_problems: ProblemList, _context: BuildContext): Built;
}
type ChartShape = "bar" | "line" | "xy" | "radar";
/** One series as read: its name, its values (or its points, on a scatter chart) and its colour. */
export declare class SeriesData {
    readonly name: string;
    readonly values: number[];
    readonly points: {
        x: number;
        y: number;
    }[];
    hue: Tone | null;
    constructor(name: string);
}
export declare class SeriesSpec extends DiagramSpec {
    readonly shape: ChartShape;
    labels: string[] | null;
    readonly series: SeriesData[];
    xTitle: string | null;
    yTitle: string | null;
    yRange: {
        low: number;
        high: number;
    } | null;
    xRange: {
        low: number;
        high: number;
    } | null;
    stack: StackMode;
    horizontal: boolean;
    valueLabels: boolean;
    curve: LineShape;
    markers: boolean;
    area: boolean;
    trend: boolean;
    connect: boolean;
    constructor(context: ReadContext, shape: ChartShape);
    get isEmpty(): boolean;
    build(_problems: ProblemList, _context: BuildContext): Built;
    private static isLabelledPoint;
    private colour;
}
interface QuadrantItem {
    readonly name: string;
    readonly x: number;
    readonly y: number;
    readonly hue: Tone | null;
}
export declare class QuadrantSpec extends DiagramSpec {
    xLow: string;
    xHigh: string;
    yLow: string;
    yHigh: string;
    readonly names: string[];
    readonly items: QuadrantItem[];
    low: number;
    high: number;
    build(_problems: ProblemList, context: BuildContext): Built;
}
/** A quadrant chart laid out: a square split at its middles, each quarter washed in its own colour and named in its corner, the axes' ends written along them, the points named beside them. */
export declare const QuadrantLayout: {
    side: number;
    build(spec: QuadrantSpec, theme: Theme, context: BuildContext): Scene;
};
export {};
