import type { Block, Span } from "../syntax/source";
import { Said } from "../syntax/problems";
import { ArrowSet, type Arrow, type Ref } from "../syntax/scan";
import { DiagramSpec, KindParser, type BuildContext, type Built, type KindInfo, type ReadContext, type Setting } from "../syntax/reader";
import type { SourceLine } from "../syntax/source";
import type { ProblemList } from "../syntax/problems";
import { type NamedHue } from "../rendering/tones";
import type { NodeShape } from "../rendering/shapes";
import { AttributeWords } from "./attribute-words";
export { AttributeWords };
import { GraphEdge, GraphModel, type GraphNode } from "../layout/graph-diagram";
/** A diagram of boxes and lines: a flowchart, a state diagram, a class diagram or an entity diagram. */
export declare class GraphSpec extends DiagramSpec {
    readonly model: GraphModel;
    /** The words the summary counts boxes and lines in, one and many: steps and arrows, states and transitions. */
    boxes: {
        one: string;
        many: string;
    };
    lines: {
        one: string;
        many: string;
    };
    constructor(kind: KindInfo, kindLine: SourceLine);
    get isEmpty(): boolean;
    build(_problems: ProblemList, context: BuildContext): Built;
}
/** Whether a line starts with `word` as a word of its own: what follows it when it does, null when it does not. */
export declare function keyword(content: Span, word: string): Span | null;
/** An end of a line: a box, or a group (a composite state). */
type End = {
    index: number;
    isGroup: boolean;
};
/**
 * What the four diagrams of boxes and lines read alike: a box named at its first mention, a declaration giving it a longer label, attributes in brackets, chains of arrows with a label after a colon, groups indented under a `group` line, and notes.
 */
export declare abstract class GraphKindParser extends KindParser {
    private readonly shaped;
    protected readonly graph: GraphSpec;
    constructor(context: ReadContext);
    get spec(): DiagramSpec;
    protected get model(): GraphModel;
    protected get arrowSet(): ArrowSet;
    /** The thing a box is called in a problem: "a step", "a state". */
    protected abstract get boxWord(): Said;
    /** The shape a box has when nothing says otherwise. */
    protected get defaultShape(): NodeShape;
    protected get settings(): Setting[];
    /** Mermaid's direction after the kind's word - `graph TD`, `flowchart LR` - is a direction rather than a title. */
    protected titled(): void;
    /** The colours an attribute can name, and the roles that stand for colours. */
    protected static get hueWords(): ReadonlyMap<string, NamedHue>;
    /** The words an attribute of a box can be besides a colour: its shapes, for a flowchart. */
    protected get shapeWords(): ReadonlyMap<string, NodeShape>;
    /** Every word a box's attribute can be, for finding the one a slip was meant to be. */
    protected get attributeChoices(): string[];
    /** The words a hint lists: each shape once, by its plainest name, then the colours and roles. */
    protected get attributeHint(): string[];
    /** Each shape a box can have, once, by its plainest name. */
    protected get primaryShapes(): string[];
    protected get extraAttributeWords(): string[];
    /** The key a name is found by: case and runs of spaces set aside, so "Order food" and "order  food" are one box. */
    protected static keyOf(name: string): string;
    /** The box a reference names, made at its first mention, with the reference's attributes applied. */
    protected box(reference: Ref, group: number): GraphNode;
    /** Called when a box is first named, before its attributes. */
    protected made(_node: GraphNode): void;
    /** A question gets a question's shape unless its attributes gave it another. */
    protected shapedAs(node: GraphNode): void;
    /** Applies attribute words to a box: a shape, a colour, a role; anything else is reported, or given to `otherAttribute`. */
    protected attributes(node: GraphNode, attributes: readonly Span[]): void;
    /** A kind's own attribute words: a state's fork, a class's stereotype. True when the word was taken. */
    protected otherAttribute(_node: GraphNode, _word: string, _key: string): boolean;
    /** Applies attribute words to a line: a colour, a role, a line style. */
    protected lineAttributes(edge: GraphEdge, attributes: readonly Span[]): void;
    /**
     * Reads a line that is not a keyword: a chain of arrows, a declaration `id: Label`, or a box on its own.
     */
    protected statement(content: Span, group: number): void;
    /** A box named on a line of its own. */
    protected single(reference: Ref, group: number): void;
    /** This kind's name with its article, for a problem: "a flowchart", "an entity diagram". */
    protected get kindSaid(): Said;
    /** Whether a line has a word drawn like an arrow that this kind has not got - Mermaid's `-.->`, `--x` - which is said, and the line left out rather than read as boxes named after the pieces. */
    protected oddArrow(content: Span): boolean;
    /** A chain of arrows: a line between each neighbouring pair, the label after the colon on the last. */
    protected chain(_content: Span, pieces: readonly Span[], arrows: readonly Arrow[], tail: Span | null, group: number): void;
    /** What one end of an arrow names: a box, or - in a state diagram - a start, an end or a composite state. */
    protected end(reference: Ref, group: number, _source: boolean): End | null;
    /** The line an arrow draws between two ends, its heads as the arrow says and pointing the way the flow goes. */
    protected link(from: End, to: End, arrow: Arrow): GraphEdge | null;
    /** A group from a `group` line: `group Kitchen` or `group k: Kitchen`, with attributes. */
    protected group(rest: Span, parent: number, isState?: boolean): number;
    /** A note beside a box: `note Box: what to say`, joined to it by a dashed line. */
    protected note(rest: Span, content: Span, group: number): void;
}
/**
 * A flowchart: steps and the arrows between them, a question's shape for a label ending in a question mark, groups, and shapes named in words.
 */
