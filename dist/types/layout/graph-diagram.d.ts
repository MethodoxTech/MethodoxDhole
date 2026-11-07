import { RectF } from "../rendering/geometry";
import { Scene, type SizeF } from "../rendering/scene";
import type { NodeShape } from "../rendering/shapes";
import { Tone } from "../rendering/tones";
import type { Head, LineStyle } from "../syntax/scan";
import { type TextMeasurer } from "../plot/text";
import type { Theme } from "../plot/theme";
import type { Direction } from "./direction";
/** What a box in a graph diagram holds besides its label: a class's members, an entity's attributes. */
export declare class Compartments {
    /** A line above the name: «interface». */
    stereotype: string | null;
    /** Sections of lines under the name, each drawn under a rule: attributes, then operations. */
    readonly sections: CompartmentLine[][];
    /** Whether each line is a row of columns - an entity's key, name and type - rather than a sentence. */
    tabular: boolean;
    constructor(init?: {
        tabular?: boolean;
    });
}
/**
 * One line in a compartment.
 * cells: the line's text; a tabular compartment lines its cells up in columns.
 * italic: whether it is set in italic - an abstract member.
 * underline: whether it is a static member.
 */
export interface CompartmentLine {
    readonly cells: readonly string[];
    readonly italic: boolean;
    readonly underline: boolean;
}
export declare function compartmentLine(cells: readonly string[], italic?: boolean, underline?: boolean): CompartmentLine;
/** A box in a graph diagram. */
export declare class GraphNode {
    readonly id: string;
    /** What the box is found by: its name with case and spacing set aside. */
    readonly key: string;
    label: string;
    shape: NodeShape;
    /** The hue the box is drawn in; the theme's accent when not said. */
    hue: Tone;
    /** Whether the box is drawn quiet: a muted outline and a grey wash. */
    muted: boolean;
    /** The group it was first named in, or -1. */
    group: number;
    compartments: Compartments | null;
    /** Where it was first written, for the order things are placed in. */
    order: number;
    size: SizeF;
    box: RectF;
    constructor(id: string, key?: string);
}
/** A line between two boxes. */
export declare class GraphEdge {
    from: number;
    to: number;
    /** Whether `from` is a group - a composite state - rather than a box. */
    fromGroup: boolean;
    /** Whether `to` is a group. */
    toGroup: boolean;
    label: string | null;
    line: LineStyle;
    tail: Head;
    tip: Head;
    /** The cardinality written at the first end, for an entity's crow's foot or a class's multiplicity. */
    tailCard: string | null;
    tipCard: string | null;
    /** Whether the cardinalities are drawn as crow's feet (an entity diagram) rather than written (a class diagram). */
    crowsFeet: boolean;
    /** A hue for the line, or null for the theme's secondary ink. */
    hue: Tone | null;
    constructor(init: Partial<GraphEdge> & {
        from: number;
        to: number;
    });
}
/** A group of boxes drawn in a frame of its own: a subgraph, a composite state, a package. */
export declare class GraphGroup {
    readonly id: string;
    label: string;
    parent: number;
    hue: Tone | null;
    /** Whether the frame is a state's own rounded box, its name in a header, rather than a dashed region. */
    isState: boolean;
    box: RectF;
    constructor(id: string);
}
/** A graph diagram described: boxes, lines and groups, and which way it flows. */
export declare class GraphModel {
    direction: Direction;
    readonly nodes: GraphNode[];
    readonly edges: GraphEdge[];
    readonly groups: GraphGroup[];
    private readonly byId;
    indexOf(id: string): number;
    /**
     * Turns the boxes named `redirect`'s keys into the groups its values name: their lines go to the group instead, and the boxes go.
     *
     * A composite state is written as a state with lines under it, and a line may name it before those lines are read: it was a box until then.
     */
    redirect(redirect: ReadonlyMap<number, number>): void;
    /** The box called `id`, made the first time it is named, in `group`; whether it was made then. */
    node(id: string, group: number): {
        node: GraphNode;
        created: boolean;
    };
}
/** The sizes text is set in, scaled with the theme's own. */
export interface TypeSizes {
    readonly label: number;
    readonly small: number;
    readonly heading: number;
}
export declare function typeFor(theme: Theme): TypeSizes;
/**
 * A graph diagram laid out and drawn: each group laid out on its own as a layered graph and then placed in its parent as one box, the lines routed through the layout's waypoints, everything turned into marks.
 */
export declare const GraphDiagram: {
    build: typeof build;
};
export declare function build(model: GraphModel, theme: Theme, measurer: TextMeasurer): Scene;
