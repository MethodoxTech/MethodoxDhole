# The Dhole language

Dhole is a small language for charts and diagrams written as text. A text names what to draw on its first line and says what it shows on the lines after, and Dhole draws it as a figure of Divooka's plotting framework, so every output the framework has - a picture at any resolution, an SVG, a PDF, a PowerPoint slide - is a Dhole output too.

```
flowchart Making tea
Thirsty? [start] -> Boil the kettle -> Tea or coffee?
Tea or coffee? -> Steep the tea: tea
Tea or coffee? -> Brew the coffee: coffee
Steep the tea -> Enjoy [end, good]
Brew the coffee -> Enjoy
```

This document is the language's specification: what every line can say, what every word means, and what Dhole says about a text it cannot read as written. The package's tests hold the implementation to it.

## What it is for, and what it is not

Dhole is written by people, read by people, and drawn by a machine. Four things follow, and every rule below is one of them applied.

- **Readable.** A text reads as a description of its picture, in words rather than punctuation: shapes are named (`[database]`, `[diamond]`), colours are named (`[green]`, `[bad]`), and a setting is a word, a colon and a value (`direction: right`).
- **Forgiving.** Nothing stops a text from being drawn. A line that cannot be read is left out and said - its line, its column, what is wrong and what to write instead - and every other line is drawn. A misspelt kind is drawn as the kind it is nearest, a misspelt word is answered with the word it was probably meant to be, and the spellings people bring from other tools are read where they cannot be mistaken (`TD` for `down`, Mermaid's `[*]`, a table written in Markdown).
- **Consistent.** The same thing is written the same way in every kind: a name is made where it is first written, a label follows a colon, attributes are in brackets after what they belong to, a line indented under another belongs to it, and settings sit at the top of a diagram's lines.
- **Deterministic.** The same text gives the same picture on every machine: nothing reads the clock, the culture or a random number, and the layouts break every tie by the order the text gave.

Dhole draws what a text says and lays it out itself. It has no styling language, no pixel positions and no escape into another language: a diagram's look comes from its theme, and a text says only which colours and shapes its things are.

## Reading a text

### The first line

A text's first line that is not blank or a comment names the kind of diagram, and whatever follows the kind's word is its title: `pie Where the day goes`. A colon after the kind's word is allowed (`gantt: Launch`). The words are matched ignoring case, spaces, hyphens and underscores, so `Mind Map`, `mind-map` and `mindmap` are one kind, and a kind written as two words - `state machine`, `pie chart`, `class diagram` - is read as one before its first word is read alone, so the second word is not taken for the title.

| Kind | Its word | Other words it answers to | What it draws |
|-|-|-|-|
| Flowchart | `flowchart` | `flow`, `graph`, `flowchart-v2` | steps and the arrows between them |
| Sequence diagram | `sequence` | `sequence diagram`, `seq` | who says what to whom, in order |
| State diagram | `state` | `states`, `state diagram`, `state machine`, `stateDiagram-v2` | states and the transitions between them |
| Class diagram | `class` | `classes`, `class diagram`, `uml` | classes, their members and how they relate |
| Entity diagram | `entity` | `entities`, `er`, `er diagram`, `entity relationship`, `database`, `schema` | tables, their attributes and their relationships |
| Mind map | `mindmap` | `mind map`, `mind`, `tree` | ideas grown from a centre, or an organisation chart |
| Timeline | `timeline` | `history`, `milestones` | events in order |
| Gantt chart | `gantt` | `schedule`, `plan`, `gantt chart` | a plan on a calendar |
| Pie chart | `pie` | `pie chart`, `donut`, `doughnut`, `ring` | shares of a whole |
| Bar chart | `bar` | `bars`, `bar chart`, `column`, `columns`, `column chart` | amounts side by side |
| Line chart | `line` | `lines`, `line chart`, `line plot` | values along a line |
| Scatter chart | `xy` | `scatter`, `xy chart`, `scatter plot`, `points` | points by two measures |
| Radar chart | `radar` | `radar chart`, `spider`, `web` | several measures round a circle |
| Quadrant chart | `quadrant` | `quadrant chart`, `matrix`, `quadrants` | things placed on a square split in four |
| Sankey diagram | `sankey` | `sankey-beta`, `flows` | where a quantity comes from and goes |
| Table | `table` | `grid` | rows and columns of text |
| Board | `kanban` | `board`, `kanban board` | cards in columns |

A first word that is none of these but is a slip for one - a letter or two away, depending on its length - is drawn as that kind, and said (`'flowchrt' is not something Dhole draws, so this is drawn as a flowchart.`); one that is nowhere near is said, and that diagram is not drawn.

### Lines, comments and indentation

- A line whose first character after its indentation is `#` is a comment, and a blank line says nothing; both may stand anywhere.
- A line indented under another belongs to it: a step to its group, a member to its class, a branch to the idea it grows from, a card to its column, a message to its block. Indentation is read as nesting, not measured: a line belongs to the nearest line above it that is indented less, however many spaces apart they are.
- A tab indents to the next multiple of four columns. A line indented with tabs and spaces together is read, and warned of.
- A line indented under a line that cannot hold anything - a setting, a single step - is read as if it were not indented, and warned of.

### Several diagrams in one text

A line of three or more dashes and nothing else ends one diagram and starts the next. Each diagram has its own first line, and the diagrams are drawn side by side, two to a row up to four of them and three to a row after that, each with its own title; the figure takes the first diagram's theme, subtitle and caption. A separator with nothing after it, or before the first diagram, is only tidiness; two separators with nothing between them are warned of.

### Settings

A line at the top of a diagram's lines that is a setting's name, a colon and a value is a setting, and every other line is the diagram's content. A setting written twice takes its later value, and is warned of. A setting's name is matched as a kind's word is - case, spaces and hyphens set aside - and each setting answers to a few names, so `direction: LR` and `rankdir: LR` are one setting. A line of a chart's data whose name is a slip for a setting's and whose value has no number in it - `titel: Sales` - is said to be a misspelt setting rather than read as data.

Every kind takes these:

| Setting | Also | Value | Default |
|-|-|-|-|
| `title` | | the figure's title; the first line's words after the kind are the same | none |
| `subtitle` | | a line under the title | none |
| `caption` | `source`, `note` | a line under the figure | none |
| `theme` | `style`, `look` | one of the themes below | `light` |
| `font` | `typeface`, `face` | a font family's name, for every word in the figure | the theme's |
| `size` | | the figure's width and height in pixels, `800 x 600` (also `800x600`, `800 by 600`, `800, 600`), each from 50 to 20000 | as the diagram needs |

Each kind's own settings are listed with the kind.

### Names

A thing - a step, a state, a participant, a slice - is made where it is first written, and written again it is the same thing. Names are matched ignoring case and runs of spaces, so `Order food` and `order  food` are one step, which keeps the spelling of its first mention.

A name may hold any character except the ones that mean something on its line - an arrow, a colon followed by a space, a bracket. A name that needs one is written in quotation marks, straight or curly: `"A -> B" -> C`. Inside quotation marks, `\"` is a quotation mark and `\\` a backslash. Words after a closing quotation mark stay part of the name, so `"Fish" and chips` is the name a person wrote.

In the diagrams of boxes and lines, a name can be given a longer label on a line of its own - `pay: Pay at the till` - so arrows stay short to write: `cart -> pay`.

### The colon

A line is cut at its first colon followed by a space, or at a colon that ends the line, or at a full-width colon `：`; a line with none of those is cut at its first colon of any kind. So a time of day keeps its colon - `09:00: Gates open` is the time 09:00 - and so does an address or a ratio, while `Start->End:yes` still reads its label. What comes before the colon is what the line is about, and what comes after it is its label, its value or its data.

### Attributes

Words in square brackets after a thing are its attributes, apart by commas: `Enjoy [end, good]`. What a word can be depends on what it is an attribute of, and is listed with each kind; colours and roles are common to all of them. A word that is none of these is warned of, with the word it was probably meant to be when one is near (`'rond' is not something a step can be. Write 'round' if that is what you mean.`) or else every word it can be. A bracket that is not closed is said, and its words are read as attributes.

**Colours.** `blue`, `orange`, `green`, `yellow` (also `amber`, `gold`), `pink` (`magenta`), `purple` (`violet`), `red`, `teal` (`cyan`), `grey` (`gray`), and `accent` (`highlight`, `primary`) for the theme's own first colour. A colour is not a fixed value: it is the colour of the theme's palette nearest that hue, so a diagram drawn in another theme keeps its meaning in that theme's colours, and grey is the theme's muted ink.

**Roles.** `good` (also `ok`, `success`, `done`, `yes`) is green, `bad` (`error`, `fail`, `failure`, `danger`, `no`) is red, and `warn` (`warning`, `caution`) is yellow - so a text says what a thing means and the theme says what that looks like.

**Muted.** `muted` (also `quiet`, `faded`, `disabled`, `inactive`) draws a box or a line of a diagram of boxes and lines in the theme's quiet ink.

### Values

| Value | Written | Notes |
|-|-|-|
| Number | `12`, `-3.5`, `1_000_000`, `1e6` | a dot for decimals in every language; underscores between digits are ignored |
| Percentage | `40%` | read as hundredths where a share is meant (a donut's hole) |
| Range | `0..100`, `0 to 100`, `0 – 100`, `0~100` | two numbers, low and high in either order |
| Date | `2026-11-02`, `2026-11-02 14:30`, `2026-11-02T14:30:00`, `2026/11/02`, `2026-11`, `2026` | year, month and day; a time after it if one is needed |
| Length of time | `3d`, `2w`, `4h`, `30min`, `1d 4h`, `1.5 days` | days, weeks, hours and minutes, added together |
| Switch | `on`, `yes`, `true`, `show` / `off`, `no`, `false`, `hide`, `none` | |
| Direction | `down`, `right`, `up`, `left` | also `TD`, `TB`, `top down`, `vertical`; `LR`, `left to right`, `horizontal`, `across`; `BT`, `bottom up`; `RL`, `right to left` |
| Size | `800 x 600` | pixels |
| List | `North, South, East` | commas, or full-width `，` |

### Themes

A theme is the figure's look: its ground, its inks, its lines, its colours and its font. `theme:` takes any of the plotting framework's themes - `light` (the default), `dark`, `presentation`, `minimal`, `classic`, `print` - or one of the four read off the editor's palettes: `golden`, `quiet gold`, `silver gold` and `high contrast`. Nothing in a drawn diagram is a fixed colour, so the plotting framework's Set Theme recolours a Dhole diagram as it recolours any chart.

## Arrows

The diagrams of boxes and lines - flowcharts, state, class and entity diagrams - and sequence diagrams draw a line between two things with an arrow written between their names. A line may chain several: `A -> B -> C` is two arrows, and a label after the colon belongs to the last of them.

| Arrow | Draws |
|-|-|
| `->` | a line with an arrowhead |
| `-->` | a dashed line with an arrowhead |
| `..>` | a dashed line with an arrowhead |
| `=>`, `==>` | a thick line with an arrowhead |
| `->>`, `-->>` | as `->` and `-->`, as a sequence diagram's other tools write a call and its reply |
| `<-`, `<--`, `<..` | as `->`, `-->` and `..>`, pointing back at the first name: `B <- A` is `A -> B` |
| `<->`, `<-->`, `<=>` | a line with an arrowhead at both ends, solid, dashed or thick |
| `--`, `---` | a line with no head |
| `..` | a dashed line with no head |
| `==` | a thick line with no head |

The arrows that could be part of a name - `--`, `---`, `..`, `==`, and the class diagram's `o-`, `*-` and their kin - are arrows only with a space on each side: `well-known -- trusted` is a line between two names, and `well--known` is a name. The others need no spaces: `A->B` is an arrow.

A class diagram adds UML's ends, also with spaces on each side:

| Arrow | Draws |
|-|-|
| `<\|-`, `<\|--`, `-\|>`, `--\|>` | inheritance: a hollow triangle at the more general class |
| `<\|..`, `..\|>` | realisation: a dashed line with a hollow triangle at the interface |
| `*-`, `*--`, `-*`, `--*` | composition: a filled diamond at the whole |
| `o-`, `o--`, `-o`, `--o` | aggregation: a hollow diamond at the whole |

Class and entity diagrams also read a line with a count at each end, `1-*`, as a relationship with those counts: each end is `1`, `0..1`, `1..*` (also `1..n`) or `*` (also `0..*`, `0..n`, `n`, `many`), joined by one, two or three dashes. An entity diagram draws the counts as crow's feet; a class diagram writes them at the ends as multiplicities. An entity diagram also reads crow's feet drawn in characters, as Mermaid writes them: `||--o{` is one to any number, `|o--|{` zero or one to one or more, and two dots in place of the dashes - `}|..||` - draw the line dashed.

A word drawn like an arrow that is none of the kind's arrows - `-.->`, `--x`, `~~~` - is said with the arrows the kind has, and its line is left out rather than read as boxes named after its pieces. A label written between bars after an arrow, `A -->|yes| B`, is said to go after a colon. A count no end can have, `2-*`, is said as a count.

## The kinds

### Flowcharts

```
flowchart Ordering online
direction: right
cart: Fill the cart
group Checkout
  pay: Pay [io]
  check: Card accepted?
  pay -> check
group Warehouse [teal]
  pick: Pick the items
  pack: Pack the box
  pick -> pack
db: Orders [database]
cart -> pay
check -> pick: yes
check -> pay: no, try again [bad]
pick --> db: record
pack -> Ship it [end]
```

A flowchart is steps and the arrows between them.

- **Settings:** `direction` (also `flow`, `orientation`, `layout`, `rankdir`) - which way the arrows run: `down` (the default), `right`, `up` or `left`.
- **A step** is made where it is first named, on an arrow's line or on a line of its own. `id: Label` gives it a label; attributes go after the name or after the label.
- **Arrows** are the arrows above; a label after the colon is written on the last arrow of the line, and attributes after the label colour the arrow or change its line: `check -> pay: no [bad, dashed]`. A colour, a role, `muted`, `dashed` (`dotted`), `thick` (`bold`) or `solid`.
- **Shapes:** `box` (also `rect`, `rectangle`, `step`, `process`; the default), `round` (`rounded`, `soft`), `pill` (`stadium`, `start`, `end`, `stop`, `terminal`, `begin`), `circle`, `diamond` (`decision`, `choice`, `question`, `if`), `hexagon` (`prepare`, `preparation`), `io` (`input`, `output`, `data`, `parallelogram`), `database` (`db`, `store`, `storage`, `cylinder`), `document` (`doc`, `file`, `report`), `subroutine` (`call`, `predefined`) and `note` (`comment`). A step whose label ends in a question mark is a diamond unless its attributes give it another shape.
- **Groups:** `group Name` (also `subgraph`), or `group id: Label`, with the lines that belong to it indented under it; groups nest, and a group can take a colour: `group Warehouse [teal]`. A group with nothing indented under it is warned of.
- **Notes:** `note Step: what to say` puts a note beside a step, joined to it by a dashed line.
- **Layout:** the steps are ranked along the direction by the arrows between them, so most arrows run the same way; an arrow that would close a loop runs back against it. Steps are ordered within each rank to keep arrows from crossing, lines into and out of a group are routed to its edge, and each arrow's label sits on its line.

### Sequence diagrams

```
sequence Paying at the till
actor Customer
participant Till
participant bank: Bank of Example
database Ledger
Customer -> Till: Scan the items
Till -> bank: Ask to pay 12.50
bank -> Ledger: Hold the amount
Ledger --> bank: Held
if Card accepted
  bank --> Till: Approved
  Till --> Customer: Receipt
else Card declined
  bank --> Till: Declined
  Till --> Customer: Try another card
note over Till, bank: Card details never stay on the till
```

A sequence diagram is who says what to whom, in order down the page.

- **Settings:** `numbers` (also `numbered`, `numbering`, `autonumber`) numbers the messages, off by default; `activations` (`activation`, `bars`) draws a bar on a participant from a call to its reply, on by default; `mirror` (`footer`, `heads below`) repeats the participants' heads at the foot, on by default.
- **Participants** are columns, in the order they are first named. `participant Name`, `actor Name` (also `person`; drawn as a person) and `database Name` (drawn as a cylinder) declare one before it speaks, which sets its order and its look; `participant id: Long name` or `participant Long name as id` gives it a short name to write messages with. A colour in brackets after its name colours its head.
- **Messages:** `From -> To: what is said`. `->` (or `->>`) is a call and `-->` (or `-->>`, `..>`) a reply; `<-` and its kin point back. A call that is answered draws a bar on its receiver from the call to the reply; a call that never is draws none. A message to itself is a loop on its own column. A colour or a role in brackets after the words colours the message.
- **Blocks:** lines indented under `loop`, `if` (also `alt`), `opt` (`optional`), `par` (`parallel`), `critical`, `break` or `region`, with the words after the block's word as its condition, are drawn in a frame. `else` after an `if`'s lines, and `and` after a `par`'s, at the same indentation, add a section to its frame; an `else` or an `and` anywhere else is said. A line with lines indented under it that is not a block is warned of, and its lines are read as messages.
- **Notes:** `note over A: text`, `note over A, C: text` (spanning A to C), `note left of A: text`, `note right of A: text`.
- **Dividers:** a line starting with `==`, such as `== Later that day ==`, draws a divider across every column.

### State diagrams

```
state Media player
direction: right
* -> Stopped
Stopped -> Playing: play
Playing -> Paused: pause
Paused -> Playing: play
Playing -> Stopped: stop
Paused -> Stopped: stop
Playing
  * -> Buffering
  Buffering -> Streaming: ready
  Streaming -> Buffering: stall
```

A state diagram is the states something can be in and the events that move it between them.

- **Settings:** `direction`, as a flowchart's.
- **States** are made as a flowchart's steps are, and drawn rounded. `state Name` may introduce one, as other tools write it. Each arrow's label is its event.
- **Start and end:** `*` before an arrow is where the machine starts, and after one where it stops: `* -> Idle`, `Done -> *`. Mermaid's `[*]` is read the same. Each frame has its own start and end. A `*` in any other kind is said.
- **Composite states:** a state with lines indented under it is a frame holding a state machine of its own, with its own start and end; arrows to and from its name reach its frame. `Playing: Playing music` gives it a label.
- **Shapes:** `[choice]` (also `decision`) is a diamond, `[fork]` and `[join]` a bar.
- **Notes:** `note State: text`.

### Class diagrams

```
class Shapes on a canvas
Shape [abstract]
  + name: string
  + area(): number
  + draw()
Circle
  - radius: number
  + area(): number
Canvas
  + shapes: Shape[]
  + render()
Shape <|- Circle
Canvas o- Shape: holds
```

A class diagram is classes, what they hold and do, and how they relate.

- **Settings:** `direction`, as a flowchart's.
- **Classes:** a class is named on a line of its own - `class Name` as well - with its members indented under it. A member with brackets is an operation and goes in the class's second compartment; any other is a field. A member starts with its visibility, as a symbol - `+` public, `-` private, `~` internal - or a word: `public`, `private`, `protected` (shown as `#`, since a line starting with `#` is a comment), `internal`, `package`; `static` underlines it and `abstract` sets it in italic. A member indented under nothing is said.
- **Stereotypes:** a word in brackets after a class that is not a colour, a role or `muted` is its stereotype, shown above its name: `[interface]`, `[abstract]`, `[enum]`, `[service]`.
- **Relationships:** the arrows above, the plain ones for association and dependency and UML's for inheritance, realisation, composition and aggregation. The more general end - the base class, the interface, the whole - is laid out above. A count at each end, `Order 1-* Line`, writes multiplicities.
- **Packages:** `package Name` (also `namespace`, `group`) frames the classes indented under it.
- **Notes:** `note Class: text`.

### Entity diagrams

```
entity A small shop
Customer
  id: number [key]
  name: text
  email: text [unique]
Order
  id: number [key]
  customer: number [ref]
  placed: date
Customer 1-* Order: places
```

An entity diagram is the tables of a database and how their rows relate.

- **Settings:** `direction`, as a flowchart's.
- **Entities** are named on a line of their own, their attributes indented under them: a name, a colon and a type, then its keys in brackets - `key` (also `pk`, `primary`, `primary key`, `id`), `ref` (`fk`, `foreign`, `foreign key`, `reference`) and `unique` (`uk`). A primary key is underlined. An attribute written as a name and a type without a colon, `id number`, is read too. A name, a colon and a type outside an entity is said.
- **Relationships:** a line with a count at each end, `Customer 1-* Order: places`, drawn with crow's feet, or Mermaid's crow's feet in characters, `Customer ||--o{ Order`. The plain arrows draw plain lines.
- **Groups:** `group Name` frames the entities indented under it.
- **Notes:** `note Entity: text`.

### Mind maps

```
mindmap
  A trip to the coast
    Getting there
      Train
      Bicycle [green]
    Staying
      Campsite
```

A mind map is ideas grown from a centre by indentation.

- **Settings:** `direction` (also `spread`, `layout`): `both` (also `centre`, `radial`, `around`; the default) balances the branches to either side of the centre, `right` and `left` grow them to one side, and `down` (also `tree`, `org`, `organisation`) hangs them down as an organisation chart.
- **The centre** is the first line; each line one deeper than the line above is one of its branches. Several lines at the top under a title make the title the centre; several without one are warned of, and the first is the centre.
- **Colours:** each branch takes a colour of the theme's palette, and a colour or a role in brackets gives an idea a colour of its own, which the ideas under it take too unless they say theirs; the centre's colour is its own alone.

### Timelines

```
timeline Computing in five moments
section Machines
1936: Turing's machine on paper
1945: ENIAC; First stored programs
section People
1971: The microprocessor
1984: The Macintosh
```

A timeline is events in order.

- **Settings:** `direction`: `right` (the default) along the page, or `down` it.
- **Times:** a time, a colon and what happened then; several events apart by semicolons, or indented under the time on lines of their own. The times are spaced evenly, so a timeline reads as a story rather than a scale; any words are a time - `1945`, `Spring`, `Day 3`, `09:00`.
- **Sections:** `section Name` groups the times after it, or the times indented under it, into a band of one colour.
- **Colours:** a colour in brackets after a time or an event colours that time.

### Gantt charts

```
gantt Launching the site
start: 2026-11-02
skip: weekends
today: 2026-11-12
section Design
Sketches: 3d [done]
Mock-ups: after Sketches, 4d [done]
section Build
Pages: after Mock-ups, 6d [active]
Search: after Mock-ups, 4d
Testing: after Pages and Search, 3d [critical]
section Ship
Launch: after Testing, milestone
```

A Gantt chart is a plan on a calendar.

- **Settings:** `start` (also `starts`, `begin`, `from`) - the date a task starts on when nothing else says; `today` (`now`, `status date`) - a day marked with a line; `skip` (also `excludes`, `exclude`, `holidays`) - `weekends`, and dates not worked, apart by commas; `dates` (also `date format`, `axis format`, `format`) - how the calendar's dates are written, in the D3 time format (`%b %d`, `%Y-%m-%d`, `%d/%m`).
- **Tasks:** a name, a colon, then when it starts and how long it takes, apart by commas: a length (`3d`, `1w`, `4h`), a start date, `from` or `on` a date, `after` one or more tasks (`after Pages and Search`, `after Pages, Search`), an end date (`until`, `to` or `end` a date, or a second date), and `milestone`. A task with no start starts when the task above it ends, or on the chart's `start`; one with no length takes a day. Skipped days are not counted and no task starts on one. A task's name after `after` is matched ignoring case.
- **States** in brackets: `done` (also `complete`, `completed`, `finished`), `active` (`current`, `now`, `in progress`, `doing`), `critical` (`crit`, `urgent`), `milestone`, or a colour.
- **Sections:** `section Name` labels the tasks after it.
- **Drawn:** a bar per task on a calendar of the D3 time scale's ticks, a diamond per milestone, a line from each task to each task waiting for it, the skipped days shaded and today marked.

### Pie charts

```
pie Where the day goes
Sleep: 8
Work: 8
Family: 4
Reading: 2
```

- **Slices:** a name, a colon and its amount, one to a line. Mermaid's `"Name" : 30` and old Dhole's `Slice: Name, 30` are read too. An amount that is not above zero has no slice, and is warned of.
- **Settings:** `hole` (also `donut`) - `on`, `off`, or how much of the pie it takes (`0.5`, `50%`); `pie` written as `donut`, `doughnut` or `ring` has a hole from the start. `labels` (`show`, `slices`) - `percent` (the default), `value`, `name`, `name and percent` or `none`. `order` (`sort`) - `size`, the largest first (the default), or `written`. `centre` (`center`, `middle`, `total`) - words in the hole.

### Bar charts

```
bar Sales by region
labels: North, South, East, West
y axis: Units
2025: 42, 31, 27, 18
2026: 45, 28, 34, 22
```

- **Data:** with `labels`, each line is a series - a name, a colon and a value for each label - and the series are drawn side by side; without them, each line is one bar. Lines of several numbers without labels are counted 1, 2, 3 along the axis. Numbers may be apart by commas or by spaces.
- **Settings:** `labels` (also `categories`, `x labels`, `columns`); `x axis` and `y axis` (also `x title`, `horizontal axis`, `y title`, `vertical axis`) - the axes' titles; `range` (`y range`, `scale`) - the value axis' range; `stack` (`stacked`) - `on` to stack the series, `percent` to stack them to a hundred, `off`; `direction` (`orientation`, `bars`) - `up` (the default) or `right` for bars across the page; `values` (`value labels`, `numbers`) - `on` to write each bar's value.
- **Colours:** a colour in brackets after a series' name, `2026 [orange]: …`.

### Line charts

```
line A week of weather
labels: Mon, Tue, Wed, Thu, Fri, Sat, Sun
y axis: Degrees
points: on
Low: 3, 5, 4, 6, 7, 5, 4
High: 9, 11, 10, 12, 14, 13, 11
```

- **Data:** each line is a series, a value for each label; without labels the values are counted 1, 2, 3.
- **Settings:** `labels`, `x axis`, `y axis` and `range`, as a bar chart's; `shape` (also `curve`, `lines`) - `straight` (the default), `smooth` or `step`; `points` (`markers`, `dots`) - `on` to mark each value; `area` (`fill`, `filled`) - `on` to fill under each line; `stack` - `on` to stack the filled areas.

### Scatter charts

```
xy Height and weight
x axis: Height (cm)
y axis: Weight (kg)
trend: on
Team A: (160, 55), (165, 61), (170, 66), (175, 70)
Team B: (150, 48), (158, 53), (163, 60), (171, 63)
```

- **Data:** each line is a series of points, each a pair in brackets; a line of one point with a name of its own, `Rome: (12.5, 41.9)`, is a labelled point; a line of two numbers is one point. Old Dhole's `X: …` and `Y: …` lines are read as one series.
- **Settings:** `x axis`, `y axis` and `range` (the y axis'); `x range`; `trend` (also `fit`, `trend line`) - `on` to fit a straight line through each series, in its colour; `lines` (`connect`, `joined`) - `on` to join each series' points.

### Radar charts

```
radar Two phones
labels: Battery, Camera, Screen, Price, Weight
Phone A: 8, 6, 7, 5, 9
Phone B: 6, 9, 8, 4, 6
```

- **Data:** `labels` (also `spokes`, `axes`) names the spokes; each line is a subject, a value for each spoke.
- **Settings:** `labels` and `range`.

### Quadrant charts

```
quadrant What to build first
x axis: Little effort .. Much effort
y axis: Little value .. Much value
top left: Do now
top right: Plan
bottom left: Maybe
bottom right: Skip
Search: 0.3, 0.85
Dark mode [teal]: 0.2, 0.4
```

- **Settings:** `x axis` and `y axis` (also `x`, `horizontal`, `y`, `vertical`) - each axis' low end and high end, apart by `..`, `->`, `-->` or `to`; `top right`, `top left`, `bottom left`, `bottom right` (also `quadrant 1` to `quadrant 4`, `q1` to `q4`, counted as Mermaid counts them) - the quarters' names; `range` - the axes' range, `0..1` by default.
- **Points:** a name, a colon and its two values; brackets round the values are allowed. A point outside the range is drawn at its edge and warned of. A colour in brackets after the name colours the point.

### Sankey diagrams

```
sankey Energy in a small town
unit: GWh
Coal -> Power plant: 25
Gas -> Power plant: 18
Power plant -> Homes: 17
Power plant -> Industry: 20
```

- **Flows:** where from, an arrow, where to, a colon and how much. Mermaid's comma-separated `Coal, Power plant, 25` is read too. A flow that is not above zero is warned of and left out; flows that go round in a circle are said, and the one that closes the circle is left out.
- **Settings:** `unit` (also `units`) - written after every amount; `amounts` (`values`, `numbers`) - `off` to write only the nodes' names.
- **Colours:** a colour in brackets after a node's name colours the node and the flows from it, `Solar [yellow] -> Homes: 6`; after the amount, the one flow.
- **Drawn:** each node as tall as what passes through it, each band as wide as its flow, the nodes in columns by how far they are from a source and ordered to keep the bands from crossing.

### Tables

```
table Opening hours
| Day | Opens | Closes |
|-|:-:|-:|
| Monday | 9:00 | 17:30 |
| Saturday | 10:00 | 16:00 |
```

- **Rows:** as Markdown writes them - cells between bars, a line of dashes under the header saying how each column lines up (`:-` left, `:-:` centre, `-:` right) - or as comma-separated values, the first line the header. Old Dhole's `headers: A, B, C` is read too.
- **Drawn:** each column as wide as its widest cell, numbers lined up on the right unless the header line says otherwise. A row with more or fewer cells than the header is warned of.

### Boards

```
kanban This week
To do
  Write the report
  Book the hall [warn]
Doing
  Draw the plan [blue]
Done
  Order the chairs [good]
```

- **Columns** are the lines at the top, each with its cards indented under it; a colour in brackets after a column's name or a card's colours it.
- **Drawn:** columns side by side, each headed by its name and how many cards it holds, the cards stacked under it.

## Problems

Reading a text never stops at a problem. Each one is said as one line: where it is, what is wrong, and what to write instead.

```
Line 3, column 33: (warning) 'rond' is not something a step can be. Write 'round' if that is what you mean.
```

An **error** is a line Dhole cannot draw as written: it is left out, or drawn as far as it can be read. A **warning** is a line drawn as Dhole read it that was probably not meant that way. A text whose every line is wrong draws nothing, and Draw Dhole fails with its first problem.

Every problem Dhole says is in English and in Chinese, in the language of whoever reads it: the editor's card shows them in the editor's language, and a run's output gives the English, which reads the same on every machine. The words of the language itself - `flowchart`, `direction`, `note`, `after` - are English in every language, as a programming language's keywords are.

| Problem | Kind | Says | And |
|-|-|-|-|
| An empty text | error | There is nothing to draw. | Start with what to draw, such as flowchart, and write what it shows on the lines after. |
| A first word that names no kind | error | '‹word›' is not something Dhole draws. | Start with one of: flowchart, sequence, … |
| A misspelt kind | error | '‹word›' is not something Dhole draws, so this is drawn as a ‹kind›. | Write '‹word›' if a ‹kind› is what you mean. |
| A setting written twice | warning | ‹setting› was set before; the later setting is used. | Keep one of the two lines. |
| A setting with no value | error | ‹setting› needs a value after the colon. | Write the value after the colon, or remove the line. |
| Tabs and spaces together | warning | This line is indented with tabs and spaces together; a tab counts as four spaces. | Indent with spaces only, or with tabs only. |
| An unknown theme | error | There is no theme called '‹name›'. | The themes are: … |
| A direction that is none | error | '‹word›' is not a direction. | Write down, right, up or left. |
| A size that is none | error | '‹text›' is not a size. | Write the width and the height in pixels, such as 800 x 600. |
| A switch that is neither | error | '‹word›' is neither on nor off. | Write on or off; yes and no mean the same. |
| A number that is none | error | '‹text›' is not a number. | Write a number with a dot for its decimals, such as 12.5. |
| A range that is none | error | '‹text›' is not a range. | Write the lowest and the highest value with two dots between them, such as 0..100. |
| A date that is none | error | '‹text›' is not a date. | Write a date as year-month-day, such as 2026-11-02, with a time after it if you need one: 2026-11-02 14:30. |
| A length that is none | error | '‹text›' is not a length of time. | Write a number of days, weeks or hours, such as 3d, 2w or 4h. |
| A choice that is none | error | '‹word›' is not one of the choices for ‹setting›. | Write one of: … |
| A quotation mark not closed | error | The quotation mark is not closed. | End the quoted name with another quotation mark. |
| A bracket not closed | error | The [ is not closed. | End the list in brackets with ]. |
| A name missing | error | A name is missing here. | Write a name, or put one in quotation marks. |
| An unknown attribute | warning | '‹word›' is not something ‹a step› can be. | It can be: … |
| A misspelt attribute | warning | '‹word›' is not something ‹a step› can be. | Write '‹word›' if that is what you mean. |
| A misspelt setting | error | '‹word›' is not a setting, and its value is not a number, so this line is left out. | Write '‹setting›' if that is the setting you mean. |
| An arrow from nothing | error | The arrow comes from nothing. | Write what the arrow starts at before it. |
| An arrow to nothing | error | The arrow points at nothing. | Write what the arrow goes to after it. |
| An arrow the kind has not got | error | '‹arrow›' is not an arrow ‹a flowchart› has, so this line is left out. | The arrows are: … |
| A label between bars | error | A label goes after a colon at the end of the line, not between bars, so this line is left out. | Write it as A --> B: yes. |
| A name in Mermaid's shape brackets | warning | '‹name›' is written as Mermaid names a shape, so the brackets are drawn as part of its name. | Name it by its words and give its shape in brackets: ‹words› [‹shape›]. |
| Indented under nothing | warning | This line is indented under a line that holds nothing, so it is read as if it were not indented. | Remove the indentation, or indent it under a group. |
| An empty group | warning | '‹group›' holds nothing. | Indent what belongs to it under it. |
| A member outside a class | error | This member belongs to no class. | Indent it under the class it belongs to. |
| An attribute outside an entity | error | This attribute belongs to no entity. | Indent it under the entity it belongs to. |
| A count no end can have | error | '‹text›' is not a cardinality. | Write 1, 0..1, 1..* or * at each end of the line, such as 1-*. |
| A star outside a state diagram | error | A start or an end belongs to a state machine, not to ‹a flowchart›. | Use * only in a state diagram. |
| A note with nowhere to go | error | A note needs a place to go. | Write note over A, note left of A or note right of A, then a colon and the note. |
| A message without an arrow | error | A message goes from one participant to another with an arrow. | Write it as Alice -> Bob: Hello, or Bob --> Alice: Hi for a reply. |
| An else without an if | error | 'else' belongs straight after an 'if' block. | Put it at the same indentation as its 'if', after the lines indented under that. |
| An and without a par | error | 'and' belongs straight after a 'par' block. | Put it at the same indentation as its 'par', after the lines indented under that. |
| Lines under a message | warning | '‹line›' holds lines indented under it but is not a block. | A block starts with loop, if, else, opt, par, and, critical or break. |
| Several centres | warning | A mind map grows from one centre; the lines at the top after the first are drawn as its branches. | Indent them under the first, or give the map a title to be its centre. |
| An event without a time | error | This event has no time. | Write the time, a colon, then the event: 1969: The Moon landing. |
| A task after an unknown task | error | There is no task called '‹name›' to start after. | Name a task written in the chart, as it is written. |
| A task with no start | error | '‹task›' has no date to start from. | Give it a date, or write a start: setting such as start: 2026-11-02. |
| A task waiting for itself | error | '‹task›' waits for itself through the tasks it starts after. | Let one of those tasks start on a date instead. |
| A task ending before it starts | error | '‹task›' ends before it starts. | Give it an end after its start, or a length. |
| A task named twice | warning | There is already a task called '‹task›'. | Give each task a name of its own, so 'after' knows which is meant. |
| No data | error | There is no data to draw. | Write a line for each value: a name, a colon, then the value. |
| Values and labels that do not match | warning | '‹series›' has ‹n› values for ‹m› labels. | Give it one value for each label. |
| A slice or a flow not above zero | warning | '‹name›' is not above zero, so it has no slice. | Give every slice an amount above zero. |
| A point that is none | error | '‹text›' is not a point. | Write a point as two numbers in brackets, such as (3, 4.5). |
| A point outside the range | warning | '‹point›' lies outside the chart's range, so it is drawn at its edge. | Change its value, or the range: setting. |
| One value and several mixed | warning | '‹kind›' mixes lines with one value and lines with several. | Write every line with one value, or every line with a value for each label. |
| A flow without an amount | error | A flow needs an amount. | Write the amount after a colon: Coal -> Power: 25. |
| Flows in a circle | error | The flows go round in a circle through '‹node›', and a Sankey diagram flows one way. | Remove one of the flows that lead back. |
| A row of the wrong length | warning | This row has ‹n› cells and the header has ‹m›. | Give every row a cell for each column. |
| A diagram that could not be drawn | error | This ‹kind› could not be drawn: ‹why› | Simplify the lines it is drawn from; the text up to here is read as written. |
| Nothing between separators | warning | There is nothing between these separators. | Remove one of the --- lines, or write a diagram between them. |

## Drawing

Each diagram is laid out at the size its content needs, and the figure is made that size; `size:` makes it another. A chart of the plotting framework - a pie, bars, lines, points, a radar - is drawn by the framework's own layers, and every other kind is a drawing laid out by Dhole and placed in a chart as one layer, so all of them take the figure's theme, title, subtitle and caption alike. Several diagrams in one text are one figure of several charts.

The figure is what the plotting framework draws everywhere: the editor's preview, a picture at any resolution, an SVG, a PDF, a PowerPoint slide. A drawing has no chart of Office's own to become, so Save Chart writes a Dhole diagram to Office as a picture; a pie, bars and lines become Office's own charts.

## In Divooka

Three nodes in the Plotting toolbox's Dhole category: Draw Dhole, Describe Dhole and Write Dhole.

- **Draw Dhole** takes Dhole text and gives the chart, and on its Problems output each problem as a line; it fails only when nothing can be drawn, with the first problem as its message.
- **Describe Dhole** takes Dhole text and gives a sentence saying what it draws - `A flowchart of 8 steps and 9 arrows.` - the words a picture needs for someone who cannot see it.
- **Write Dhole** keeps its text on the node. Double-clicking it opens the editor's card on its text beside its picture, redrawn a moment after each change, with the text's problems under them in the editor's language; Done keeps the text on the node as one step Ctrl+Z undoes. It gives the chart and the problems as Draw Dhole does.

## What Dhole takes from Mermaid, and what it leaves

Mermaid showed that diagrams written as text are worth having, and Dhole takes its range of kinds: flowcharts, sequence, state, class and entity diagrams, mind maps, timelines, Gantt, pie, XY, quadrant and Sankey charts. It keeps its best ideas - a thing made where it is first named, `-->` for a dashed arrow, `*` for a state machine's start, a sequence block as a frame, Gantt tasks that start after others - and reads the spellings a Mermaid user brings where they cannot be mistaken: `graph TD`, `stateDiagram-v2`, `[*]`, `autonumber`, `alt`, `"Name" : 30`, `sankey-beta` and its commas, an entity diagram's `||--o{`. Syntax parity with Mermaid is not a goal, and a Mermaid text is not a Dhole text.

What Dhole does differently, and why:

- **One way to write a thing in every kind.** Mermaid writes a label four ways depending on the kind - `A -->|yes| B`, `A -- yes --> B`, `A ->> B: yes`, `A : yes` - and Dhole writes it one: after a colon at the end of the line. A label between bars is said, with the Dhole way to write it.
- **Shapes and colours in words.** Mermaid draws a shape with brackets - `[(db)]`, `{{hex}}`, `[/io/]` - that have to be learned and are hard to read back, and Dhole names the shape: `[database]`, `[hexagon]`, `[io]`. Colours are named the same way, and are the theme's colours rather than CSS. A name written in Mermaid's brackets, `C{Let me think}`, is drawn as it is written and warned of, with the Dhole way to write it: `Let me think [diamond]`.
- **Indentation means nesting, everywhere.** Mermaid closes a subgraph, a block, a class body and a composite state with `end` or a brace; Dhole closes all of them by indentation, as a mind map already does in Mermaid.
- **Problems that say where and how to mend them.** Mermaid stops at the first error with a parser's message; Dhole reads on, draws what it can, and says each problem in words with its line and its column.
- **Determinism.** The same text draws the same picture on every machine, which a picture checked into a document or a test needs.

What Dhole leaves out, and why:

- **Styling languages** - `classDef`, `style`, `linkStyle`, `%%{init}%%` and CSS: they make a diagram's look a second program inside the first. A Dhole diagram's look is its theme, and a text says only what its things mean (`[good]`, `[database]`).
- **HTML and Markdown in labels**, and **click handlers**: a picture is not a web page, and every output Dhole has - PNG, SVG, PDF, a slide - draws the same text the same way.
- **Git graphs, C4, requirement, user journey, block, packet and architecture diagrams, and ZenUML**: each is a narrow notation with a better tool of its own, or a flowchart with a different vocabulary, and each would add words that work in one kind only.
- **Mermaid's flowchart-only arrows** - `-.->`, `--o`, `--x`, `~~~` and links lengthened by extra dashes: Dhole has one dashed arrow, `-->`, and a line with no head, `--`; the others are said with the arrows a flowchart has.

What Dhole adds: tables, boards and radar charts, from the first Dhole; several diagrams in one text, drawn side by side; Gantt charts that skip weekends and holidays and draw the lines between dependent tasks; a mind map that hangs down as an organisation chart; and a sentence saying what every picture shows.
