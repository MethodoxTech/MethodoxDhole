import type { Block } from "../syntax/source";
import { type ProblemList } from "../syntax/problems";
import { type LineStyle } from "../syntax/scan";
import { DiagramSpec, KindParser, type BuildContext, type Built, type ReadContext, type Setting } from "../syntax/reader";
import { Tone } from "../rendering/tones";
import { Scene } from "../rendering/scene";
import type { Theme } from "../plot/theme";
import type { TextMeasurer } from "../plot/text";
export type Role = "participant" | "actor" | "database";
export interface Participant {
    readonly key: string;
    label: string;
    role: Role;
    hue: Tone;
}
export interface Message {
    readonly type: "message";
    readonly from: number;
    readonly to: number;
    readonly text: string;
    readonly reply: boolean;
    readonly line: LineStyle;
    readonly hue: Tone | null;
}
export interface Note {
    readonly type: "note";
    readonly first: number;
    readonly last: number;
    readonly placement: string;
    readonly text: string;
}
export interface Divider {
    readonly type: "divider";
    readonly text: string;
}
export interface FrameStart {
    readonly type: "frameStart";
    readonly tag: string;
    readonly condition: string;
}
export interface FrameSection {
    readonly type: "frameSection";
    readonly tag: string;
    readonly condition: string;
}
export interface FrameEnd {
    readonly type: "frameEnd";
}
export type Item = Message | Note | Divider | FrameStart | FrameSection | FrameEnd;
/** A sequence diagram as read: who takes part, and what happens in order. */
export declare class SequenceSpec extends DiagramSpec {
    readonly participants: Participant[];
    readonly items: Item[];
    numbered: boolean;
    activations: boolean;
    mirror: boolean;
    get isEmpty(): boolean;
    participantOf(name: string, role: Role): {
        index: number;
        created: boolean;
    };
    build(_problems: ProblemList, context: BuildContext): Built;
}
/**
 * A sequence diagram: participants, messages between them in order - `->` a call, `-->` a reply - notes, dividers, and blocks indented under `loop`, `if`/`else`, `opt`, `par`/`and`, `critical` and `break`.
 */
export declare class SequenceParser extends KindParser {
    private readonly own;
    private readonly top;
    constructor(context: ReadContext);
    get spec(): SequenceSpec;
    protected get settings(): Setting[];
    protected content(block: Block): void;
    protected finish(): void;
    /** Reads a run of sibling lines, joining an `else` to the `if` before it and an `and` to its `par`. */
    private lines;
    private statement;
    private declare;
    private noteLine;
}
/**
 * A sequence diagram laid out: a column per participant as wide as its name, the gaps between columns as wide as the messages between them need, a row per message, note, divider and block edge, and activation bars from each call to its reply.
 */
export declare const SequenceLayout: {
    build(spec: SequenceSpec, theme: Theme, measurer: TextMeasurer): Scene;
};