export declare class FlowchartParser extends GraphKindParser {
    protected get boxWord(): Said;
    protected get primaryShapes(): string[];
    protected get shapeWords(): ReadonlyMap<string, NodeShape>;
    protected content(block: Block): void;
    private line;
    protected finish(): void;
}
/**
 * A state diagram: states and the transitions between them, `*` for where it starts and stops, composite states written as states with lines under them, choices, forks and joins, and notes.
 */
export declare class StateParser extends GraphKindParser {
    private readonly composites;
    protected get boxWord(): Said;
    protected get primaryShapes(): string[];
    protected get defaultShape(): NodeShape;
    protected get shapeWords(): ReadonlyMap<string, NodeShape>;
    protected content(block: Block): void;
    private line;
    protected end(reference: Ref, group: number, source: boolean): End | null;
    protected finish(): void;
}
/**
 * A class diagram: classes with their members indented under them, UML's relationship arrows, multiplicities, stereotypes in brackets, and packages as groups.
 */
export declare class ClassParser extends GraphKindParser {
    protected get boxWord(): Said;
    protected get arrowSet(): ArrowSet;
    protected get defaultShape(): NodeShape;
    protected get extraAttributeWords(): string[];
    protected made(node: GraphNode): void;
    protected otherAttribute(node: GraphNode, word: string, _key: string): boolean;
    protected content(block: Block): void;
    private line;
    private static isMember;
    /** A member as written, its visibility as UML's symbol: `public` becomes `+`, `private` `-`; `static` underlines it and `abstract` sets it in italic. */
    private static member;
    protected link(from: End, to: End, arrow: Arrow): GraphEdge | null;
    protected finish(): void;
}
/**
 * An entity diagram: entities with their attributes indented under them, keys marked, and relationships drawn with crow's feet from cardinalities written at each end of the line: `Customer 1-* Order`.
 */
export declare class EntityParser extends GraphKindParser {
    protected get boxWord(): Said;
    protected get arrowSet(): ArrowSet;
    protected get defaultShape(): NodeShape;
    protected made(node: GraphNode): void;
    protected content(block: Block): void;
    private line;
    /** An attribute: its name, its type, and its keys - `id: number [key]`, or `id number key`. */
    private attribute;
    protected link(from: End, to: End, arrow: Arrow): GraphEdge | null;
    protected finish(): void;
}
