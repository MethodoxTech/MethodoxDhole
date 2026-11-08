import { RectF, type Vec2 } from "../rendering/geometry";
import type { SizeF } from "../rendering/scene";
import type { Direction } from "./direction";
export type { Direction } from "./direction";
/** A box to place. */
export declare class LayeredNode {
    readonly width: number;
    readonly height: number;
    /** Extra room beside the box, on the side across the flow, for a line that loops back to it. */
    loopRoom: number;
    /** Whether the box is held to the first rank, or to the last: a stub where a line crosses a group's frame. */
    pin: number;
    /** Where the box's centre went. */
    center: Vec2;
    constructor(width: number, height: number, init?: {
        pin?: number;
    });
    /** The box once placed. */
    get box(): RectF;
}
/** A line to route between two boxes. */
export declare class LayeredEdge {
    readonly from: number;
    readonly to: number;
    /** The size of the label the line carries, given a place of its own between the ranks. */
    readonly label: SizeF | null;
    /** How strongly the line pulls its ends into line. */
    readonly weight: number;
    /** The line's points, from its first box to its second, ending on each box's edge: where it leaves, where it bends, where it arrives. */
    readonly points: Vec2[];
    /** The centre of the line's label. */
    labelCenter: Vec2;
    /** Whether the line goes against the flow: it closes a loop. */
    againstFlow: boolean;
    constructor(from: number, to: number, label?: SizeF | null, weight?: number);
    /** Whether the line leaves and arrives at the same box. */
    get isLoop(): boolean;
}
/** The smallest rectangle holding both, as Divooka's RectF.Union: an empty operand is ignored rather than absorbed. */
export declare function unionRect(a: RectF, b: RectF): RectF;
/** The smallest rectangle holding a rectangle and a point, as Divooka's RectF.Union(Vector2). */
export declare function pointUnion(bounds: RectF, p: Vec2): RectF;
/**
 * The layered layout of a directed graph - Sugiyama's method, as dagre and Graphviz's dot lay out flowcharts - in four steps: break cycles, give each box a rank along the flow, order each rank to cross as few lines as possible, and place the boxes across the flow so lines run as straight as they can.
 *
 * Every step is deterministic: ties are broken by the order the boxes and lines were written in, so the same text always gives the same picture.
 *
 * Ranking is longest-path, with each source pulled down to sit just above what it leads to. A line spanning several ranks passes through a waypoint in each; a labelled line has its label as one of those waypoints, at the middle rank, so labels are placed like boxes and never sit on one - when any line has a label, every line spans two half-ranks, as dagre does, so the spacing stays even.
 *
 * Ordering sweeps the ranks down and up twenty-four times, sorting each by the barycentre of its neighbours, then swaps neighbours while that removes crossings, keeping the best order seen.
 *
 * Placement is the least-squares balance of every box against the boxes it is joined to, solved by sweeps that move each box toward the weighted mean of its neighbours and then project each rank back onto its separation constraints exactly - pool-adjacent-violators on the gaps. Waypoints of one line pull hardest on each other, so long lines run straight.
 */
export declare const Layered: {
    run: typeof run;
    project: typeof project;
};
/**
 * Places `nodes` and routes `edges`.
 * @param nodes The boxes, whose centres are set.
 * @param edges The lines, whose points are set.
 * @param direction Which way the flow runs.
 * @param nodeGap The least space between two boxes of one rank.
 * @param rankGap The space between ranks.
 * @returns The bounds of everything placed.
 */
export declare function run(nodes: readonly LayeredNode[], edges: readonly LayeredEdge[], direction: Direction, nodeGap?: number, rankGap?: number): RectF;
/**
 * The positions nearest `target` in the least-squares sense that keep each one at least its gap after the one before: pool-adjacent-violators on the targets less their cumulative gaps.
 */
export declare function project(target: readonly number[], gaps: readonly number[]): number[];
