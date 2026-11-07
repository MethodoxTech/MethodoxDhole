import type { Block, Span } from "../syntax/source";
import { type ProblemList } from "../syntax/problems";
import { DiagramSpec, KindParser, type BuildContext, type Built, type ReadContext, type Setting } from "../syntax/reader";
import { RectF } from "../rendering/geometry";
import { Tone } from "../rendering/tones";
import { Scene, type SizeF } from "../rendering/scene";
import type { Theme } from "../plot/theme";
import type { TextMeasurer } from "../plot/text";
/** Whether a line is a `section` line: the word, then nothing, white space or a colon. */
export declare function isSectionLine(content: Span): boolean;
/** A branch of a mind map: its words, its own colour if it says one, and what grows from it. */
export declare class TreeItem {
    label: string;
    hue: Tone | null;
    readonly children: TreeItem[];
    size: SizeF;
    box: RectF;
    extent: number;
    branch: number;
    depth: number;
    get count(): number;
}
/** How a mind map spreads from its centre: both - branches to the right and to the left, balanced; right; left; down - a tree hanging down from its root, as an organisation chart. */
export type Spread = "both" | "right" | "left" | "down";
export declare class MindmapSpec extends DiagramSpec {
    root: TreeItem;
    spread: Spread;
    get isEmpty(): boolean;
    build(_problems: ProblemList, context: BuildContext): Built;
}
/**
 * A mind map: its centre and the branches indented under it, each line a word or a phrase, a colour in brackets when a branch should stand out.
 */
export declare class MindmapParser extends KindParser {
    private readonly own;
    private readonly roots;
    constructor(context: ReadContext);
    get spec(): MindmapSpec;
    protected get settings(): Setting[];
    protected content(block: Block): void;
    protected finish(): void;
    /** An idea and the ideas under it; a colour it is given is the colour of the ideas under it too, unless they say their own - the centre's is its own alone, since each branch has a colour. */
    private item;
}
/**
 * A tree laid out: a mind map's branches spread right and left of its centre, balanced by how much each holds, or hanging down as an organisation chart; each subtree stacked so none overlaps another, each parent centred on its children.
 */
export declare const TreeLayout: {
    Gap: number;
    Stack: number;
    Max: number;
    build(spec: MindmapSpec, theme: Theme, measurer: TextMeasurer): Scene;
};
export interface Period {
    readonly label: string;
    readonly events: string[];
    readonly section: number;
    readonly hue: Tone | null;
}
export declare class TimelineSpec extends DiagramSpec {
    readonly periods: Period[];
    readonly sections: string[];
    vertical: boolean;
    get isEmpty(): boolean;
    build(_problems: ProblemList, context: BuildContext): Built;
}
/**
 * A timeline: a time, a colon and what happened then - several events after semicolons or indented under the time - grouped into sections by `section` lines.
 */
export declare class TimelineParser extends KindParser {
    private readonly own;
    private section;
    constructor(context: ReadContext);
    get spec(): TimelineSpec;
    protected get settings(): Setting[];
    protected content(block: Block): void;
    protected finish(): void;
}
/**
 * A timeline laid out: the times evenly along a line, each a coloured mark with its events as cards beyond it, sections as bands over the times they hold.
 */
export declare const TimelineLayout: {
    CardWidth: number;
    Gap: number;
    build(spec: TimelineSpec, theme: Theme, measurer: TextMeasurer): Scene;
};
export interface Card {
    readonly text: string;
    readonly hue: Tone | null;
}
export interface Column {
    readonly name: string;
    readonly hue: Tone | null;
    readonly cards: Card[];
}
export declare class KanbanSpec extends DiagramSpec {
    readonly columns: Column[];
    get isEmpty(): boolean;
    build(_problems: ProblemList, context: BuildContext): Built;
}
/** A board: its columns at the top, the cards in each indented under it. */
export declare class KanbanParser extends KindParser {
    private readonly own;
    constructor(context: ReadContext);
    get spec(): KanbanSpec;
    protected content(block: Block): void;
    private hue;
    protected finish(): void;
}
/** A board laid out: columns side by side, each headed by its name and how many cards it holds, its cards stacked under it with a stripe of their colour. */
export declare const BoardLayout: {
    Width: number;
    Gap: number;
    Pad: number;
    build(spec: KanbanSpec, theme: Theme, measurer: TextMeasurer): Scene;
};
