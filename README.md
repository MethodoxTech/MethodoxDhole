# Dhole

**Charts and diagrams written as text, drawn on a web page as Divooka draws them.**

Dhole is a small language for charts and diagrams written as text. You name what to draw on the first line and say what it shows on the lines after; Dhole lays it out and draws it.

```
flowchart Making tea
Thirsty? [start] -> Boil the kettle -> Tea or coffee?
Tea or coffee? -> Steep the tea: tea
Tea or coffee? -> Brew the coffee: coffee
Steep the tea -> Enjoy [end, good]
Brew the coffee -> Enjoy
```

It was made for [Divooka](https://methodox.io/), where three nodes draw it and save it as a picture, an SVG, a PDF or a slide. This repository is its public build for the web: one script, no dependencies, that draws a Dhole text as SVG in any page. It is the same Dhole - ported from Divooka's own and held to it, text by text - so a diagram looks the same on a page as in Divooka: the same layout, the same themes, and the same problems said in the same words.

**Try it** in the [playground on the Methodox Wiki](https://wiki.methodox.io/Libraries/Dhole/Playground/), and **learn it** from the wiki's [Dhole pages](https://wiki.methodox.io/Libraries/Dhole/) or from the [specification](spec/Dhole%20Language.md) in this repository.

## On a page

Load the script from jsDelivr, which serves this repository's tagged releases:

```html
<script src="https://cdn.jsdelivr.net/gh/MethodoxTech/MethodoxDhole@0.2/dist/dhole.min.js"></script>
```

`@0.2` takes the newest 0.2 release; name one exactly (`@0.2.0`) to keep a page on it.

Then write a diagram in a `<dhole-diagram>` element:

```html
<dhole-diagram>
pie Where the day goes
Sleep: 8
Work: 8
Family: 4
Reading: 2
Errands: 2
</dhole-diagram>
```

It draws the text it holds, in a shadow root of its own so the page's styles and the picture's leave each other alone, and draws it again whenever the text changes. Attributes: `theme` (the theme when the text names none), `font` (a font for every word), `language` (`Chinese` for problems said in Chinese) and `problems="hide"`.

Or let it turn every Dhole code block of the page into a drawing - what Markdown makes of a ```` ```dhole ```` fence, `<pre><code class="language-dhole">`:

```html
<script>Dhole.renderAll();</script>
```

### From code

```js
import { read, toSvg, render } from "https://cdn.jsdelivr.net/gh/MethodoxTech/MethodoxDhole@0.2/dist/dhole.esm.js";

// Into an element: the picture, and under it the problems, if any.
render("bar Sales\nlabels: North, South\n2025: 42, 31\n2026: 45, 28", document.getElementById("chart"));

// Or by the pieces.
const result = read(text);                 // the figure, every problem, and a sentence of what was drawn
for (const problem of result.problems)
  console.log(problem.toString());         // Line 3, column 7: 'lots' is not a number. Write a number with a dot for its decimals, such as 12.5.
if (result.figure)
  element.innerHTML = toSvg(result.figure, { measurer: result.measurer, description: result.summary });
```

| | |
|-|-|
| `read(text, options?)` | `{ figure, problems, kinds, summary, hasErrors, measurer }`. Never throws for a text's mistakes: a line that cannot be read is left out and said, and the rest drawn. |
| `toSvg(figure, options?)` | The figure as an SVG document, its words kept as text; its `<title>` is the diagram's title and `<desc>` what it draws. |
| `render(text, element, options?)` | Draws into an element, the problems listed under the picture (`problems: false` to leave them out). |
| `renderAll(selector?, options?)` | Turns every matching code block into a `<dhole-diagram>`. |
| `check(text)` | The problems alone. |
| `draw(text, options?)` | The figure, or a `DholeError` when nothing in the text can be drawn. |
| `themes`, `findTheme(name)` | The themes: light, dark, presentation, minimal, classic, print, golden, quiet gold, silver gold, high contrast. |
| `drawnKinds()` | The kinds this build draws. |

Options: `theme` (the theme a diagram has when its text names none, by name or as a theme), `font`, `language` (`English` or `Chinese`, for problems), `measurer`.

A problem has `severity` (`error` or `warning`), `line`, `column`, `length`, `message`, `hint`, and `describe("Chinese")` for its words in Chinese.

Types for TypeScript are in `dist/types/`.

## What it draws

| Kind | First word | Drawn here |
|-|-|-|
| Flowchart | `flowchart` | yes |
| Sequence diagram | `sequence` | yes |
| State diagram | `state` | yes |
| Class diagram | `class` | yes |
| Entity diagram | `entity` | yes |
| Mind map, organisation chart | `mindmap` | yes |
| Timeline | `timeline` | yes |
| Gantt chart | `gantt` | yes |
| Pie and donut charts | `pie`, `donut` | yes |
| Bar, line and scatter charts | `bar`, `line`, `xy` | yes |
| Radar chart | `radar` | yes |
| Quadrant chart | `quadrant` | yes |
| Board | `kanban` | yes |
| Sankey diagram | `sankey` | not yet - said, and left out |
| Table | `table` | not yet - said, and left out |

## How it is held to Divooka

The build is made from a port of Divooka's `Divooka.Visualization.Dhole` package, and of the part of Divooka's plotting framework it draws through, kept in Methodox's web component library. Every release is checked against Divooka itself: Divooka's own Dhole reads several hundred texts - one of every kind, every example and test text of the C# package for the kinds drawn here, and texts that exercise every setting, attribute and problem - and the port must say the same problems in the same words, the same summary, and draw a figure of the same size with every word where Divooka draws it. In Chromium, measuring as a page does, every word of those figures lands within a pixel and a half of Divooka's, but for the Chinese texts, whose fallback face is the browser's own.

Text is measured by the browser in the faces the picture is drawn in, so the boxes fit their words in whatever font the page has; the same text draws the same picture on every machine that has the same fonts.

## Licence

MIT - the build, and the language's specification. See [LICENSE](LICENSE).

Copyright © 2024-2026 Methodox Technologies, Inc.
