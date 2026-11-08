import { type DholeOptions, type DholeResult } from "./dhole";
import { type Theme } from "./plot/theme";
/** How a page draws a text. */
export interface RenderOptions extends DholeOptions {
    /** The theme a diagram has when its text names none, by name - light, dark, presentation, minimal, classic, print, golden, quiet gold, silver gold, high contrast - or as a theme. */
    readonly theme?: string | Theme;
    /** A font to set every word in first, the theme's own families kept after it as fallbacks. */
    readonly font?: string;
    /** The language problems are said in: English (the default) or Chinese. */
    readonly language?: string;
    /** Whether the problems are listed under the picture; on by default. */
    readonly problems?: boolean;
}
/** The problems of a result as an HTML list, or an empty string when there are none. */
export declare function problemsHtml(result: DholeResult, language?: string): string;
/**
 * Draws Dhole text into `target`, replacing what it held: the picture, and under it the problems when there are any (unless
 * `problems: false`). Returns what was read, so a page can say more.
 */
export declare function render(text: string, target: Element, renderOptions?: RenderOptions): DholeResult;
/** Waits for the faces a text will be measured in, so a web font is measured as it is drawn rather than as its fallback. */
export declare function fontsReady(renderOptions?: RenderOptions): Promise<void>;
/**
 * `<dhole-diagram>`: draws the Dhole text it holds, in its own shadow root so a page's styles neither reach the picture nor are
 * reached by it, and draws it again when the text changes. Attributes: `theme`, `font`, `language` (problems' language) and
 * `problems="hide"`.
 */
export declare function defineElement(name?: string): void;
/**
 * Turns every Dhole code block of a page - `<pre><code class="language-dhole">`, as Markdown writes a ```dhole fence, or anything
 * matching `selector` - into a `<dhole-diagram>` holding its text. Returns how many it turned.
 */
export declare function renderAll(selector?: string, renderOptions?: RenderOptions): number;
