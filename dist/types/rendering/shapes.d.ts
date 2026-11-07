import type { Head } from "../syntax/scan";
import { RectF, VectorPath, type Vec2 } from "./geometry";
/** The outlines a box in a diagram can have. */
export type NodeShape = 
/** A rectangle with softened corners: a step. */
"box"
/** A rectangle with well-rounded corners: a state, a gentle step. */
 | "round"
/** A rectangle with round ends: where a flow starts or stops. */
 | "pill" | "circle"
/** A rhombus: a question. */
 | "diamond"
/** A hexagon: preparation. */
 | "hexagon"
/** A slanted box: data in or out. */
 | "parallelogram"
/** A cylinder: a store of data. */
 | "cylinder"
/** A sheet with a wavy foot: a document. */
 | "document"
/** A box with a second line at each side: a step defined elsewhere. */
 | "subroutine"
/** A sheet with a folded corner: a note. */
 | "note"
/** A small filled circle: a state machine's start. */
 | "startDot"
/** A small ringed circle: a state machine's end. */
 | "endDot"
/** A short thick bar: where a flow forks or joins. */
 | "bar"
/** A plain rectangle with square corners: a class, an entity. */
 | "square";
/** The size of a box of `shape` that holds text of `text` with `padX` and `padY` round it. */
export declare function fit(shape: NodeShape, text: {
    width: number;
    height: number;
}, padX: number, padY: number): {
    width: number;
    height: number;
};
/** The outline of a box of `shape` filling `box`. */
export declare function outline(shape: NodeShape, box: RectF): VectorPath;
/** Where a line from the box's centre toward `toward` leaves the outline of `shape`. */
export declare function boundary(shape: NodeShape, box: RectF, toward: Vec2): Vec2;
/**
 * A line's end moved along the flow onto the outline of `shape`: a port the layout placed on the box's flat side, slid onto a
 * diamond's slope or a circle's curve. `vertical`: whether the diagram flows down or up the page, so ports sit on the top and bottom.
 */
export declare function onOutline(shape: NodeShape, box: RectF, port: Vec2, vertical: boolean): Vec2;
/**
 * A line through `points`, curving between each pair so it leaves and arrives along the direction diagrams flow in - down the
 * page, or across it. Each piece is a cubic whose handles run along that direction for half the piece, as D3's bump curves do;
 * neighbouring pieces share their tangent where they meet, so a long edge through its waypoints is one smooth line.
 */
export declare function bump(points: readonly Vec2[], vertical: boolean): VectorPath;
/** A straight line through `points`. */
export declare function polyline(points: readonly Vec2[]): VectorPath;
/** How far an end of `head` reaches back along its line, so the line can stop where the head begins. */
export declare function headLength(head: Head, size: number): number;
/** An end of a line: its outline with its point at `tip` facing along `direction`, and whether it is filled with the line's colour (rather than the background, with an outline). */
export declare function end(head: Head, tip: Vec2, direction: Vec2, size: number): {
    path: VectorPath;
    filled: boolean;
} | null;
