import type { Block, Span } from "../syntax/source";
import { type ProblemList } from "../syntax/problems";
import { DiagramSpec, KindParser, type BuildContext, type Built, type ReadContext, type Setting } from "../syntax/reader";
import { Tone } from "../rendering/tones";
import { Scene } from "../rendering/scene";
import type { Theme } from "../plot/theme";
import type { TextMeasurer } from "../plot/text";
export type Status = "planned" | "done" | "active" | "critical";
export declare class Task {
    readonly name: string;
    readonly where: Span;
    readonly section: number;
    start: number | null;
    readonly after: {
        name: string;
        where: Span;
    }[];
    length: number | null;
    end: number | null;
    milestone: boolean;
    state: Status;
    hue: Tone | null;
    from: number;
    to: number;
    resolved: boolean;
    resolving: boolean;
    constructor(name: string, where: Span, section?: number);
}
/** A date as yyyy-MM-dd. */
export declare function isoDay(ms: number): string;
export declare class GanttSpec extends DiagramSpec {
    readonly tasks: Task[];
    readonly sections: string[];
    projectStart: number | null;
    skipWeekends: boolean;
    readonly holidays: Set<number>;
    today: number | null;
    dateFormat: string | null;
    get isEmpty(): boolean;
    build(_problems: ProblemList, context: BuildContext): Built;
    /** The day after `from` plus `length`, counting only working days when weekends are skipped. */
    add(from: number, length: number): number;
    /** Whether a day is not worked: a weekend when weekends are skipped, or a holiday. */
    skipped(day: number): boolean;
}
/**
 * A Gantt chart: `section` lines grouping tasks, and a task per line - its name, a colon, then when it starts (a date, or after other tasks), how long it takes or when it ends, and in brackets whether it is done, active or critical.
 */
export declare class GanttParser extends KindParser {
    private readonly own;
    private section;
    constructor(context: ReadContext);
    get spec(): GanttSpec;
    protected get settings(): Setting[];
    private date;
    protected content(block: Block): void;
    /** One part of a task's timing: a start date, `after` other tasks, a length, an end, or the word milestone. */
    private part;
    protected finish(): void;
    /** When a task starts and ends: after the tasks it waits for, or on its date, or after the task above it, or at the chart's start. */
    private resolve;
}
/**
 * A Gantt chart laid out: the tasks' names in a column, a bar for each on a calendar axis with D3's time ticks, sections as bands, done tasks quiet, active ones strong, critical ones outlined in red, milestones as diamonds, and a line from each task to the tasks it waits for.
 */
export declare const GanttLayout: {
    Row: number;
    Bar: number;
    build(spec: GanttSpec, theme: Theme, measurer: TextMeasurer): Scene;
};
