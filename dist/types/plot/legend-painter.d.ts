import type { LegendItem } from "./axis";
import { type ColorAssignment } from "./contracts";
import type { PlanLegend, TextPainter } from "./figure";
import type { Sink } from "./sink";
import type { Theme } from "./theme";
import { RectF } from "../rendering/geometry";
/** Where a legend entry went, for a caller that wants to point at it. */
export interface LegendEntryBox {
    readonly label: string;
    readonly box: RectF;
}
export declare class LegendPainter implements PlanLegend {
    private readonly theme;
    private readonly text;
    private readonly items;
    private readonly bar;
    private readonly title;
    constructor(theme: Theme, text: TextPainter, items: readonly LegendItem[], colorBar: ColorAssignment | null, title: string | null);
    /** Whether there is anything to draw. */
    get isEmpty(): boolean;
    private get titleBlock();
    private get rowHeight();
    /**
     * How many entries a column of `height` holds. Divooka works this out in single precision, and again from the drawn box's height
     * when it draws: a box whose float edges lose an ulp can then hold one row fewer than it was measured for, and the last entry goes
     * to a column of its own past the legend's edge. That turns on the last bit of a text's measured height, which no measurer here
     * reproduces, so this keeps every entry where it was measured: a column a hair short of its last row - the drawn box's height
     * recomputed from its edges, a thousandth of a pixel under the height it was measured as - still holds it.
     */
    private perColumn;
    /** The height of `rows` rows under the title. */
    private columnHeight;
    private swatchWidth;
    private entryWidth;
    /** The size of a legend stacked in a column no taller than `maxHeight`, wrapping into more columns when it must. */
    measureColumn(maxHeight: number): {
        width: number;
        height: number;
    };
    /** The size of a legend flowed in rows no wider than `maxWidth`. */
    measureRow(maxWidth: number): {
        width: number;
        height: number;
    };
    private flowRows;
    private measureBar;
    private barTicks;
    /** Draws the legend as a column with its top left at the rectangle's, and says where each entry went. */
    drawColumn(sink: Sink, box: RectF): LegendEntryBox[];
    /** Draws the legend flowed in rows, each row starting at the rectangle's left. */
    drawRows(sink: Sink, box: RectF): LegendEntryBox[];
    private drawEntry;
}
