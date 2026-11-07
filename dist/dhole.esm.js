//#region \0@oxc-project+runtime@0.153.0/helpers/esm/typeof.js
function e(t) {
	"@babel/helpers - typeof";
	return e = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
		return typeof e;
	} : function(e) {
		return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
	}, e(t);
}
//#endregion
//#region \0@oxc-project+runtime@0.153.0/helpers/esm/toPrimitive.js
function t(t, n) {
	if (e(t) != "object" || !t) return t;
	var r = t[Symbol.toPrimitive];
	if (r !== void 0) {
		var i = r.call(t, n || "default");
		if (e(i) != "object") return i;
		throw TypeError("@@toPrimitive must return a primitive value.");
	}
	return (n === "string" ? String : Number)(t);
}
//#endregion
//#region \0@oxc-project+runtime@0.153.0/helpers/esm/toPropertyKey.js
function n(n) {
	var r = t(n, "string");
	return e(r) == "symbol" ? r : r + "";
}
//#endregion
//#region \0@oxc-project+runtime@0.153.0/helpers/esm/defineProperty.js
function r(e, t, r) {
	return (t = n(t)) in e ? Object.defineProperty(e, t, {
		value: r,
		enumerable: !0,
		configurable: !0,
		writable: !0
	}) : e[t] = r, e;
}
//#endregion
//#region src/dhole/syntax/source.ts
function i(e) {
	return /\s/u.test(e);
}
var a = class e {
	constructor(t, n) {
		r(this, "number", void 0), r(this, "text", void 0), r(this, "indent", void 0), r(this, "hasTab", void 0), r(this, "hasSpace", void 0), r(this, "content", void 0), this.number = t, this.text = n;
		let a = 0, o = 0, c = !1, l = !1;
		for (; o < n.length && (n[o] === " " || n[o] === "	" || n[o] === "　");) n[o] === "	" ? (a += e.TabWidth - a % e.TabWidth, c = !0) : (a++, l = !0), o++;
		this.indent = a, this.hasTab = c, this.hasSpace = l;
		let u = n.length;
		for (; u > o && i(n[u - 1]);) u--;
		this.content = new s(this, o, u - o);
	}
	get isBlank() {
		return this.content.length === 0;
	}
	get isComment() {
		return this.content.length > 0 && this.text[this.content.start] === "#";
	}
	get isSeparator() {
		if (this.content.length < 3) return !1;
		for (let e = this.content.start; e < this.content.start + this.content.length; e++) if (this.text[e] !== "-") return !1;
		return !0;
	}
	toString() {
		return `${this.number}: ${this.text}`;
	}
};
r(a, "TabWidth", 4);
function o(e, t, n) {
	return Math.min(Math.max(e, t), n);
}
var s = class e {
	constructor(e, t, n) {
		r(this, "line", void 0), r(this, "start", void 0), r(this, "length", void 0), this.line = e, this.start = t, this.length = n;
	}
	get text() {
		return this.length <= 0 ? "" : this.line.text.substring(this.start, this.start + this.length);
	}
	get column() {
		return this.start + 1;
	}
	get end() {
		return this.start + this.length;
	}
	get isEmpty() {
		return this.length <= 0;
	}
	at(e) {
		return this.line.text[this.start + e];
	}
	from(t) {
		let n = o(t, 0, this.length);
		return new e(this.line, this.start + n, this.length - n);
	}
	slice(t, n) {
		let r = o(t, 0, this.length);
		return new e(this.line, this.start + r, o(n, 0, this.length - r));
	}
	trim() {
		let t = this.start, n = this.end;
		for (; t < n && i(this.line.text[t]);) t++;
		for (; n > t && i(this.line.text[n - 1]);) n--;
		return new e(this.line, t, n - t);
	}
	startsWith(e) {
		return this.length >= e.length && this.line.text.substr(this.start, e.length).toLowerCase() === e.toLowerCase();
	}
	to(t) {
		return new e(this.line, this.start, Math.max(0, t.end - this.start));
	}
	toString() {
		return this.text;
	}
}, c = class e {
	constructor(e) {
		r(this, "line", void 0), r(this, "children", []), r(this, "parent", null), this.line = e;
	}
	get content() {
		return this.line.content;
	}
	static forest(t) {
		let n = [], r = [];
		for (let i of t) {
			let t = new e(i);
			for (; r.length > 0 && r[r.length - 1].line.indent >= i.indent;) r.pop();
			r.length === 0 ? n.push(t) : (t.parent = r[r.length - 1], r[r.length - 1].children.push(t)), r.push(t);
		}
		return n;
	}
	toString() {
		return this.line.toString();
	}
}, l = class {
	constructor(e, t) {
		r(this, "english", void 0), r(this, "chinese", void 0), this.english = e, this.chinese = t;
	}
	in(e) {
		return f(e) ? this.chinese : this.english;
	}
	toString() {
		return this.english;
	}
}, u = "English", d = "Chinese";
function f(e) {
	if (!e) return !1;
	let t = e.toLowerCase();
	return t.startsWith("zh") || t.startsWith("chinese") || e.includes("中");
}
var p = {
	Empty: [
		"There is nothing to draw.",
		"Start with what to draw, such as flowchart, and write what it shows on the lines after.",
		"没有可以绘制的内容。",
		"先写要绘制什么（例如 flowchart），再在后面几行写出它的内容。"
	],
	NoKind: [
		"'{0}' is not something Dhole draws.",
		"Start with one of: {1}.",
		"“{0}”不是 Dhole 能绘制的图。",
		"以下列之一开头：{1}。"
	],
	KindGuessed: [
		"'{0}' is not something Dhole draws, so this is drawn as a {1}.",
		"Write '{2}' if a {1} is what you mean.",
		"“{0}”不是 Dhole 能绘制的图，因此按{1}绘制。",
		"如果要的就是{1}，请写“{2}”。"
	],
	SettingRepeated: [
		"{0} was set before; the later setting is used.",
		"Keep one of the two lines.",
		"{0}之前已经设置过，使用后面的设置。",
		"两行中只保留一行。"
	],
	SettingNeedsValue: [
		"{0} needs a value after the colon.",
		"Write the value after the colon, or remove the line.",
		"{0}的冒号后面需要一个值。",
		"在冒号后写出值，或删除这一行。"
	],
	MixedIndentation: [
		"This line is indented with tabs and spaces together; a tab counts as four spaces.",
		"Indent with spaces only, or with tabs only.",
		"这一行的缩进混用了制表符和空格；一个制表符按四个空格计算。",
		"只用空格缩进，或只用制表符缩进。"
	],
	BadTheme: [
		"There is no theme called '{0}'.",
		"The themes are: {1}.",
		"没有名为“{0}”的主题。",
		"可用的主题：{1}。"
	],
	BadDirection: [
		"'{0}' is not a direction.",
		"Write down, right, up or left.",
		"“{0}”不是方向。",
		"请写 down、right、up 或 left。"
	],
	BadSize: [
		"'{0}' is not a size.",
		"Write the width and the height in pixels, such as 800 x 600.",
		"“{0}”不是尺寸。",
		"以像素写出宽和高，例如 800 x 600。"
	],
	BadSwitch: [
		"'{0}' is neither on nor off.",
		"Write on or off; yes and no mean the same.",
		"“{0}”既不是 on 也不是 off。",
		"请写 on 或 off；yes 和 no 的意思相同。"
	],
	BadNumber: [
		"'{0}' is not a number.",
		"Write a number with a dot for its decimals, such as 12.5.",
		"“{0}”不是数字。",
		"请写数字，小数用点表示，例如 12.5。"
	],
	BadRange: [
		"'{0}' is not a range.",
		"Write the lowest and the highest value with two dots between them, such as 0..100.",
		"“{0}”不是范围。",
		"写出最小值和最大值，中间用两个点隔开，例如 0..100。"
	],
	BadDate: [
		"'{0}' is not a date.",
		"Write a date as year-month-day, such as 2026-11-02, with a time after it if you need one: 2026-11-02 14:30.",
		"“{0}”不是日期。",
		"按“年-月-日”写日期，例如 2026-11-02；需要时可以在后面加上时间：2026-11-02 14:30。"
	],
	BadDuration: [
		"'{0}' is not a length of time.",
		"Write a number of days, weeks or hours, such as 3d, 2w or 4h.",
		"“{0}”不是时长。",
		"写出天数、周数或小时数，例如 3d、2w 或 4h。"
	],
	BadChoice: [
		"'{0}' is not one of the choices for {1}.",
		"Write one of: {2}.",
		"“{0}”不是{1}的可选值。",
		"请写以下之一：{2}。"
	],
	UnclosedQuote: [
		"The quotation mark is not closed.",
		"End the quoted name with another quotation mark.",
		"引号没有闭合。",
		"在带引号的名称末尾再加一个引号。"
	],
	UnclosedBracket: [
		"The [ is not closed.",
		"End the list in brackets with ].",
		"“[”没有闭合。",
		"用“]”结束方括号中的列表。"
	],
	EmptyName: [
		"A name is missing here.",
		"Write a name, or put one in quotation marks.",
		"这里缺少名称。",
		"写出名称，或把名称放在引号中。"
	],
	UnknownAttribute: [
		"'{0}' is not something {1} can be.",
		"It can be: {2}.",
		"{1}不能是“{0}”。",
		"可以是：{2}。"
	],
	AttributeGuessed: [
		"'{0}' is not something {1} can be.",
		"Write '{2}' if that is what you mean.",
		"{1}不能是“{0}”。",
		"如果要的是“{2}”，请这样写。"
	],
	SettingGuessed: [
		"'{0}' is not a setting, and its value is not a number, so this line is left out.",
		"Write '{1}' if that is the setting you mean.",
		"“{0}”不是设置，它的值也不是数字，因此略去这一行。",
		"如果要的是“{1}”设置，请这样写。"
	],
	ArrowFromNothing: [
		"The arrow comes from nothing.",
		"Write what the arrow starts at before it.",
		"箭头没有起点。",
		"在箭头前写出它的起点。"
	],
	ArrowToNothing: [
		"The arrow points at nothing.",
		"Write what the arrow goes to after it.",
		"箭头没有终点。",
		"在箭头后写出它指向的对象。"
	],
	UnknownArrow: [
		"'{0}' is not an arrow {1} has, so this line is left out.",
		"The arrows are: {2}.",
		"{1}没有“{0}”这种箭头，因此略去这一行。",
		"可用的箭头：{2}。"
	],
	LabelBetweenBars: [
		"A label goes after a colon at the end of the line, not between bars, so this line is left out.",
		"Write it as A --> B: yes.",
		"标签写在行尾的冒号后面，而不是竖线之间，因此略去这一行。",
		"写成 A --> B: yes。"
	],
	MermaidShape: [
		"'{0}' is written as Mermaid names a shape, so the brackets are drawn as part of its name.",
		"Name it by its words and give its shape in brackets: {1} [{2}].",
		"“{0}”是 Mermaid 表示形状的写法，括号会作为名称的一部分画出来。",
		"用文字命名，并在方括号中写出形状：{1} [{2}]。"
	],
	IndentedUnderNothing: [
		"This line is indented under a line that holds nothing, so it is read as if it were not indented.",
		"Remove the indentation, or indent it under a group.",
		"这一行缩进在一个不能包含内容的行下面，因此按未缩进处理。",
		"去掉缩进，或把它缩进到一个组下面。"
	],
	EmptyGroup: [
		"'{0}' holds nothing.",
		"Indent what belongs to it under it.",
		"“{0}”中没有任何内容。",
		"把属于它的内容缩进写在它下面。"
	],
	MemberOutsideClass: [
		"This member belongs to no class.",
		"Indent it under the class it belongs to.",
		"这个成员不属于任何类。",
		"把它缩进写在所属的类下面。"
	],
	AttributeOutsideEntity: [
		"This attribute belongs to no entity.",
		"Indent it under the entity it belongs to.",
		"这个属性不属于任何实体。",
		"把它缩进写在所属的实体下面。"
	],
	BadCardinality: [
		"'{0}' is not a cardinality.",
		"Write 1, 0..1, 1..* or * at each end of the line, such as 1-*.",
		"“{0}”不是基数。",
		"在连线两端写 1、0..1、1..* 或 *，例如 1-*。"
	],
	StartInsideNothing: [
		"A start or an end belongs to a state machine, not to {0}.",
		"Use * only in a state diagram.",
		"起点和终点只属于状态机，不属于{0}。",
		"只在状态图中使用 *。"
	],
	NoteNeedsTarget: [
		"A note needs a place to go.",
		"Write note over A, note left of A or note right of A, then a colon and the note.",
		"注释需要一个位置。",
		"写 note over A、note left of A 或 note right of A，再写冒号和注释内容。"
	],
	MessageNeedsArrow: [
		"A message goes from one participant to another with an arrow.",
		"Write it as Alice -> Bob: Hello, or Bob --> Alice: Hi for a reply.",
		"消息要用箭头从一个参与者指向另一个。",
		"写成 Alice -> Bob: Hello；回复写成 Bob --> Alice: Hi。"
	],
	ElseWithoutIf: [
		"'else' belongs straight after an 'if' block.",
		"Put it at the same indentation as its 'if', after the lines indented under that.",
		"“else”必须紧跟在“if”块之后。",
		"把它与对应的“if”对齐，写在“if”下缩进的各行之后。"
	],
	AndWithoutPar: [
		"'and' belongs straight after a 'par' block.",
		"Put it at the same indentation as its 'par', after the lines indented under that.",
		"“and”必须紧跟在“par”块之后。",
		"把它与对应的“par”对齐，写在“par”下缩进的各行之后。"
	],
	UnknownBlock: [
		"'{0}' holds lines indented under it but is not a block.",
		"A block starts with loop, if, else, opt, par, and, critical or break.",
		"“{0}”下面有缩进的行，但它不是一个块。",
		"块以 loop、if、else、opt、par、and、critical 或 break 开头。"
	],
	SeveralRoots: [
		"A mind map grows from one centre; the lines at the top after the first are drawn as its branches.",
		"Indent them under the first, or give the map a title to be its centre.",
		"思维导图只有一个中心；顶层第一行之后的各行被画成它的分支。",
		"把它们缩进到第一行下面，或给导图写一个标题作为中心。"
	],
	EventWithoutTime: [
		"This event has no time.",
		"Write the time, a colon, then the event: 1969: The Moon landing.",
		"这个事件没有时间。",
		"先写时间，再写冒号和事件，例如 1969: 登月。"
	],
	UnknownTask: [
		"There is no task called '{0}' to start after.",
		"Name a task written in the chart, as it is written.",
		"没有名为“{0}”的任务可以接在后面。",
		"写出图中已有任务的名称，与原文一致。"
	],
	NoStartDate: [
		"'{0}' has no date to start from.",
		"Give it a date, or write a start: setting such as start: 2026-11-02.",
		"“{0}”没有开始日期。",
		"给它一个日期，或写一个 start: 设置，例如 start: 2026-11-02。"
	],
	StartsAfterItself: [
		"'{0}' waits for itself through the tasks it starts after.",
		"Let one of those tasks start on a date instead.",
		"“{0}”通过它所等待的任务，最终在等待它自己。",
		"让其中一个任务改为从某个日期开始。"
	],
	EndsBeforeStart: [
		"'{0}' ends before it starts.",
		"Give it an end after its start, or a length.",
		"“{0}”在开始之前就结束了。",
		"给它一个晚于开始的结束日期，或者一个时长。"
	],
	TaskRepeated: [
		"There is already a task called '{0}'.",
		"Give each task a name of its own, so 'after' knows which is meant.",
		"已经有一个名为“{0}”的任务。",
		"每个任务使用不同的名称，以便“after”知道指的是哪一个。"
	],
	NoData: [
		"There is no data to draw.",
		"Write a line for each value: a name, a colon, then the value.",
		"没有可以绘制的数据。",
		"每个值写一行：名称、冒号，然后是值。"
	],
	ValueCountMismatch: [
		"'{0}' has {1} values for {2} labels.",
		"Give it one value for each label.",
		"“{0}”有 {1} 个值，但标签有 {2} 个。",
		"为每个标签给出一个值。"
	],
	SliceNotPositive: [
		"'{0}' is not above zero, so it has no slice.",
		"Give every slice an amount above zero.",
		"“{0}”不大于零，因此没有扇区。",
		"每个扇区的数量都要大于零。"
	],
	PointNotPair: [
		"'{0}' is not a point.",
		"Write a point as two numbers in brackets, such as (3, 4.5).",
		"“{0}”不是一个点。",
		"用括号写出两个数表示一个点，例如 (3, 4.5)。"
	],
	OutsideRange: [
		"'{0}' lies outside the chart's range, so it is drawn at its edge.",
		"Change its value, or the range: setting.",
		"“{0}”超出了图的范围，因此画在边缘上。",
		"修改它的值，或修改 range: 设置。"
	],
	MixedSeries: [
		"'{0}' mixes lines with one value and lines with several.",
		"Write every line with one value, or every line with a value for each label.",
		"“{0}”混用了单值行和多值行。",
		"要么每行只写一个值，要么每行都为每个标签写一个值。"
	],
	FlowNeedsAmount: [
		"A flow needs an amount.",
		"Write the amount after a colon: Coal -> Power: 25.",
		"流需要一个数量。",
		"在冒号后写出数量，例如 Coal -> Power: 25。"
	],
	FlowsInACircle: [
		"The flows go round in a circle through '{0}', and a Sankey diagram flows one way.",
		"Remove one of the flows that lead back.",
		"这些流经由“{0}”绕成了一个圈，而桑基图只能单向流动。",
		"删除一条回流。"
	],
	RowLengthMismatch: [
		"This row has {0} cells and the header has {1}.",
		"Give every row a cell for each column.",
		"这一行有 {0} 个单元格，而表头有 {1} 个。",
		"每一行都为每一列写一个单元格。"
	],
	CouldNotDraw: [
		"This {0} could not be drawn: {1}",
		"Simplify the lines it is drawn from; the text up to here is read as written.",
		"这个{0}无法绘制：{1}",
		"简化用来绘制它的各行；到这里为止的内容都按原文读取。"
	],
	SeparatorWithoutDiagram: [
		"There is nothing between these separators.",
		"Remove one of the --- lines, or write a diagram between them.",
		"这两条分隔线之间没有内容。",
		"删除其中一行 ---，或在它们之间写一个图。"
	],
	NotDrawnHere: [
		"A {0} is drawn in Divooka, but not on a web page yet, so it is left out here.",
		"Draw this one in Divooka; the other diagrams in the text are drawn.",
		"{0}可以在 Divooka 中绘制，但网页上暂时还不能绘制，因此这里略去。",
		"请在 Divooka 中绘制它；文本中的其他图照常绘制。"
	]
};
function m(e) {
	return f(e) ? "第 {0} 行第 {1} 列：" : "Line {0}, column {1}: ";
}
function h(e) {
	return f(e) ? "（警告）" : "(warning) ";
}
function g(e, t) {
	let n = p[e];
	return n ? f(t) ? n[2] : n[0] : e;
}
function _(e, t) {
	let n = p[e];
	return n ? f(t) ? n[3] : n[1] : "";
}
function v(e) {
	if (!Number.isFinite(e)) return String(e);
	let t = Math.round(e * 1e3) / 1e3;
	return (Object.is(t, -0) ? 0 : t).toString();
}
function y(e, t, n) {
	if (t.length === 0) return e;
	let r = t.map((e) => {
		if (e instanceof l) return e.in(n);
		if (Array.isArray(e)) {
			let t = f(n) ? "、" : ", ";
			return e.map((e) => e instanceof l ? e.in(n) : e).join(t);
		}
		return typeof e == "number" ? v(e) : String(e);
	});
	return e.replace(/\{(\d+)\}/g, (e, t) => {
		let n = Number(t);
		return n < r.length ? r[n] : e;
	});
}
var b = class {
	constructor(e, t, n, i, a, o) {
		r(this, "severity", void 0), r(this, "line", void 0), r(this, "column", void 0), r(this, "length", void 0), r(this, "code", void 0), r(this, "args", void 0), this.severity = e, this.line = t, this.column = n, this.length = Math.max(1, i), this.code = a, this.args = o;
	}
	get message() {
		return this.messageIn(u);
	}
	get hint() {
		return this.hintIn(u);
	}
	messageIn(e) {
		return y(g(this.code, e), this.args, e);
	}
	hintIn(e) {
		return y(_(this.code, e), this.args, e);
	}
	describe(e = u) {
		let t = this.hintIn(e), n = m(e).replace("{0}", String(this.line)).replace("{1}", String(this.column)), r = this.severity === "warning" ? h(e) : "", i = f(e) ? "" : " ";
		return t.length === 0 ? `${n}${r}${this.messageIn(e)}` : `${n}${r}${this.messageIn(e)}${i}${t}`;
	}
	toString() {
		return this.describe(u);
	}
}, x = class {
	constructor() {
		r(this, "problems", []), r(this, "seen", /* @__PURE__ */ new Set());
	}
	get all() {
		return this.problems.map((e, t) => ({
			p: e,
			i: t
		})).sort((e, t) => e.p.line - t.p.line || e.p.column - t.p.column || e.i - t.i).map((e) => e.p);
	}
	get hasErrors() {
		return this.problems.some((e) => e.severity === "error");
	}
	get count() {
		return this.problems.length;
	}
	error(e, t, ...n) {
		this.add("error", e.line.number, e.column, e.length, t, n);
	}
	warning(e, t, ...n) {
		this.add("warning", e.line.number, e.column, e.length, t, n);
	}
	errorAt(e, t, n, r, ...i) {
		this.add("error", e, t, n, r, i);
	}
	warningAt(e, t, n, r, ...i) {
		this.add("warning", e, t, n, r, i);
	}
	add(e, t, n, r, i, a) {
		let o = `${t}:${n}:${i}`;
		this.seen.has(o) || (this.seen.add(o), this.problems.push(new b(e, t, n, r, i, a)));
	}
}, S;
function C(e, t, n, r, i = !1) {
	return {
		token: e,
		line: t,
		tail: n,
		tip: r,
		spaced: i
	};
}
var w = class {
	constructor(e, t = !1) {
		r(this, "forms", void 0), r(this, "cardinalities", void 0), this.forms = [...e].map((e, t) => ({
			f: e,
			i: t
		})).sort((e, t) => t.f.token.length - e.f.token.length || e.i - t.i).map((e) => e.f), this.cardinalities = t;
	}
	get names() {
		let e = [];
		for (let t of this.forms) e.includes(t.token) || e.push(t.token);
		return this.cardinalities ? [
			...e,
			"1-*",
			"0..1-1"
		] : e;
	}
};
S = w, r(w, "plain", new S(T())), r(w, "classes", new S([
	...T(),
	C("<|-", "solid", "triangle", "none", !0),
	C("<|--", "solid", "triangle", "none", !0),
	C("-|>", "solid", "none", "triangle", !0),
	C("--|>", "solid", "none", "triangle", !0),
	C("<|..", "dashed", "triangle", "none", !0),
	C("..|>", "dashed", "none", "triangle", !0),
	C("*-", "solid", "diamond", "none", !0),
	C("*--", "solid", "diamond", "none", !0),
	C("-*", "solid", "none", "diamond", !0),
	C("--*", "solid", "none", "diamond", !0),
	C("o-", "solid", "hollowDiamond", "none", !0),
	C("o--", "solid", "hollowDiamond", "none", !0),
	C("-o", "solid", "none", "hollowDiamond", !0),
	C("--o", "solid", "none", "hollowDiamond", !0)
], !0)), r(w, "entities", new S(T(), !0));
function T() {
	return [
		C("->", "solid", "none", "arrow"),
		C("->>", "solid", "none", "arrow"),
		C("-->", "dashed", "none", "arrow"),
		C("-->>", "dashed", "none", "arrow"),
		C("..>", "dashed", "none", "arrow"),
		C("=>", "thick", "none", "arrow"),
		C("==>", "thick", "none", "arrow"),
		C("<-", "solid", "arrow", "none"),
		C("<--", "dashed", "arrow", "none"),
		C("<..", "dashed", "arrow", "none"),
		C("<->", "solid", "arrow", "arrow"),
		C("<-->", "dashed", "arrow", "arrow"),
		C("<=>", "thick", "arrow", "arrow"),
		C("--", "solid", "none", "none", !0),
		C("---", "solid", "none", "none", !0),
		C("..", "dashed", "none", "none", !0),
		C("==", "thick", "none", "none", !0)
	];
}
function ee(e) {
	return e === "\"" || e === "“";
}
function te(e, t) {
	return t === "\"" ? e === "\"" : e === "”" || e === "\"";
}
function ne(e, t, n) {
	let r = "", i = 0, a = 0;
	for (let o = 0; o < e.length; o++) {
		let s = e.at(o);
		if (r !== "") {
			if (s === "\\" && o + 1 < e.length) {
				o++;
				continue;
			}
			te(s, r) && (r = "");
		} else if (ee(s)) r = s;
		else if (s === "[") i++;
		else if (s === "]" && i > 0) i--;
		else {
			if (t) {
				if (s === "(") {
					a++;
					continue;
				}
				if (s === ")" && a > 0) {
					a--;
					continue;
				}
			}
			if (!(i > 0 || a > 0) && !n(o)) return !1;
		}
	}
	return !0;
}
function re(e, t, n = !1) {
	let r = -1;
	return ne(e, n, (n) => e.at(n) !== t || (r = n, !1)), r;
}
function E(e, t = !1) {
	let n = -1, r = -1;
	return ne(e, t, (t) => {
		let a = e.at(t);
		return a !== ":" && a !== "：" || (r < 0 && (r = t), a === "：" || t + 1 === e.length || i(e.at(t + 1)) ? (n = t, !1) : !0);
	}), n < 0 && (n = r), n < 0 ? {
		head: e.trim(),
		tail: null
	} : {
		head: e.slice(0, n).trim(),
		tail: e.from(n + 1).trim()
	};
}
function ie(e, t = ",") {
	let n = [], r = 0;
	return ne(e, !0, (i) => {
		let a = e.at(i);
		return (a === t || t === "," && a === "，" || t === ";" && a === "；") && (n.push(e.slice(r, i - r).trim()), r = i + 1), !0;
	}), n.push(e.from(r).trim()), n;
}
function D(e, t) {
	let n = e.trim();
	if (n.length === 0) return "";
	if (!ee(n.at(0))) return n.text;
	let r = n.at(0), i = "";
	for (let e = 1; e < n.length; e++) {
		let t = n.at(e);
		if (t === "\\" && e + 1 < n.length && (n.at(e + 1) === "\"" || n.at(e + 1) === "\\")) i += n.at(++e);
		else {
			if (te(t, r)) return e + 1 < n.length && (i += n.from(e + 1).text), i.trim();
			i += t;
		}
	}
	return t.error(n.slice(0, 1), "UnclosedQuote"), i.trim();
}
var ae = /^[\p{L}\p{N}_]+(?:\{\{(?<hexagon>.+)\}\}|\{(?<diamond>.+)\}|\(\((?<circle>.+)\)\)|\(\[(?<pill>.+)\]\))$/u;
function O(e, t) {
	let n = e.trim(), r = [], i = n;
	if (n.length > 0 && n.at(n.length - 1) === "]") {
		let e = ce(n);
		if (e >= 0) {
			for (let t of ie(n.slice(e + 1, n.length - e - 2))) t.isEmpty || r.push(t);
			i = n.slice(0, e).trim();
		}
	} else if (re(n, "]") < 0 && !ae.test(n.text)) {
		let e = le(n);
		if (e >= 0) {
			t.error(n.slice(e, 1), "UnclosedBracket");
			for (let t of ie(n.from(e + 1))) t.isEmpty || r.push(t);
			i = n.slice(0, e).trim();
		}
	}
	return oe(i, t), {
		whole: n,
		nameSpan: i,
		name: D(i, t),
		attributes: r
	};
}
function oe(e, t) {
	if (e.isEmpty || ee(e.at(0))) return;
	let n = ae.exec(e.text);
	if (!n || !n.groups) return;
	let r = n.groups, i = r.hexagon === void 0 ? r.diamond === void 0 ? r.circle === void 0 ? [r.pill ?? "", "pill"] : [r.circle, "circle"] : [r.diamond, "diamond"] : [r.hexagon, "hexagon"];
	t.warning(e, "MermaidShape", e.text, i[0].trim(), i[1]);
}
function se(e, t) {
	let n = O(e, t);
	return {
		remainder: n.nameSpan,
		attributes: [...n.attributes]
	};
}
function ce(e) {
	let t = 0, n = !1;
	for (let r = e.length - 1; r >= 0; r--) {
		let i = e.at(r);
		if (i === "\"" && (n = !n), !n) {
			if (i === "]") t++;
			else if (i === "[" && --t === 0) return r;
		}
	}
	return -1;
}
function le(e) {
	let t = !1;
	for (let n = 0; n < e.length; n++) if (e.at(n) === "\"" && (t = !t), !t && e.at(n) === "[") return n;
	return -1;
}
var ue = /^(?<tail>0\.\.1|1\.\.\*|0\.\.\*|0\.\.n|1\.\.n|1|\*|n|many)(?<line>-{1,3})(?<tip>0\.\.1|1\.\.\*|0\.\.\*|0\.\.n|1\.\.n|1|\*|n|many)$/i, de = /^(?<tail>\|o|\|\||\}o|\}\|)(?<line>--|\.\.)(?<tip>o\||\|\||o\{|\|\{)$/;
function fe(e) {
	switch (e) {
		case "||": return "1";
		case "|o":
		case "o|": return "0..1";
		case "}|":
		case "|{": return "1..*";
		default: return "*";
	}
}
function pe(e) {
	switch (e.toLowerCase()) {
		case "1": return "1";
		case "0..1": return "0..1";
		case "1..*":
		case "1..n": return "1..*";
		default: return "*";
	}
}
function me(e, t) {
	let n = [], r = [], i = 0, a = -1;
	return ne(e, !0, (o) => {
		if (o < a) return !0;
		let s = he(e, o, t);
		return s && (n.push(e.slice(i, o - i).trim()), r.push({
			token: e.slice(o, s.length),
			form: s.form,
			tailCard: s.tailCard,
			tipCard: s.tipCard
		}), i = o + s.length, a = o + s.length), !0;
	}), n.push(e.from(i).trim()), {
		pieces: n,
		arrows: r
	};
}
function he(e, t, n) {
	let r = t === 0 || i(e.at(t - 1));
	if (n.cardinalities && r) {
		let n = t;
		for (; n < e.length && !i(e.at(n));) n++;
		let r = e.slice(t, n - t).text, a = ue.exec(r);
		if (a && a.groups) return {
			form: C(a[0], "solid", "none", "none", !0),
			length: n - t,
			tailCard: pe(a.groups.tail),
			tipCard: pe(a.groups.tip)
		};
		let o = de.exec(r);
		if (o && o.groups) return {
			form: C(o[0], o.groups.line === ".." ? "dashed" : "solid", "none", "none", !0),
			length: n - t,
			tailCard: fe(o.groups.tail),
			tipCard: fe(o.groups.tip)
		};
	}
	for (let a of n.forms) if (!(t + a.token.length > e.length || e.line.text.substr(e.start + t, a.token.length) !== a.token)) {
		if (a.spaced) {
			let n = t + a.token.length === e.length || i(e.at(t + a.token.length));
			if (!r || !n) continue;
		}
		return {
			form: a,
			length: a.token.length,
			tailCard: null,
			tipCard: null
		};
	}
	return null;
}
var ge = /^(?:<\||[<*ox])?[-=.~]+(?:\|>|[>*ox])?$/, _e = /^(?:\d+|n|m|\*|many)(?:\.\.(?:\d+|n|m|\*|many))?-{1,3}(?:\d+|n|m|\*|many)(?:\.\.(?:\d+|n|m|\*|many))?$/i;
function ve(e) {
	let t = -1;
	for (let n = 0; n <= e.length; n++) {
		let r = n === e.length || i(e.at(n));
		if (!r && t < 0) t = n;
		else if (r && t >= 0) {
			let r = e.slice(t, n - t);
			if (_e.test(r.text) && !ue.test(r.text)) return r;
			t = -1;
		}
	}
	return null;
}
function ye(e, t) {
	let n = null, r = -1, a = -2, o = (r, i) => {
		if (n !== null || r < 0 || i - r < 2) return;
		let a = e.slice(r, i - r), o = a.text;
		if (!ge.test(o)) return;
		let s = o[0], c = o[o.length - 1], l = s === "x" || s === "o" || s === "*" || c === "x" || c === "o" || c === "*";
		[...o].filter((e) => e === "-" || e === "=" || e === "." || e === "~").length < 2 && !o.includes(">") && !o.includes("<") && !l || t.forms.some((e) => e.token === o) || t.cardinalities && ue.test(o) || (n = a);
	};
	return ne(e, !0, (t) => (t !== a + 1 && (o(r, a + 1), r = -1), i(e.at(t)) ? (o(r, t), r = -1) : r < 0 && (r = t), a = t, !0)), o(r, a + 1), n;
}
function be(e) {
	for (let t = 1; t < e.length; t++) {
		let n = e[t];
		if (n.length > 1 && n.at(0) === "|") {
			let e = n.text.indexOf("|", 1);
			if (e > 0) return n.slice(0, e + 1);
		}
	}
	return null;
}
function k(e) {
	let t = "";
	for (let n of e) /[\p{L}\p{N}]/u.test(n) && (t += n.toLowerCase());
	return t;
}
function xe(e) {
	return /\p{Nd}/u.test(e);
}
var Se = /^[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?$/;
function Ce(e, t = !1) {
	let n = e.trim().replaceAll("_", "").replaceAll("−", "-"), r = n.endsWith("%");
	if (r && (n = n.slice(0, -1).trimEnd()), n = n.trim(), !Se.test(n)) return NaN;
	let i = Number(n);
	return Number.isFinite(i) ? (r && t && (i /= 100), i) : NaN;
}
function we(e) {
	let t = e.trim(), n = /^(\d{4})-(\d{1,2})-(\d{1,2})(?:([ T])(\d{1,2}):(\d{2})(?::(\d{2}))?)?$/.exec(t);
	if (n) {
		let [, e, t, r, i, a, o, s] = n, c = t.length === 2 && r.length === 2;
		if (i !== void 0) {
			let e = c && a.length === 2;
			if (s !== void 0 && !e || i === "T" && !e || i === " " && !e && s === void 0 && a.length > 2) return NaN;
		}
		return Te(+e, +t, +r, a === void 0 ? 0 : +a, o === void 0 ? 0 : +o, s === void 0 ? 0 : +s);
	}
	return n = /^(\d{4})\/(\d{1,2})\/(\d{1,2})$/.exec(t), n ? Te(+n[1], +n[2], +n[3], 0, 0, 0) : (n = /^(\d{4})-(\d{2})$/.exec(t), n ? Te(+n[1], +n[2], 1, 0, 0, 0) : (n = /^(\d{4})$/.exec(t), n ? Te(+n[1], 1, 1, 0, 0, 0) : NaN));
}
function Te(e, t, n, r, i, a) {
	if (e < 1 || t < 1 || t > 12 || n < 1 || r > 23 || i > 59 || a > 59 || n > new Date(Date.UTC(e, t, 0)).getUTCDate()) return NaN;
	let o = /* @__PURE__ */ new Date(0);
	return o.setUTCFullYear(e, t - 1, n), o.setUTCHours(r, i, a, 0), o.getTime();
}
var A = 864e5;
function Ee(e) {
	if (!/^\s*(?:\d+(?:\.\d+)?\s*(?:d|day|days|w|wk|week|weeks|h|hr|hour|hours|min|mins|minute|minutes)\s*)+$/i.test(e)) return NaN;
	let t = 0;
	for (let n of e.matchAll(/(\d+(?:\.\d+)?)\s*(d|days|day|weeks|week|wk|w|hours|hour|hr|h|minutes|minute|mins|min)(?![a-z])/gi)) {
		let e = Number(n[1]);
		switch (n[2].toLowerCase()[0]) {
			case "w":
				t += 7 * e * A;
				break;
			case "h":
				t += e * 36e5;
				break;
			case "m":
				t += e * 6e4;
				break;
			default: t += e * A;
		}
	}
	return t;
}
function De(e) {
	switch (k(e)) {
		case "on":
		case "yes":
		case "true":
		case "show":
		case "y":
		case "1": return !0;
		case "off":
		case "no":
		case "false":
		case "hide":
		case "none":
		case "n":
		case "0": return !1;
		default: return null;
	}
}
function Oe(e) {
	let t = e.trim();
	for (let e of [
		"..",
		" to ",
		"–",
		"—",
		"~"
	]) {
		let n = t.toLowerCase().indexOf(e);
		if (n > 0) {
			let r = Ce(t.slice(0, n)), i = Ce(t.slice(n + e.length));
			if (!Number.isNaN(r) && !Number.isNaN(i)) return r > i && ([r, i] = [i, r]), r < i ? {
				low: r,
				high: i
			} : null;
		}
	}
	return null;
}
var ke = /^\s*(?<w>\d+(?:\.\d+)?)\s*(?:x|×|\*|,|by)\s*(?<h>\d+(?:\.\d+)?)\s*(?:px)?\s*$/i;
function Ae(e) {
	let t = ke.exec(e);
	if (!t || !t.groups) return null;
	let n = Number(t.groups.w), r = Number(t.groups.h);
	return n >= 50 && r >= 50 && n <= 2e4 && r <= 2e4 ? {
		width: n,
		height: r
	} : null;
}
function je(e, t) {
	e = e.toLowerCase(), t = t.toLowerCase();
	let n = Array(t.length + 1).fill(0), r = Array(t.length + 1).fill(0), i = Array(t.length + 1).fill(0);
	for (let e = 0; e <= t.length; e++) r[e] = e;
	for (let a = 1; a <= e.length; a++) {
		i[0] = a;
		for (let o = 1; o <= t.length; o++) i[o] = Math.min(Math.min(i[o - 1] + 1, r[o] + 1), r[o - 1] + (e[a - 1] === t[o - 1] ? 0 : 1)), a > 1 && o > 1 && e[a - 1] === t[o - 2] && e[a - 2] === t[o - 1] && (i[o] = Math.min(i[o], n[o - 2] + 1));
		[n, r, i] = [
			r,
			i,
			n
		];
	}
	return r[t.length];
}
function Me(e, t) {
	let n = k(e);
	if (n.length < 3) return null;
	let r = null, i = 2 ** 53 - 1;
	for (let e of t) {
		let t = je(n, k(e));
		t < i && (r = e, i = t);
	}
	return r !== null && i <= Math.min(2, Math.max(1, Math.floor(n.length / 3))) ? r : null;
}
//#endregion
//#region src/dhole/plot/theme.ts
var Ne;
function j(e) {
	let t = e.replace(/^#/, "");
	if (t.length !== 6 && t.length !== 8) throw Error(`'${e}' is not a colour written as #rrggbb.`);
	let n = (e) => parseInt(t.slice(e, e + 2), 16);
	return {
		r: n(0),
		g: n(2),
		b: n(4),
		a: t.length === 8 ? n(6) : 255
	};
}
function Pe(e) {
	let t = (e) => Math.round(e).toString(16).padStart(2, "0");
	return `#${t(e.r)}${t(e.g)}${t(e.b)}`;
}
var Fe = class e {
	constructor(e, t) {
		if (r(this, "name", void 0), r(this, "colors", void 0), t.length === 0) throw Error("A palette needs at least one colour.");
		this.name = e, this.colors = t;
	}
	at(e) {
		let t = this.colors.length;
		return this.colors[(e % t + t) % t];
	}
	static fromHex(t, ...n) {
		return new e(t, n.map(j));
	}
};
Ne = Fe, r(Fe, "Divooka", Ne.fromHex("Divooka", "#2a78d6", "#eb6834", "#1baf7a", "#eda100", "#e87ba4", "#008300", "#4a3aa7", "#e34948")), r(Fe, "DivookaDark", Ne.fromHex("Divooka Dark", "#3987e5", "#d95926", "#199e70", "#c98500", "#d55181", "#008300", "#9085e9", "#e66767")), r(Fe, "Category10", Ne.fromHex("Category10", "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf")), r(Fe, "Grays", Ne.fromHex("Grays", "#252525", "#636363", "#969696", "#bdbdbd", "#525252", "#737373", "#a3a3a3", "#d9d9d9"));
var Ie = {
	name: "Light",
	fontFamilies: [
		"Segoe UI",
		"Helvetica Neue",
		"Helvetica",
		"Arial",
		"DejaVu Sans",
		"Liberation Sans",
		"Noto Sans",
		"Open Sans"
	],
	fontSize: 11,
	axisTitleSize: 12,
	titleSize: 14,
	figureTitleSize: 18,
	subtitleSize: 13,
	captionSize: 10.5,
	dataLabelSize: 10.5,
	background: j("#ffffff"),
	plotBackground: {
		r: 0,
		g: 0,
		b: 0,
		a: 0
	},
	ink: j("#0b0b0b"),
	secondaryInk: j("#52514e"),
	mutedInk: j("#898781"),
	grid: j("#e1e0d9"),
	axisLine: j("#c3c2b7"),
	palette: Fe.Divooka,
	rising: j("#0ca30c"),
	falling: j("#d03b3b"),
	lineWidth: 2,
	pointSize: 8,
	pointRing: 1.5,
	areaOpacity: .15,
	barRadius: 3,
	barPadding: .25,
	maxBarWidth: 64,
	barGap: 2,
	gridX: !1,
	gridY: !0,
	axisLines: !0,
	frame: !1,
	tickLength: 4,
	hairlineWidth: 1,
	padding: 16,
	chartGap: 28,
	textGap: 6
};
function Le(e, t) {
	return {
		...e,
		fontSize: e.fontSize * t,
		axisTitleSize: e.axisTitleSize * t,
		titleSize: e.titleSize * t,
		figureTitleSize: e.figureTitleSize * t,
		subtitleSize: e.subtitleSize * t,
		captionSize: e.captionSize * t,
		dataLabelSize: e.dataLabelSize * t
	};
}
function Re(e, t) {
	return t.trim() ? {
		...e,
		fontFamilies: [t, ...e.fontFamilies.filter((e) => e.toLowerCase() !== t.toLowerCase())]
	} : e;
}
var ze = {
	...Ie,
	name: "Dark",
	background: j("#1a1a19"),
	ink: j("#ffffff"),
	secondaryInk: j("#c3c2b7"),
	mutedInk: j("#898781"),
	grid: j("#2c2c2a"),
	axisLine: j("#4a4a46"),
	palette: Fe.DivookaDark
}, Be = Le({
	...Ie,
	name: "Presentation",
	lineWidth: 3,
	pointSize: 10,
	padding: 24
}, 1.4), Ve = {
	...Ie,
	name: "Minimal",
	gridY: !1,
	axisLines: !1,
	tickLength: 0
}, He = {
	...Ie,
	name: "Classic",
	palette: Fe.Category10,
	gridX: !0,
	frame: !0,
	grid: j("#e6e6e6"),
	axisLine: j("#444444"),
	secondaryInk: j("#222222"),
	barRadius: 0,
	pointRing: 0,
	lineWidth: 1.5,
	pointSize: 6
}, Ue = {
	...Ie,
	name: "Print",
	ink: j("#000000"),
	secondaryInk: j("#222222"),
	mutedInk: j("#555555"),
	grid: j("#d4d4d4"),
	axisLine: j("#000000"),
	palette: Fe.Grays,
	frame: !0,
	barRadius: 0
};
function We(e, t, n, r, i, a, o, s, c, l, u) {
	let d = t ? ze : Ie, f = [];
	for (let e of u) f.some((t) => t.toLowerCase() === e.toLowerCase()) || f.push(e);
	return {
		...d,
		name: e,
		background: j(n),
		ink: j(r),
		secondaryInk: j(i),
		mutedInk: j(a),
		grid: j(o),
		axisLine: j(s),
		palette: Fe.fromHex(e, ...f),
		rising: j(c),
		falling: j(l)
	};
}
var Ge = [
	Ie,
	ze,
	Be,
	Ve,
	He,
	Ue,
	We("Golden", !1, "#f4e8c8", "#2b1d04", "#53400f", "#63501d", "#eadbb4", "#cdb27a", "#19602c", "#a0261c", [
		"#8a5c00",
		"#2f6fb0",
		"#c0571b",
		"#3f8a4e",
		"#a33e8f",
		"#6f55b0",
		"#b83227",
		"#b07a10"
	]),
	We("Quiet Gold", !0, "#13100c", "#f2eada", "#d6c9af", "#aa9a7d", "#3a3126", "#4e4230", "#7fb06c", "#ea6e5c", [
		"#d8ac55",
		"#6fa3d3",
		"#e07a3c",
		"#7fb06c",
		"#cb6fb4",
		"#a488d2",
		"#e2604e",
		"#d9a441"
	]),
	We("Silver Gold", !0, "#121417", "#eceef1", "#c4c9d0", "#98a0aa", "#2e3239", "#3f4650", "#3ddc97", "#ff5370", [
		"#f5c518",
		"#4fc3f7",
		"#ff8a3d",
		"#3ddc97",
		"#e056fd",
		"#a78bfa",
		"#ff5370",
		"#ffb74d"
	]),
	We("High Contrast", !1, "#ffffff", "#0e1116", "#1f2328", "#3a4048", "#57606a", "#20252c", "#055d20", "#a0111f", [
		"#0349b4",
		"#0349b4",
		"#953800",
		"#055d20",
		"#8a1474",
		"#622cbc",
		"#a0111f",
		"#744500"
	])
];
function Ke(e) {
	let t = "";
	for (let n of e ?? "") /[\p{L}\p{N}]/u.test(n) && (t += n.toLowerCase());
	return t;
}
function qe(e) {
	let t = Ke(e);
	return t.length === 0 ? null : Ge.find((e) => Ke(e.name) === t) ?? null;
}
//#endregion
//#region src/dhole/syntax/reader.ts
var Je = [
	{
		word: "flowchart",
		name: new l("flowchart", "流程图"),
		aliases: [
			"flow",
			"graph",
			"flowchartv2"
		]
	},
	{
		word: "sequence",
		name: new l("sequence diagram", "时序图"),
		aliases: ["sequencediagram", "seq"]
	},
	{
		word: "state",
		name: new l("state diagram", "状态图"),
		aliases: [
			"states",
			"statediagram",
			"statediagramv2",
			"statemachine"
		]
	},
	{
		word: "class",
		name: new l("class diagram", "类图"),
		aliases: [
			"classes",
			"classdiagram",
			"uml"
		]
	},
	{
		word: "entity",
		name: new l("entity diagram", "实体关系图"),
		aliases: [
			"entities",
			"er",
			"erdiagram",
			"entityrelationship",
			"database",
			"schema"
		]
	},
	{
		word: "mindmap",
		name: new l("mind map", "思维导图"),
		aliases: ["mind", "tree"]
	},
	{
		word: "timeline",
		name: new l("timeline", "时间线"),
		aliases: ["history", "milestones"]
	},
	{
		word: "gantt",
		name: new l("Gantt chart", "甘特图"),
		aliases: [
			"schedule",
			"plan",
			"ganttchart"
		]
	},
	{
		word: "pie",
		name: new l("pie chart", "饼图"),
		aliases: [
			"piechart",
			"donut",
			"doughnut",
			"ring"
		]
	},
	{
		word: "bar",
		name: new l("bar chart", "柱状图"),
		aliases: [
			"bars",
			"barchart",
			"column",
			"columns",
			"columnchart"
		]
	},
	{
		word: "line",
		name: new l("line chart", "折线图"),
		aliases: [
			"lines",
			"linechart",
			"lineplot"
		]
	},
	{
		word: "xy",
		name: new l("scatter chart", "散点图"),
		aliases: [
			"scatter",
			"xychart",
			"scatterplot",
			"points"
		]
	},
	{
		word: "radar",
		name: new l("radar chart", "雷达图"),
		aliases: [
			"radarchart",
			"spider",
			"web"
		]
	},
	{
		word: "quadrant",
		name: new l("quadrant chart", "象限图"),
		aliases: [
			"quadrantchart",
			"matrix",
			"quadrants"
		]
	},
	{
		word: "sankey",
		name: new l("Sankey diagram", "桑基图"),
		aliases: ["sankeybeta", "flows"]
	},
	{
		word: "table",
		name: new l("table", "表格"),
		aliases: ["grid"]
	},
	{
		word: "kanban",
		name: new l("board", "看板"),
		aliases: ["board", "kanbanboard"]
	}
];
function Ye(e) {
	let t = k(e);
	return t.length === 0 ? null : Je.find((e) => e.word === t) ?? Je.find((e) => e.aliases.includes(t)) ?? null;
}
var Xe = {
	a(e) {
		return e.length > 0 && "aeiouAEIOU".includes(e[0]) ? "an" : "a";
	},
	count(e, t, n) {
		return `${e} ${e === 1 ? t : n ?? t + "s"}`;
	}
}, Ze = class {
	constructor(e, t) {
		r(this, "kind", void 0), r(this, "kindLine", void 0), r(this, "title", null), r(this, "subtitle", null), r(this, "caption", null), r(this, "theme", Ie), r(this, "width", null), r(this, "height", null), this.kind = e, this.kindLine = t;
	}
	get isEmpty() {
		return !1;
	}
};
function M(e, t) {
	return {
		names: e,
		apply: t
	};
}
function Qe(e, t) {
	return e.names.some((e) => k(e) === t);
}
var $e = class {
	constructor(e) {
		r(this, "set", /* @__PURE__ */ new Set()), r(this, "context", void 0), r(this, "problems", void 0), r(this, "font", null), this.context = e, this.problems = e.problems;
	}
	get settings() {
		return [];
	}
	read(e) {
		this.spec.title = this.context.title, this.titled();
		let t = e.length === 0 ? 0 : Math.min(...e.map((e) => e.line.indent));
		for (let n of e) n.line.indent === t && this.trySetting(n) || this.content(n);
		this.finish();
	}
	titled() {}
	finish() {}
	get common() {
		return [
			M(["title"], (e) => this.spec.title = this.text(e)),
			M(["subtitle"], (e) => this.spec.subtitle = this.text(e)),
			M([
				"caption",
				"source",
				"note"
			], (e) => this.spec.caption = this.text(e)),
			M([
				"theme",
				"style",
				"look"
			], (e) => this.readTheme(e)),
			M([
				"font",
				"typeface",
				"face"
			], (e) => this.font = this.text(e)),
			M(["size"], (e) => this.readSize(e))
		];
	}
	get settingNames() {
		return [...this.common, ...this.settings].map((e) => e.names[0]);
	}
	trySetting(e) {
		let { head: t, tail: n } = E(e.content);
		if (n === null || t.isEmpty || t.text.includes("\"")) return !1;
		let r = k(t.text), i = this.settings.find((e) => Qe(e, r)) ?? this.common.find((e) => Qe(e, r));
		if (!i || me(t, w.plain).arrows.length > 0) return !1;
		let a = i.names[0];
		if (this.set.has(a) && this.problems.warning(t, "SettingRepeated", a), this.set.add(a), n.isEmpty) return this.problems.error(t, "SettingNeedsValue", a), !0;
		i.apply(n);
		for (let t of e.children) this.problems.warning(t.content, "IndentedUnderNothing");
		return !0;
	}
	text(e) {
		return D(e, this.problems);
	}
	settingSlip(e, t) {
		if ([...t.text].some(xe)) return !1;
		let n = Me(e.text, this.settingNames);
		return n !== null && (this.problems.error(e, "SettingGuessed", e.text.trim(), n), !0);
	}
	unknownAttribute(e, t, n, r) {
		let i = e.text.trim(), a = Me(i, n);
		a === null ? this.problems.warning(e, "UnknownAttribute", i, t, r ?? n) : this.problems.warning(e, "AttributeGuessed", i, t, a);
	}
	applyFont() {
		this.font && this.font.trim() && (this.spec.theme = Re(this.spec.theme, this.font));
	}
	readTheme(e) {
		let t = qe(e.text);
		t ? this.spec.theme = t : this.problems.error(e, "BadTheme", e.text, Ge.map((e) => e.name.toLowerCase()));
	}
	readSize(e) {
		let t = Ae(e.text);
		t ? (this.spec.width = t.width, this.spec.height = t.height) : this.problems.error(e, "BadSize", e.text);
	}
	readDirection(e) {
		let t = null;
		switch (k(e.text)) {
			case "down":
			case "td":
			case "tb":
			case "topdown":
			case "toptobottom":
			case "vertical":
			case "south":
				t = "down";
				break;
			case "right":
			case "lr":
			case "leftright":
			case "lefttoright":
			case "horizontal":
			case "across":
			case "east":
				t = "right";
				break;
			case "up":
			case "bt":
			case "bottomup":
			case "bottomtotop":
			case "north":
				t = "up";
				break;
			case "left":
			case "rl":
			case "rightleft":
			case "righttoleft":
			case "west": t = "left";
		}
		return t === null && this.problems.error(e, "BadDirection", e.text), t;
	}
	readSwitch(e) {
		let t = De(e.text);
		return t === null && this.problems.error(e, "BadSwitch", e.text), t;
	}
	readNumber(e, t = !1) {
		let n = Ce(e.text, t);
		return Number.isNaN(n) ? (this.problems.error(e, "BadNumber", e.text), null) : n;
	}
	readRange(e) {
		return Oe(e.text) || (this.problems.error(e, "BadRange", e.text), null);
	}
	readChoice(e, t, ...n) {
		let r = k(e.text);
		for (let [e, t] of n) if (e.some((e) => k(e) === r)) return t;
		return this.problems.error(e, "BadChoice", e.text, t, n.map((e) => e[0][0])), null;
	}
	unindent(e, t) {
		if (e.children.length !== 0) {
			this.problems.warning(e.children[0].content, "IndentedUnderNothing");
			for (let n of e.children) t(new c(n.line)), this.unindent(n, t);
		}
	}
}, et = /* @__PURE__ */ new Map();
function N(e, t) {
	et.set(e, t);
}
function tt() {
	return Je.filter((e) => et.has(e.word)).map((e) => e.word);
}
var nt = class extends $e {
	constructor(e) {
		super(e), r(this, "own", void 0);
		let t = e.problems;
		this.own = new class extends Ze {
			get isEmpty() {
				return !0;
			}
			build() {
				throw Error("A kind this page does not draw is never built.");
			}
		}(e.kind, e.kindLine), t.error(e.kindLine.content, "NotDrawnHere", e.kind.name);
	}
	get spec() {
		return this.own;
	}
	content() {}
}, rt = /^(?<word>\p{L}[\p{L}\p{Nd}\-_]*)/u;
function it(e, t = {}) {
	let n = new x(), r = [], i = (e ?? "").replaceAll("\r\n", "\n").replaceAll("\r", "\n").split("\n").map((e, t) => new a(t + 1, e));
	for (let e of i) e.hasTab && e.hasSpace && !e.isBlank && !e.isComment && n.warningAt(e.number, 1, Math.max(1, e.content.start), "MixedIndentation");
	let o = [[]], s = [];
	for (let e of i) e.isSeparator ? (o.push([]), s.push(e)) : o[o.length - 1].push(e);
	for (let e = 0; e < o.length; e++) {
		let i = o[e].filter((e) => !e.isBlank && !e.isComment);
		if (i.length === 0) {
			e > 0 && e < o.length - 1 && n.warning(s[e - 1].content, "SeparatorWithoutDiagram");
			continue;
		}
		let a = at(i, n, t);
		a && r.push(a);
	}
	return r.length === 0 && n.count === 0 && n.errorAt(1, 1, 1, "Empty"), {
		specs: r,
		problems: n
	};
}
function at(e, t, n) {
	let r = e[0], i = r.content, a = rt.exec(i.text), o = Je.map((e) => e.word);
	if (!a) return t.error(i, "NoKind", i.text, o), null;
	let s = a.groups.word, l = i.from(s.length), u = Ye(s), d = rt.exec(l.trim().text);
	if (d) {
		let e = Ye(s + d.groups.word);
		e && (u = e, l = l.trim().from(d.groups.word.length));
	}
	if (!u) {
		let e = Me(s, [...Je.map((e) => e.word), ...Je.flatMap((e) => e.aliases)]), n = e === null ? null : Ye(e);
		if (!n) return t.error(i.slice(0, s.length), "NoKind", s, o), null;
		t.error(i.slice(0, s.length), "KindGuessed", s, n.name, n.word), u = n;
	}
	let f = l.trim().text;
	(f.startsWith(":") || f.startsWith("：")) && (f = f.slice(1).trim());
	let p = l.trim(), m = {
		problems: t,
		kind: u,
		kindLine: r,
		title: f.length === 0 ? null : D(p.from(p.text.length - f.length), t),
		kindWord: k(s)
	}, h = (et.get(u.word) ?? ((e) => new nt(e)))(m);
	return n.defaultTheme && (h.spec.theme = n.defaultTheme), h.read(c.forest(e.slice(1))), h.applyFont(), h.spec;
}
//#endregion
//#region src/dhole/plot/text.ts
var P = {
	Normal: 400,
	Medium: 500,
	SemiBold: 600,
	Bold: 700
};
function ot(e) {
	let t = e.families.map((e) => /^[\w-]+$/.test(e) && !/^\d/.test(e) ? e : `"${e.replaceAll("\"", "")}"`).join(", ");
	return `${e.italic ? "italic " : ""}${e.weight} ${e.size}px ${t}, sans-serif`;
}
function st(e) {
	return [...e.map((e) => /^[\w-]+$/.test(e) ? e : `'${e.replaceAll("'", "")}'`), "sans-serif"].join(", ");
}
var ct = class {
	constructor(e) {
		if (r(this, "context", void 0), r(this, "widths", /* @__PURE__ */ new Map()), r(this, "lineMetrics", /* @__PURE__ */ new Map()), this.context = e || (typeof OffscreenCanvas < "u" ? new OffscreenCanvas(1, 1).getContext("2d") : document.createElement("canvas").getContext("2d")), !this.context) throw Error("This page cannot measure text: it has no 2D canvas.");
	}
	static get available() {
		return typeof OffscreenCanvas < "u" || typeof document < "u";
	}
	width(e, t) {
		let n = ot(t), r = `${n}\u0000${e}`, i = this.widths.get(r);
		return i === void 0 && (this.context.font = n, i = this.context.measureText(e).width, this.widths.size > 2e4 && this.widths.clear(), this.widths.set(r, i)), i;
	}
	metrics(e) {
		let t = ot({
			...e,
			size: pt
		}), n = this.lineMetrics.get(t);
		if (!n) {
			this.context.font = t;
			let e = this.context.measureText("Ag"), r = e.fontBoundingBoxAscent / pt, i = e.fontBoundingBoxDescent / pt;
			n = Number.isFinite(r) && Number.isFinite(i) && r + i > 0 ? {
				ascent: r,
				descent: i
			} : {
				ascent: 1.06884765625,
				descent: .29296875
			}, this.lineMetrics.set(t, n);
		}
		return {
			ascent: n.ascent * e.size,
			descent: n.descent * e.size
		};
	}
}, lt = class {
	width(e, t) {
		let n = t.weight >= 550 ? dt : ut, r = 0;
		for (let t of e) {
			let e = t.codePointAt(0) ?? 32;
			e >= 32 && e < 127 ? r += n[e - 32] : ft(e) ? r += 1 : r += e >= 768 && e < 880 ? 0 : .58;
		}
		return r * t.size;
	}
	metrics(e) {
		return {
			ascent: e.size * 1.06884765625,
			descent: e.size * .29296875
		};
	}
}, ut = [
	.2598,
	.2671,
	.4009,
	.646,
	.5718,
	.8232,
	.73,
	.2212,
	.2959,
	.2959,
	.5518,
	.5718,
	.2451,
	.3218,
	.2661,
	.3672,
	.5718,
	.5718,
	.5718,
	.5718,
	.5718,
	.5718,
	.5718,
	.5718,
	.5718,
	.5718,
	.2661,
	.2661,
	.5718,
	.5718,
	.5718,
	.4292,
	.8989,
	.6328,
	.6479,
	.6309,
	.729,
	.5562,
	.5161,
	.728,
	.7378,
	.2788,
	.2671,
	.6138,
	.519,
	.9028,
	.7539,
	.7788,
	.6021,
	.7788,
	.6182,
	.5488,
	.5532,
	.728,
	.5952,
	.9258,
	.5771,
	.5601,
	.5708,
	.3291,
	.3672,
	.3291,
	.542,
	.4482,
	.5771,
	.5562,
	.6128,
	.4761,
	.6128,
	.561,
	.3389,
	.5479,
	.6138,
	.2529,
	.2529,
	.5249,
	.2529,
	.9302,
	.6138,
	.604,
	.6128,
	.6128,
	.4082,
	.4771,
	.353,
	.6138,
	.501,
	.7778,
	.5239,
	.5039,
	.4678,
	.3789,
	.5508,
	.3789,
	.5718
], dt = [
	.2598,
	.2759,
	.436,
	.646,
	.5708,
	.8618,
	.7402,
	.2432,
	.3169,
	.3169,
	.5479,
	.5708,
	.2671,
	.3218,
	.2749,
	.3901,
	.5708,
	.5708,
	.5708,
	.5708,
	.5708,
	.5708,
	.5708,
	.5708,
	.5708,
	.5708,
	.2749,
	.2778,
	.5708,
	.5708,
	.5708,
	.4531,
	.8979,
	.6611,
	.6602,
	.6338,
	.7339,
	.5581,
	.5322,
	.7261,
	.751,
	.3052,
	.2988,
	.6392,
	.542,
	.9229,
	.7832,
	.7871,
	.6152,
	.7871,
	.6392,
	.5498,
	.5659,
	.7422,
	.6221,
	.9458,
	.6221,
	.5918,
	.5752,
	.3301,
	.3901,
	.3301,
	.5371,
	.4292,
	.5918,
	.5801,
	.623,
	.4951,
	.623,
	.5762,
	.3628,
	.5562,
	.6348,
	.2788,
	.2788,
	.5718,
	.2788,
	.9561,
	.6348,
	.6108,
	.623,
	.623,
	.4312,
	.4868,
	.3931,
	.6348,
	.5352,
	.8169,
	.5508,
	.5361,
	.478,
	.3862,
	.5508,
	.3711,
	.5708
];
function ft(e) {
	return e >= 4352 && e <= 4447 || e >= 11904 && e <= 42191 || e >= 44032 && e <= 55203 || e >= 63744 && e <= 64255 || e >= 65072 && e <= 65103 || e >= 65280 && e <= 65376 || e >= 65504 && e <= 65510 || e >= 131072 && e <= 262141;
}
var pt = 1e3, mt = null;
function ht() {
	if (!mt) try {
		mt = ct.available ? new ct() : new lt();
	} catch {
		mt = new lt();
	}
	return mt;
}
function gt(e) {
	mt = e;
}
var _t = /[\p{Pe}\p{Pf}\u3001\u3002\uFF0C\uFF0E\uFF1A\uFF1B\uFF01\uFF1F\u30FC\u3005\u300D\u300F!,.:;?)\]}%]/u, vt = /[\p{Ps}\p{Pi}\u300C\u300E([{]/u;
function yt(e) {
	return ft(e.codePointAt(0) ?? 0);
}
function bt(e) {
	let t = [], n = [...e], r = "";
	for (let e = 0; e < n.length; e++) {
		let i = n[e];
		if (i === "\n") {
			t.push({
				text: r,
				hard: !0
			}), r = "";
			continue;
		}
		if (i === "\r") continue;
		r += i;
		let a = n[e + 1];
		if (a === void 0 || a === "\n") continue;
		let o = /\s/u.test(i), s = /\s/u.test(a), c = !1;
		(o && !s || !o && (i === "-" || i === "‐" || i === "–") && /[\p{L}]/u.test(n[e - 1] ?? "") && /[\p{L}]/u.test(a) || !o && !s && (yt(i) || yt(a)) && !_t.test(a) && !vt.test(i)) && (c = !0), c && (t.push({
			text: r,
			hard: !1
		}), r = "");
	}
	return t.push({
		text: r,
		hard: !1
	}), t;
}
function xt(e) {
	return e.replace(/\s+$/u, "");
}
function St(e, t, n, r = Infinity, i = "left") {
	let a = t.length === 0 ? " " : t, o = Number.isFinite(r), s = [], c = /* @__PURE__ */ new Set(), l = "", u = (t) => e.width(xt(t), n);
	for (let e of bt(a)) if (!o) l += e.text, e.hard && (s.push(l), l = "");
	else {
		if (l.length > 0 && u(l + e.text) > r && xt(e.text).length > 0 && (c.add(s.length), s.push(l), l = ""), l.length === 0 && u(e.text) > r) {
			let t = "";
			for (let n of e.text) t.length > 0 && !/\s/u.test(n) && u(t + n) > r && (c.add(s.length), s.push(t), t = ""), t += n;
			l = t;
		} else l += e.text;
		e.hard && (s.push(l), l = "");
	}
	s.push(l);
	let d = e.metrics(n), f = d.ascent + d.descent, p = s.map((t, a) => {
		let o = xt(t);
		if (o.length === 0) return {
			text: "",
			width: 0
		};
		if (o.length < t.length) {
			let o = e.width(t, n);
			if ((!c.has(a) || i === "left") && o < r) return {
				text: t,
				width: o
			};
		}
		return {
			text: t,
			width: e.width(o, n)
		};
	}), m = p.reduce((e, t) => Math.max(e, t.width), 0), h = Number.isFinite(r) ? r : m;
	return {
		font: n,
		align: i,
		width: m,
		height: p.length * f,
		lines: p.map((e, t) => ({
			text: e.text,
			width: e.width,
			left: i === "center" ? (h - e.width) / 2 : i === "right" ? h - e.width : 0,
			top: t * f,
			baseline: t * f + d.ascent
		}))
	};
}
//#endregion
//#region src/dhole/rendering/geometry.ts
var Ct;
function F(e, t) {
	return {
		x: e,
		y: t
	};
}
var I = (e, t) => ({
	x: e.x + t.x,
	y: e.y + t.y
}), L = (e, t) => ({
	x: e.x - t.x,
	y: e.y - t.y
}), R = (e, t) => ({
	x: e.x * t,
	y: e.y * t
}), wt = (e) => e.x * e.x + e.y * e.y, Tt = (e) => Math.sqrt(wt(e));
function Et(e) {
	let t = Tt(e);
	return t === 0 ? {
		x: NaN,
		y: NaN
	} : {
		x: e.x / t,
		y: e.y / t
	};
}
var z = class e {
	constructor(e, t, n, i) {
		r(this, "left", void 0), r(this, "top", void 0), r(this, "right", void 0), r(this, "bottom", void 0), this.left = e, this.top = t, this.right = n, this.bottom = i;
	}
	static fromXYWH(t, n, r, i) {
		return new e(t, n, t + r, n + i);
	}
	static fromCenter(t, n, r) {
		return new e(t.x - n / 2, t.y - r / 2, t.x + n / 2, t.y + r / 2);
	}
	get width() {
		return this.right - this.left;
	}
	get height() {
		return this.bottom - this.top;
	}
	get midX() {
		return (this.left + this.right) / 2;
	}
	get midY() {
		return (this.top + this.bottom) / 2;
	}
	get center() {
		return {
			x: this.midX,
			y: this.midY
		};
	}
	get isEmpty() {
		return !(this.right > this.left && this.bottom > this.top);
	}
	inflate(t, n = t) {
		return new e(this.left - t, this.top - n, this.right + t, this.bottom + n);
	}
	offset(t, n) {
		return new e(this.left + t, this.top + n, this.right + t, this.bottom + n);
	}
	contains(e) {
		return e.x >= this.left && e.x < this.right && e.y >= this.top && e.y < this.bottom;
	}
	intersectsWith(e) {
		return this.left < e.right && e.left < this.right && this.top < e.bottom && e.top < this.bottom;
	}
	union(t) {
		return new e(Math.min(this.left, t.left), Math.min(this.top, t.top), Math.max(this.right, t.right), Math.max(this.bottom, t.bottom));
	}
	toString() {
		return `(${this.left}, ${this.top}, ${this.right}, ${this.bottom})`;
	}
};
Ct = z, r(z, "empty", new Ct(0, 0, 0, 0));
function Dt(e, t) {
	return {
		a: 1,
		b: 0,
		c: 0,
		d: 1,
		e,
		f: t
	};
}
function Ot(e, t = e) {
	return {
		a: e,
		b: 0,
		c: 0,
		d: t,
		e: 0,
		f: 0
	};
}
function kt(e, t = 0, n = 0) {
	let r = e * Math.PI / 180, i = Math.cos(r), a = Math.sin(r);
	return {
		a: i,
		b: a,
		c: -a,
		d: i,
		e: t - i * t + a * n,
		f: n - a * t - i * n
	};
}
function At(e, t) {
	return {
		x: e.a * t.x + e.c * t.y + e.e,
		y: e.b * t.x + e.d * t.y + e.f
	};
}
function jt(e) {
	return e.a === 1 && e.b === 0 && e.c === 0 && e.d === 1 && e.e === 0 && e.f === 0;
}
var B = class e {
	constructor() {
		r(this, "segments", []), r(this, "current", {
			x: 0,
			y: 0
		}), r(this, "start", {
			x: 0,
			y: 0
		}), r(this, "open", !1);
	}
	get isEmpty() {
		return this.segments.length === 0;
	}
	moveTo(e, t) {
		let n = typeof e == "number" ? {
			x: e,
			y: t
		} : e;
		return this.segments.push({
			kind: "M",
			p: n
		}), this.current = n, this.start = n, this.open = !0, this;
	}
	lineTo(e, t) {
		let n = typeof e == "number" ? {
			x: e,
			y: t
		} : e;
		return this.open || this.moveTo(this.current), this.segments.push({
			kind: "L",
			p: n
		}), this.current = n, this;
	}
	cubicTo(e, t, n) {
		return this.open || this.moveTo(this.current), this.segments.push({
			kind: "C",
			c1: e,
			c2: t,
			p: n
		}), this.current = n, this;
	}
	quadTo(e, t) {
		let n = this.current;
		return this.cubicTo(I(n, R(L(e, n), 2 / 3)), I(t, R(L(e, t), 2 / 3)), t);
	}
	close() {
		return this.open && (this.segments.push({ kind: "Z" }), this.current = this.start, this.open = !1), this;
	}
	arcTo(e, t, n, r) {
		let i = e.midX, a = e.midY, o = e.width / 2, s = e.height / 2, c = ((e) => {
			let t = e * Math.PI / 180;
			return {
				x: i + o * Math.cos(t),
				y: a + s * Math.sin(t)
			};
		})(t);
		r || !this.open ? this.moveTo(c) : this.lineTo(c);
		let l = Math.max(1, Math.ceil(Math.abs(n) / 90 - 1e-9)), u = n / l;
		for (let e = 0; e < l; e++) {
			let n = (t + u * e) * Math.PI / 180, r = (t + u * (e + 1)) * Math.PI / 180, c = 4 / 3 * Math.tan((r - n) / 4), l = {
				x: i + o * Math.cos(n),
				y: a + s * Math.sin(n)
			}, d = {
				x: i + o * Math.cos(r),
				y: a + s * Math.sin(r)
			}, f = {
				x: l.x - c * o * Math.sin(n),
				y: l.y + c * s * Math.cos(n)
			}, p = {
				x: d.x + c * o * Math.sin(r),
				y: d.y - c * s * Math.cos(r)
			};
			this.cubicTo(f, p, d);
		}
		return this;
	}
	addRect(e) {
		return this.moveTo(e.left, e.top).lineTo(e.right, e.top).lineTo(e.right, e.bottom).lineTo(e.left, e.bottom).close();
	}
	addRoundRect(e, t, n = t) {
		return t = Math.max(0, Math.min(t, e.width / 2)), n = Math.max(0, Math.min(n, e.height / 2)), t <= 0 || n <= 0 ? this.addRect(e) : (this.moveTo(e.left + t, e.top), this.lineTo(e.right - t, e.top), this.arcTo(new z(e.right - 2 * t, e.top, e.right, e.top + 2 * n), 270, 90, !1), this.lineTo(e.right, e.bottom - n), this.arcTo(new z(e.right - 2 * t, e.bottom - 2 * n, e.right, e.bottom), 0, 90, !1), this.lineTo(e.left + t, e.bottom), this.arcTo(new z(e.left, e.bottom - 2 * n, e.left + 2 * t, e.bottom), 90, 90, !1), this.lineTo(e.left, e.top + n), this.arcTo(new z(e.left, e.top, e.left + 2 * t, e.top + 2 * n), 180, 90, !1), this.close());
	}
	addOval(e) {
		return this.arcTo(e, 0, 360, !0), this.close();
	}
	addCircle(e, t, n) {
		return this.addOval(new z(e - n, t - n, e + n, t + n));
	}
	addPath(e) {
		for (let t of e.segments) this.segments.push(t);
		return this.current = e.current, this.start = e.start, this.open = e.open, this;
	}
	transformed(t) {
		let n = new e();
		for (let e of this.segments) switch (e.kind) {
			case "M":
				n.segments.push({
					kind: "M",
					p: At(t, e.p)
				});
				break;
			case "L":
				n.segments.push({
					kind: "L",
					p: At(t, e.p)
				});
				break;
			case "C":
				n.segments.push({
					kind: "C",
					c1: At(t, e.c1),
					c2: At(t, e.c2),
					p: At(t, e.p)
				});
				break;
			default: n.segments.push(e);
		}
		return n.current = At(t, this.current), n.start = At(t, this.start), n.open = this.open, n;
	}
	tightBounds() {
		let e = Infinity, t = Infinity, n = -Infinity, r = -Infinity, i = (i) => {
			e = Math.min(e, i.x), t = Math.min(t, i.y), n = Math.max(n, i.x), r = Math.max(r, i.y);
		}, a = {
			x: 0,
			y: 0
		}, o = a;
		for (let e of this.segments) if (e.kind === "M") i(e.p), a = e.p, o = e.p;
		else if (e.kind === "L") i(e.p), a = e.p;
		else if (e.kind === "C") {
			i(e.p);
			for (let t of Nt(a.x, e.c1.x, e.c2.x, e.p.x).concat(Nt(a.y, e.c1.y, e.c2.y, e.p.y))) i(Mt(a, e.c1, e.c2, e.p, t));
			a = e.p;
		} else a = o;
		return e > n ? z.empty : new z(e, t, n, r);
	}
	toSvg() {
		let e = (e) => V(e), t = [];
		for (let n of this.segments) switch (n.kind) {
			case "M":
				t.push(`M${e(n.p.x)},${e(n.p.y)}`);
				break;
			case "L":
				t.push(`L${e(n.p.x)},${e(n.p.y)}`);
				break;
			case "C":
				t.push(`C${e(n.c1.x)},${e(n.c1.y)} ${e(n.c2.x)},${e(n.c2.y)} ${e(n.p.x)},${e(n.p.y)}`);
				break;
			default: t.push("Z");
		}
		return t.join(" ");
	}
	points(e = 8) {
		let t = [], n = {
			x: 0,
			y: 0
		}, r = n;
		for (let i of this.segments) if (i.kind === "M" || i.kind === "L") t.push(i.p), n = i.p, i.kind === "M" && (r = i.p);
		else if (i.kind === "C") {
			for (let r = 1; r <= e; r++) t.push(Mt(n, i.c1, i.c2, i.p, r / e));
			n = i.p;
		} else t.push(r), n = r;
		return t;
	}
};
function V(e) {
	let t = Math.round(e * 1e4) / 1e4;
	return (Object.is(t, -0) ? 0 : t).toString();
}
function Mt(e, t, n, r, i) {
	let a = 1 - i;
	return {
		x: a * a * a * e.x + 3 * a * a * i * t.x + 3 * a * i * i * n.x + i * i * i * r.x,
		y: a * a * a * e.y + 3 * a * a * i * t.y + 3 * a * i * i * n.y + i * i * i * r.y
	};
}
function Nt(e, t, n, r) {
	let i = -e + 3 * t - 3 * n + r, a = 2 * (e - 2 * t + n), o = t - e, s = [];
	if (Math.abs(i) < 1e-12) Math.abs(a) > 1e-12 && s.push(-o / a);
	else {
		let e = a * a - 4 * i * o;
		if (e >= 0) {
			let t = Math.sqrt(e);
			s.push((-a + t) / (2 * i), (-a - t) / (2 * i));
		}
	}
	return s.filter((e) => e > 0 && e < 1);
}
//#endregion
//#region src/dhole/plot/figure.ts
var Pt = class e {
	constructor(e, t) {
		r(this, "theme", void 0), r(this, "measurer", void 0), r(this, "layouts", /* @__PURE__ */ new Map()), this.theme = e, this.measurer = t;
	}
	sizeOf(e) {
		let t = this.theme;
		switch (e) {
			case "tick":
			case "legend": return t.fontSize;
			case "axisTitle":
			case "legendTitle": return t.axisTitleSize;
			case "chartTitle": return t.titleSize;
			case "figureTitle": return t.figureTitleSize;
			case "subtitle": return t.subtitleSize;
			case "caption": return t.captionSize;
			default: return t.dataLabelSize;
		}
	}
	static weightOf(e) {
		return e === "chartTitle" || e === "figureTitle" || e === "legendTitle" ? P.SemiBold : P.Normal;
	}
	layout(t, n) {
		t ?? (t = "");
		let r = `${n}|${t}`, i = this.layouts.get(r);
		return i || (i = St(this.measurer, t.length === 0 ? " " : t, {
			families: this.theme.fontFamilies,
			size: this.sizeOf(n),
			weight: e.weightOf(n)
		}), this.layouts.set(r, i)), i;
	}
	measure(e, t) {
		if (!e) return {
			width: 0,
			height: 0
		};
		let n = this.layout(e, t);
		return {
			width: n.width,
			height: n.height
		};
	}
	lineHeight(e) {
		return this.measure("Ag", e).height;
	}
	static rotated(e, t) {
		let n = t * Math.PI / 180, r = Math.abs(Math.cos(n)), i = Math.abs(Math.sin(n));
		return {
			width: e.width * r + e.height * i,
			height: e.width * i + e.height * r
		};
	}
	draw(e, t, n, r, i, a, o, s = 0) {
		if (!t || a.a === 0) return;
		let c = this.layout(t, i), l = c.width, u = c.height, d = o === "top" || o === "center" || o === "bottom" ? -l / 2 : o === "topRight" || o === "right" || o === "bottomRight" ? -l : 0, f = o === "left" || o === "center" || o === "right" ? -u / 2 : o === "bottomLeft" || o === "bottom" || o === "bottomRight" ? -u : 0;
		if (s === 0) {
			e.drawText(c, n + d, r + f, a);
			return;
		}
		let p = e.save();
		try {
			e.concat(kt(s, n, r)), e.drawText(c, n + d, r + f, a);
		} finally {
			e.restoreToCount(p);
		}
	}
	bounds(e, t, n, r, i) {
		let a = this.measure(e, r), o = i === "top" || i === "center" || i === "bottom" ? t - a.width / 2 : i === "topRight" || i === "right" || i === "bottomRight" ? t - a.width : t, s = i === "left" || i === "center" || i === "right" ? n - a.height / 2 : i === "bottomLeft" || i === "bottom" || i === "bottomRight" ? n - a.height : n;
		return z.fromXYWH(o, s, a.width, a.height);
	}
}, Ft = class {
	constructor() {
		r(this, "label", null), r(this, "color", null), r(this, "opacity", 1), r(this, "secondaryAxis", !1);
	}
	get typeName() {
		return this.constructor.name;
	}
	describe() {
		return this.label ? `${this.typeName} '${this.label}'` : this.typeName;
	}
}, It = class e extends Ft {
	get kind() {
		return "Drawing";
	}
	describe() {
		return this.label ? `${this.kind} '${this.label}'` : this.kind;
	}
	static scaleToFit(e, t, n, r) {
		return Math.max(.01, Math.min(1, Math.min(n / Math.max(1e-9, e), r / Math.max(1e-9, t))));
	}
	plan() {
		if (!(this.width > 0) || !(this.height > 0) || !Number.isFinite(this.width) || !Number.isFinite(this.height)) throw Error(`A drawing must have a width and a height above zero; this one is ${this.width} by ${this.height}.`);
		return {
			layer: this,
			frame: "free",
			clipToPlot: !1,
			draw: (t) => {
				let n = t.plot, r = e.scaleToFit(this.width, this.height, n.width, n.height), i = n.left + (n.width - this.width * r) / 2, a = n.top + (n.height - this.height * r) / 2, o = t.sink.save();
				try {
					t.sink.translate(i, a), t.sink.scale(r, r), this.draw({
						sink: t.sink,
						theme: t.theme,
						scale: r,
						surface: t.surface,
						note: (e) => {
							e.trim() && !t.notes.includes(e) && t.notes.push(e);
						}
					});
				} finally {
					t.sink.restoreToCount(o);
				}
			}
		};
	}
};
function Lt(...e) {
	return { layers: e };
}
function Rt(...e) {
	return {
		width: 640,
		height: 400,
		charts: e,
		columns: 0,
		title: null,
		subtitle: null,
		caption: null,
		theme: Ie
	};
}
function zt(e, t, n) {
	if (!(t >= 1) || !(n >= 1)) throw Error(`A figure must be at least one pixel each way; ${t} by ${n} is not.`);
	return {
		...e,
		width: t,
		height: n
	};
}
function Bt(e) {
	let t = Math.max(1, e.charts.length), n = e.columns > 0 ? Math.min(e.columns, t) : Math.ceil(Math.sqrt(t));
	return {
		columns: n,
		rows: Math.ceil(t / n)
	};
}
var Vt = null;
function Ht(e) {
	Vt = e;
}
var Ut = {
	isEmpty: !0,
	measureColumn: () => ({
		width: 0,
		height: 0
	}),
	measureRow: () => ({
		width: 0,
		height: 0
	}),
	drawColumn: () => {},
	drawRows: () => {}
};
function Wt(e, t, n, r) {
	let i = /* @__PURE__ */ new Map(), a = 0;
	return {
		theme: e,
		palette: t,
		notes: n,
		measurer: r,
		assigned: i,
		seriesColor(e) {
			if (e.color) return i.set(e, e.color), e.color;
			a === t.colors.length && n.push(`There are more series than the ${t.colors.length} colours of the ${t.name} palette, so colours repeat; the legend tells them apart, and small multiples may read better.`);
			let r = t.at(a++);
			return i.set(e, r), r;
		}
	};
}
function Gt(e) {
	return e === "cartesian" ? "an x-y" : e === "polar" ? "a radial" : "a free-standing";
}
function Kt(e, t, n, r = {}) {
	let i = e.theme, a = new Pt(i, n), o = [], s = e.width, c = e.height, l = {
		figure: e,
		sink: t,
		theme: i,
		text: a,
		notes: o,
		measurer: n,
		context(e, n, r = {}) {
			return {
				sink: t,
				theme: i,
				text: a,
				plot: n,
				notes: o,
				deviceScale: 0,
				surface: i.background,
				...e.drawExtras,
				...r
			};
		},
		reserve(e, t) {
			let n = t.top, r = n;
			e.chart.title && (n += a.lineHeight("chartTitle") + i.textGap);
			let o = new z(t.left, n, t.right, t.bottom), s = null;
			if (!e.legend.isEmpty) {
				let t = i.textGap * 2, n = e.chart.legend?.position ?? "right";
				if (n === "right") {
					let n = e.legend.measureColumn(o.height);
					s = z.fromXYWH(o.right - n.width, o.midY - n.height / 2, n.width, n.height), o = new z(o.left, o.top, o.right - n.width - t, o.bottom);
				} else if (n === "left") {
					let n = e.legend.measureColumn(o.height);
					s = z.fromXYWH(o.left, o.midY - n.height / 2, n.width, n.height), o = new z(o.left + n.width + t, o.top, o.right, o.bottom);
				} else if (n === "top") {
					let n = e.legend.measureRow(o.width);
					s = z.fromXYWH(o.left, o.top, o.width, n.height), o = new z(o.left, o.top + n.height + t, o.right, o.bottom);
				} else if (n === "bottom") {
					let n = e.legend.measureRow(o.width);
					s = z.fromXYWH(o.left, o.bottom - n.height, o.width, n.height), o = new z(o.left, o.top, o.right, o.bottom - n.height - t);
				} else {
					let t = e.legend.measureColumn(o.height / 2);
					s = qt(n, o, t);
				}
			}
			return {
				area: o,
				legend: s,
				titleTop: r
			};
		},
		drawLegendAndTitle(e, n, r, o, s) {
			if (e.chart.title && a.draw(t, e.chart.title, Math.max(n.left, r.left), s, "chartTitle", i.ink, "topLeft"), !o || e.legend.isEmpty) return;
			let c = o, l = e.chart.legend?.position ?? "right";
			if (l === "insideTopLeft" || l === "insideTopRight" || l === "insideBottomLeft" || l === "insideBottomRight") {
				c = qt(l, r, {
					width: c.width,
					height: c.height
				});
				let e = c.inflate(6), n = i.background;
				t.drawRect(e, {
					colour: {
						...n,
						a: Math.round(n.a * .85)
					},
					style: "fill"
				});
			}
			l === "top" || l === "bottom" ? e.legend.drawRows(t, c) : e.legend.drawColumn(t, c);
		}
	}, u = t.save();
	try {
		(r.clipToFigure ?? !0) && t.clipRect(new z(0, 0, s, c)), (r.paintBackground ?? !0) && t.drawRect(new z(0, 0, s, c), {
			colour: i.background,
			style: "fill"
		});
		let u = e.charts.map((e) => {
			let t = Wt(i, e.color?.palette ?? i.palette, o, n), r = e.layers.map((e) => e.plan(t)), a = r.length === 0 ? "cartesian" : r[0].frame;
			for (let e of r) if (e.frame !== a) throw Error(`A ${Gt(e.frame)} layer (${e.layer.describe()}) cannot share a chart with a ${Gt(a)} one; give it a chart of its own.`);
			return {
				chart: e,
				layers: r,
				frame: a,
				seriesColors: t.assigned,
				legend: Ut,
				drawExtras: {}
			};
		});
		Vt?.train(l, u);
		let d = i.padding, f = new z(d, d, s - d, c - d), p = f.top;
		e.title && (a.draw(t, e.title, f.left, p, "figureTitle", i.ink, "topLeft"), p += a.measure(e.title, "figureTitle").height + 2), e.subtitle && (a.draw(t, e.subtitle, f.left, p, "subtitle", i.secondaryInk, "topLeft"), p += a.measure(e.subtitle, "subtitle").height), p > f.top && (p += i.textGap * 2);
		let m = f.bottom;
		if (e.caption) {
			let n = a.measure(e.caption, "caption").height;
			a.draw(t, e.caption, f.left, f.bottom, "caption", i.mutedInk, "bottomLeft"), m -= n + i.textGap * 2;
		}
		return Jt(l, u, new z(f.left, p, f.right, Math.max(p + 1, m))), {
			width: s,
			height: c,
			notes: o
		};
	} finally {
		t.restoreToCount(u);
	}
}
function qt(e, t, n) {
	let r = e === "insideTopLeft" || e === "insideBottomLeft" ? t.left + 10 : t.right - 10 - n.width, i = e === "insideTopLeft" || e === "insideTopRight" ? t.top + 10 : t.bottom - 10 - n.height;
	return z.fromXYWH(r, i, n.width, n.height);
}
function Jt(e, t, n) {
	let { sink: r, theme: i, text: a } = e;
	if (t.length === 0) {
		a.draw(r, "No charts", n.midX, n.midY, "dataLabel", i.mutedInk, "center");
		return;
	}
	let { columns: o, rows: s } = Bt(e.figure), c = i.chartGap, l = (n.width - c * (o - 1)) / o, u = (n.height - c * (s - 1)) / s, d = (e) => {
		let t = e % o, r = Math.floor(e / o), i = n.left + t * l + t * c, a = n.top + r * u + r * c;
		return new z(i, a, i + l, a + u);
	};
	t.forEach((t, n) => {
		let r = d(n);
		if (t.frame === "free") Yt(e, t, r);
		else {
			if (!Vt) throw Error(`This page cannot draw ${Gt(t.frame)} chart: the chart kinds were not loaded.`);
			Vt.draw(e, t, r);
		}
	});
}
function Yt(e, t, n) {
	let { area: r, legend: i, titleTop: a } = e.reserve(t, n), o = e.context(t, r);
	for (let n of t.layers) {
		let t = e.sink.save();
		try {
			n.clipToPlot && e.sink.clipRect(r.inflate(2)), n.draw(o);
		} finally {
			e.sink.restoreToCount(t);
		}
	}
	e.drawLegendAndTitle(t, n, r, i, a);
}
function Xt(e, t, n, r) {
	let i = e.theme, a = new Pt(i, r), o = i.padding, s = 0, c = 0;
	if (e.title) {
		let t = a.measure(e.title, "figureTitle");
		s += t.height + 2, c = Math.max(c, t.width);
	}
	if (e.subtitle) {
		let t = a.measure(e.subtitle, "subtitle");
		s += t.height, c = Math.max(c, t.width);
	}
	s > 0 && (s += i.textGap * 2);
	let l = 0;
	if (e.caption) {
		let t = a.measure(e.caption, "caption");
		l = t.height + i.textGap * 2, c = Math.max(c, t.width);
	}
	let { columns: u, rows: d } = Bt(e), f = e.charts.some((e) => !!e.title) ? a.lineHeight("chartTitle") + i.textGap : 0, p = u * t + (u - 1) * i.chartGap + 2 * o, m = d * (n + f) + (d - 1) * i.chartGap + s + l + 2 * o;
	return zt(e, Math.ceil(Math.max(p, c + 2 * o)), Math.ceil(Math.max(1, m)));
}
//#endregion
//#region src/dhole/plot/sink.ts
function Zt(e) {
	return e.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll("\"", "&quot;");
}
function Qt(e, t) {
	let n = t.a / 255;
	return `${e}="${Pe(t)}"${n < 1 ? ` ${e}-opacity="${V(n)}"` : ""}`;
}
function $t(e) {
	return e.a === 1 && e.b === 0 && e.c === 0 && e.d === 1 ? `translate(${V(e.e)} ${V(e.f)})` : `matrix(${V(e.a)} ${V(e.b)} ${V(e.c)} ${V(e.d)} ${V(e.e)} ${V(e.f)})`;
}
var en = class {
	constructor(e = "dh") {
		r(this, "body", []), r(this, "defs", []), r(this, "frames", []), r(this, "openGroups", 0), r(this, "clips", 0), r(this, "idPrefix", void 0), this.idPrefix = e;
	}
	save() {
		return this.frames.push(this.openGroups), this.frames.length - 1;
	}
	restoreToCount(e) {
		for (; this.frames.length > e;) {
			let e = this.frames.pop();
			for (; this.openGroups > e;) this.body.push("</g>"), this.openGroups--;
		}
	}
	translate(e, t) {
		(e !== 0 || t !== 0) && this.concat(Dt(e, t));
	}
	scale(e, t) {
		(e !== 1 || t !== 1) && this.concat(Ot(e, t));
	}
	concat(e) {
		jt(e) || (this.body.push(`<g transform="${$t(e)}">`), this.openGroups++);
	}
	clipRect(e) {
		let t = `${this.idPrefix}-clip${this.clips++}`;
		this.defs.push(`<clipPath id="${t}"><rect x="${V(e.left)}" y="${V(e.top)}" width="${V(e.width)}" height="${V(e.height)}"/></clipPath>`), this.body.push(`<g clip-path="url(#${t})">`), this.openGroups++;
	}
	paintAttributes(e) {
		if (e.style === "fill") return Qt("fill", e.colour);
		let t = `fill="none" ${Qt("stroke", e.colour)} stroke-width="${V(e.strokeWidth ?? 1)}"`;
		return e.cap && e.cap !== "butt" && (t += ` stroke-linecap="${e.cap}"`), e.join && e.join !== "miter" && (t += ` stroke-linejoin="${e.join}"`), e.dash && e.dash.length > 0 && (t += ` stroke-dasharray="${e.dash.map(V).join(" ")}"`), t;
	}
	drawPath(e, t) {
		e.isEmpty || t.colour.a === 0 || this.body.push(`<path d="${e.toSvg()}" ${this.paintAttributes(t)}/>`);
	}
	drawRect(e, t) {
		t.colour.a !== 0 && this.body.push(`<rect x="${V(e.left)}" y="${V(e.top)}" width="${V(e.width)}" height="${V(e.height)}" ${this.paintAttributes(t)}/>`);
	}
	drawLine(e, t, n, r, i) {
		i.colour.a !== 0 && this.body.push(`<line x1="${V(e)}" y1="${V(t)}" x2="${V(n)}" y2="${V(r)}" ${this.paintAttributes({
			...i,
			style: "stroke"
		})}/>`);
	}
	drawText(e, t, n, r) {
		if (r.a === 0) return;
		let i = e.font, a = `font-family="${Zt(st(i.families))}" font-size="${V(i.size)}"${i.weight === 400 ? "" : ` font-weight="${i.weight}"`}${i.italic ? " font-style=\"italic\"" : ""} ${Qt("fill", r)}`;
		for (let r of e.lines) r.text.length !== 0 && this.body.push(`<text x="${V(t + r.left)}" y="${V(n + r.baseline)}" ${a} xml:space="preserve">${Zt(r.text)}</text>`);
	}
	toSvg(e, t, n, r) {
		for (this.restoreToCount(0); this.openGroups > 0;) this.body.push("</g>"), this.openGroups--;
		return `${`<svg xmlns="http://www.w3.org/2000/svg" width="${V(e)}" height="${V(t)}" viewBox="0 0 ${V(e)} ${V(t)}" role="img">`}${(n ? `<title>${Zt(n)}</title>` : "") + (r ? `<desc>${Zt(r)}</desc>` : "")}${this.defs.length > 0 ? `<defs>${this.defs.join("")}</defs>` : ""}${this.body.join("")}</svg>`;
	}
}, tn = class extends Error {
	constructor(e) {
		super(e.length === 0 ? "There is nothing to draw." : e[0].toString()), r(this, "problems", void 0), this.name = "DholeError", this.problems = e;
	}
};
function nn(e, t = {}) {
	let n = t.measurer ?? ht(), { specs: r, problems: i } = it(e, { defaultTheme: t.defaultTheme });
	if (t.adjustTheme) for (let e of r) e.theme = t.adjustTheme(e.theme);
	let a = [];
	for (let e of r.filter((e) => !e.isEmpty)) try {
		a.push({
			spec: e,
			built: e.build(i, { measurer: n })
		});
	} catch (t) {
		i.error(e.kindLine.content, "CouldNotDraw", e.kind.name, t instanceof Error ? t.message : String(t));
	}
	let o = a.length === 0 ? null : dn(a, n), s = i.all;
	return {
		figure: o,
		problems: s,
		kinds: a.map((e) => e.spec.kind.word),
		summary: a.map((e) => e.built.summary).join(" "),
		hasErrors: s.some((e) => e.severity === "error"),
		measurer: n
	};
}
function rn(e, t = {}) {
	let n = nn(e, t);
	if (!n.figure) throw new tn(n.problems);
	return n.figure;
}
function an(e) {
	return it(e).problems.all;
}
var on = Je.map((e) => e.word);
function sn(e, t = {}) {
	let n = new en(t.idPrefix ?? `dh${cn++}`);
	return Kt(e, n, t.measurer ?? ht()), n.toSvg(e.width, e.height, t.title ?? e.title, t.description);
}
var cn = 1;
function ln(e, t = {}) {
	let n = nn(e, t);
	return {
		svg: n.figure ? sn(n.figure, {
			measurer: n.measurer,
			description: n.summary
		}) : null,
		result: n
	};
}
function un(e, t) {
	return {
		...e,
		title: t
	};
}
function dn(e, t) {
	if (e.length === 1) {
		let { spec: n, built: r } = e[0], i = {
			...Rt(r.chart),
			theme: n.theme,
			title: n.title,
			subtitle: n.subtitle,
			caption: n.caption
		};
		return i = r.naturalWidth !== null && r.naturalHeight !== null ? Xt(i, r.naturalWidth, r.naturalHeight, t) : zt(i, 640, 400), n.width !== null && n.height !== null && (i = zt(i, n.width, n.height)), i;
	}
	let n = e[0].spec, r = e.map((e) => un(e.built.chart, e.spec.title)), i = Math.max(...e.map((e) => e.built.naturalWidth ?? 480)), a = Math.max(...e.map((e) => e.built.naturalHeight ?? 320)), o = {
		...Rt(...r),
		theme: n.theme,
		title: null,
		subtitle: n.subtitle,
		caption: n.caption,
		columns: Math.min(e.length, e.length <= 4 ? 2 : 3)
	};
	return o = Xt(o, i, a, t), n.width !== null && n.height !== null && (o = zt(o, n.width, n.height)), o;
}
//#endregion
//#region src/dhole/element.ts
function fn(e) {
	let t = typeof e.theme == "string" ? qe(e.theme) ?? void 0 : e.theme, n = e.font, r = e.adjustTheme;
	return {
		measurer: e.measurer,
		defaultTheme: t,
		adjustTheme: n || r ? (e) => r ? r(n ? Re(e, n) : e) : Re(e, n) : void 0
	};
}
function pn(e) {
	return e.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}
function mn(e, t = u) {
	return e.problems.length === 0 ? "" : `<ul class="dhole-problems">${e.problems.map((e) => `<li class="dhole-problem dhole-${e.severity}" data-line="${e.line}" data-column="${e.column}">${pn(e.describe(t))}</li>`).join("")}</ul>`;
}
function hn(e, t, n = {}) {
	let r = nn(e, fn(n));
	return t.innerHTML = `<div class="dhole-picture">${r.figure ? sn(r.figure, {
		measurer: r.measurer,
		description: r.summary
	}) : ""}</div>${n.problems === !1 ? "" : mn(r, n.language)}`, r;
}
async function gn(e = {}) {
	if (typeof document > "u" || !document.fonts) return;
	let t = e.font ? [e.font] : [];
	try {
		for (let e of [400, 600]) for (let n of t) await document.fonts.load(ot({
			families: [n],
			size: 12,
			weight: e
		}));
		await document.fonts.ready;
	} catch {}
}
var _n = "\n:host { display: block; }\n.dhole-picture svg { display: block; max-width: 100%; height: auto; }\n.dhole-problems { margin: 8px 0 0; padding: 0; list-style: none; font: 13px/1.45 system-ui, sans-serif; }\n.dhole-problem { padding: 4px 8px; border-left: 3px solid #e34948; background: rgba(227, 73, 72, 0.08); margin-top: 4px; }\n.dhole-problem.dhole-warning { border-left-color: #eda100; background: rgba(237, 161, 0, 0.1); }\n";
function vn(e = "dhole-diagram") {
	if (typeof customElements > "u" || customElements.get(e)) return;
	class t extends HTMLElement {
		constructor(...e) {
			super(...e), r(this, "observer", null), r(this, "scheduled", !1), r(this, "result", null);
		}
		static get observedAttributes() {
			return [
				"theme",
				"font",
				"language",
				"problems"
			];
		}
		connectedCallback() {
			this.shadowRoot || this.attachShadow({ mode: "open" }), this.observer = new MutationObserver(() => this.schedule()), this.observer.observe(this, {
				childList: !0,
				characterData: !0,
				subtree: !0
			}), this.schedule();
		}
		disconnectedCallback() {
			this.observer?.disconnect(), this.observer = null;
		}
		attributeChangedCallback() {
			this.isConnected && this.schedule();
		}
		get renderOptions() {
			return {
				theme: this.getAttribute("theme") ?? void 0,
				font: this.getAttribute("font") ?? void 0,
				language: this.getAttribute("language") ?? void 0,
				problems: this.getAttribute("problems") !== "hide"
			};
		}
		schedule() {
			this.scheduled || (this.scheduled = !0, queueMicrotask(() => gn(this.renderOptions).then(() => {
				this.scheduled = !1, this.draw();
			})));
		}
		draw() {
			let e = this.shadowRoot, t = document.createElement("div");
			this.result = hn(this.textContent ?? "", t, this.renderOptions), e.innerHTML = `<style>${_n}</style>`, e.append(...Array.from(t.childNodes)), this.dispatchEvent(new CustomEvent("dhole-rendered", {
				detail: this.result,
				bubbles: !0
			}));
		}
	}
	customElements.define(e, t);
}
function yn(e = "pre > code.language-dhole, pre.dhole, div.dhole", t = {}) {
	if (typeof document > "u") return 0;
	vn();
	let n = 0;
	return document.querySelectorAll(e).forEach((e) => {
		let r = e.tagName === "CODE" && e.parentElement?.tagName === "PRE" ? e.parentElement : e, i = document.createElement("dhole-diagram");
		for (let [e, n] of Object.entries({
			theme: t.theme,
			font: t.font,
			language: t.language
		})) typeof n == "string" && i.setAttribute(e, n);
		t.problems === !1 && i.setAttribute("problems", "hide"), i.textContent = e.textContent ?? "", r.replaceWith(i), n++;
	}), n;
}
//#endregion
//#region src/dhole/rendering/tones.ts
var H = class e {
	constructor(e, t, n, i, a, o, s = 0) {
		r(this, "kind", void 0), r(this, "inkValue", void 0), r(this, "index", void 0), r(this, "named", void 0), r(this, "strength", void 0), r(this, "opacity", void 0), r(this, "deepen", void 0), this.kind = e, this.inkValue = t, this.index = n, this.named = i, this.strength = a, this.opacity = o, this.deepen = s;
	}
	static of(t, n = 1) {
		return new e(0, t, 0, "accent", 1, n);
	}
	static palette(t, n = 1, r = 1) {
		return new e(1, "ink", t, "accent", n, r);
	}
	static hue(t, n = 1, r = 1) {
		return new e(2, "ink", 0, t, n, r);
	}
	washed(t) {
		return new e(this.kind, this.inkValue, this.index, this.named, t, this.opacity, this.deepen);
	}
	faded(t) {
		return new e(this.kind, this.inkValue, this.index, this.named, this.strength, t, this.deepen);
	}
	deepened(t) {
		return new e(this.kind, this.inkValue, this.index, this.named, this.strength, this.opacity, t);
	}
	get isHue() {
		return this.kind !== 0;
	}
	equals(e) {
		return !!e && this.kind === e.kind && this.inkValue === e.inkValue && this.index === e.index && this.named === e.named && this.strength === e.strength && this.opacity === e.opacity && this.deepen === e.deepen;
	}
	in(e) {
		let t;
		if (this.kind === 1) t = e.palette.at(this.index);
		else if (this.kind === 2) t = Cn(e, this.named);
		else switch (this.inkValue) {
			case "background":
				t = e.background;
				break;
			case "secondary":
				t = e.secondaryInk;
				break;
			case "muted":
				t = e.mutedInk;
				break;
			case "grid":
				t = e.grid;
				break;
			case "axis":
				t = e.axisLine;
				break;
			default: t = e.ink;
		}
		return this.strength < 1 && (t = xn(e.background, t, this.strength)), this.deepen > 0 && (t = xn(t, e.ink, this.deepen)), this.opacity < 1 && (t = {
			...t,
			a: Math.round(t.a * Math.min(Math.max(this.opacity, 0), 1))
		}), t;
	}
};
function bn(e) {
	let t = Math.round(e);
	return Math.abs(e % 1) === .5 && t % 2 != 0 ? t - 1 : t;
}
function xn(e, t, n) {
	let r = Math.min(Math.max(n, 0), 1), i = (e, t) => bn(e + (t - e) * r);
	return {
		r: i(e.r, t.r),
		g: i(e.g, t.g),
		b: i(e.b, t.b),
		a: i(e.a, t.a)
	};
}
var Sn = /* @__PURE__ */ new WeakMap();
function Cn(e, t) {
	if (t === "accent") return e.palette.at(0);
	if (t === "grey") return e.mutedInk;
	let n = Sn.get(e);
	n || (n = /* @__PURE__ */ new Map(), Sn.set(e, n));
	let r = n.get(t);
	if (r) return r;
	let i = Tn(e, t), a = Number.MAX_VALUE, o = wn(t);
	for (let t of e.palette.colors) {
		let [e, n, r] = En(t);
		if (n < .18 || r < .08 || r > .94) continue;
		let s = Math.abs(e - o);
		s = Math.min(s, 360 - s), s < a && (i = t, a = s);
	}
	return a > 50 && (i = Tn(e, t)), n.set(t, i), i;
}
function wn(e) {
	switch (e) {
		case "blue": return 215;
		case "orange": return 22;
		case "green": return 145;
		case "yellow": return 43;
		case "pink": return 330;
		case "purple": return 262;
		case "red": return 358;
		case "teal": return 178;
		default: return 215;
	}
}
function Tn(e, t) {
	return e.palette.at({
		blue: 0,
		orange: 1,
		green: 2,
		yellow: 3,
		pink: 4,
		teal: 5,
		purple: 6,
		red: 7
	}[t] ?? 0);
}
function En(e) {
	let t = e.r / 255, n = e.g / 255, r = e.b / 255, i = Math.max(t, n, r), a = Math.min(t, n, r), o = (i + a) / 2, s = i - a;
	if (s < 1e-9) return [
		0,
		0,
		o
	];
	let c = o > .5 ? s / (2 - i - a) : s / (i + a);
	return [
		(i === t ? (n - r) / s + (n < r ? 6 : 0) : i === n ? (r - t) / s + 2 : (t - n) / s + 4) * 60,
		c,
		o
	];
}
//#endregion
//#region src/dhole/rendering/scene.ts
function U(e, t, n, r = 1, i = "solid") {
	return {
		type: "shape",
		path: e,
		fill: t,
		stroke: n,
		width: r,
		line: i
	};
}
function Dn(e) {
	return Math.abs(Math.abs(e.rotation) - 90) < 1 ? z.fromXYWH(e.x + e.width / 2 - e.height / 2, e.y + e.height / 2 - e.width / 2, e.height, e.width) : z.fromXYWH(e.x, e.y, e.width, e.height);
}
var On = class {
	constructor(e) {
		r(this, "fontFamilies", void 0), r(this, "marks", []), r(this, "width", 0), r(this, "height", 0), this.fontFamilies = e;
	}
	add(e) {
		this.marks.push(e);
	}
	get texts() {
		return this.marks.filter((e) => e.type === "text");
	}
	get shapes() {
		return this.marks.filter((e) => e.type === "shape");
	}
	offset(e, t) {
		let n = Dt(e, t);
		for (let r = 0; r < this.marks.length; r++) {
			let i = this.marks[r];
			this.marks[r] = i.type === "shape" ? {
				...i,
				path: i.path.transformed(n)
			} : {
				...i,
				x: i.x + e,
				y: i.y + t
			};
		}
	}
	bounds() {
		let e = Number.MAX_VALUE, t = Number.MAX_VALUE, n = -Number.MAX_VALUE, r = -Number.MAX_VALUE;
		for (let i of this.marks) {
			let a = i.type === "shape" ? i.path.tightBounds().inflate(i.stroke === null ? 0 : i.width / 2) : Dn(i);
			a.width <= 0 && a.height <= 0 || (e = Math.min(e, a.left), t = Math.min(t, a.top), n = Math.max(n, a.right), r = Math.max(r, a.bottom));
		}
		return e > n ? new z(0, 0, 0, 0) : new z(e, t, n, r);
	}
	frame(e) {
		let t = this.bounds(), n = {
			x: e - t.left,
			y: e - t.top
		};
		return this.offset(n.x, n.y), this.width = Math.ceil(t.width + 2 * e), this.height = Math.ceil(t.height + 2 * e), n;
	}
}, kn = class {
	constructor(e, t) {
		r(this, "families", void 0), r(this, "measurer", void 0), r(this, "cache", /* @__PURE__ */ new Map()), this.families = e, this.measurer = t;
	}
	layout(e, t, n, r = Infinity, i = !1, a = "left") {
		e ?? (e = "");
		let o = `${t}|${n}|${r}|${i}|${a}|${e}`, s = this.cache.get(o);
		if (s) return s;
		let c = St(this.measurer, e, {
			families: this.families,
			size: t,
			weight: n,
			italic: i
		}, r, a);
		return this.cache.size > 4096 && this.cache.clear(), this.cache.set(o, c), c;
	}
	measure(e, t, n, r = Infinity, i = !1) {
		if (!e) return {
			width: 0,
			height: this.layout(" ", t, n).height
		};
		let a = this.layout(e, t, n, r, i);
		return {
			width: a.width,
			height: a.height
		};
	}
	mark(e, t, n, r, i, a, o = Infinity, s = "left", c = !1) {
		let l = this.measure(e, r, i, o, c), u = Number.isFinite(o) || s !== "left" ? l.width : Infinity;
		return {
			type: "text",
			text: e,
			x: t,
			y: n,
			width: l.width,
			height: l.height,
			measure: u,
			size: r,
			weight: i,
			colour: a,
			align: s,
			italic: c,
			rotation: 0
		};
	}
	centred(e, t, n, r, i, a, o = Infinity, s = !1) {
		let c = this.measure(e, r, i, o, s);
		return this.mark(e, t - c.width / 2, n - c.height / 2, r, i, a, o, "center", s);
	}
};
function An(e, t, n) {
	let r = Math.max(1, t * .8);
	return {
		colour: e,
		style: "stroke",
		strokeWidth: n === "thick" ? t * 2.2 : t,
		cap: "butt",
		join: "round",
		dash: n === "dashed" ? [5 * r, 4 * r] : void 0
	};
}
var jn = class extends It {
	constructor(e, t, n) {
		super(), r(this, "scene", void 0), r(this, "kindName", void 0), r(this, "measurer", void 0), this.scene = e, this.kindName = t, this.measurer = n;
	}
	get width() {
		return this.scene.width;
	}
	get height() {
		return this.scene.height;
	}
	get kind() {
		return this.kindName;
	}
	draw(e) {
		let t = e.sink, n = e.theme, r = new kn(this.scene.fontFamilies, this.measurer);
		for (let e of this.scene.marks) {
			if (e.type === "shape") {
				e.fill && t.drawPath(e.path, {
					colour: e.fill.in(n),
					style: "fill"
				}), e.stroke && e.width > 0 && t.drawPath(e.path, An(e.stroke.in(n), e.width, e.line));
				continue;
			}
			let i = r.layout(e.text, e.size, e.weight, Number.isFinite(e.measure) ? e.measure + .5 : Infinity, e.italic, e.align);
			if (e.rotation === 0) {
				t.drawText(i, e.x, e.y, e.colour.in(n));
				continue;
			}
			let a = t.save();
			try {
				t.concat(kt(e.rotation, e.x + e.width / 2, e.y + e.height / 2)), t.drawText(i, e.x, e.y, e.colour.in(n));
			} finally {
				t.restoreToCount(a);
			}
		}
	}
}, W = {
	hues: /* @__PURE__ */ new Map([
		["blue", "blue"],
		["orange", "orange"],
		["green", "green"],
		["yellow", "yellow"],
		["amber", "yellow"],
		["gold", "yellow"],
		["pink", "pink"],
		["magenta", "pink"],
		["purple", "purple"],
		["violet", "purple"],
		["red", "red"],
		["teal", "teal"],
		["cyan", "teal"],
		["grey", "grey"],
		["gray", "grey"],
		["accent", "accent"],
		["highlight", "accent"],
		["primary", "accent"],
		["good", "green"],
		["ok", "green"],
		["success", "green"],
		["done", "green"],
		["yes", "green"],
		["bad", "red"],
		["error", "red"],
		["fail", "red"],
		["failure", "red"],
		["danger", "red"],
		["no", "red"],
		["warn", "yellow"],
		["warning", "yellow"],
		["caution", "yellow"]
	]),
	hue(e) {
		return W.hues.get(k(e)) ?? null;
	},
	names: [
		"blue",
		"orange",
		"green",
		"yellow",
		"pink",
		"purple",
		"red",
		"teal",
		"grey",
		"good",
		"bad",
		"warn",
		"accent"
	]
};
//#endregion
//#region src/dhole/rendering/shapes.ts
function Mn(e, t, n, r) {
	let i = t.width + 2 * n, a = t.height + 2 * r, o = (e) => ({
		width: e,
		height: e
	});
	switch (e) {
		case "diamond": return {
			width: Math.max(i * 1.6, a * 2.2),
			height: Math.max(a * 1.8, 44)
		};
		case "circle": return o(Math.max(i, a) * 1.12);
		case "pill": return {
			width: i + a * .6,
			height: a
		};
		case "hexagon": return {
			width: i + a * .8,
			height: a
		};
		case "parallelogram": return {
			width: i + a * .6,
			height: a
		};
		case "cylinder": return {
			width: i,
			height: a + 14
		};
		case "document": return {
			width: i,
			height: a + 8
		};
		case "subroutine": return {
			width: i + 16,
			height: a
		};
		case "note": return {
			width: i + 6,
			height: a
		};
		case "startDot": return o(20);
		case "endDot": return o(22);
		case "bar": return {
			width: Math.max(80, i),
			height: 7
		};
		default: return {
			width: i,
			height: a
		};
	}
}
function Nn(e, t) {
	let n = new B(), r = t.left, i = t.top, a = t.right, o = t.bottom, s = t.width, c = t.height;
	switch (e) {
		case "round":
			n.addRoundRect(t, Math.min(14, c / 2), Math.min(14, c / 2));
			break;
		case "pill":
			n.addRoundRect(t, c / 2, c / 2);
			break;
		case "circle":
		case "startDot":
		case "endDot":
			n.addOval(t);
			break;
		case "diamond":
			n.moveTo(t.midX, i).lineTo(a, t.midY).lineTo(t.midX, o).lineTo(r, t.midY).close();
			break;
		case "hexagon": {
			let e = Math.min(c * .4, s / 4);
			n.moveTo(r + e, i).lineTo(a - e, i).lineTo(a, t.midY).lineTo(a - e, o).lineTo(r + e, o).lineTo(r, t.midY).close();
			break;
		}
		case "parallelogram": {
			let e = Math.min(c * .3, s / 5);
			n.moveTo(r + e, i).lineTo(a, i).lineTo(a - e, o).lineTo(r, o).close();
			break;
		}
		case "cylinder":
			n.moveTo(r, i + 6), n.arcTo(new z(r, i, a, i + 12), 180, 180, !1), n.lineTo(a, o - 6), n.arcTo(new z(r, o - 12, a, o), 0, 180, !1), n.close(), n.moveTo(r, i + 6), n.arcTo(new z(r, i, a, i + 12), 180, -180, !1);
			break;
		case "document":
			n.moveTo(r, i).lineTo(a, i).lineTo(a, o - 7), n.cubicTo(F(a - s * .25, o - 7 * 2.2), F(r + s * .45, o + 4.2), F(r, o - 7 * .4)), n.close();
			break;
		case "subroutine":
			n.addRect(t), n.moveTo(r + 7, i).lineTo(r + 7, o), n.moveTo(a - 7, i).lineTo(a - 7, o);
			break;
		case "note": {
			let e = Math.min(10, c / 3);
			n.moveTo(r, i).lineTo(a - e, i).lineTo(a, i + e).lineTo(a, o).lineTo(r, o).close(), n.moveTo(a - e, i).lineTo(a - e, i + e).lineTo(a, i + e);
			break;
		}
		case "bar":
			n.addRoundRect(t, 2, 2);
			break;
		case "square":
			n.addRect(t);
			break;
		default: n.addRoundRect(t, 5, 5);
	}
	return n;
}
function Pn(e, t, n, r) {
	let i = t.width / 2, a = t.height / 2, o = t.midX, s = t.midY, c = r ? n.x - o : n.y - s, l = r ? i : a, u = r ? a : i, d = Math.sign(r ? n.y - s : n.x - o);
	if (d === 0 || l <= 0) return n;
	let f = Math.min(Math.max(Math.abs(c) / l, 0), 1), p;
	switch (e) {
		case "diamond":
			p = u * (1 - f);
			break;
		case "circle":
		case "startDot":
		case "endDot":
			p = u * Math.sqrt(Math.max(0, 1 - f * f));
			break;
		case "pill":
			p = r ? Fn(Math.abs(c), i, a) : u;
			break;
		default: p = u;
	}
	return r ? F(n.x, s + d * p) : F(o + d * p, n.y);
}
function Fn(e, t, n) {
	let r = t - n;
	if (e <= r) return n;
	let i = e - r;
	return Math.sqrt(Math.max(0, n * n - i * i));
}
function In(e, t) {
	let n = new B();
	if (e.length === 0) return n;
	n.moveTo(e[0]);
	for (let r = 1; r < e.length; r++) {
		let i = e[r - 1], a = e[r];
		if (Math.abs(t ? a.x - i.x : a.y - i.y) < 1) n.lineTo(t ? F(i.x, a.y) : F(a.x, i.y));
		else if (t) {
			let e = (i.y + a.y) / 2;
			n.cubicTo(F(i.x, e), F(a.x, e), a);
		} else {
			let e = (i.x + a.x) / 2;
			n.cubicTo(F(e, i.y), F(e, a.y), a);
		}
	}
	return n;
}
function Ln(e) {
	let t = new B();
	return e.forEach((e, n) => n === 0 ? t.moveTo(e) : t.lineTo(e)), t;
}
function Rn(e, t) {
	switch (e) {
		case "arrow": return t;
		case "triangle": return t * 1.25;
		case "diamond":
		case "hollowDiamond": return t * 1.9;
		default: return 0;
	}
}
function zn(e, t, n, r) {
	if (e === "none") return null;
	let i = Et(wt(n) < 1e-9 ? F(0, 1) : n), a = F(-i.y, i.x), o = new B();
	switch (e) {
		case "arrow": {
			let e = L(t, R(i, r));
			return o.moveTo(t).lineTo(I(e, R(a, r * .5))).lineTo(L(e, R(i, -r * .12))).lineTo(L(e, R(a, r * .5))).close(), {
				path: o,
				filled: !0
			};
		}
		case "triangle": {
			let e = L(t, R(i, r * 1.25));
			return o.moveTo(t).lineTo(I(e, R(a, r * .62))).lineTo(L(e, R(a, r * .62))).close(), {
				path: o,
				filled: !1
			};
		}
		default: {
			let n = r * .95, s = L(t, R(i, n));
			return o.moveTo(t).lineTo(I(s, R(a, r * .48))).lineTo(L(t, R(i, n * 2))).lineTo(L(s, R(a, r * .48))).close(), {
				path: o,
				filled: e === "diamond"
			};
		}
	}
}
//#endregion
//#region src/dhole/layout/layered.ts
var G = Math.fround, Bn = class {
	constructor(e, t, n) {
		r(this, "width", void 0), r(this, "height", void 0), r(this, "loopRoom", 0), r(this, "pin", 0), r(this, "center", F(0, 0)), this.width = e, this.height = t, n?.pin !== void 0 && (this.pin = n.pin);
	}
	get box() {
		return z.fromXYWH(this.center.x - this.width / 2, this.center.y - this.height / 2, this.width, this.height);
	}
}, Vn = class {
	constructor(e, t, n = null, i = 1) {
		r(this, "from", void 0), r(this, "to", void 0), r(this, "label", void 0), r(this, "weight", void 0), r(this, "points", []), r(this, "labelCenter", F(0, 0)), r(this, "againstFlow", !1), this.from = e, this.to = t, this.label = n, this.weight = i;
	}
	get isLoop() {
		return this.from === this.to;
	}
}, Hn = class {
	constructor() {
		r(this, "width", 0), r(this, "height", 0), r(this, "rank", 0), r(this, "order", 0), r(this, "x", 0), r(this, "real", -1), r(this, "isLabel", !1), r(this, "down", []), r(this, "up", []);
	}
};
function Un(e, t) {
	return e.isEmpty ? t : t.isEmpty ? e : e.union(t);
}
function Wn(e, t) {
	return e.isEmpty ? new z(t.x, t.y, t.x, t.y) : new z(Math.min(e.left, t.x), Math.min(e.top, t.y), Math.max(e.right, t.x), Math.max(e.bottom, t.y));
}
function Gn(e, t, n, r = 28, i = 44) {
	if (e.length === 0) return new z(0, 0, 0, 0);
	let a = n === "right" || n === "left", o = (t) => G((a ? e[t].height : e[t].width) + e[t].loopRoom), s = (t) => a ? e[t].width : e[t].height, c = t.filter((t) => !t.isLoop && t.from >= 0 && t.to >= 0 && t.from < e.length && t.to < e.length), l = c.some((e) => e.label !== null), u = l ? 2 : 1, d = qn(e.length, c), f = Jn(e.length, c, d, u, e.map((e) => e.pin)), p = [];
	for (let t = 0; t < e.length; t++) {
		let e = new Hn();
		e.width = o(t), e.height = s(t), e.rank = f[t], e.real = t, p.push(e);
	}
	let m = [];
	for (let e = 0; e < c.length; e++) {
		let t = c[e], n = d[e] ? t.to : t.from, r = d[e] ? t.from : t.to, i = [n], o = f[n] + Math.max(1, Math.trunc((f[r] - f[n]) / 2));
		for (let e = f[n] + 1; e < f[r]; e++) {
			let n = t.label !== null && e === o, r = n ? t.label : {
				width: 0,
				height: 0
			}, s = new Hn();
			s.width = n ? a ? r.height : r.width : 2, s.height = n ? a ? r.width : r.height : 0, s.rank = e, s.isLabel = n, p.push(s), i.push(p.length - 1);
		}
		i.push(r);
		for (let e = 0; e + 1 < i.length; e++) {
			let n = p[i[e]].real < 0 && p[i[e + 1]].real < 0, r = G(t.weight * (n ? 8 : p[i[e]].real < 0 || p[i[e + 1]].real < 0 ? 2 : 1));
			p[i[e]].down.push({
				to: i[e + 1],
				weight: r
			}), p[i[e + 1]].up.push({
				from: i[e],
				weight: r
			});
		}
		m.push(i);
	}
	let h = Math.max(...p.map((e) => e.rank)) + 1, g = Array.from({ length: h }, () => []);
	Yn(p, g), Xn(p, g), tr(p, g, r);
	let _ = Array(h).fill(0), v = Array(h).fill(0);
	for (let e = 0; e < h; e++) v[e] = g[e].length === 0 ? 0 : Math.max(...g[e].map((e) => p[e].height));
	let y = l ? i / 2 : i, b = 0;
	for (let e = 0; e < h; e++) _[e] = b, b = G(b + v[e] + y);
	let x = (e, t) => {
		switch (n) {
			case "up": return F(e, -t);
			case "right": return F(t, e);
			case "left": return F(-t, e);
			default: return F(e, t);
		}
	};
	for (let t = 0; t < e.length; t++) {
		let n = p[t], r = n.x - e[t].loopRoom / 2;
		e[t].center = x(r, _[n.rank] + v[n.rank] / 2);
	}
	let S = /* @__PURE__ */ new Map(), C = (e, t) => `${e}:${t}`;
	for (let e = 0; e < c.length; e++) {
		let t = m[e], n = t[0], r = t[t.length - 1], i = p[t[1]].x, a = p[t[t.length - 2]].x;
		Kn(S, C(n, !0), e, i), Kn(S, C(r, !1), e, a);
	}
	let w = (t, n, r) => {
		let i = p[t], a = S.get(C(t, n));
		if (!a || a.length < 2 || i.real < 0) return i.x - (i.real >= 0 ? e[i.real].loopRoom / 2 : 0);
		let o = a.map((e, t) => ({
			s: e,
			i: t
		})).sort((e, t) => e.s.toward - t.s.toward || e.s.line - t.s.line || e.i - t.i).map((e) => e.s), s = o.findIndex((e) => e.line === r), c = G((i.width - e[i.real].loopRoom) * .6);
		return i.x - e[i.real].loopRoom / 2 - c / 2 + c * (s + .5) / o.length;
	};
	for (let e = 0; e < c.length; e++) {
		let t = c[e], n = m[e], r = [], i = p[n[0]], a = p[n[n.length - 1]];
		r.push(x(w(n[0], !0, e), _[i.rank] + v[i.rank] / 2 + i.height / 2));
		for (let e = 1; e + 1 < n.length; e++) {
			let i = p[n[e]], a = _[i.rank] + v[i.rank] / 2;
			i.isLabel && (t.labelCenter = x(i.x, a)), r.push(x(i.x, a));
		}
		r.push(x(w(n[n.length - 1], !1, e), _[a.rank] + v[a.rank] / 2 - a.height / 2)), d[e] && (r.reverse(), t.againstFlow = !0), t.label !== null && n.length === 2 && (t.labelCenter = F((r[0].x + r[r.length - 1].x) / 2, (r[0].y + r[r.length - 1].y) / 2)), t.points.length = 0, t.points.push(...r);
	}
	for (let n of t.filter((t) => t.isLoop && t.from >= 0 && t.from < e.length)) {
		let t = e[n.from].box, r;
		a ? (r = [
			F(t.midX - t.width * .22, t.bottom),
			F(t.midX, t.bottom + 26),
			F(t.midX + t.width * .22, t.bottom)
		], n.labelCenter = F(t.midX, t.bottom + 26 + (n.label?.height ?? 0) / 2 + 4)) : (r = [
			F(t.right, t.midY - t.height * .22),
			F(t.right + 26, t.midY),
			F(t.right, t.midY + t.height * .22)
		], n.labelCenter = F(t.right + 26 + (n.label?.width ?? 0) / 2 + 6, t.midY)), n.points.length = 0, n.points.push(...r);
	}
	let T = e[0].box;
	for (let t of e) T = Un(T, t.box);
	for (let e of t) {
		for (let t of e.points) T = Wn(T, t);
		if (e.label !== null) {
			let t = e.label;
			T = Un(T, z.fromXYWH(e.labelCenter.x - t.width / 2, e.labelCenter.y - t.height / 2, t.width, t.height));
		}
	}
	return T;
}
function Kn(e, t, n, r) {
	let i = e.get(t);
	i || e.set(t, i = []), i.push({
		line: n,
		toward: r
	});
}
function qn(e, t) {
	let n = Array(t.length).fill(!1), r = Array.from({ length: e }, () => []);
	for (let e = 0; e < t.length; e++) r[t[e].from].push(e);
	let i = Array(e).fill(0), a = Array(e).fill(!1);
	for (let e of t) a[e.to] = !0;
	let o = [];
	for (let t = 0; t < e; t++) a[t] || o.push(t);
	for (let t = 0; t < e; t++) o.push(t);
	for (let e of o) {
		if (i[e] !== 0) continue;
		let a = [];
		for (a.push([e, 0]), i[e] = 1; a.length > 0;) {
			let [e, o] = a.pop();
			if (o < r[e].length) {
				a.push([e, o + 1]);
				let s = r[e][o], c = t[s].to;
				i[c] === 1 ? n[s] = !0 : i[c] === 0 && (i[c] = 1, a.push([c, 0]));
			} else i[e] = 2;
		}
	}
	return n;
}
function Jn(e, t, n, r, i) {
	let a = Array.from({ length: e }, () => []), o = Array.from({ length: e }, () => []);
	for (let e = 0; e < t.length; e++) {
		let r = n[e] ? t[e].to : t[e].from, i = n[e] ? t[e].from : t[e].to;
		r !== i && (a[r].push(i), o[i].push(r));
	}
	let s = o.map((e) => e.length), c = /* @__PURE__ */ new Set();
	for (let t = 0; t < e; t++) s[t] === 0 && c.add(t);
	let l = [];
	for (; c.size > 0;) {
		let e = 2 ** 53 - 1;
		for (let t of c) t < e && (e = t);
		c.delete(e), l.push(e);
		for (let t of a[e]) --s[t] === 0 && c.add(t);
	}
	for (let t = 0; t < e; t++) l.includes(t) || l.push(t);
	let u = Array(e).fill(0);
	for (let e of l) for (let t of o[e]) u[e] = Math.max(u[e], u[t] + r);
	for (let e = 0; e < 2; e++) for (let e = l.length - 1; e >= 0; e--) {
		let t = l[e];
		o[t].length === 0 && a[t].length > 0 && i[t] === 0 && (u[t] = Math.min(...a[t].map((e) => u[e])) - r);
	}
	let d = [];
	for (let t = 0; t < e; t++) i[t] === 0 && d.push(u[t]);
	let f = u.length === 0 || d.length === 0 ? 0 : Math.min(...d);
	for (let t = 0; t < e; t++) u[t] -= f;
	let p = [];
	for (let t = 0; t < e; t++) i[t] === 0 && p.push(u[t]);
	let m = p.length === 0 ? 0 : Math.max(...p);
	for (let t = 0; t < e; t++) i[t] === 1 ? u[t] = Math.min(0, a[t].length === 0 ? 0 : Math.min(...a[t].map((e) => u[e] - r))) : i[t] === 2 && (u[t] = Math.max(m, o[t].length === 0 ? m : Math.max(...o[t].map((e) => u[e] + r))));
	f = u.length === 0 ? 0 : Math.min(...u);
	for (let t = 0; t < e; t++) u[t] -= f;
	return u;
}
function Yn(e, t) {
	let n = Array(e.length).fill(!1), r = (r) => {
		let i = [r];
		for (; i.length > 0;) {
			let r = i.pop();
			if (!n[r]) {
				n[r] = !0, t[e[r].rank].push(r);
				for (let t = e[r].down.length - 1; t >= 0; t--) n[e[r].down[t].to] || i.push(e[r].down[t].to);
			}
		}
	};
	for (let t = 0; t < e.length; t++) e[t].up.length === 0 && e[t].real >= 0 && r(t);
	for (let t = 0; t < e.length; t++) n[t] || r(t);
	for (let n of t) for (let t = 0; t < n.length; t++) e[n[t]].order = t;
}
function Xn(e, t) {
	let n = er(e, t), r = t.map((e) => [...e]);
	for (let i = 0; i < 24 && n > 0; i++) {
		if (i % 2 == 0) for (let n = 1; n < t.length; n++) Zn(e, t[n], !0);
		else for (let n = t.length - 2; n >= 0; n--) Zn(e, t[n], !1);
		Qn(e, t);
		let a = er(e, t);
		a < n && (n = a, r = t.map((e) => [...e]));
	}
	for (let n = 0; n < t.length; n++) {
		t[n].length = 0, t[n].push(...r[n]);
		for (let r = 0; r < t[n].length; r++) e[t[n][r]].order = r;
	}
}
function Zn(e, t, n) {
	let r = [];
	for (let i of t) {
		let t = e[i], a = 0, o = 0;
		if (n) for (let { from: n, weight: r } of t.up) a += e[n].order * r, o += r;
		else for (let { to: n, weight: r } of t.down) a += e[n].order * r, o += r;
		r.push({
			vertex: i,
			key: o > 0 ? a / o : t.order,
			was: t.order
		});
	}
	r.sort((e, t) => e.key === t.key ? e.was - t.was : e.key < t.key ? -1 : 1), t.length = 0;
	for (let n = 0; n < r.length; n++) t.push(r[n].vertex), e[r[n].vertex].order = n;
}
function Qn(e, t) {
	for (let n = 0; n < 4; n++) {
		let n = !1;
		for (let r = 0; r < t.length; r++) {
			let i = t[r];
			for (let t = 0; t + 1 < i.length; t++) {
				let r = i[t], a = i[t + 1], o = $n(e, r, a);
				$n(e, a, r) < o && (i[t] = a, i[t + 1] = r, e[a].order = t, e[r].order = t + 1, n = !0);
			}
		}
		if (!n) break;
	}
}
function $n(e, t, n) {
	let r = 0;
	for (let { from: i } of e[t].up) for (let { from: t } of e[n].up) e[i].order > e[t].order && r++;
	for (let { to: i } of e[t].down) for (let { to: t } of e[n].down) e[i].order > e[t].order && r++;
	return r;
}
function er(e, t) {
	let n = 0;
	for (let r = 0; r + 1 < t.length; r++) {
		let i = [];
		for (let n of t[r]) for (let { to: t } of e[n].down) i.push([e[n].order, e[t].order]);
		for (let e = 0; e < i.length; e++) for (let t = e + 1; t < i.length; t++) (i[e][0] - i[t][0]) * (i[e][1] - i[t][1]) < 0 && n++;
	}
	return n;
}
function tr(e, t, n) {
	for (let r of t) {
		let t = 0;
		for (let i = 0; i < r.length; i++) {
			let a = e[r[i]];
			i > 0 && (t = G(t + rr(e[r[i - 1]], a, n))), a.x = t;
		}
		let i = r.length === 0 ? 0 : G((e[r[0]].x + e[r[r.length - 1]].x) / 2);
		for (let t of r) e[t].x = G(e[t].x - i);
	}
	for (let r = 0; r < 40; r++) {
		let i = r % 2 == 0, a = [];
		for (let e = 0; e < t.length; e++) a.push(e);
		i || a.reverse();
		for (let r of a) {
			let i = t[r];
			if (i.length === 0) continue;
			let a = Array(i.length).fill(0);
			for (let t = 0; t < i.length; t++) {
				let n = e[i[t]], r = 0, o = 0;
				for (let { from: t, weight: i } of n.up) r += G(e[t].x * i), o += i;
				for (let { to: t, weight: i } of n.down) r += G(e[t].x * i), o += i;
				a[t] = o > 0 ? r / o : n.x;
			}
			let o = [];
			for (let t = 0; t < i.length - 1; t++) o.push(rr(e[i[t]], e[i[t + 1]], n));
			let s = ir(a, o);
			for (let t = 0; t < i.length; t++) e[i[t]].x = G(s[t]);
		}
	}
	nr(e, t, n);
	let r = 34028234663852886e22;
	for (let t of e) r = Math.min(r, G(t.x - t.width / 2));
	for (let t of e) t.x = G(t.x - r);
}
function nr(e, t, n) {
	let r = (t) => e[t].up.length === 1 && e[e[t].up[0].from].down.length === 1;
	for (let i = 0; i < e.length; i++) {
		if (r(i)) continue;
		let a = [i], o = i;
		for (; e[o].down.length === 1 && e[e[o].down[0].to].up.length === 1;) o = e[o].down[0].to, a.push(o);
		if (a.length < 2) continue;
		let s = a[0], c = (t) => [e[t].up.length + e[t].down.length, +(e[t].real < 0)];
		for (let e of a) {
			let [t, n] = c(e), [r, i] = c(s);
			(t > r || t === r && n < i) && (s = e);
		}
		let l = e[s].x, u = -34028234663852886e22, d = 34028234663852886e22;
		for (let r of a) {
			let i = t[e[r].rank], a = e[r].order;
			a > 0 && (u = Math.max(u, G(e[i[a - 1]].x + rr(e[i[a - 1]], e[r], n)))), a + 1 < i.length && (d = Math.min(d, G(e[i[a + 1]].x - rr(e[r], e[i[a + 1]], n))));
		}
		if (!(u > d)) {
			l = Math.min(Math.max(l, u), d);
			for (let t of a) e[t].x = l;
		}
	}
}
function rr(e, t, n) {
	let r = e.real < 0 && !e.isLabel, i = t.real < 0 && !t.isLabel, a = r && i ? G(n * G(.35)) : r || i ? G(n * G(.6)) : n;
	return G(G((e.width + t.width) / 2) + a);
}
function ir(e, t) {
	let n = e.length, r = Array(n).fill(0);
	for (let e = 1; e < n; e++) r[e] = r[e - 1] + t[e - 1];
	let i = [];
	for (let t = 0; t < n; t++) for (i.push({
		sum: e[t] - r[t],
		count: 1
	}); i.length > 1 && i[i.length - 2].sum / i[i.length - 2].count > i[i.length - 1].sum / i[i.length - 1].count;) {
		let { sum: e, count: t } = i.pop(), n = i[i.length - 1];
		i[i.length - 1] = {
			sum: n.sum + e,
			count: n.count + t
		};
	}
	let a = Array(n).fill(0), o = 0;
	for (let { sum: e, count: t } of i) {
		let n = e / t;
		for (let e = 0; e < t; e++, o++) a[o] = n + r[o];
	}
	return a;
}
//#endregion
//#region src/dhole/layout/graph-diagram.ts
var ar = class {
	constructor(e) {
		r(this, "stereotype", null), r(this, "sections", []), r(this, "tabular", !1), e?.tabular && (this.tabular = !0);
	}
};
function or(e, t = !1, n = !1) {
	return {
		cells: e,
		italic: t,
		underline: n
	};
}
var sr = class {
	constructor(e, t = "") {
		r(this, "id", void 0), r(this, "key", void 0), r(this, "label", ""), r(this, "shape", "box"), r(this, "hue", H.hue("accent")), r(this, "muted", !1), r(this, "group", -1), r(this, "compartments", null), r(this, "order", 0), r(this, "size", {
			width: 0,
			height: 0
		}), r(this, "box", new z(0, 0, 0, 0)), this.id = e, this.key = t;
	}
}, cr = class {
	constructor(e) {
		r(this, "from", void 0), r(this, "to", void 0), r(this, "fromGroup", !1), r(this, "toGroup", !1), r(this, "label", null), r(this, "line", "solid"), r(this, "tail", "none"), r(this, "tip", "arrow"), r(this, "tailCard", null), r(this, "tipCard", null), r(this, "crowsFeet", !1), r(this, "hue", null), this.from = e.from, this.to = e.to, Object.assign(this, e);
	}
}, lr = class {
	constructor(e) {
		r(this, "id", void 0), r(this, "label", ""), r(this, "parent", -1), r(this, "hue", null), r(this, "isState", !1), r(this, "box", new z(0, 0, 0, 0)), this.id = e;
	}
}, ur = class {
	constructor() {
		r(this, "direction", "down"), r(this, "nodes", []), r(this, "edges", []), r(this, "groups", []), r(this, "byId", /* @__PURE__ */ new Map());
	}
	indexOf(e) {
		return this.byId.get(e) ?? -1;
	}
	redirect(e) {
		if (e.size === 0) return;
		for (let t of this.edges) !t.fromGroup && e.has(t.from) && (t.from = e.get(t.from), t.fromGroup = !0), !t.toGroup && e.has(t.to) && (t.to = e.get(t.to), t.toGroup = !0);
		let t = /* @__PURE__ */ new Map(), n = [];
		for (let r = 0; r < this.nodes.length; r++) e.has(r) || (t.set(r, n.length), n.push(this.nodes[r]));
		for (let e of this.edges) e.fromGroup || (e.from = t.get(e.from)), e.toGroup || (e.to = t.get(e.to));
		this.nodes.length = 0, this.nodes.push(...n), this.byId.clear();
		for (let e = 0; e < this.nodes.length; e++) this.byId.set(this.nodes[e].key, e);
	}
	node(e, t) {
		let n = this.byId.get(e);
		if (n !== void 0) return {
			node: this.nodes[n],
			created: !1
		};
		let r = new sr(e, e);
		return r.label = e, r.group = t, r.order = this.nodes.length, this.byId.set(e, this.nodes.length), this.nodes.push(r), {
			node: r,
			created: !0
		};
	}
};
function dr(e) {
	let t = Math.fround(e.fontSize / 11);
	return {
		label: 14 * t,
		small: 12.5 * t,
		heading: 14 * t
	};
}
var fr = 14, pr = 9, mr = 210, hr = 16, gr = 9, _r = (e) => `${e.isGroup ? "g" : "n"}${e.index}`, vr = (e, t) => e.isGroup === t.isGroup && e.index === t.index, yr = class {
	constructor() {
		r(this, "group", -1), r(this, "items", []), r(this, "boxes", []), r(this, "lines", []), r(this, "stubs", /* @__PURE__ */ new Map()), r(this, "size", {
			width: 0,
			height: 0
		}), r(this, "contentOffset", F(0, 0)), r(this, "origin", F(0, 0));
	}
}, br = { build: xr };
function xr(e, t, n) {
	let r = new kn(t.fontFamilies, n), i = dr(t), a = new On(t.fontFamilies);
	for (let t of e.nodes) t.size = Sr(t, r, i);
	let o = /* @__PURE__ */ new Map();
	Mr(e, Tr(e, -1, o, r, i), o, F(0, 0)), Nr(e, a, r, i), Fr(e, o, a, r, i), Hr(e, a, r, i);
	let s = a.frame(12);
	for (let t of e.nodes) t.box = z.fromXYWH(t.box.left + s.x, t.box.top + s.y, t.box.width, t.box.height);
	for (let t of e.groups) t.box = z.fromXYWH(t.box.left + s.x, t.box.top + s.y, t.box.width, t.box.height);
	return a;
}
function Sr(e, t, n) {
	if (e.shape === "startDot" || e.shape === "endDot" || e.shape === "bar") return Mn(e.shape, {
		width: 0,
		height: 0
	}, 0, 0);
	if (e.compartments !== null) return Cr(e, e.compartments, t, n);
	let r = t.measure(e.label, n.label, P.Normal, e.shape === "diamond" ? mr * Math.fround(.7) : mr), i = Mn(e.shape, r, fr, pr);
	return {
		width: Math.max(i.width, e.shape === "circle" ? 0 : 56),
		height: Math.max(i.height, 34)
	};
}
function Cr(e, t, n, r) {
	let i = n.measure(e.label, r.heading, P.SemiBold).width, a = n.measure(e.label, r.heading, P.SemiBold).height + 14;
	if (t.stereotype !== null) {
		let e = n.measure(`«${t.stereotype}»`, r.small, P.Normal);
		i = Math.max(i, e.width), a += e.height;
	}
	for (let e of t.sections) {
		a += 8;
		for (let o of e) {
			let e = wr(t, n, r), s = t.tabular ? e.reduce((e, t) => e + t, 0) + 14 * (e.length - 1) : n.measure(o.cells[0], r.small, P.Normal, Infinity, o.italic).width;
			i = Math.max(i, s), a += n.measure("Ag", r.small, P.Normal).height + 3;
		}
		e.length === 0 && (a += 6);
	}
	return {
		width: Math.max(i + 28, 96),
		height: a + 6
	};
}
function wr(e, t, n) {
	let r = e.sections.flat(), i = r.length === 0 ? 1 : Math.max(...r.map((e) => e.cells.length)), a = Array(i).fill(0);
	for (let e of r) for (let r = 0; r < e.cells.length; r++) a[r] = Math.max(a[r], t.measure(e.cells[r], n.small, P.Normal).width);
	return a;
}
function Tr(e, t, n, r, i) {
	let a = new yr();
	a.group = t;
	for (let o = 0; o < e.groups.length; o++) if (e.groups[o].parent === t) {
		let t = Tr(e, o, n, r, i);
		n.set(o, t), a.items.push({
			isGroup: !0,
			index: o
		}), a.boxes.push(new Bn(t.size.width, t.size.height));
	}
	for (let n = 0; n < e.nodes.length; n++) e.nodes[n].group === t && (a.items.push({
		isGroup: !1,
		index: n
	}), a.boxes.push(new Bn(e.nodes[n].size.width, e.nodes[n].size.height)));
	let o = a.items.map((e, t) => t).sort((t, n) => Or(e, a.items[t]) - Or(e, a.items[n]) || t - n), s = o.map((e) => a.items[e]), c = o.map((e) => a.boxes[e]);
	a.items.length = 0, a.items.push(...s), a.boxes.length = 0, a.boxes.push(...c);
	let l = /* @__PURE__ */ new Map();
	for (let e = 0; e < a.items.length; e++) l.set(_r(a.items[e]), e);
	let u = [];
	for (let n = 0; n < e.edges.length; n++) {
		let o = e.edges[n], s = o.fromGroup ? jr(e, o.from, t) : Ar(e, o.from, t), c = o.toGroup ? jr(e, o.to, t) : Ar(e, o.to, t);
		if (t >= 0 && s === null != (c === null)) {
			let e = a.boxes.length;
			a.boxes.push(new Bn(2, 2, { pin: s === null ? 1 : 2 }));
			let t = s === null ? new Vn(e, l.get(_r(c))) : new Vn(l.get(_r(s)), e);
			u.push(t), a.stubs.set(n, t);
			continue;
		}
		if (s === null || c === null || vr(s, c) && o.from !== o.to || vr(s, c) && s.isGroup) continue;
		let d = o.label ? Er(r.measure(o.label, i.small, P.Normal, 160)) : null, f = new Vn(l.get(_r(s)), l.get(_r(c)), d);
		u.push(f), a.lines.push({
			edge: n,
			line: f
		});
	}
	for (let e of u.filter((e) => e.isLoop)) a.boxes[e.from].loopRoom = Math.max(a.boxes[e.from].loopRoom, 30 + (e.label?.width ?? 0));
	let d = Gn(a.boxes, u, e.direction, 30, 46), f = t >= 0 && !!e.groups[t].label, p = f ? r.measure(e.groups[t].label, i.small, P.SemiBold).height + 8 : 0, m = t >= 0 ? hr : 0, h = f ? r.measure(e.groups[t].label, i.small, P.SemiBold).width + 2 * m : 0, g = Math.max(d.width + 2 * m, h);
	return a.contentOffset = F(m - d.left + (g - (d.width + 2 * m)) / 2, m + p - d.top), a.size = {
		width: g,
		height: d.height + 2 * m + p
	}, t < 0 && n.set(-1, a), a;
}
function Er(e) {
	return {
		width: e.width + 8,
		height: e.height + 4
	};
}
var Dr = 2147483647;
function Or(e, t) {
	if (!t.isGroup) return e.nodes[t.index].order;
	let n = Dr;
	for (let r = 0; r < e.nodes.length; r++) kr(e, e.nodes[r].group, t.index) && (n = Math.min(n, e.nodes[r].order));
	return n === Dr ? 2147483646 : n;
}
function kr(e, t, n) {
	for (let r = t; r >= 0; r = e.groups[r].parent) if (r === n) return !0;
	return !1;
}
function Ar(e, t, n) {
	let r = e.nodes[t].group;
	if (r === n) return {
		isGroup: !1,
		index: t
	};
	let i = r;
	for (; i >= 0 && e.groups[i].parent !== n;) i = e.groups[i].parent;
	return i >= 0 ? {
		isGroup: !0,
		index: i
	} : null;
}
function jr(e, t, n) {
	if (t === n) return null;
	let r = t;
	for (; r >= 0 && e.groups[r].parent !== n;) r = e.groups[r].parent;
	return r >= 0 ? {
		isGroup: !0,
		index: r
	} : null;
}
function Mr(e, t, n, r) {
	t.origin = I(r, t.contentOffset);
	for (let r = 0; r < t.items.length; r++) {
		let { isGroup: i, index: a } = t.items[r], o = t.boxes[r].box, s = z.fromXYWH(o.left + t.origin.x, o.top + t.origin.y, o.width, o.height);
		i ? (e.groups[a].box = s, Mr(e, n.get(a), n, F(s.left, s.top))) : e.nodes[a].box = s;
	}
}
function Nr(e, t, n, r) {
	let i = e.groups.map((e, t) => t).sort((t, n) => Pr(e, t) - Pr(e, n) || t - n);
	for (let a of i) {
		let i = e.groups[a], o = i.box;
		if (i.isState) {
			let e = i.hue ?? H.hue("accent"), n = new B();
			n.addRoundRect(o, 12, 12), t.add(U(n, e.washed(.06), e.washed(.75), 1.25));
		} else {
			let e = i.hue, n = new B();
			n.addRoundRect(o, 8, 8), t.add(U(n, e?.washed(.07) ?? H.of("ink").washed(.035), e?.washed(.55) ?? H.of("axis"), 1, "dashed"));
		}
		i.label && t.add(n.mark(i.label, o.left + hr * .75, o.top + 7, r.small, P.SemiBold, H.of("secondary")));
	}
}
function Pr(e, t) {
	let n = 0;
	for (let r = e.groups[t].parent; r >= 0; r = e.groups[r].parent) n++;
	return n;
}
function Fr(e, t, n, r, i) {
	let a = e.direction === "down" || e.direction === "up", o = [];
	for (let s of t.values()) for (let { edge: c, line: l } of s.lines) {
		let u = e.edges[c];
		if (l.points.length < 2) continue;
		let d = s.items[l.from], f = s.items[l.to], p = Ir(e, t, c, d, u.fromGroup ? u.from : -1), m = Ir(e, t, c, f, u.toGroup ? u.to : -1);
		p.reverse();
		let h = [
			...p.flat(),
			...l.points.map((e) => I(e, s.origin)),
			...m.flat()
		];
		l.isLoop || (u.fromGroup || (h[0] = Pn(e.nodes[u.from].shape, e.nodes[u.from].box, h[0], a)), u.toGroup || (h[h.length - 1] = Pn(e.nodes[u.to].shape, e.nodes[u.to].box, h[h.length - 1], a)));
		let g = u.hue ?? H.of("secondary"), _ = Lr(h, !0, a, l.isLoop), v = Lr(h, !1, a, l.isLoop), y = h[h.length - 1], b = h[0], x = u.crowsFeet ? 0 : Rn(u.tip, gr), S = u.crowsFeet ? 0 : Rn(u.tail, gr), C = [...h];
		x > 0 && C.length >= 2 && (C[C.length - 1] = L(y, R(_, x))), S > 0 && C.length >= 2 && (C[0] = L(b, R(v, S)));
		let w = l.isLoop ? Rr(C) : In(C, a);
		if (n.add(U(w, null, g, 1.5, u.line)), zr(n, u.tip, y, _, g), zr(n, u.tail, b, v, g), u.crowsFeet ? (Br(n, u.tipCard, y, _, g), Br(n, u.tailCard, b, v, g)) : (Vr(o, r, i, u.tipCard, y, _), Vr(o, r, i, u.tailCard, b, v)), u.label) {
			let e = r.measure(u.label, i.small, P.Normal, 160), t = I(l.labelCenter, s.origin), n = new B();
			n.addRoundRect(z.fromXYWH(t.x - e.width / 2 - 4, t.y - e.height / 2 - 2, e.width + 8, e.height + 4), 4, 4), o.push(U(n, H.of("background", .92), null, 0)), o.push(r.centred(u.label, t.x, t.y, i.small, P.Normal, H.of("secondary"), 160));
		}
	}
	for (let e of o) n.add(e);
}
function Ir(e, t, n, r, i) {
	let a = [], o = r.isGroup && r.index !== i ? r.index : -1;
	for (; !(o < 0);) {
		let e = t.get(o);
		if (!e) break;
		let r = e.stubs.get(n);
		if (!r || r.points.length === 0) break;
		a.push(r.points.map((t) => I(t, e.origin)));
		let s = r.from < e.items.length && e.stubs.get(n) === r && r.to >= e.items.length ? r.from : r.to, { isGroup: c, index: l } = s < e.items.length ? e.items[s] : {
			isGroup: !1,
			index: -1
		};
		o = c && l !== i ? l : -1;
	}
	return a;
}
function Lr(e, t, n, r) {
	let i = t ? e[e.length - 1] : e[0], a = t ? e[e.length - 2] : e[1];
	if (r) return Et(L(i, a));
	let o = L(i, a);
	return n ? F(0, Math.abs(o.y) < .01 ? 1 : Math.sign(o.y)) : F(Math.abs(o.x) < .01 ? 1 : Math.sign(o.x), 0);
}
function Rr(e) {
	let t = new B();
	if (e.length < 3) return Ln(e);
	let n = e[0], r = e[1], i = e[e.length - 1];
	return t.moveTo(n), t.cubicTo(I(I(n, R(L(r, n), 1.6)), R(L(n, i), .15)), I(I(i, R(L(r, i), 1.6)), R(L(i, n), .15)), i), t;
}
function zr(e, t, n, r, i) {
	let a = zn(t, n, r, gr);
	a && e.add(U(a.path, a.filled ? i : H.of("background"), i, a.filled ? 1 : 1.4));
}
function Br(e, t, n, r, i) {
	if (t === null) return;
	let a = Et(r), o = F(-a.y, a.x), s = t === "*" || t === "1..*", c = t === "0..1" || t === "*", l = new B();
	if (s) {
		let e = L(n, R(a, 12));
		l.moveTo(e).lineTo(I(n, R(o, 7))), l.moveTo(e).lineTo(n), l.moveTo(e).lineTo(L(n, R(o, 7)));
	}
	let u = s ? 15 : 7;
	if (c || (l.moveTo(I(L(n, R(a, u)), R(o, 7))).lineTo(L(L(n, R(a, u)), R(o, 7))), s || l.moveTo(I(L(n, R(a, u + 4)), R(o, 7))).lineTo(L(L(n, R(a, u + 4)), R(o, 7)))), e.add(U(l, null, i, 1.4)), c) {
		let t = L(n, R(a, s ? 19 : 12)), r = new B();
		if (r.addCircle(t.x, t.y, 4.2), e.add(U(r, H.of("background"), i, 1.4)), !s) {
			let t = new B();
			t.moveTo(I(L(n, R(a, 5)), R(o, 7))).lineTo(L(L(n, R(a, 5)), R(o, 7))), e.add(U(t, null, i, 1.4));
		}
	}
}
function Vr(e, t, n, r, i, a) {
	if (r === null) return;
	let o = Et(a), s = F(-o.y, o.x), c = I(L(i, R(o, 16)), R(s, 11));
	e.push(t.centred(r, c.x, c.y, n.small * Math.fround(.92), P.Normal, H.of("secondary")));
}
function Hr(e, t, n, r) {
	for (let i of e.nodes) {
		let a = i.box, o = i.hue, s = i.muted ? H.of("ink").washed(.05) : o.washed(.14), c = i.muted ? H.of("muted") : o.washed(.9);
		switch (i.shape) {
			case "startDot":
				t.add(U(Nn(i.shape, a), H.of("ink"), null, 0));
				continue;
			case "endDot":
				t.add(U(Nn(i.shape, a), H.of("background"), H.of("ink"), 1.5)), t.add(U(Nn("circle", a.inflate(-4.5)), H.of("ink"), null, 0));
				continue;
			case "bar":
				t.add(U(Nn(i.shape, Ur(a, e.direction)), H.of("ink"), null, 0));
				continue;
		}
		if (i.compartments !== null) {
			Wr(i, i.compartments, t, n, r);
			continue;
		}
		i.shape === "note" && (s = H.hue("yellow").washed(.2), c = H.hue("yellow").washed(.75)), t.add(U(Nn(i.shape, a), s, c, 1.5));
		let l = i.shape === "diamond" ? mr * Math.fround(.7) : mr, u = a.midX, d = a.midY;
		i.shape === "cylinder" && (d += 4), i.shape === "document" && (d -= 3), t.add(n.centred(i.label, u, d, r.label, P.Normal, H.of("ink"), l));
	}
}
function Ur(e, t) {
	return t === "down" || t === "up" ? e : z.fromXYWH(e.midX - e.height / 2, e.midY - e.width / 2, e.height, e.width);
}
function Wr(e, t, n, r, i) {
	let a = e.box, o = e.hue, s = r.measure(e.label, i.heading, P.SemiBold).height + 14 + (t.stereotype === null ? 0 : r.measure("«x»", i.small, P.Normal).height), c = new B();
	c.addRoundRect(a, 4, 4), n.add(U(c, H.of("background"), null, 0));
	let l = new B();
	l.addRoundRect(z.fromXYWH(a.left, a.top, a.width, s), 4, 4), n.add(U(l, o.washed(.16), null, 0)), n.add(U(c, null, o.washed(.9), 1.5));
	let u = a.top + 7;
	if (t.stereotype !== null) {
		let e = r.centred(`«${t.stereotype}»`, a.midX, 0, i.small, P.Normal, H.of("secondary"));
		n.add({
			...e,
			y: u
		}), u += e.height;
	}
	let d = r.centred(e.label, a.midX, 0, i.heading, P.SemiBold, H.of("ink"));
	n.add({
		...d,
		y: u
	}), u = a.top + s;
	let f = r.measure("Ag", i.small, P.Normal).height + 3, p = t.tabular ? wr(t, r, i) : [];
	for (let e of t.sections) {
		let s = new B();
		s.moveTo(a.left, u).lineTo(a.right, u), n.add(U(s, null, o.washed(.45), 1)), u += 5;
		for (let o of e) {
			if (t.tabular) {
				let e = a.left + fr;
				for (let t = 0; t < o.cells.length; t++) {
					let a = t === 0 ? H.of("ink") : H.of("secondary");
					n.add(r.mark(o.cells[t], e, u, i.small, t === 0 && o.underline ? P.SemiBold : P.Normal, a)), e += p[t] + 14;
				}
			} else {
				let e = r.mark(o.cells[0], a.left + fr, u, i.small, P.Normal, H.of("ink"), Infinity, "left", o.italic);
				if (n.add(e), o.underline) {
					let t = new B();
					t.moveTo(e.x, e.y + e.height - 2).lineTo(e.x + e.width, e.y + e.height - 2), n.add(U(t, null, H.of("ink"), .8));
				}
			}
			u += f;
		}
		e.length === 0 && (u += 6), u += 3;
	}
}
//#endregion
//#region src/dhole/kinds/graph-kinds.ts
var Gr = class extends Ze {
	constructor(e, t) {
		super(e, t), r(this, "model", new ur()), r(this, "boxes", {
			one: "box",
			many: "boxes"
		}), r(this, "lines", {
			one: "line",
			many: "lines"
		});
	}
	get isEmpty() {
		return this.model.nodes.length === 0 && this.model.groups.length === 0;
	}
	build(e, t) {
		let n = this.model, r = br.build(n, this.theme, t.measurer), i = new jn(r, this.kind.name.english, t.measurer);
		i.label = this.title;
		let a = n.nodes.filter((e) => e.shape !== "startDot" && e.shape !== "endDot" && e.shape !== "note").length + n.groups.filter((e) => e.isState).length, o = n.edges.filter((e) => e.line !== "dashed" || e.tip !== "none" || e.tail !== "none" || n.nodes[e.from]?.shape !== "note").length, s = n.groups.filter((e) => !e.isState).length, c = this.kind.name.english, l = Xe.a(c), u = `${l[0].toUpperCase()}${l.slice(1)} ${c} of ${Xe.count(a, this.boxes.one, this.boxes.many)} and ${Xe.count(o, this.lines.one, this.lines.many)}${s > 0 ? " in " + Xe.count(s, "group") : ""}.`;
		return {
			chart: Lt(i),
			naturalWidth: r.width,
			naturalHeight: r.height,
			summary: u
		};
	}
}, Kr = [
	"muted",
	"quiet",
	"faded",
	"disabled",
	"inactive"
], qr = /* @__PURE__ */ new Map([
	["dashed", "dashed"],
	["dotted", "dashed"],
	["thick", "thick"],
	["bold", "thick"],
	["solid", "solid"]
]), Jr = [
	"blue",
	"orange",
	"green",
	"yellow",
	"pink",
	"purple",
	"red",
	"teal",
	"grey",
	"good",
	"bad",
	"warn",
	"accent",
	"muted"
], Yr = /* @__PURE__ */ new Map();
function Xr(e, t) {
	if (!e.startsWith(t) || e.length === t.length) return e.length === t.length && e.startsWith(t) ? e.from(t.length) : null;
	let n = e.at(t.length);
	if (!i(n) && n !== ":") return null;
	let r = e.from(t.length).trim();
	return r.length > 0 && r.at(0) === ":" && (r = r.from(1).trim()), r;
}
var Zr = class e extends $e {
	constructor(e) {
		super(e), r(this, "shaped", /* @__PURE__ */ new Set()), r(this, "graph", void 0), this.graph = new Gr(e.kind, e.kindLine);
	}
	get spec() {
		return this.graph;
	}
	get model() {
		return this.graph.model;
	}
	get arrowSet() {
		return w.plain;
	}
	get defaultShape() {
		return "box";
	}
	get settings() {
		return [M([
			"direction",
			"flow",
			"orientation",
			"layout",
			"rankdir"
		], (e) => {
			let t = this.readDirection(e);
			t !== null && (this.model.direction = t);
		})];
	}
	titled() {
		let e = null;
		switch (this.spec.title?.trim().toUpperCase()) {
			case "TD":
			case "TB":
				e = "down";
				break;
			case "LR":
				e = "right";
				break;
			case "BT":
				e = "up";
				break;
			case "RL": e = "left";
		}
		e !== null && (this.model.direction = e, this.spec.title = null);
	}
	static get hueWords() {
		return W.hues;
	}
	get shapeWords() {
		return Yr;
	}
	get attributeChoices() {
		return [
			...this.shapeWords.keys(),
			...Jr,
			...this.extraAttributeWords
		];
	}
	get attributeHint() {
		return [
			...this.primaryShapes,
			...Jr,
			...this.extraAttributeWords
		];
	}
	get primaryShapes() {
		return [];
	}
	get extraAttributeWords() {
		return [];
	}
	static keyOf(e) {
		return e.trim().replace(/\s+/gu, " ").toLowerCase();
	}
	box(t, n) {
		let { node: r, created: i } = this.model.node(e.keyOf(t.name), n);
		return i && (r.label = t.name, r.shape = this.defaultShape, this.made(r)), this.attributes(r, t.attributes), this.shapedAs(r), r;
	}
	made(e) {}
	shapedAs(e) {
		if (this.shaped.has(e) || this.shapeWords.size === 0 || e.compartments !== null) return;
		let t = e.label.trimEnd();
		t.length > 0 && (t[t.length - 1] === "?" || t[t.length - 1] === "？") && (e.shape = "diamond");
	}
	attributes(t, n) {
		for (let r of n) {
			let n = r.text.trim(), i = k(n), a = this.shapeWords.get(i), o = e.hueWords.get(i);
			a === void 0 ? o === void 0 ? Kr.includes(i) ? t.muted = !0 : this.otherAttribute(t, n, i) || this.unknownAttribute(r, this.boxWord, this.attributeChoices, this.attributeHint) : t.hue = H.hue(o) : (t.shape = a, this.shaped.add(t));
		}
	}
	otherAttribute(e, t, n) {
		return !1;
	}
	lineAttributes(t, n) {
		for (let r of n) {
			let n = k(r.text), i = e.hueWords.get(n), a = qr.get(n);
			i === void 0 ? a === void 0 ? Kr.includes(n) ? t.hue = H.of("muted") : this.unknownAttribute(r, new l("a line", "连线"), [
				"dashed",
				"thick",
				"blue",
				"red",
				"green",
				"good",
				"bad",
				"muted"
			]) : t.line = a : t.hue = H.hue(i);
		}
	}
	statement(e, t) {
		if (this.oddArrow(e)) return;
		let { head: n, tail: r } = E(e), { pieces: i, arrows: a } = me(n, this.arrowSet), o = be(i);
		if (o !== null) this.problems.error(o, "LabelBetweenBars");
		else if (a.length === 0) {
			if (r !== null) {
				let i = O(n, this.problems);
				if (i.name.length === 0) {
					this.problems.error(n.isEmpty ? e.slice(0, 1) : n, "EmptyName");
					return;
				}
				let a = O(r, this.problems), o = this.box(i, t);
				a.name.length !== 0 && (o.label = a.name), this.attributes(o, a.attributes), this.shapedAs(o);
				return;
			}
			let i = O(n, this.problems);
			if (i.name.length === 0) {
				this.problems.error(e.slice(0, 1), "EmptyName");
				return;
			}
			this.single(i, t);
		} else this.chain(e, i, a, r, t);
	}
	single(e, t) {
		this.box(e, t);
	}
	get kindSaid() {
		let e = this.context.kind.name;
		return new l(`${Xe.a(e.english)} ${e.english}`, e.chinese);
	}
	oddArrow(e) {
		let t = E(e).head;
		if (this.arrowSet.cardinalities) {
			let e = ve(t);
			if (e !== null) return this.problems.error(e, "BadCardinality", e.text), !0;
		}
		let n = ye(t, this.arrowSet);
		return n !== null && (this.problems.error(n, "UnknownArrow", n.text, this.kindSaid, this.arrowSet.names), !0);
	}
	chain(e, t, n, r, i) {
		let a = [];
		for (let e = 0; e < n.length; e++) {
			let r = t[e], o = t[e + 1];
			if (r.isEmpty) {
				this.problems.error(n[e].token, e === 0 ? "ArrowFromNothing" : "EmptyName");
				continue;
			}
			if (o.isEmpty) {
				this.problems.error(n[e].token, "ArrowToNothing");
				continue;
			}
			let s = this.end(O(r, this.problems), i, !0), c = this.end(O(o, this.problems), i, !1);
			if (s === null || c === null) continue;
			let l = this.link(s, c, n[e]);
			l !== null && a.push(l);
		}
		if (r !== null && a.length > 0) {
			let e = O(r, this.problems);
			e.name.length !== 0 && (a[a.length - 1].label = e.name), this.lineAttributes(a[a.length - 1], e.attributes);
		}
	}
	end(e, t, n) {
		if (e.name.length === 0) return this.problems.error(e.whole, "EmptyName"), null;
		if (e.name.trim() === "*" || e.name.trim().length === 0 && e.attributes.length === 1 && e.attributes[0].text.trim() === "*") return this.problems.error(e.whole, "StartInsideNothing", this.kindSaid), null;
		let r = this.box(e, t);
		return {
			index: this.model.indexOf(r.key),
			isGroup: !1
		};
	}
	link(e, t, n) {
		let r = n.form, i = r.tail !== "none" && r.tip === "none" ? new cr({
			from: t.index,
			fromGroup: t.isGroup,
			to: e.index,
			toGroup: e.isGroup,
			tip: r.tail,
			tail: "none",
			line: r.line
		}) : new cr({
			from: e.index,
			fromGroup: e.isGroup,
			to: t.index,
			toGroup: t.isGroup,
			tip: r.tip,
			tail: r.tail,
			line: r.line
		});
		return this.model.edges.push(i), i;
	}
	group(t, n, r = !1) {
		let { head: i, tail: a } = E(t), o = O(i, this.problems), s = a === null ? o : O(a, this.problems), c = s.name.length === 0 ? o.name : s.name, u = new lr(e.keyOf(o.name.length === 0 ? c : o.name));
		u.label = c, u.parent = n, u.isState = r;
		for (let t of [...o.attributes, ...a === null ? [] : s.attributes]) {
			let n = k(t.text), r = e.hueWords.get(n);
			r === void 0 ? this.unknownAttribute(t, new l("a group", "组"), [
				"blue",
				"orange",
				"green",
				"yellow",
				"pink",
				"purple",
				"red",
				"teal",
				"grey"
			]) : u.hue = H.hue(r);
		}
		return this.model.groups.push(u), this.model.groups.length - 1;
	}
	note(e, t, n) {
		let { head: r, tail: i } = E(e), a = O(r, this.problems);
		if (a.name.length === 0 || i === null) {
			this.problems.error(t, "NoteNeedsTarget");
			return;
		}
		let o = this.box(a, n), { node: s } = this.model.node(`*note${this.model.nodes.length}`, o.group);
		s.label = D(i, this.problems), s.shape = "note", this.model.edges.push(new cr({
			from: this.model.indexOf(s.key),
			to: this.model.indexOf(o.key),
			tip: "none",
			line: "dashed",
			hue: H.of("muted")
		}));
	}
}, Qr = /* @__PURE__ */ new Map([
	["box", "box"],
	["rect", "box"],
	["rectangle", "box"],
	["step", "box"],
	["process", "box"],
	["round", "round"],
	["rounded", "round"],
	["soft", "round"],
	["pill", "pill"],
	["stadium", "pill"],
	["start", "pill"],
	["end", "pill"],
	["stop", "pill"],
	["terminal", "pill"],
	["begin", "pill"],
	["circle", "circle"],
	["diamond", "diamond"],
	["decision", "diamond"],
	["choice", "diamond"],
	["question", "diamond"],
	["if", "diamond"],
	["hexagon", "hexagon"],
	["prepare", "hexagon"],
	["preparation", "hexagon"],
	["io", "parallelogram"],
	["input", "parallelogram"],
	["output", "parallelogram"],
	["data", "parallelogram"],
	["parallelogram", "parallelogram"],
	["database", "cylinder"],
	["db", "cylinder"],
	["store", "cylinder"],
	["cylinder", "cylinder"],
	["storage", "cylinder"],
	["document", "document"],
	["doc", "document"],
	["file", "document"],
	["report", "document"],
	["subroutine", "subroutine"],
	["call", "subroutine"],
	["predefined", "subroutine"],
	["note", "note"],
	["comment", "note"]
]), $r = class extends Zr {
	get boxWord() {
		return new l("a step", "步骤");
	}
	get primaryShapes() {
		return [
			"box",
			"round",
			"pill",
			"circle",
			"diamond",
			"hexagon",
			"io",
			"database",
			"document",
			"subroutine",
			"note"
		];
	}
	get shapeWords() {
		return Qr;
	}
	content(e) {
		this.line(e, -1);
	}
	line(e, t) {
		let n = e.content, r = Xr(n, "group") ?? Xr(n, "subgraph");
		if (r !== null) {
			let i = this.group(r, t);
			e.children.length === 0 && this.problems.warning(n, "EmptyGroup", this.model.groups[i].label);
			for (let t of e.children) this.line(t, i);
		} else r = Xr(n, "note"), r !== null && re(r, ":") >= 0 ? this.note(r, n, t) : this.statement(n, t), this.unindent(e, (e) => this.line(e, t));
	}
	finish() {
		this.graph.boxes = {
			one: "step",
			many: "steps"
		}, this.graph.lines = {
			one: "arrow",
			many: "arrows"
		};
	}
}, ei = /* @__PURE__ */ new Map([
	["choice", "diamond"],
	["decision", "diamond"],
	["fork", "bar"],
	["join", "bar"]
]), ti = class extends Zr {
	constructor(...e) {
		super(...e), r(this, "composites", /* @__PURE__ */ new Map());
	}
	get boxWord() {
		return new l("a state", "状态");
	}
	get primaryShapes() {
		return [
			"choice",
			"fork",
			"join"
		];
	}
	get defaultShape() {
		return "round";
	}
	get shapeWords() {
		return ei;
	}
	content(e) {
		this.line(e, -1);
	}
	line(e, t) {
		let n = e.content, r = Xr(n, "note");
		if (r !== null && re(r, ":") >= 0) {
			this.note(r, n, t);
			return;
		}
		let i = Xr(n, "state");
		i !== null && i.length > 0 && (n = i);
		let { head: a, tail: o } = E(n), s = me(a, this.arrowSet).arrows.length > 0;
		if (e.children.length > 0 && !s) {
			let n = O(a, this.problems), r = o !== null && !o.isEmpty ? D(o, this.problems) : n.name, i = this.group(a, t, !0);
			this.model.groups[i].label = r, this.composites.set(Zr.keyOf(n.name), i);
			for (let t of e.children) this.line(t, i);
		} else this.statement(n, t), this.unindent(e, (e) => this.line(e, t));
	}
	end(e, t, n) {
		let r = e.name.trim();
		if (r === "*" || r.length === 0 && e.attributes.length === 1 && e.attributes[0].text.trim() === "*") {
			let e = (n ? "*start" : "*end") + "@" + String(t), { node: r, created: i } = this.model.node(e, t);
			return i && (r.label = "", r.shape = n ? "startDot" : "endDot"), {
				index: this.model.indexOf(r.key),
				isGroup: !1
			};
		}
		let i = this.composites.get(Zr.keyOf(r));
		return i === void 0 ? super.end(e, t, n) : {
			index: i,
			isGroup: !0
		};
	}
	finish() {
		let e = /* @__PURE__ */ new Map();
		for (let [t, n] of this.composites) {
			let r = this.model.indexOf(t);
			r >= 0 && e.set(r, n);
		}
		this.model.redirect(e), this.graph.boxes = {
			one: "state",
			many: "states"
		}, this.graph.lines = {
			one: "transition",
			many: "transitions"
		};
	}
}, ni = class e extends Zr {
	get boxWord() {
		return new l("a class", "类");
	}
	get arrowSet() {
		return w.classes;
	}
	get defaultShape() {
		return "square";
	}
	get extraAttributeWords() {
		return [
			"interface",
			"abstract",
			"enum",
			"record",
			"struct",
			"service"
		];
	}
	made(e) {
		e.compartments = new ar();
	}
	otherAttribute(e, t, n) {
		var r;
		return e.compartments ?? (e.compartments = new ar()), (r = e.compartments).stereotype ?? (r.stereotype = t), !0;
	}
	content(e) {
		this.line(e, -1);
	}
	line(t, n) {
		let r = t.content, i = Xr(r, "group") ?? Xr(r, "package") ?? Xr(r, "namespace");
		if (i !== null) {
			let e = this.group(i, n);
			t.children.length === 0 && this.problems.warning(r, "EmptyGroup", this.model.groups[e].label);
			for (let n of t.children) this.line(n, e);
			return;
		}
		if (i = Xr(r, "note"), i !== null && re(i, ":") >= 0) {
			this.note(i, r, n);
			return;
		}
		if (e.isMember(r)) {
			this.problems.error(r, "MemberOutsideClass");
			return;
		}
		let a = Xr(r, "class");
		if (a !== null && a.length > 0 && (r = a), this.oddArrow(r)) return;
		let { head: o } = E(r, !0);
		if (me(o, this.arrowSet).arrows.length > 0) {
			this.statement(r, n), this.unindent(t, (e) => this.line(e, n));
			return;
		}
		let s = O(r, this.problems);
		if (s.name.length === 0) {
			this.problems.error(r, "EmptyName");
			return;
		}
		let c = this.box(s, n);
		c.compartments ?? (c.compartments = new ar());
		let l = [], u = [];
		for (let n of t.children) {
			let t = e.member(n.content);
			(t.cells[0].includes("(") ? u : l).push(t);
			for (let e of n.children) this.problems.warning(e.content, "IndentedUnderNothing");
		}
		(l.length > 0 || u.length > 0) && (c.compartments.sections.length = 0, c.compartments.sections.push(l), u.length > 0 && c.compartments.sections.push(u));
	}
	static isMember(e) {
		if (e.length === 0) return !1;
		let t = e.at(0);
		if (t !== "+" && t !== "-" && t !== "~") return !1;
		if (e.length > 1) {
			let t = e.at(1);
			if (t === ">" || t === "-" || t === "|" || t === "*" || t === "o") return !1;
		}
		return !0;
	}
	static member(e) {
		let t = e.text.trim(), n = !1, r = !1, a = "", o = (e) => t.length > e.length && t.slice(0, e.length).toLowerCase() === e.toLowerCase() && i(t[e.length]) ? (t = t.slice(e.length).trimStart(), !0) : !1;
		for (let e = !0; e;) {
			e = !1;
			for (let [t, n] of [
				["public", "+"],
				["private", "-"],
				["protected", "#"],
				["internal", "~"],
				["package", "~"]
			]) o(t) && (a = n, e = !0);
			o("static") && (n = !0, e = !0), o("abstract") && (r = !0, e = !0);
		}
		return a.length === 0 && t.length > 0 && (t[0] === "+" || t[0] === "-" || t[0] === "~") && (a = t.slice(0, 1), t = t.slice(1).trimStart()), or([a.length > 0 ? `${a} ${t}` : t], r, n);
	}
	link(e, t, n) {
		let r = n.form, i, a = r.tip === "triangle" || r.tip === "diamond" || r.tip === "hollowDiamond";
		return i = n.tailCard != null || n.tipCard != null ? new cr({
			from: e.index,
			to: t.index,
			tail: "none",
			tip: "none",
			tailCard: n.tailCard ?? null,
			tipCard: n.tipCard ?? null
		}) : a ? new cr({
			from: t.index,
			to: e.index,
			tail: r.tip,
			tip: r.tail,
			line: r.line
		}) : r.tail !== "none" && r.tip === "none" && r.tail === "arrow" ? new cr({
			from: t.index,
			to: e.index,
			tip: "arrow",
			line: r.line
		}) : new cr({
			from: e.index,
			to: t.index,
			tail: r.tail,
			tip: r.tip,
			line: r.line
		}), this.model.edges.push(i), i;
	}
	finish() {
		this.graph.boxes = {
			one: "class",
			many: "classes"
		}, this.graph.lines = {
			one: "relationship",
			many: "relationships"
		};
	}
}, ri = class extends Zr {
	get boxWord() {
		return new l("an entity", "实体");
	}
	get arrowSet() {
		return w.entities;
	}
	get defaultShape() {
		return "square";
	}
	made(e) {
		e.compartments = new ar({ tabular: !0 });
	}
	content(e) {
		this.line(e, -1);
	}
	line(e, t) {
		let n = e.content, r = Xr(n, "group");
		if (r !== null) {
			let n = this.group(r, t);
			for (let t of e.children) this.line(t, n);
			return;
		}
		if (r = Xr(n, "note"), r !== null && re(r, ":") >= 0) {
			this.note(r, n, t);
			return;
		}
		if (this.oddArrow(n)) return;
		let { head: i } = E(n);
		if (me(i, this.arrowSet).arrows.length > 0) {
			this.statement(n, t), this.unindent(e, (e) => this.line(e, t));
			return;
		}
		if (re(n, ":") >= 0) {
			this.problems.error(n, "AttributeOutsideEntity");
			return;
		}
		let a = O(i, this.problems);
		if (a.name.length === 0) {
			this.problems.error(n, "EmptyName");
			return;
		}
		let o = this.box(a, t);
		o.compartments ?? (o.compartments = new ar({ tabular: !0 }));
		let s = [];
		for (let t of e.children) s.push(this.attribute(t.content));
		s.length > 0 && (o.compartments.sections.length = 0, o.compartments.sections.push(s));
	}
	attribute(e) {
		let { remainder: t, attributes: n } = se(e, this.problems), { head: r, tail: i } = E(t), a = D(r, this.problems), o = i === null ? "" : D(i, this.problems);
		if (i === null) {
			let e = a.split(" ").filter((e) => e.length > 0);
			e.length >= 2 && (a = e[0], o = e.slice(1).join(" "));
		}
		let s = [];
		for (let e of n) {
			let t;
			switch (k(e.text)) {
				case "key":
				case "pk":
				case "primary":
				case "primarykey":
				case "id":
					t = "PK";
					break;
				case "ref":
				case "fk":
				case "foreign":
				case "foreignkey":
				case "reference":
					t = "FK";
					break;
				case "unique":
				case "uk":
					t = "UK";
					break;
				default: t = "";
			}
			t.length === 0 ? this.unknownAttribute(e, new l("an attribute", "属性"), [
				"key",
				"ref",
				"unique"
			]) : s.includes(t) || s.push(t);
		}
		return or([
			a,
			o,
			s.join(", ")
		], !1, s.includes("PK"));
	}
	link(e, t, n) {
		if (n.tailCard == null && n.tipCard == null) return super.link(e, t, n);
		let r = new cr({
			from: e.index,
			to: t.index,
			tail: "none",
			tip: "none",
			tailCard: n.tailCard ?? null,
			tipCard: n.tipCard ?? null,
			crowsFeet: !0,
			line: n.form.line
		});
		return this.model.edges.push(r), r;
	}
	finish() {
		this.graph.boxes = {
			one: "entity",
			many: "entities"
		}, this.graph.lines = {
			one: "relationship",
			many: "relationships"
		};
	}
};
N("flowchart", (e) => new $r(e)), N("state", (e) => new ti(e)), N("class", (e) => new ni(e)), N("entity", (e) => new ri(e));
//#endregion
//#region src/dhole/kinds/sequence.ts
var ii = class extends Ze {
	constructor(...e) {
		super(...e), r(this, "participants", []), r(this, "items", []), r(this, "numbered", !1), r(this, "activations", !0), r(this, "mirror", !0);
	}
	get isEmpty() {
		return this.participants.length === 0;
	}
	participantOf(e, t) {
		let n = e.trim().replace(/\s+/gu, " ").toLowerCase(), r = this.participants.findIndex((e) => e.key === n), i = r < 0;
		return i && (this.participants.push({
			key: n,
			label: e.trim(),
			role: t,
			hue: H.hue("accent")
		}), r = this.participants.length - 1), {
			index: r,
			created: i
		};
	}
	build(e, t) {
		let n = pi.build(this, this.theme, t.measurer), r = this.items.filter((e) => e.type === "message").length, i = this.participants.length, a = `A sequence diagram of ${i} participant${i === 1 ? "" : "s"} and ${r} message${r === 1 ? "" : "s"}.`, o = new jn(n, "Sequence diagram", t.measurer);
		return o.label = this.title, {
			chart: Lt(o),
			naturalWidth: n.width,
			naturalHeight: n.height,
			summary: a
		};
	}
}, ai = [
	"loop",
	"if",
	"alt",
	"opt",
	"optional",
	"par",
	"parallel",
	"critical",
	"break",
	"region"
];
function oi(e) {
	let t = 0;
	for (; t < e.length && /\p{L}/u.test(e.at(t));) t++;
	return {
		word: e.slice(0, t).text.toLowerCase(),
		rest: e.from(t).trim()
	};
}
var si = class extends $e {
	constructor(e) {
		super(e), r(this, "own", void 0), r(this, "top", []), this.own = new ii(e.kind, e.kindLine);
	}
	get spec() {
		return this.own;
	}
	get settings() {
		return [
			M([
				"numbers",
				"numbered",
				"numbering",
				"autonumber"
			], (e) => {
				let t = this.readSwitch(e);
				t !== null && (this.own.numbered = t);
			}),
			M([
				"activations",
				"activation",
				"bars"
			], (e) => {
				let t = this.readSwitch(e);
				t !== null && (this.own.activations = t);
			}),
			M([
				"mirror",
				"footer",
				"heads below"
			], (e) => {
				let t = this.readSwitch(e);
				t !== null && (this.own.mirror = t);
			})
		];
	}
	content(e) {
		this.top.push(e);
	}
	finish() {
		this.lines(this.top, 0);
	}
	lines(e, t) {
		for (let n = 0; n < e.length; n++) {
			let r = e[n], i = r.content, { word: a, rest: o } = oi(i);
			if (ai.includes(a)) {
				let i = a === "alt" ? "if" : a === "optional" ? "opt" : a === "parallel" ? "par" : a;
				for (this.own.items.push({
					type: "frameStart",
					tag: i,
					condition: D(o, this.problems)
				}), this.lines(r.children, t + 1); n + 1 < e.length;) {
					let r = oi(e[n + 1].content), a = r.word;
					if (!(a === "else" && i === "if" || a === "and" && i === "par")) break;
					n++, this.own.items.push({
						type: "frameSection",
						tag: a,
						condition: D(r.rest, this.problems)
					}), this.lines(e[n].children, t + 1);
				}
				this.own.items.push({ type: "frameEnd" });
			} else a === "else" || a === "and" ? (this.problems.error(i.slice(0, a.length), a === "else" ? "ElseWithoutIf" : "AndWithoutPar"), this.lines(r.children, t)) : (this.statement(r), r.children.length > 0 && (this.problems.warning(i, "UnknownBlock", i.text.length > 24 ? i.text.slice(0, 24) + "…" : i.text), this.lines(r.children, t)));
		}
	}
	statement(e) {
		let t = e.content, { word: n, rest: r } = oi(t);
		if (k(t.text) === "autonumber") {
			this.own.numbered = !0;
			return;
		}
		if (!(me(E(t).head, w.plain).arrows.length > 0)) switch (n) {
			case "actor":
			case "person":
				this.declare(r, "actor");
				return;
			case "participant":
				this.declare(r, "participant");
				return;
			case "database":
				this.declare(r, "database");
				return;
			case "note":
				this.noteLine(r, t);
				return;
		}
		if (t.text.startsWith("==")) {
			this.own.items.push({
				type: "divider",
				text: ci(t.text, "= ")
			});
			return;
		}
		let { head: i, tail: a } = E(t), o = ye(i, w.plain);
		if (o !== null) {
			this.problems.error(o, "UnknownArrow", o.text, new l("a sequence diagram", "时序图"), w.plain.names);
			return;
		}
		let { pieces: s, arrows: c } = me(i, w.plain), u = be(s);
		if (u !== null) {
			this.problems.error(u, "LabelBetweenBars");
			return;
		}
		if (c.length !== 1) {
			this.problems.error(t, "MessageNeedsArrow");
			return;
		}
		if (s[0].isEmpty) {
			this.problems.error(c[0].token, "ArrowFromNothing");
			return;
		}
		if (s[1].isEmpty) {
			this.problems.error(c[0].token, "ArrowToNothing");
			return;
		}
		let d = this.own.participantOf(D(s[0], this.problems), "participant").index, f = this.own.participantOf(D(s[1], this.problems), "participant").index, p = c[0].form, [m, h] = p.tail !== "none" && p.tip === "none" ? [f, d] : [d, f], g = null, _ = "";
		if (a !== null) {
			let e = O(a, this.problems);
			_ = e.name;
			for (let t of e.attributes) {
				let e = W.hue(t.text);
				e === null ? this.unknownAttribute(t, new l("a message", "消息"), [
					"blue",
					"green",
					"red",
					"good",
					"bad",
					"warn"
				]) : g = H.hue(e);
			}
		}
		this.own.items.push({
			type: "message",
			from: m,
			to: h,
			text: _,
			reply: p.line === "dashed",
			line: p.line,
			hue: g
		});
	}
	declare(e, t) {
		let { head: n, tail: r } = E(e), i = O(n, this.problems);
		if (i.name.length === 0) {
			this.problems.error(e.isEmpty ? e.line.content : e, "EmptyName");
			return;
		}
		let a = i.name, o = i.name, s = a.toLowerCase().lastIndexOf(" as ");
		r === null && s > 0 && (o = a.slice(0, s).trim(), a = a.slice(s + 4).trim());
		let c = this.own.participantOf(a, t).index, u = this.own.participants[c];
		u.role = t, u.label = r !== null && !r.isEmpty ? D(r, this.problems) : o;
		for (let e of i.attributes) {
			let t = W.hue(e.text);
			t === null ? this.unknownAttribute(e, new l("a participant", "参与者"), [
				"blue",
				"orange",
				"green",
				"yellow",
				"pink",
				"purple",
				"red",
				"teal",
				"grey"
			]) : u.hue = H.hue(t);
		}
	}
	noteLine(e, t) {
		let { head: n, tail: r } = E(e);
		if (r === null) {
			this.problems.error(t, "NoteNeedsTarget");
			return;
		}
		let i, a;
		n.startsWith("over") ? (i = "over", a = n.from(4).trim()) : n.startsWith("left of") ? (i = "left", a = n.from(7).trim()) : n.startsWith("right of") ? (i = "right", a = n.from(8).trim()) : n.startsWith("left") ? (i = "left", a = n.from(4).trim()) : n.startsWith("right") ? (i = "right", a = n.from(5).trim()) : (i = "over", a = n);
		let o = ie(a).filter((e) => !e.isEmpty).map((e) => this.own.participantOf(D(e, this.problems), "participant").index);
		o.length === 0 ? this.problems.error(t, "NoteNeedsTarget") : this.own.items.push({
			type: "note",
			first: Math.min(...o),
			last: Math.max(...o),
			placement: i,
			text: D(r, this.problems)
		});
	}
};
function ci(e, t) {
	let n = 0, r = e.length;
	for (; n < r && t.includes(e[n]);) n++;
	for (; r > n && t.includes(e[r - 1]);) r--;
	return e.slice(n, r);
}
var li = 36, ui = 12, di = 10;
function fi(e, t) {
	return e.map((e, n) => ({
		item: e,
		i: n,
		k: t(e)
	})).sort((e, t) => e.k - t.k || e.i - t.i).map((e) => e.item);
}
var pi = { build(e, t, n) {
	let r = new kn(t.fontFamilies, n), i = dr(t), a = new On(t.fontFamilies), o = e.participants.length;
	if (o === 0) return a.add(r.mark(" ", 0, 0, i.small, P.Normal, H.of("muted"))), a.frame(12), a;
	let s = Array(o).fill(0), c = Array(o).fill(0);
	for (let t = 0; t < o; t++) {
		let n = r.measure(e.participants[t].label, i.label, P.SemiBold);
		s[t] = Math.max(n.width + 28, 72), c[t] = e.participants[t].role === "actor" ? 46 + n.height : n.height + 18 + (e.participants[t].role === "database" ? 10 : 0);
	}
	let l = Math.max(...c), u = Array(Math.max(0, o - 1)).fill(0);
	for (let e = 0; e + 1 < o; e++) u[e] = (s[e] + s[e + 1]) / 2 + li;
	let d = s[o - 1] / 2, f = s[0] / 2, p = [];
	for (let t of e.items) if (t.type === "message" && t.from !== t.to) p.push({
		a: Math.min(t.from, t.to),
		b: Math.max(t.from, t.to),
		need: r.measure(gi(e, t), i.small, P.Normal).width + 36
	});
	else if (t.type === "message") {
		let n = r.measure(gi(e, t), i.small, P.Normal).width + 50;
		t.from + 1 < o ? p.push({
			a: t.from,
			b: t.from + 1,
			need: n + s[t.from + 1] / 2
		}) : d = Math.max(d, n);
	} else if (t.type === "note") {
		let e = Math.min(r.measure(t.text, i.small, P.Normal).width, 220) + 20;
		t.placement === "right" ? t.last + 1 < o ? p.push({
			a: t.last,
			b: t.last + 1,
			need: e + 24 + s[t.last + 1] / 2
		}) : d = Math.max(d, e + 20) : t.placement === "left" ? t.first > 0 ? p.push({
			a: t.first - 1,
			b: t.first,
			need: e + 24 + s[t.first - 1] / 2
		}) : f = Math.max(f, e + 20) : t.first !== t.last && p.push({
			a: t.first,
			b: t.last,
			need: e - 20
		});
	}
	for (let { a: e, b: t, need: n } of fi(p, (e) => e.b - e.a)) {
		let r = 0;
		for (let n = e; n < t; n++) r += u[n];
		if (r < n) for (let i = e; i < t; i++) u[i] += (n - r) / (t - e);
	}
	let m = Array(o).fill(0);
	m[0] = f;
	for (let e = 1; e < o; e++) m[e] = m[e - 1] + u[e - 1];
	let h = r.measure("Ag", i.small, P.Normal).height, g = l + 18, _ = Array.from({ length: o }, () => []), v = [], y = [], b = [], x = [], S = [], C = [], w = [], T = [], ee = 0, te = -1, ne = mi(e, o), re = (t, n) => {
		let r = _[t].length;
		if (!e.activations || r === 0) return m[t];
		let i = m[t] + (r - 1) * 4;
		return n > i ? i + di / 2 : i - di / 2;
	};
	for (let t of e.items) switch (t.type) {
		case "message": {
			let n = t;
			ee++;
			let a = gi(e, n, ee), o = a ? r.measure(a, i.small, P.Normal).height : 0, s = n.hue ?? H.of("ink");
			if (n.from === n.to) {
				n.reply || ++te;
				let t = g + o + 4, c = re(n.from, m[n.from] + 1), l = new B();
				l.moveTo(c, t).lineTo(c + 34, t).lineTo(c + 34, t + 22).lineTo(c + 6, t + 22), y.push(U(l, null, s, 1.4, n.line)), vi(y, F(c, t + 22), F(-1, 0), n.reply, s), a.length > 0 && y.push(r.mark(a, c + 8, g, i.small, P.Normal, H.of("secondary"))), e.numbered && _i(y, r, i, ee, F(c, t)), g = t + 22 + ui + 6;
			} else {
				let t = g + o + 6;
				if (e.activations && n.reply && _[n.from].length > 0) {
					let { start: e, depth: r } = _[n.from].pop();
					v.push({
						participant: n.from,
						top: e,
						bottom: t,
						depth: r
					});
				}
				let c = re(n.from, m[n.to]);
				!n.reply && ne.has(++te) && e.activations && _[n.to].push({
					start: t,
					depth: _[n.to].length
				});
				let l = re(n.to, m[n.from]), u = Math.sign(l - c), d = new B();
				d.moveTo(c, t).lineTo(l - u * (n.reply ? 1 : 8), t), y.push(U(d, null, s, 1.4, n.line)), vi(y, F(l, t), F(u, 0), n.reply, s), a.length > 0 && y.push(r.centred(a, (c + l) / 2, g + o / 2, i.small, P.Normal, H.of("secondary"))), e.numbered && _i(y, r, i, ee, F(c, t)), g = t + ui + 4;
			}
			hi(C, n.from, n.to);
			break;
		}
		case "note": {
			let e = t, n = r.mark(e.text, 0, 0, i.small, P.Normal, H.of("ink"), 220), a = n.width + 20, o = n.height + 12, s = e.placement === "right" ? m[e.last] + 14 : e.placement === "left" ? m[e.first] - 14 - a : (m[e.first] + m[e.last]) / 2 - Math.max(a, m[e.last] - m[e.first] + 40) / 2;
			e.placement === "over" && (a = Math.max(a, m[e.last] - m[e.first] + 40));
			let c = z.fromXYWH(s, g, a, o);
			S.push(U(Nn("note", c), H.hue("yellow").washed(.2), H.hue("yellow").washed(.75), 1.2)), S.push({
				...n,
				x: c.left + (a - n.width) / 2,
				y: c.top + 6
			}), g += o + ui, hi(C, e.first, e.last);
			break;
		}
		case "divider": {
			let e = g + 12, n = new B();
			if (n.moveTo(m[0] - f * .6, e).lineTo(m[o - 1] + d * .6, e), b.push(U(n, null, H.of("axis"), 1, "dashed")), t.text.length > 0) {
				let n = r.centred(t.text, (m[0] + m[o - 1]) / 2, e, i.small, P.SemiBold, H.of("secondary")), a = new B();
				a.addRoundRect(Dn(n).inflate(8, 3), 4, 4), S.push(U(a, H.of("background"), H.of("axis"), 1)), S.push(n);
			}
			g += 30;
			break;
		}
		case "frameStart":
			C.push({
				top: g,
				tag: t.tag,
				condition: t.condition,
				low: 2 ** 53 - 1,
				high: -(2 ** 53 - 1),
				sections: [],
				conditions: []
			}), w.push(_.map((e) => [...e])), g += h + 14;
			break;
		case "frameSection": {
			if (C.length === 0) break;
			let e = C[C.length - 1];
			if (e.sections.push(g), e.conditions.push(t.condition), w.length > 0 && e.tag === "if") {
				let e = w[w.length - 1], t = [];
				for (let n = 0; n < o; n++) {
					for (let t of _[n].filter((t) => !e[n].some((e) => e.start === t.start && e.depth === t.depth))) v.push({
						participant: n,
						top: t.start,
						bottom: g - 4,
						depth: t.depth
					});
					t.push([...e[n]]);
				}
				_ = t;
			}
			g += h + 10;
			break;
		}
		case "frameEnd": {
			if (C.length === 0) break;
			let e = C.pop();
			w.length > 0 && w.pop(), T.push({
				top: e.top,
				bottom: g,
				tag: e.tag,
				condition: e.condition,
				low: e.low,
				high: e.high,
				sections: e.sections,
				conditions: e.conditions,
				depth: C.length
			}), C.length > 0 && e.low <= e.high && hi(C, e.low, e.high), g += 10;
			break;
		}
	}
	let E = g + 6;
	for (let e = 0; e < o; e++) for (let { start: t, depth: n } of _[e]) v.push({
		participant: e,
		top: t,
		bottom: E - 4,
		depth: n
	});
	for (let e = 0; e < o; e++) {
		let t = new B();
		t.moveTo(m[e], l).lineTo(m[e], E), a.add(U(t, null, H.of("axis"), 1, "dashed"));
	}
	for (let e of fi(T, (e) => e.depth)) {
		let t = e.low <= e.high ? e.low : 0, n = e.low <= e.high ? e.high : o - 1, c = e.depth * 8, l = m[t] - Math.max(s[t] / 2, 40) - 6 + c, u = m[n] + Math.max(s[n] / 2, 40) + 6 - c, d = new z(l, e.top, u, e.bottom), f = new B();
		f.addRect(d), a.add(U(f, H.of("ink").washed(.025), H.of("axis"), 1.1));
		let p = r.mark(e.tag, l + 7, e.top + 3, i.small, P.SemiBold, H.of("ink")), h = new B(), g = p.width + 14, _ = p.height + 6;
		h.moveTo(l, e.top).lineTo(l + g + 6, e.top).lineTo(l + g + 6, e.top + _ - 6).lineTo(l + g, e.top + _).lineTo(l, e.top + _).close(), x.push(U(h, H.of("grid"), H.of("axis"), 1.1)), x.push(p), e.condition.length > 0 && x.push(r.mark(`[${e.condition}]`, l + g + 14, e.top + 3, i.small, P.Normal, H.of("secondary")));
		for (let t = 0; t < e.sections.length; t++) {
			let n = new B();
			n.moveTo(l, e.sections[t]).lineTo(u, e.sections[t]), b.push(U(n, null, H.of("axis"), 1.1, "dashed")), e.conditions[t].length > 0 && x.push(r.mark(`[${e.conditions[t]}]`, l + 10, e.sections[t] + 3, i.small, P.Normal, H.of("secondary")));
		}
	}
	for (let e of b) a.add(e);
	for (let { participant: t, top: n, bottom: r, depth: i } of fi(v, (e) => e.depth)) {
		let o = new B();
		o.addRect(z.fromXYWH(m[t] + i * 4 - di / 2, n - 2, di, Math.max(8, r - n + 4))), a.add(U(o, e.participants[t].hue.washed(.22), e.participants[t].hue.washed(.85), 1.1));
	}
	for (let e of x) a.add(e);
	for (let t = 0; t < o; t++) yi(a, r, i, e.participants[t], m[t], 0, s[t], l, !0), e.mirror && yi(a, r, i, e.participants[t], m[t], E, s[t], l, !1);
	for (let e of [...y, ...S]) a.add(e);
	return a.frame(12), a;
} };
function mi(e, t) {
	let n = /* @__PURE__ */ new Set(), r = Array.from({ length: t }, () => []), i = [], a = [], o = -1;
	for (let t of e.items) switch (t.type) {
		case "message":
			t.from === t.to ? t.reply || ++o : t.reply ? r[t.from].length > 0 && n.add(r[t.from].pop()) : r[t.to].push(++o);
			break;
		case "frameStart":
			i.push(r.map((e) => [...e])), a.push(t.tag);
			break;
		case "frameSection":
			i.length > 0 && a[a.length - 1] === "if" && (r = i[i.length - 1].map((e) => [...e]));
			break;
		case "frameEnd": i.length > 0 && (i.pop(), a.pop());
	}
	return n;
}
function hi(e, t, n) {
	for (let r of e) r.low = Math.min(r.low, Math.min(t, n)), r.high = Math.max(r.high, Math.max(t, n));
}
function gi(e, t, n = 0) {
	return t.text;
}
function _i(e, t, n, r, i) {
	let a = String(r), o = new B();
	o.addCircle(i.x, i.y, 9), e.push(U(o, H.hue("accent"), null, 0)), e.push(t.centred(a, i.x, i.y, n.small * .82, P.SemiBold, H.of("background")));
}
function vi(e, t, n, r, i) {
	if (r) {
		let r = Et(n), a = F(-r.y, r.x), o = new B();
		o.moveTo(I(L(t, R(r, 9)), R(a, 5))).lineTo(t).lineTo(L(L(t, R(r, 9)), R(a, 5))), e.push(U(o, null, i, 1.4));
		return;
	}
	let a = zn("arrow", t, n, 9);
	a !== null && e.push(U(a.path, i, null, 0));
}
function yi(e, t, n, r, i, a, o, s, c) {
	let l = r.hue;
	switch (r.role) {
		case "actor": {
			let o = t.centred(r.label, i, 0, n.label, P.SemiBold, H.of("ink")), u = c ? a + s - o.height - 46 : a + 6, d = c ? a + s - o.height : u + 46, f = new B();
			f.addCircle(i, u + 7, 7), e.add(U(f, l.washed(.2), l, 1.6));
			let p = new B();
			p.moveTo(i, u + 14).lineTo(i, u + 30), p.moveTo(i - 12, u + 19).lineTo(i + 12, u + 19), p.moveTo(i, u + 30).lineTo(i - 10, u + 42), p.moveTo(i, u + 30).lineTo(i + 10, u + 42), e.add(U(p, null, l, 1.6)), e.add({
				...o,
				y: d
			});
			break;
		}
		default: {
			let u = t.measure(r.label, n.label, P.SemiBold).height + 18 + (r.role === "database" ? 10 : 0), d = c ? a + s - u : a, f = z.fromXYWH(i - o / 2, d, o, u);
			e.add(U(Nn(r.role === "database" ? "cylinder" : "box", f), l.washed(.14), l.washed(.9), 1.5)), e.add(t.centred(r.label, i, f.midY + (r.role === "database" ? 4 : 0), n.label, P.SemiBold, H.of("ink")));
			break;
		}
	}
}
N("sequence", (e) => new si(e));
//#endregion
//#region src/dhole/kinds/trees.ts
function bi(e) {
	return e.startsWith("section") && (e.length === 7 || i(e.at(7)) || e.at(7) === ":");
}
var xi = (e, t = "", n = "s") => e === 1 ? t : n, Si = class {
	constructor() {
		r(this, "label", ""), r(this, "hue", null), r(this, "children", []), r(this, "size", {
			width: 0,
			height: 0
		}), r(this, "box", z.empty), r(this, "extent", 0), r(this, "branch", 0), r(this, "depth", 0);
	}
	get count() {
		return 1 + this.children.reduce((e, t) => e + t.count, 0);
	}
}, Ci = class extends Ze {
	constructor(...e) {
		super(...e), r(this, "root", new Si()), r(this, "spread", "both");
	}
	get isEmpty() {
		return this.root.label.length === 0 && this.root.children.length === 0;
	}
	build(e, t) {
		let n = Ti.build(this, this.theme, t.measurer), r = this.root.count, i = this.root.children.length, a = new jn(n, "Mind map", t.measurer);
		return a.label = this.title, {
			chart: Lt(a),
			naturalWidth: n.width,
			naturalHeight: n.height,
			summary: `A mind map of ${r} idea${xi(r)} on ${i} branch${xi(i, "", "es")}.`
		};
	}
}, wi = class extends $e {
	constructor(e) {
		super(e), r(this, "own", void 0), r(this, "roots", []), this.own = new Ci(e.kind, e.kindLine);
	}
	get spec() {
		return this.own;
	}
	get settings() {
		return [M([
			"direction",
			"spread",
			"layout"
		], (e) => {
			let t = this.readChoice(e, "direction", [[
				"both",
				"centre",
				"center",
				"radial",
				"around"
			], "both"], [["right", "lr"], "right"], [["left", "rl"], "left"], [[
				"down",
				"tree",
				"td",
				"tb",
				"org",
				"organisation",
				"organization"
			], "down"]);
			t !== null && (this.own.spread = t);
		})];
	}
	content(e) {
		this.roots.push(e);
	}
	finish() {
		let e = this.own;
		if (this.roots.length === 0) e.root = new Si(), e.root.label = e.title ?? "", e.title === null && this.problems.error(this.context.kindLine.content, "NoData");
		else if (this.roots.length === 1) e.root = this.item(this.roots[0], null, !0);
		else if (e.title !== null) {
			e.root = new Si(), e.root.label = e.title, e.title = null;
			for (let t of this.roots) e.root.children.push(this.item(t, null));
		} else {
			this.problems.warning(this.roots[1].content, "SeveralRoots"), e.root = this.item(this.roots[0], null, !0);
			for (let t of this.roots.slice(1)) e.root.children.push(this.item(t, null));
		}
	}
	item(e, t, n = !1) {
		let r = O(e.content, this.problems), i = new Si();
		i.label = r.name;
		for (let e of r.attributes) {
			let t = W.hue(e.text);
			t === null ? this.unknownAttribute(e, new l("a branch", "分支"), W.names) : i.hue = H.hue(t);
		}
		i.hue ?? (i.hue = t);
		for (let t of e.children) i.children.push(this.item(t, n ? null : i.hue));
		return i;
	}
}, Ti = {
	Gap: 34,
	Stack: 10,
	Max: 200,
	build(e, t, n) {
		let r = new kn(t.fontFamilies, n), i = dr(t), a = new On(t.fontFamilies), o = e.root;
		if (ki(o, 0, -1, r, i), e.spread === "down") return Pi(o, 0, 0), Fi(o, a, r, i, !0), a.frame(12), a;
		let s = [], c = [], l = 0, u = 0;
		for (let t of o.children) {
			let n = ji(t, !0), r = e.spread === "right" || e.spread === "both" && l <= u;
			e.spread === "left" && (r = !1), (r ? s : c).push(t), r ? l += n + Di * 2 : u += n + Di * 2;
		}
		return o.box = z.fromXYWH(-o.size.width / 2, -o.size.height / 2, o.size.width, o.size.height), Mi(s, o.box.right + Ei * 1.4, 1), Mi(c, o.box.left - Ei * 1.4, -1), Fi(o, a, r, i, !1), a.frame(12), a;
	}
}, { Gap: Ei, Stack: Di, Max: Oi } = Ti;
function ki(e, t, n, r, i) {
	e.depth = t, e.branch = n;
	let [a, o, s, c] = Ai(t, i), l = r.measure(e.label, a, o, Oi);
	e.size = {
		width: l.width + 2 * s,
		height: l.height + 2 * c
	};
	for (let a = 0; a < e.children.length; a++) ki(e.children[a], t + 1, t === 0 ? a : n, r, i);
}
function Ai(e, t) {
	switch (e) {
		case 0: return [
			t.label * 1.2,
			P.SemiBold,
			22,
			12
		];
		case 1: return [
			t.label,
			P.SemiBold,
			14,
			8
		];
		default: return [
			t.small,
			P.Normal,
			4,
			4
		];
	}
}
function ji(e, t) {
	let n = t ? e.size.height : e.size.width, r = t ? Di : Di * 2, i = e.children.length === 0 ? 0 : e.children.reduce((e, n) => e + ji(n, t), 0) + r * (e.children.length - 1);
	return e.extent = Math.max(n, i);
}
function Mi(e, t, n) {
	if (e.length === 0) return;
	let r = -(e.reduce((e, t) => e + t.extent, 0) + Di * 2 * (e.length - 1)) / 2;
	for (let i of e) Ni(i, t, r, n), r += i.extent + Di * 2;
}
function Ni(e, t, n, r) {
	let i = n + e.extent / 2, a = r > 0 ? t : t - e.size.width;
	if (e.box = z.fromXYWH(a, i - e.size.height / 2, e.size.width, e.size.height), e.children.length === 0) return;
	let o = i - (e.children.reduce((e, t) => e + t.extent, 0) + Di * (e.children.length - 1)) / 2, s = r > 0 ? e.box.right + Ei : e.box.left - Ei;
	for (let t of e.children) Ni(t, s, o, r), o += t.extent + Di;
}
function Pi(e, t, n) {
	ji(e, !1), r(e, t, n);
	function r(e, t, n) {
		let i = t + e.extent / 2;
		e.box = z.fromXYWH(i - e.size.width / 2, n, e.size.width, e.size.height);
		let a = i - (e.children.reduce((e, t) => e + t.extent, 0) + Di * 2 * (e.children.length - 1)) / 2;
		for (let t of e.children) r(t, a, e.box.bottom + Ei * 1.2), a += t.extent + Di * 2;
	}
}
function Fi(e, t, n, r, i) {
	let a = [], o = (e) => {
		let s = e.hue ?? (e.depth === 0 ? H.hue("accent") : H.palette(e.branch < 0 ? 0 : e.branch + 1));
		for (let n of e.children) {
			let r = n.hue ?? H.palette(n.branch + 1), a, s;
			if (i) a = F(e.box.midX, e.box.bottom), s = F(n.box.midX, n.box.top);
			else {
				let t = n.box.midX > e.box.midX;
				a = F(t ? e.box.right : e.box.left, e.depth >= 2 ? e.box.bottom : e.box.midY), s = n.depth >= 2 && n.children.length === 0 ? F(t ? n.box.left : n.box.right, n.box.bottom) : F(t ? n.box.left : n.box.right, n.depth >= 2 ? n.box.bottom : n.box.midY);
			}
			let c = e.depth === 0 ? 3 : e.depth === 1 ? 2.2 : 1.5;
			if (t.add(U(In([a, s], i), null, r.washed(.85), c)), !i && n.depth >= 2) {
				let e = new B();
				e.moveTo(n.box.left, n.box.bottom).lineTo(n.box.right, n.box.bottom), t.add(U(e, null, r.washed(.85), 1.5));
			}
			o(n);
		}
		let [c, l] = Ai(e.depth, r);
		if (e.depth <= 1 || i) {
			let t = new B(), n = e.depth === 0 ? e.box.height / 2 : 8;
			t.addRoundRect(e.box, n, n), a.push(U(t, s.washed(e.depth === 0 ? .22 : .16), s.washed(.9), e.depth === 0 ? 2 : 1.5));
		}
		a.push(n.centred(e.label, e.box.midX, e.box.midY, c, l, H.of("ink"), Oi));
	};
	o(e);
	for (let e of a) t.add(e);
}
var Ii = class extends Ze {
	constructor(...e) {
		super(...e), r(this, "periods", []), r(this, "sections", []), r(this, "vertical", !1);
	}
	get isEmpty() {
		return this.periods.length === 0;
	}
	build(e, t) {
		let n = Ri.build(this, this.theme, t.measurer), r = this.periods.reduce((e, t) => e + t.events.length, 0), i = this.periods.length, a = new jn(n, "Timeline", t.measurer);
		return a.label = this.title, {
			chart: Lt(a),
			naturalWidth: n.width,
			naturalHeight: n.height,
			summary: `A timeline of ${i} time${xi(i)} and ${r} event${xi(r)}.`
		};
	}
}, Li = class extends $e {
	constructor(e) {
		super(e), r(this, "own", void 0), r(this, "section", -1), this.own = new Ii(e.kind, e.kindLine);
	}
	get spec() {
		return this.own;
	}
	get settings() {
		return [M(["direction", "layout"], (e) => {
			let t = this.readDirection(e);
			t !== null && (this.own.vertical = t === "down" || t === "up");
		})];
	}
	content(e) {
		let t = e.content;
		if (bi(t)) {
			let n = t.from(7).trim();
			n.length > 0 && n.at(0) === ":" && (n = n.from(1).trim()), this.own.sections.push(D(n, this.problems)), this.section = this.own.sections.length - 1;
			for (let t of e.children) this.content(t);
			return;
		}
		let { head: n, tail: r } = E(t), i = t.text;
		e.children.length > 0 && !i.includes(": ") && !i.endsWith(":") && !i.includes("：") && (n = t, r = null);
		let a = O(n, this.problems);
		if (a.name.length === 0) {
			this.problems.error(t, "EventWithoutTime");
			return;
		}
		let o = null;
		for (let e of a.attributes) {
			let t = W.hue(e.text);
			t === null ? this.unknownAttribute(e, new l("a time", "时间"), W.names) : o = H.hue(t);
		}
		let s = [], c = (e) => {
			let t = O(e, this.problems);
			t.name.length > 0 && s.push(t.name);
			for (let e of t.attributes) {
				let t = W.hue(e.text);
				t === null ? this.unknownAttribute(e, new l("a time", "时间"), W.names) : o = H.hue(t);
			}
		};
		if (r !== null) for (let e of ie(r, ";")) e.isEmpty || c(e);
		for (let t of e.children) {
			c(t.content);
			for (let e of t.children) this.problems.warning(e.content, "IndentedUnderNothing");
		}
		this.own.periods.push({
			label: a.name,
			events: s,
			section: this.section,
			hue: o
		});
	}
	finish() {
		this.own.periods.length === 0 && this.problems.error(this.context.kindLine.content, "NoData");
	}
}, Ri = {
	CardWidth: 150,
	Gap: 18,
	build(e, t, n) {
		let { CardWidth: r, Gap: i } = Ri, a = new kn(t.fontFamilies, n), o = dr(t), s = new On(t.fontFamilies), c = e.periods.length;
		if (c === 0) return s.add(a.mark(" ", 0, 0, o.small, P.Normal, H.of("muted"))), s.frame(12), s;
		let l = (t, n) => t.hue ?? H.palette(e.sections.length > 0 && t.section >= 0 ? t.section : n);
		if (e.vertical) {
			let t = 0, n = Math.max(...e.periods.map((e) => a.measure(e.label, o.label, P.SemiBold).width)) + 24 + 14, u = [], d = -1;
			for (let s = 0; s < c; s++) {
				let c = e.periods[s];
				c.section !== d && c.section >= 0 && (u.push(a.mark(e.sections[c.section], n + 22, t, o.small, P.SemiBold, H.palette(c.section).washed(.9))), t += a.measure("Ag", o.small, P.SemiBold).height + 8, d = c.section);
				let f = l(c, s), p = a.mark(c.label, 0, t, o.label, P.SemiBold, H.of("ink"));
				u.push({
					...p,
					x: n - 16 - p.width
				});
				let m = new B();
				m.addCircle(n, t + p.height / 2, 6), u.push(U(m, f, H.of("background"), 2));
				let h = t;
				for (let e of c.events) {
					let t = a.mark(e, n + 30, h + 6, o.small, P.Normal, H.of("ink"), r * 1.6), i = z.fromXYWH(n + 22, h, t.width + 16, t.height + 12), s = new B();
					s.addRoundRect(i, 6, 6), u.push(U(s, f.washed(.12), f.washed(.6), 1.2)), u.push(t), h += i.height + 6;
				}
				t = Math.max(t + p.height, h) + i;
			}
			let f = new B();
			f.moveTo(n, -6).lineTo(n, t), s.add(U(f, null, H.of("axis"), 2));
			for (let e of u) s.add(e);
			return s.frame(12), s;
		}
		let u = Array(c).fill(0);
		for (let t = 0; t < c; t++) {
			let n = e.periods[t], i = a.measure(n.label, o.label, P.SemiBold).width + 24;
			for (let e of n.events) i = Math.max(i, a.measure(e, o.small, P.Normal, r).width + 16);
			u[t] = Math.max(i, 92);
		}
		let d = e.sections.length > 0 ? a.measure("Ag", o.small, P.SemiBold).height + 16 : 0, f = Math.max(...e.periods.map((e) => a.measure(e.label, o.label, P.SemiBold).height)) + 14, p = d + f + 14, m = 0, h = Array(c).fill(0);
		for (let e = 0; e < c; e++) h[e] = m + u[e] / 2, m += u[e] + i;
		let g = m - i, _ = [];
		for (let t = 0; t < e.sections.length; t++) {
			let n = [...Array(c).keys()].filter((n) => e.periods[n].section === t);
			if (n.length === 0) continue;
			let r = n[0], s = n[n.length - 1], l = h[r] - u[r] / 2 - i / 3, f = h[s] + u[s] / 2 + i / 3, p = new B();
			p.addRoundRect(new z(l, 0, f, d - 6), 6, 6), _.push(U(p, H.palette(t).washed(.16), null, 0)), _.push(a.centred(e.sections[t], (l + f) / 2, (d - 6) / 2, o.small, P.SemiBold, H.of("ink")));
		}
		let v = new B();
		v.moveTo(-8, p).lineTo(g + 8, p), s.add(U(v, null, H.of("axis"), 2));
		let y = zn("arrow", F(g + 18, p), F(1, 0), 9);
		y !== null && s.add(U(y.path, H.of("axis"), null, 0));
		for (let t = 0; t < c; t++) {
			let n = e.periods[t], i = l(n, t), s = a.centred(n.label, h[t], d + f / 2 - 2, o.label, P.SemiBold, H.of("ink")), c = new B();
			c.addRoundRect(Dn(s).inflate(10, 4), s.height / 2 + 4, s.height / 2 + 4), _.push(U(c, i.washed(.2), i.washed(.9), 1.4)), _.push(s);
			let m = new B();
			m.addCircle(h[t], p, 6), _.push(U(m, i, H.of("background"), 2));
			let g = p + 22;
			if (n.events.length > 0) {
				let e = new B();
				e.moveTo(h[t], p + 6).lineTo(h[t], g), _.push(U(e, null, i.washed(.6), 1.2));
			}
			for (let e of n.events) {
				let n = a.centred(e, h[t], 0, o.small, P.Normal, H.of("ink"), r), s = u[t] - 4, c = z.fromXYWH(h[t] - s / 2, g, s, n.height + 12), l = new B();
				l.addRoundRect(c, 6, 6), _.push(U(l, i.washed(.1), i.washed(.55), 1.1)), _.push({
					...n,
					y: g + 6
				}), g += c.height + 7;
			}
		}
		for (let e of _) s.add(e);
		return s.frame(12), s;
	}
}, zi = class extends Ze {
	constructor(...e) {
		super(...e), r(this, "columns", []);
	}
	get isEmpty() {
		return this.columns.length === 0;
	}
	build(e, t) {
		let n = Vi.build(this, this.theme, t.measurer), r = this.columns.reduce((e, t) => e + t.cards.length, 0), i = this.columns.length, a = new jn(n, "Board", t.measurer);
		return a.label = this.title, {
			chart: Lt(a),
			naturalWidth: n.width,
			naturalHeight: n.height,
			summary: `A board of ${i} column${xi(i)} and ${r} card${xi(r)}.`
		};
	}
}, Bi = class extends $e {
	constructor(e) {
		super(e), r(this, "own", void 0), this.own = new zi(e.kind, e.kindLine);
	}
	get spec() {
		return this.own;
	}
	content(e) {
		let t = O(e.content, this.problems), n = {
			name: t.name,
			hue: this.hue(t, "a column"),
			cards: []
		};
		for (let t of e.children) {
			let e = O(t.content, this.problems);
			n.cards.push({
				text: e.name,
				hue: this.hue(e, "a card")
			});
			for (let e of t.children) {
				let t = O(e.content, this.problems);
				n.cards.push({
					text: t.name,
					hue: this.hue(t, "a card")
				});
			}
		}
		this.own.columns.push(n);
	}
	hue(e, t) {
		let n = null;
		for (let r of e.attributes) {
			let e = W.hue(r.text);
			e === null ? this.unknownAttribute(r, new l(t, t === "a card" ? "卡片" : "列"), W.names) : n = H.hue(e);
		}
		return n;
	}
	finish() {
		this.own.columns.length === 0 && this.problems.error(this.context.kindLine.content, "NoData");
	}
}, Vi = {
	Width: 196,
	Gap: 14,
	Pad: 10,
	build(e, t, n) {
		let { Width: r, Gap: i, Pad: a } = Vi, o = new kn(t.fontFamilies, n), s = dr(t), c = new On(t.fontFamilies), l = 0, u = 0, d = [], f = [];
		for (let t = 0; t < e.columns.length; t++) {
			let n = e.columns[t], c = n.hue ?? H.palette(t), p = 0, m = o.mark(n.name, l + a + 4, p + a, s.label, P.SemiBold, H.of("ink"), r - 60), h = o.mark(String(n.cards.length), 0, p + a, s.small, P.SemiBold, H.of("secondary"));
			f.push(m);
			let g = new B(), _ = z.fromXYWH(l + r - a - h.width - 12, p + a + (m.height - h.height) / 2 - 2, h.width + 12, h.height + 4);
			g.addRoundRect(_, _.height / 2, _.height / 2), f.push(U(g, c.washed(.2), null, 0)), f.push({
				...h,
				x: _.left + 6,
				y: _.top + 2
			}), p += a + m.height + 10;
			for (let e of n.cards) {
				let t = o.mark(e.text, l + a + 12, p + 8, s.small, P.Normal, H.of("ink"), r - 2 * a - 22), n = z.fromXYWH(l + a, p, r - 2 * a, t.height + 16), i = new B();
				i.addRoundRect(n, 6, 6), f.push(U(i, H.of("background"), H.of("grid"), 1.2));
				let u = new B();
				u.addRoundRect(z.fromXYWH(n.left + 3, n.top + 4, 4, n.height - 8), 2, 2), f.push(U(u, e.hue ?? c, null, 0)), f.push(t), p += n.height + 8;
			}
			p += a - 8 + (n.cards.length === 0 ? 24 : 0), d.push({
				x: l,
				height: p,
				column: n,
				index: t
			}), u = Math.max(u, p), l += r + i;
		}
		for (let { x: e, column: t, index: n } of d) {
			let i = new B();
			i.addRoundRect(z.fromXYWH(e, 0, r, u), 10, 10), c.add(U(i, (t.hue ?? H.palette(n)).washed(.07), null, 0));
		}
		for (let e of f) c.add(e);
		return c.frame(12), c;
	}
};
N("mindmap", (e) => new wi(e)), N("timeline", (e) => new Li(e)), N("kanban", (e) => new Bi(e));
//#endregion
//#region src/dhole/kinds/time-scale.ts
var K, Hi = 1e3, Ui = Hi * 60, Wi = Ui * 60, q = Wi * 24, Gi = q * 7, Ki = q * 30, qi = q * 365;
function Ji(e, t, n = 1, r = 0, i = 0, a = 0, o = 0) {
	let s = /* @__PURE__ */ new Date(0);
	return s.setUTCFullYear(e, t, n), s.setUTCHours(r, i, a, o), s.getTime();
}
var J = (e) => new Date(e).getUTCFullYear(), Yi = (e) => new Date(e).getUTCMonth() + 1, Xi = (e) => new Date(e).getUTCDate(), Zi = (e) => new Date(e).getUTCHours(), Qi = (e) => new Date(e).getUTCMinutes(), $i = (e) => new Date(e).getUTCSeconds(), ea = (e) => new Date(e).getUTCMilliseconds();
function ta(e) {
	return new Date(e).getUTCDay();
}
function na(e) {
	return Math.floor(e / q) * q;
}
function ra(e) {
	return e - na(e);
}
function ia(e, t) {
	return e - aa(e, t);
}
function aa(e, t) {
	return (e % t + t) % t;
}
function oa(e, t) {
	let n = J(e) * 12 + Yi(e) - 1 + t, r = Math.trunc(n / 12);
	return Ji(r, n - r * 12, 1) + (Xi(e) - 1) * q + ra(e);
}
function sa(e, t) {
	return Ji(J(e) + t, Yi(e) - 1, 1) + (Xi(e) - 1) * q + ra(e);
}
function ca(e) {
	let t = Math.round(e);
	return Math.abs(e % 1) === .5 && t % 2 != 0 ? t - 1 : t;
}
var Y = class e {
	constructor(e, t, n = null, i = null) {
		r(this, "floorOf", void 0), r(this, "offsetOf", void 0), r(this, "countOf", void 0), r(this, "field", void 0), r(this, "everyOverride", null), this.floorOf = e, this.offsetOf = t, this.countOf = n, this.field = i;
	}
	floor(e) {
		return this.floorOf(e);
	}
	ceil(e) {
		let t = this.floorOf(e - 1);
		return t = this.offsetOf(t, 1), this.floorOf(t);
	}
	offset(e, t = 1) {
		return this.offsetOf(e, t);
	}
	range(e, t, n = 1) {
		let r = [];
		if (e = this.ceil(e), !(e < t) || n <= 0) return r;
		let i;
		do
			i = e, r.push(i), e = this.floorOf(this.offsetOf(e, n));
		while (i < e && e < t);
		return r;
	}
	filter(t) {
		return new e((e) => {
			for (;;) {
				if (e = this.floorOf(e), t(e)) return e;
				--e;
			}
		}, (e, n) => {
			if (n < 0) for (; ++n <= 0;) do
				e = this.offsetOf(e, -1);
			while (!t(e));
			else for (; --n >= 0;) do
				e = this.offsetOf(e, 1);
			while (!t(e));
			return e;
		});
	}
	count(e, t) {
		if (this.countOf === null) throw Error("This derived interval does not support counting.");
		return Math.floor(this.countOf(this.floorOf(e), this.floorOf(t)));
	}
	every(e) {
		if (this.everyOverride !== null) return this.everyOverride(e);
		if (e = Math.floor(e), !Number.isFinite(e) || !(e > 0)) return null;
		if (!(e > 1)) return this;
		if (this.countOf === null) return null;
		let t = this.field;
		return this.filter(t === null ? (t) => this.count(0, t) % e === 0 : (n) => t(n) % e === 0);
	}
	static makeDay(t) {
		return new e((e) => na(e), (e, t) => e + t * q, (e, t) => (t - e) / q, t);
	}
	static weekday(t) {
		return new e((e) => na(e) - (ta(e) + 7 - t) % 7 * q, (e, t) => e + t * 7 * q, (e, t) => (t - e) / Gi);
	}
};
K = Y, r(Y, "millisecond", (() => {
	let e = new K((e) => e, (e, t) => e + t, (e, t) => t - e);
	return e.everyOverride = (t) => (t = Math.floor(t), !Number.isFinite(t) || !(t > 0) ? null : t > 1 ? new K((e) => Math.floor(e / t) * t, (e, n) => e + n * t, (e, n) => (n - e) / t) : e), e;
})()), r(Y, "second", new K((e) => ia(e, Hi), (e, t) => e + t * Hi, (e, t) => (t - e) / Hi, (e) => $i(e))), r(Y, "utcMinute", new K((e) => ia(e, Ui), (e, t) => e + t * Ui, (e, t) => (t - e) / Ui, (e) => Qi(e))), r(Y, "utcHour", new K((e) => ia(e, Wi), (e, t) => e + t * Wi, (e, t) => (t - e) / Wi, (e) => Zi(e))), r(Y, "utcDay", K.makeDay((e) => Xi(e) - 1)), r(Y, "unixDay", K.makeDay((e) => Math.floor(e / q))), r(Y, "utcSunday", K.weekday(0)), r(Y, "utcMonday", K.weekday(1)), r(Y, "utcThursday", K.weekday(4)), r(Y, "utcMonth", new K((e) => Ji(J(e), Yi(e) - 1, 1), (e, t) => oa(e, t), (e, t) => Yi(t) - Yi(e) + (J(t) - J(e)) * 12, (e) => Yi(e) - 1)), r(Y, "utcYear", (() => {
	let e = new K((e) => Ji(J(e), 0, 1), (e, t) => sa(e, t), (e, t) => J(t) - J(e), (e) => J(e));
	return e.everyOverride = (e) => (e = Math.floor(e), !Number.isFinite(e) || !(e > 0) ? null : new K((t) => Ji(Math.max(1, Math.trunc(J(t) / e) * e), 0, 1), (t, n) => sa(t, n * e))), e;
})());
function la(e, t, n = 0, r = e.length) {
	for (; n < r;) {
		let i = n + r >>> 1;
		e[i] <= t ? n = i + 1 : r = i;
	}
	return n;
}
var ua = Math.sqrt(50), da = Math.sqrt(10), fa = Math.sqrt(2);
function pa(e, t, n) {
	let r = (t - e) / Math.max(0, n), i = Math.floor(Math.log10(r)), a = r / 10 ** i, o = a >= ua ? 10 : a >= da ? 5 : a >= fa ? 2 : 1, s, c, l;
	return i < 0 ? (l = 10 ** -i / o, s = ca(e * l), c = ca(t * l), s / l < e && ++s, c / l > t && --c, l = -l) : (l = 10 ** i * o, s = ca(e / l), c = ca(t / l), s * l < e && ++s, c * l > t && --c), c < s && .5 <= n && n < 2 ? pa(e, t, n * 2) : [
		s,
		c,
		l
	];
}
function ma(e, t, n) {
	return pa(e, t, n)[2];
}
function ha(e, t, n) {
	let r = t < e, i = r ? ma(t, e, n) : ma(e, t, n);
	return (r ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
var ga = [
	[
		Y.second,
		1,
		Hi
	],
	[
		Y.second,
		5,
		5 * Hi
	],
	[
		Y.second,
		15,
		15 * Hi
	],
	[
		Y.second,
		30,
		30 * Hi
	],
	[
		Y.utcMinute,
		1,
		Ui
	],
	[
		Y.utcMinute,
		5,
		5 * Ui
	],
	[
		Y.utcMinute,
		15,
		15 * Ui
	],
	[
		Y.utcMinute,
		30,
		30 * Ui
	],
	[
		Y.utcHour,
		1,
		Wi
	],
	[
		Y.utcHour,
		3,
		3 * Wi
	],
	[
		Y.utcHour,
		6,
		6 * Wi
	],
	[
		Y.utcHour,
		12,
		12 * Wi
	],
	[
		Y.unixDay,
		1,
		q
	],
	[
		Y.unixDay,
		2,
		2 * q
	],
	[
		Y.utcSunday,
		1,
		Gi
	],
	[
		Y.utcMonth,
		1,
		Ki
	],
	[
		Y.utcMonth,
		3,
		3 * Ki
	],
	[
		Y.utcYear,
		1,
		qi
	]
], _a = ga.map((e) => e[2]);
function va(e, t, n) {
	let r = Math.abs(t - e) / n, i = la(_a, r);
	if (i === ga.length) return Y.utcYear.every(ha(e / qi, t / qi, n));
	if (i === 0) return Y.millisecond.every(Math.max(ha(e, t, n), 1));
	let [a, o] = ga[r / ga[i - 1][2] < ga[i][2] / r ? i - 1 : i];
	return a.every(o);
}
function ya(e, t, n) {
	let r = t < e;
	r && ([e, t] = [t, e]);
	let i = va(e, t, n), a = i === null ? [] : i.range(e, t + 1);
	return r && a.reverse(), a;
}
var ba = {
	dateTime: "%x, %X",
	date: "%-m/%-d/%Y",
	time: "%-I:%M:%S %p",
	periods: ["AM", "PM"],
	days: [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday"
	],
	shortDays: [
		"Sun",
		"Mon",
		"Tue",
		"Wed",
		"Thu",
		"Fri",
		"Sat"
	],
	months: [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	],
	shortMonths: [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec"
	]
};
function X(e, t, n) {
	let r = e < 0 ? "-" : "", i = String(Math.abs(e));
	return r + (i.length < n && t.length > 0 ? t[0].repeat(n - i.length) + i : i);
}
function xa(e, t) {
	let n = "", r = 0, i = e.length;
	for (let a = 0; a < i; ++a) if (e[a] === "%") {
		n += e.substring(r, a);
		let o, s = ++a < i ? e[a] : "\0";
		s === "-" || s === "_" || s === "0" ? (o = s === "-" ? "" : s === "_" ? " " : "0", s = ++a < i ? e[a] : "\0") : o = s === "e" ? " " : "0", n += Ca(s, t, o), r = a + 1;
	}
	return n += e.substring(r, i), n;
}
function Sa(e) {
	let t = ta(e);
	return t >= 4 || t === 0 ? Y.utcThursday.floor(e) : Y.utcThursday.ceil(e);
}
function Ca(e, t, n) {
	switch (e) {
		case "a": return ba.shortDays[ta(t)];
		case "A": return ba.days[ta(t)];
		case "b": return ba.shortMonths[Yi(t) - 1];
		case "B": return ba.months[Yi(t) - 1];
		case "c": return xa(ba.dateTime, t);
		case "d":
		case "e": return X(Xi(t), n, 2);
		case "f": return X(ea(t), n, 3) + "000";
		case "g": return X(J(Sa(t)) % 100, n, 2);
		case "G": return X(J(Sa(t)) % 1e4, n, 4);
		case "H": return X(Zi(t), n, 2);
		case "I": return X(Zi(t) % 12 == 0 ? 12 : Zi(t) % 12, n, 2);
		case "j": return X(1 + Y.utcDay.count(Y.utcYear.floor(t), t), n, 3);
		case "L": return X(ea(t), n, 3);
		case "m": return X(Yi(t), n, 2);
		case "M": return X(Qi(t), n, 2);
		case "p": return ba.periods[+(Zi(t) >= 12)];
		case "q": return String(1 + Math.trunc((Yi(t) - 1) / 3));
		case "Q": return String(Math.trunc(t));
		case "s": return String(Math.floor(t / 1e3));
		case "S": return X($i(t), n, 2);
		case "u": return String(ta(t) === 0 ? 7 : ta(t));
		case "U": return X(Y.utcSunday.count(Y.utcYear.floor(t) - 1, t), n, 2);
		case "V": {
			let e = Sa(t), r = Y.utcYear.floor(e);
			return X(Y.utcThursday.count(r, e) + +(ta(r) === 4), n, 2);
		}
		case "w": return String(ta(t));
		case "W": return X(Y.utcMonday.count(Y.utcYear.floor(t) - 1, t), n, 2);
		case "x": return xa(ba.date, t);
		case "X": return xa(ba.time, t);
		case "y": return X(J(t) % 100, n, 2);
		case "Y": return X(J(t) % 1e4, n, 4);
		case "Z": return "+0000";
		case "%": return "%";
		default: return "%" + e;
	}
}
function wa(e) {
	return xa(Y.second.floor(e) < e ? ".%L" : Y.utcMinute.floor(e) < e ? ":%S" : Y.utcHour.floor(e) < e ? "%I:%M" : Y.utcDay.floor(e) < e ? "%I %p" : Y.utcMonth.floor(e) < e ? Y.utcSunday.floor(e) < e ? "%a %d" : "%b %d" : Y.utcYear.floor(e) < e ? "%B" : "%Y", e);
}
var Ta = class {
	constructor() {
		r(this, "domain0", Ji(2e3, 0, 1)), r(this, "domain1", Ji(2e3, 0, 2)), r(this, "range0", 0), r(this, "range1", 1);
	}
	domain(e, t) {
		return this.domain0 = e, this.domain1 = t, this;
	}
	range(e, t) {
		return this.range0 = e, this.range1 = t, this;
	}
	apply(e) {
		if (Number.isNaN(e)) return NaN;
		let t = this.domain0, n = this.domain1, r = this.range0, i = this.range1;
		n < t && ([t, n] = [n, t], [r, i] = [i, r]);
		let a = n - t, o = a !== 0 && !Number.isNaN(a) ? (e - t) / a : Number.isNaN(a) ? NaN : .5;
		return r * (1 - o) + i * o;
	}
	ticks(e = 10) {
		return ya(this.domain0, this.domain1, e);
	}
	tickFormat(e) {
		return e == null ? wa : (t) => xa(e, t);
	}
};
function Ea() {
	return new Ta();
}
//#endregion
//#region src/dhole/kinds/gantt.ts
var Da = class {
	constructor(e, t, n = -1) {
		r(this, "name", void 0), r(this, "where", void 0), r(this, "section", void 0), r(this, "start", null), r(this, "after", []), r(this, "length", null), r(this, "end", null), r(this, "milestone", !1), r(this, "state", "planned"), r(this, "hue", null), r(this, "from", 0), r(this, "to", 0), r(this, "resolved", !1), r(this, "resolving", !1), this.name = e, this.where = t, this.section = n;
	}
}, Oa = Ji(1, 0, 1);
function ka(e) {
	let t = new Date(e), n = (e, t) => String(e).padStart(t, "0");
	return `${n(t.getUTCFullYear(), 4)}-${n(t.getUTCMonth() + 1, 2)}-${n(t.getUTCDate(), 2)}`;
}
function Aa(e, t) {
	return e.toUpperCase() === t.toUpperCase();
}
var ja = class extends Ze {
	constructor(...e) {
		super(...e), r(this, "tasks", []), r(this, "sections", []), r(this, "projectStart", null), r(this, "skipWeekends", !1), r(this, "holidays", /* @__PURE__ */ new Set()), r(this, "today", null), r(this, "dateFormat", null);
	}
	get isEmpty() {
		return this.tasks.length === 0;
	}
	build(e, t) {
		let n = Pa.build(this, this.theme, t.measurer), r = this.tasks.length === 0 ? Oa : Math.min(...this.tasks.map((e) => e.from)), i = this.tasks.length === 0 ? Oa : Math.max(...this.tasks.map((e) => e.to)), a = this.tasks.length, o = new jn(n, "Gantt chart", t.measurer);
		return o.label = this.title, {
			chart: Lt(o),
			naturalWidth: n.width,
			naturalHeight: n.height,
			summary: `A Gantt chart of ${a} task${a === 1 ? "" : "s"} from ${ka(r)} to ${ka(i)}.`
		};
	}
	add(e, t) {
		if (!this.skipWeekends && this.holidays.size === 0) return e + t;
		let n = e, r = Math.floor(t / A), i = t - r * A;
		for (let e = 0; e < r; e++) for (n += A; this.skipped(n - A);) n += A;
		return n + i;
	}
	skipped(e) {
		let t = ta(e);
		return this.skipWeekends && (t === 6 || t === 0) || this.holidays.has(na(e));
	}
}, Ma = class extends $e {
	constructor(e) {
		super(e), r(this, "own", void 0), r(this, "section", -1), this.own = new ja(e.kind, e.kindLine);
	}
	get spec() {
		return this.own;
	}
	get settings() {
		return [
			M([
				"start",
				"starts",
				"begin",
				"from"
			], (e) => {
				let t = this.date(e);
				t !== null && (this.own.projectStart = t);
			}),
			M([
				"today",
				"now",
				"status date"
			], (e) => {
				let t = this.date(e);
				t !== null && (this.own.today = t);
			}),
			M([
				"skip",
				"excludes",
				"exclude",
				"holidays"
			], (e) => {
				for (let t of ie(e)) {
					let e = k(t.text);
					if (e === "weekends" || e === "weekend" || e === "saturdays" || e === "sundays") this.own.skipWeekends = !0;
					else {
						let e = this.date(t);
						e !== null && this.own.holidays.add(na(e));
					}
				}
			}),
			M([
				"dates",
				"date format",
				"axis format",
				"format"
			], (e) => this.own.dateFormat = e.text.trim())
		];
	}
	date(e) {
		let t = we(e.text);
		return Number.isNaN(t) ? (this.problems.error(e, "BadDate", e.text), null) : t;
	}
	content(e) {
		let t = e.content;
		if (bi(t)) {
			let n = t.from(7).trim();
			n.length > 0 && n.at(0) === ":" && (n = n.from(1).trim()), this.own.sections.push(D(n, this.problems)), this.section = this.own.sections.length - 1;
			for (let t of e.children) this.content(t);
			return;
		}
		let { head: n, tail: r } = E(t), i = O(n, this.problems);
		if (i.name.length === 0) {
			this.problems.error(t, "EmptyName");
			return;
		}
		this.own.tasks.some((e) => Aa(e.name, i.name)) && this.problems.warning(i.nameSpan, "TaskRepeated", i.name);
		let a = new Da(i.name, i.nameSpan, this.section), o = [...i.attributes];
		if (r !== null) {
			let { remainder: e, attributes: t } = se(r, this.problems);
			o.push(...t);
			for (let t of ie(e)) this.part(a, t);
		}
		for (let e of o) switch (k(e.text)) {
			case "done":
			case "complete":
			case "completed":
			case "finished":
				a.state = "done";
				break;
			case "active":
			case "current":
			case "now":
			case "inprogress":
			case "doing":
				a.state = "active";
				break;
			case "critical":
			case "crit":
			case "urgent":
				a.state = "critical";
				break;
			case "milestone":
				a.milestone = !0;
				break;
			default: {
				let t = W.hue(e.text);
				t === null ? this.unknownAttribute(e, new l("a task", "任务"), [
					"done",
					"active",
					"critical",
					"milestone",
					"blue",
					"green",
					"red"
				]) : a.hue = H.hue(t);
				break;
			}
		}
		this.own.tasks.push(a);
	}
	part(e, t) {
		let n = t.text.trim(), r = k(n);
		if (n.length === 0) return;
		if (r === "milestone") {
			e.milestone = !0;
			return;
		}
		let i = n.toLowerCase();
		if (i.startsWith("after ")) {
			let n = t.trim().from(6);
			for (let t of Na(n)) t.isEmpty || e.after.push({
				name: D(t, this.problems),
				where: t
			});
			return;
		}
		for (let n of [
			"until ",
			"to ",
			"ends ",
			"end "
		]) if (i.startsWith(n)) {
			let r = this.date(t.trim().from(n.length).trim());
			r !== null && (e.end = r);
			return;
		}
		if (i.startsWith("from ") || i.startsWith("on ")) {
			let r = t.trim().from(n.indexOf(" ") + 1).trim(), i = this.date(r);
			i !== null && (e.start = i);
			return;
		}
		let a = Ee(n);
		if (!Number.isNaN(a)) {
			e.length = a;
			return;
		}
		let o = we(n);
		Number.isNaN(o) ? this.problems.error(t, "BadDuration", n) : e.start === null ? e.start = o : e.end = o;
	}
	finish() {
		if (this.own.tasks.length === 0) {
			this.problems.error(this.context.kindLine.content, "NoData");
			return;
		}
		let e = null;
		for (let t of this.own.tasks) this.resolve(t, e), e = t;
	}
	resolve(e, t) {
		let n = this.own;
		if (e.resolved) return;
		if (e.resolving) {
			this.problems.error(e.where, "StartsAfterItself", e.name), e.from = e.to = n.projectStart ?? Ji(2026, 0, 1), e.resolved = !0;
			return;
		}
		e.resolving = !0;
		let r = e.start;
		for (let { name: t, where: i } of e.after) {
			let e = n.tasks.find((e) => Aa(e.name, t));
			e === void 0 ? this.problems.error(i, "UnknownTask", t) : (this.resolve(e, null), (r === null || e.to > r) && (r = e.to));
		}
		if (r === null && e.after.length === 0 && (r = t === null ? n.projectStart : t.to), r === null) {
			this.problems.error(e.where, "NoStartDate", e.name);
			let t = n.tasks.filter((e) => e.start !== null).map((e) => e.start);
			r = t.length === 0 ? Ji(2026, 0, 5) : Math.min(...t);
		}
		let i = r;
		for (; (n.skipWeekends || n.holidays.size > 0) && n.skipped(i) && ra(i) === 0;) i += A;
		let a;
		if (e.milestone) a = i;
		else if (e.end !== null) {
			let t = e.end;
			a = ra(t) === 0 ? t + A : t, a < i && (this.problems.error(e.where, "EndsBeforeStart", e.name), a = i + A);
		} else a = n.add(i, e.length ?? 864e5);
		e.from = i, e.to = a, e.resolving = !1, e.resolved = !0;
	}
};
function* Na(e) {
	for (let t of ie(e)) {
		let e = t.text.toLowerCase(), n = 0, r;
		for (; (r = e.indexOf(" and ", n)) >= 0;) yield t.slice(n, r - n).trim(), n = r + 5;
		yield t.from(n).trim();
	}
}
var Pa = {
	Row: 30,
	Bar: 18,
	build(e, t, n) {
		let { Row: r, Bar: i } = Pa, a = new kn(t.fontFamilies, n), o = dr(t), s = new On(t.fontFamilies);
		if (e.tasks.length === 0) return s.add(a.mark(" ", 0, 0, o.small, P.Normal, H.of("muted"))), s.frame(12), s;
		let c = Math.min(...e.tasks.map((e) => e.from)), l = Math.max(...e.tasks.map((e) => e.to));
		if (e.today !== null) {
			let t = e.today;
			t < c && (c = t), t > l && (l = t);
		}
		l <= c && (l = c + A);
		let u = (l - c) / A, d = Math.min(Math.max(u * 26, 520), 1100), f = Math.max(Math.max(...e.tasks.map((e) => a.measure(e.name, o.small, P.Normal).width)), e.sections.length === 0 ? 0 : Math.max(...e.sections.map((e) => a.measure(e, o.small, P.SemiBold).width))) + 24 + 10, p = Ea().domain(c, l).range(f, f + d), m = a.measure("Ag", o.small, P.Normal).height + 12, h = [], g = m + 6, _ = -2;
		for (let t of e.tasks) t.section !== _ && t.section >= 0 && (h.push({
			task: null,
			section: t.section,
			y: g
		}), g += r * .9), _ = t.section, h.push({
			task: t,
			section: t.section,
			y: g
		}), g += r;
		let v = g + 4;
		if ((e.skipWeekends || e.holidays.size > 0) && u <= 120) {
			for (let t = na(c); t < l; t += A) if (e.skipped(t)) {
				let e = p.apply(t), n = p.apply(t + A), r = new B();
				r.addRect(new z(Math.max(f, e), m, Math.min(f + d, n), v)), s.add(U(r, H.of("ink").washed(.04), null, 0));
			}
		}
		for (let t = 0; t < e.sections.length; t++) {
			let e = h.filter((e) => e.section === t).map((e) => e.y);
			if (e.length === 0) continue;
			let n = new B();
			n.addRect(new z(0, Math.min(...e) - 2, f + d, Math.max(...e) + r - 4)), s.add(U(n, H.palette(t).washed(.06), null, 0));
		}
		let y = p.ticks(Math.max(2, d / 90)), b = e.dateFormat !== null && e.dateFormat.length > 0 ? p.tickFormat(e.dateFormat) : p.tickFormat(), x = new B();
		for (let e of y) {
			let t = p.apply(e);
			x.moveTo(t, m).lineTo(t, v), s.add(a.centred(b(e), t, m / 2 - 2, o.small * .92, P.Normal, H.of("secondary")));
		}
		s.add(U(x, null, H.of("grid"), 1));
		let S = new B();
		S.moveTo(f, m).lineTo(f + d, m), s.add(U(S, null, H.of("axis"), 1));
		let C = /* @__PURE__ */ new Map();
		for (let e of h) e.task !== null && C.set(e.task, e.y + r / 2 - 2);
		for (let t of e.tasks) for (let { name: n } of t.after) {
			let r = e.tasks.find((e) => Aa(e.name, n));
			if (r === void 0 || !C.has(r) || !C.has(t)) continue;
			let i = p.apply(r.to), a = C.get(r), o = p.apply(t.from), c = C.get(t), l = new B(), u = Math.max(i + 6, o - 8);
			l.moveTo(i, a).lineTo(u, a).lineTo(u, c).lineTo(o - 6, c), s.add(U(l, null, H.of("muted"), 1));
			let d = zn("arrow", F(o, c), F(1, 0), 7);
			d !== null && s.add(U(d.path, H.of("muted"), null, 0));
		}
		for (let { task: t, section: n, y: c } of h) {
			if (t === null) {
				s.add(a.mark(e.sections[n], 6, c + 2, o.small, P.SemiBold, H.palette(n).washed(.95)));
				continue;
			}
			s.add(a.mark(t.name, 14, c + (r - 4) / 2 - a.measure(t.name, o.small, P.Normal).height / 2, o.small, P.Normal, H.of("ink")));
			let l = t.hue ?? H.palette(Math.max(0, t.section)), u = p.apply(t.from), d = p.apply(t.to), f = c + r / 2 - 2;
			if (t.milestone) {
				let e = z.fromXYWH(u - 8, f - 8, 16, 16);
				s.add(U(Nn("diamond", e), t.state === "done" ? H.of("muted") : l, t.state === "critical" ? H.hue("red") : H.of("background"), t.state === "critical" ? 2 : 1.5));
				continue;
			}
			let m = new z(u, f - i / 2, Math.max(u + 3, d), f + i / 2), h = new B();
			h.addRoundRect(m, 4, 4);
			let g, _, v;
			switch (t.state) {
				case "done":
					[g, _, v] = [
						H.of("ink").washed(.12),
						H.of("muted"),
						1
					];
					break;
				case "active":
					[g, _, v] = [
						l.washed(.75),
						l,
						1.4
					];
					break;
				case "critical":
					[g, _, v] = [
						l.washed(.35),
						H.hue("red"),
						2.2
					];
					break;
				default: [g, _, v] = [
					l.washed(.35),
					l.washed(.9),
					1.2
				];
			}
			s.add(U(h, g, _, v));
		}
		if (e.today !== null) {
			let t = p.apply(e.today), n = new B();
			n.moveTo(t, m - 2).lineTo(t, v), s.add(U(n, null, H.hue("red"), 1.6, "dashed"));
		}
		return s.frame(12), s;
	}
};
N("gantt", (e) => new Ma(e));
//#endregion
//#region src/dhole/plot/axis.ts
var Fa = {
	title: null,
	scale: "auto",
	min: null,
	max: null,
	includeZero: null,
	nice: !1,
	margin: null,
	reverse: !1,
	logBase: 10,
	tickCount: null,
	tickStep: null,
	tickValues: null,
	tickLabels: null,
	format: null,
	formatter: null,
	categories: null,
	grid: null,
	visible: !0,
	side: "auto",
	labelAngle: null
}, Ia = {
	visible: null,
	position: "right",
	title: null,
	items: null
}, La = {
	palette: null,
	min: null,
	max: null,
	middle: null,
	title: null,
	format: null
}, Ra = Math.sqrt(50), za = Math.sqrt(10), Ba = Math.sqrt(2);
function Va(e, t, n) {
	let r = (t - e) / Math.max(0, n), i = Math.floor(Math.log10(r)), a = r / 10 ** i, o = a >= Ra ? 10 : a >= za ? 5 : a >= Ba ? 2 : 1, s, c, l;
	return i < 0 ? (l = 10 ** -i / o, s = Math.round(e * l), c = Math.round(t * l), s / l < e && ++s, c / l > t && --c, l = -l) : (l = 10 ** i * o, s = Math.round(e / l), c = Math.round(t / l), s * l < e && ++s, c * l > t && --c), c < s && .5 <= n && n < 2 ? Va(e, t, n * 2) : [
		s,
		c,
		l
	];
}
function Ha(e, t, n) {
	if (!(n > 0)) return [];
	if (e === t) return [e];
	let r = t < e, [i, a, o] = r ? Va(t, e, n) : Va(e, t, n);
	if (!(a >= i)) return [];
	let s = a - i + 1, c = Array(s);
	if (r) {
		if (o < 0) for (let e = 0; e < s; ++e) c[e] = (a - e) / -o;
		else for (let e = 0; e < s; ++e) c[e] = (a - e) * o;
	} else if (o < 0) for (let e = 0; e < s; ++e) c[e] = (i + e) / -o;
	else for (let e = 0; e < s; ++e) c[e] = (i + e) * o;
	return c;
}
function Ua(e, t, n) {
	return Va(e, t, n)[2];
}
function Wa(e, t, n) {
	let r = t < e, i = r ? Ua(t, e, n) : Ua(e, t, n);
	return (r ? -1 : 1) * (i < 0 ? 1 / -i : i);
}
function Ga(e, t = 10) {
	let n = [...e], r = 0, i = n.length - 1, a = n[r], o = n[i], s, c = 10;
	for (o < a && ([a, o] = [o, a], [r, i] = [i, r]); c-- > 0;) {
		let e = Ua(a, o, t);
		if (e === s) return n[r] = a, n[i] = o, n;
		if (e > 0) a = Math.floor(a / e) * e, o = Math.ceil(o / e) * e;
		else if (e < 0) a = Math.ceil(a * e) / e, o = Math.floor(o * e) / e;
		else break;
		s = e;
	}
	return [...e];
}
function Ka(e, t, n, r) {
	let i = Wa(e, t, n), a = new Ja(r ?? ",f"), o;
	switch (a.type) {
		case "s": {
			let n = Math.max(Math.abs(e), Math.abs(t));
			return a.precision === null && !Number.isNaN(o = po(i, n)) && (a.precision = o), uo(a, n);
		}
		case "":
		case "e":
		case "g":
		case "p":
		case "r":
			a.precision === null && !Number.isNaN(o = mo(i, Math.max(Math.abs(e), Math.abs(t)))) && (a.precision = o - +(a.type === "e"));
			break;
		case "f":
		case "%": a.precision === null && !Number.isNaN(o = fo(i)) && (a.precision = o - (a.type === "%" ? 2 : 0));
	}
	return lo(a);
}
var qa = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i, Ja = class e {
	constructor(e = "") {
		r(this, "fill", " "), r(this, "align", ">"), r(this, "sign", "-"), r(this, "symbol", ""), r(this, "zero", !1), r(this, "width", null), r(this, "comma", !1), r(this, "precision", null), r(this, "trim", !1), r(this, "type", "");
		let t = qa.exec(e);
		if (!t) throw Error(`invalid format: ${e}`);
		t[1] !== void 0 && (this.fill = t[1]), t[2] !== void 0 && (this.align = t[2]), t[3] !== void 0 && (this.sign = t[3]), t[4] !== void 0 && (this.symbol = t[4]), this.zero = t[5] !== void 0, t[6] !== void 0 && (this.width = parseInt(t[6], 10)), this.comma = t[7] !== void 0, t[8] !== void 0 && (this.precision = parseInt(t[8].slice(1), 10)), this.trim = t[9] !== void 0, t[10] !== void 0 && (this.type = t[10]);
	}
	copy() {
		let t = new e();
		return Object.assign(t, this), t;
	}
	toString() {
		return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === null ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === null ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
	}
};
function Ya(e, t) {
	if (!Number.isFinite(e) || e === 0) return null;
	let n = t ? e.toExponential(t - 1) : e.toExponential(), r = n.indexOf("e"), i = n.slice(0, r);
	return i.startsWith("-") && (i = i.slice(1)), [i.length > 1 ? i[0] + i.slice(2) : i, +n.slice(r + 1)];
}
function Xa(e) {
	let t = Ya(Math.abs(e));
	return t ? t[1] : NaN;
}
function Za(e, t) {
	let n = [3], r = e.length, i = [], a = 0, o = n[0], s = 0;
	for (; r > 0 && o > 0 && (s + o + 1 > t && (o = Math.max(1, t - s)), i.push(e.substring(r -= o, r + o)), !((s += o + 1) > t));) o = n[a = (a + 1) % n.length];
	return i.reverse().join(",");
}
function Qa(e) {
	let t = e.length, n = -1, r = -1;
	out: for (let i = 1; i < t; ++i) switch (e[i]) {
		case ".":
			n = r = i;
			break;
		case "0":
			n === 0 && (n = i), r = i;
			break;
		default:
			if (!(+e[i] >= 0 && +e[i] <= 9) || e[i] === " ") break out;
			n > 0 && (n = 0);
	}
	return n > 0 ? e.slice(0, n) + e.slice(r + 1) : e;
}
var $a;
function eo(e, t) {
	let n = Ya(e, t);
	if (!n) return e + "";
	let [r, i] = n, a = i - ($a = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, o = r.length;
	return a === o ? r : a > o ? r + Array(a - o + 1).join("0") : a > 0 ? r.slice(0, a) + "." + r.slice(a) : "0." + Array(1 - a).join("0") + Ya(e, Math.max(0, t + a - 1))[0];
}
function to(e, t) {
	let n = Ya(e, t);
	if (!n) return e + "";
	let [r, i] = n;
	return i < 0 ? "0." + Array(-i).join("0") + r : r.length > i + 1 ? r.slice(0, i + 1) + "." + r.slice(i + 1) : r + Array(i - r.length + 2).join("0");
}
function no(e) {
	return Math.abs(e = Math.round(e)) >= 1e21 ? e.toLocaleString("en").replace(/,/g, "") : e.toString(10);
}
function ro(e, t) {
	let n = e.toFixed(t);
	if (!Number.isFinite(e) || Math.abs(e) >= 1e21) return n;
	let [r, i] = io(Math.abs(e));
	if (i >= 0) return n;
	let a = r * 10n ** BigInt(t), o = BigInt(-i), s = a * 2n;
	if (s % (1n << o) != 0n || (s >> o) % 2n == 0n) return n;
	let c = a >> o;
	c % 2n == 1n && (c += 1n);
	let l = c.toString().padStart(t + 1, "0"), u = t === 0 ? l : `${l.slice(0, l.length - t)}.${l.slice(l.length - t)}`;
	return e < 0 ? "-" + u : u;
}
function io(e) {
	let t = /* @__PURE__ */ new DataView(/* @__PURE__ */ new ArrayBuffer(8));
	t.setFloat64(0, e);
	let n = t.getBigUint64(0), r = Number(n >> 52n & 2047n), i = n & (1n << 52n) - 1n;
	return r === 0 ? [i, -1074] : [i | 1n << 52n, r - 1075];
}
var ao = {
	"%": (e, t) => ro(e * 100, t),
	b: (e) => Math.round(e).toString(2),
	c: (e) => e + "",
	d: no,
	e: (e, t) => e.toExponential(t),
	f: (e, t) => ro(e, t),
	g: (e, t) => e.toPrecision(t),
	o: (e) => Math.round(e).toString(8),
	p: (e, t) => to(e * 100, t),
	r: to,
	s: eo,
	X: (e) => Math.round(e).toString(16).toUpperCase(),
	x: (e) => Math.round(e).toString(16)
}, oo = [
	"y",
	"z",
	"a",
	"f",
	"p",
	"n",
	"µ",
	"m",
	"",
	"k",
	"M",
	"G",
	"T",
	"P",
	"E",
	"Z",
	"Y"
], so = "−";
function co(e, t) {
	let { fill: n, align: r, sign: i, symbol: a, zero: o, width: s, comma: c, precision: l, trim: u, type: d } = e;
	d === "n" ? (c = !0, d = "g") : ao[d] || (l === null && (l = 12), u = !0, d = "g"), (o || n === "0" && r === "=") && (o = !0, n = "0", r = "=");
	let f = a === "$" ? "$" : a === "#" && /[boxX]/.test(d) ? "0" + d.toLowerCase() : "", p = (a === "$" ? "" : /[%p]/.test(d) ? "%" : "") + (t ?? ""), m = ao[d], h = /[defgprs%]/.test(d), g = l === null ? 6 : /[gprs]/.test(d) ? Math.max(1, Math.min(21, l)) : Math.max(0, Math.min(20, l));
	return (e) => {
		let t = f, a = p, l;
		if (d === "c") a = m(e, g) + a, l = "";
		else {
			let n = +e, r = n < 0 || 1 / n < 0;
			if (l = Number.isNaN(n) ? "NaN" : m(Math.abs(n), g), u && (l = Qa(l)), r && +l == 0 && i !== "+" && (r = !1), t = (r ? i === "(" ? i : so : i === "-" || i === "(" ? "" : i) + t, a = (d === "s" && !Number.isNaN(n) && $a !== void 0 ? oo[8 + $a / 3] : "") + a + (r && i === "(" ? ")" : ""), h) for (let e = -1, t = l.length; ++e < t;) {
				let t = l.charCodeAt(e);
				if (48 > t || t > 57) {
					a = (t === 46 ? "." + l.slice(e + 1) : l.slice(e)) + a, l = l.slice(0, e);
					break;
				}
			}
			n = 0;
		}
		c && !o && (l = Za(l, Infinity));
		let _ = t.length + l.length + a.length, v = s !== null && _ < s ? Array(s - _ + 1).join(n) : "";
		switch (c && o && (l = Za(v + l, v.length ? s - a.length : Infinity), v = ""), r) {
			case "<": return t + l + a + v;
			case "=": return t + v + l + a;
			case "^": return _ = v.length >> 1, v.slice(0, _) + t + l + a + v.slice(_);
			default: return v + t + l + a;
		}
	};
}
function lo(e) {
	return co(typeof e == "string" ? new Ja(e) : e);
}
function uo(e, t) {
	let n = (typeof e == "string" ? new Ja(e) : e).copy();
	n.type = "f";
	let r = Math.max(-8, Math.min(8, Math.floor(Xa(t) / 3))) * 3, i = 10 ** -r, a = co(n, oo[8 + r / 3]);
	return (e) => a(i * e);
}
function fo(e) {
	return Math.max(0, -Xa(Math.abs(e)));
}
function po(e, t) {
	return Math.max(0, Math.max(-8, Math.min(8, Math.floor(Xa(t) / 3))) * 3 - Xa(Math.abs(e)));
}
function mo(e, t) {
	return e = Math.abs(e), t = Math.abs(t) - e, Math.max(0, Xa(t) - Xa(e)) + 1;
}
//#endregion
//#region src/dhole/plot/formatting.ts
var ho = /* @__PURE__ */ new Map();
function go(e, t) {
	let n = e.indexOf(".");
	if (n < 0 || e.length - n - 1 <= t) return e;
	let r = (e.slice(0, n) + e.slice(n + 1, n + 1 + t)).split("").map(Number);
	if (+e[n + 1 + t] >= 5) {
		let e = r.length - 1;
		for (; e >= 0 && r[e] === 9;) r[e--] = 0;
		e < 0 ? r.unshift(1) : r[e]++;
	}
	let i = r.length - t;
	return r.slice(0, i).join("") + (t > 0 ? "." + r.slice(i).join("") : "");
}
function _o(e) {
	let t = e.toString(), n = t.indexOf("e");
	if (n < 0) return t;
	let r = +t.slice(n + 1), i = t.slice(0, n).replace(".", ""), a = (t.indexOf(".") < 0 ? n : t.indexOf(".")) + r;
	return a <= 0 ? "0." + "0".repeat(-a) + i : a >= i.length ? i + "0".repeat(a - i.length) : i.slice(0, a) + "." + i.slice(a);
}
function vo(e, t, n) {
	let [r, i = ""] = go(_o(Math.abs(e)), t).split(".");
	i = i.replace(/0+$/, ""), r = r.replace(/^0+(?=\d)/, ""), n && (r = r.replace(/\B(?=(\d{3})+(?!\d))/g, ","));
	let a = i.length > 0 ? `${r}.${i}` : r;
	return e < 0 && a !== "0" ? "-" + a : a;
}
function yo(e) {
	return vo(e, 3, !0);
}
function bo(e) {
	let t = Math.floor(Math.log10(e)), n = go(_o(e / 10 ** t), 3);
	return +n >= 10 && (t++, n = go(_o(e / 10 ** t), 3)), n.includes(".") && (n = n.replace(/0+$/, "").replace(/\.$/, "")), `${n}e${t < 0 ? "-" : "+"}${Math.abs(t)}`;
}
function xo(e) {
	if (Number.isNaN(e)) return "";
	if (!Number.isFinite(e)) return e > 0 ? "∞" : "−∞";
	let t = Math.abs(e), n = t !== 0 && (t >= 0xe8d4a51000 || t < .001) ? bo(t) : yo(t);
	return e < 0 && n !== "0" ? "−" + n : n;
}
function So(e, t) {
	return Co(t)(e);
}
function Co(e) {
	if (!e || !e.trim()) return xo;
	let t = ho.get(e);
	return t || (t = lo(e), ho.set(e, t)), t;
}
function wo(e) {
	if (!e) return !1;
	for (let t = 0; t + 1 < e.length; t++) if (e[t] === "%" && /\p{L}/u.test(e[t + 1])) return !0;
	return !1;
}
//#endregion
//#region src/dhole/plot/series.ts
var Z = class e {
	constructor(e, t, n, i) {
		r(this, "name", void 0), r(this, "kind", void 0), r(this, "numbers", void 0), r(this, "texts", void 0), this.name = e, this.kind = t, this.numbers = n, this.texts = i;
	}
	static ofNumbers(t, n) {
		return new e(n ?? "", "number", [...t], null);
	}
	static ofTexts(t, n) {
		return new e(n ?? "", "text", null, [...t].map((e) => e ?? ""));
	}
	static index(t, n) {
		return new e(n ?? "", "number", Array.from({ length: t }, (e, t) => t), null);
	}
	static of(t) {
		return t instanceof e ? t : t.length > 0 && typeof t[0] == "string" ? e.ofTexts(t) : e.ofNumbers(t);
	}
	get count() {
		return this.numbers?.length ?? this.texts?.length ?? 0;
	}
	get numbersOf() {
		if (!this.numbers) throw this.wrongKind("number");
		return this.numbers;
	}
	get textsOf() {
		if (!this.texts) throw this.wrongKind("text");
		return this.texts;
	}
	position(e) {
		return this.kind === "number" ? this.numbers[e] : NaN;
	}
	text(e) {
		return this.kind === "text" ? this.texts[e] : xo(this.numbers[e]);
	}
	distinctTexts() {
		if (!this.texts) throw this.wrongKind("text");
		return [...new Set(this.texts)];
	}
	wrongKind(e) {
		return /* @__PURE__ */ Error(`The series ${this.name.length === 0 ? "" : `'${this.name}' `}holds ${To(this.kind)}, not ${To(e)}.`);
	}
	toString() {
		return `${this.name.length === 0 ? "Series" : this.name}: ${this.count} ${To(this.kind)}`;
	}
};
function To(e) {
	return e === "number" ? "numbers" : e === "text" ? "text" : "dates and times";
}
//#endregion
//#region src/dhole/plot/color-math.ts
var Eo = (e) => Math.min(255, Math.max(0, bn(e)));
function Do(e, t) {
	return {
		...e,
		a: Eo(e.a * Math.min(Math.max(t, 0), 1))
	};
}
function Oo(e) {
	let t = (e) => {
		let t = e / 255;
		return t <= .03928 ? t / 12.92 : ((t + .055) / 1.055) ** 2.4;
	};
	return .2126 * t(e.r) + .7152 * t(e.g) + .0722 * t(e.b);
}
function ko(e, t) {
	let n = Oo(e), r = Oo(t);
	return (Math.max(n, r) + .05) / (Math.min(n, r) + .05);
}
function Ao(e, t, n) {
	return ko(e, t) >= ko(e, n) ? t : n;
}
//#endregion
//#region src/dhole/plot/scales.ts
function jo(e, t) {
	switch (e) {
		case "log": return [(e) => e > 0 ? Math.log(e) / Math.log(t) : NaN, (e) => t ** +e];
		case "sqrt": return [(e) => e < 0 ? -Math.sqrt(-e) : Math.sqrt(e), (e) => e < 0 ? -e * e : e * e];
		case "symlog": return [(e) => Math.sign(e) * Math.log(1 + Math.abs(e)), (e) => Math.sign(e) * (Math.exp(Math.abs(e)) - 1)];
		default: return [(e) => e, (e) => e];
	}
}
var Mo = class {
	constructor(e, t, n, i, a) {
		if (r(this, "forward", void 0), r(this, "backward", void 0), r(this, "t0", void 0), r(this, "t1", void 0), r(this, "bandOrigin", 0), r(this, "signedStep", 0), r(this, "signedBandwidth", 0), r(this, "type", void 0), r(this, "min", void 0), r(this, "max", void 0), r(this, "categories", void 0), r(this, "banded", void 0), r(this, "logBase", void 0), r(this, "rangeStart", void 0), r(this, "rangeEnd", void 0), r(this, "ticks", void 0), this.type = e.type, this.min = e.min, this.max = e.max, this.categories = e.categories, this.banded = e.banded, this.logBase = e.logBase, e.spec.reverse && ([t, n] = [n, t]), this.rangeStart = t, this.rangeEnd = n, [this.forward, this.backward] = jo(this.type, this.logBase), this.t0 = this.forward(this.min), this.t1 = this.forward(this.max), this.type === "category") {
			let r = Math.max(1, this.categories.length);
			if (this.banded) {
				let i = Math.min(Math.max(e.bandPadding ?? a, 0), 1), o = i / 2;
				this.signedStep = (n - t) / Math.max(1, r - i + o * 2), this.signedBandwidth = this.signedStep * (1 - i), this.bandOrigin = t + (n - t - this.signedStep * (r - i)) * .5;
			} else this.signedStep = (n - t) / r, this.signedBandwidth = 0, this.bandOrigin = t + this.signedStep / 2;
		}
		this.ticks = i.map((e) => ({
			...e,
			position: this.map(e.value)
		}));
	}
	get bandwidth() {
		return Math.abs(this.signedBandwidth);
	}
	get step() {
		return Math.abs(this.signedStep);
	}
	get isCategorical() {
		return this.type === "category";
	}
	map(e) {
		if (Number.isNaN(e)) return NaN;
		if (this.type === "category") return this.bandOrigin + this.signedStep * e + this.signedBandwidth / 2;
		let t = this.forward(e);
		return Number.isFinite(t) ? this.t1 === this.t0 ? (this.rangeStart + this.rangeEnd) / 2 : this.rangeStart + (t - this.t0) / (this.t1 - this.t0) * (this.rangeEnd - this.rangeStart) : NaN;
	}
	invert(e) {
		if (this.type === "category") return this.signedStep === 0 ? 0 : (e - this.bandOrigin - this.signedBandwidth / 2) / this.signedStep;
		if (this.rangeEnd === this.rangeStart) return this.min;
		let t = this.t0 + (e - this.rangeStart) / (this.rangeEnd - this.rangeStart) * (this.t1 - this.t0);
		return this.backward(t);
	}
	bandStart(e) {
		return Math.min(this.bandOrigin + this.signedStep * e, this.bandOrigin + this.signedStep * e + this.signedBandwidth);
	}
	indexOf(e) {
		return this.categories.indexOf(e);
	}
	mapCategory(e) {
		let t = this.indexOf(e);
		return t < 0 ? NaN : this.map(t);
	}
	toString() {
		return this.type === "category" ? `Category scale: ${this.categories.length} categories over ${this.rangeStart.toFixed(1)}..${this.rangeEnd.toFixed(1)} px` : `${this.type} scale: ${this.min}..${this.max} over ${this.rangeStart.toFixed(1)}..${this.rangeEnd.toFixed(1)} px`;
	}
}, No = class {
	constructor(e, t) {
		r(this, "seen", /* @__PURE__ */ new Set()), r(this, "spec", void 0), r(this, "name", void 0), r(this, "kind", null), r(this, "low", Infinity), r(this, "high", -Infinity), r(this, "lowPositive", Infinity), r(this, "nonPositiveCount", 0), r(this, "categories", []), r(this, "banded", !1), r(this, "wantsZero", !1), r(this, "used", !1), r(this, "topDown", !1), r(this, "preferredFormat", null), r(this, "bandPadding", null), r(this, "tight", !1), this.spec = e, this.name = t;
	}
	add(e) {
		if (this.claim(e.kind, e.name), e.kind === "text") for (let t of e.textsOf) this.addCategory(t);
		else for (let t = 0; t < e.count; t++) this.addValue(e.position(t));
	}
	addValue(e) {
		this.used = !0, Number.isFinite(e) && (e < this.low && (this.low = e), e > this.high && (this.high = e), e > 0 && e < this.lowPositive && (this.lowPositive = e), e <= 0 && this.nonPositiveCount++);
	}
	addCategory(e) {
		this.claim("text", null), this.seen.has(e) || (this.seen.add(e), this.categories.push(e));
	}
	claim(e, t) {
		if (this.used = !0, this.kind === null) this.kind = e;
		else if (this.kind !== e) throw Error(`The ${this.name} axis was given ${To(this.kind)} and then ${To(e)}${t ? ` ('${t}')` : ""}; one axis shows one kind of value. Put the second on a chart of its own, or convert it.`);
	}
}, Po = .04, Fo = class e {
	constructor() {
		r(this, "type", "linear"), r(this, "min", 0), r(this, "max", 1), r(this, "categories", []), r(this, "banded", !1), r(this, "logBase", 10), r(this, "spec", Fa), r(this, "empty", !1), r(this, "wantsZero", !1), r(this, "bandPadding", null);
	}
	static make(t) {
		return Object.assign(new e(), t);
	}
	static resolve(t, n) {
		let r = t.spec;
		r.format === null && r.formatter === null && t.preferredFormat !== null && (r = {
			...r,
			format: t.preferredFormat
		}), t.topDown && (r = {
			...r,
			reverse: !r.reverse
		});
		let i = r.scale;
		if (i === "auto" && (i = t.kind === "text" ? "category" : t.kind === "time" ? "time" : r.tickLabels !== null && r.tickValues === null ? "category" : "linear"), i === "category") {
			let n = [];
			if (r.categories !== null) for (let e of r.categories) n.includes(e) || n.push(e);
			for (let e of t.categories) n.includes(e) || n.push(e);
			if (t.kind === "number" && n.length === 0 && r.tickLabels !== null && n.push(...r.tickLabels), (t.kind === "number" || t.kind === "time") && t.categories.length === 0 && n.length === 0) throw Error(`The ${t.name} axis was set to show categories but was given ${To(t.kind)}; give it text, or another scale.`);
			return e.make({
				type: i,
				min: 0,
				max: Math.max(0, n.length - 1),
				categories: n,
				banded: t.banded,
				spec: r,
				empty: n.length === 0,
				bandPadding: t.bandPadding
			});
		}
		if (t.kind === "text") throw Error(`The ${t.name} axis was set to ${i} but was given text; text can only be shown as categories.`);
		i === "time" && t.kind === "number" && (i = "linear");
		let a = !Number.isFinite(t.low), o = a ? 0 : t.low, s = a ? 1 : t.high, c = r.min, l = r.max;
		if (i === "log") {
			t.nonPositiveCount > 0 && n.push(`${t.nonPositiveCount} value${t.nonPositiveCount === 1 ? " was" : "s were"} at or below zero and could not be placed on the logarithmic ${t.name} axis.`);
			let e = Number.isFinite(t.lowPositive);
			o = e ? t.lowPositive : 1, s = e ? Math.max(t.high, o) : 10, c !== null && c <= 0 && (n.push(`The logarithmic ${t.name} axis cannot start at ${c}; it starts at the smallest positive value instead.`), c = null);
		}
		let u = (i === "linear" || i === "sqrt" || i === "symlog") && (r.includeZero ?? t.wantsZero);
		if (u && (o = Math.min(o, 0), s = Math.max(s, 0)), c !== null && (o = c), l !== null && (s = l), o > s && ([o, s] = [s, o]), o === s) {
			if (i === "log") o /= 10, s *= 10;
			else if (i === "time") o -= 432e5, s += 432e5;
			else if (o === 0) s = 1, u || (o = -1);
			else {
				let e = Math.abs(o) * .1;
				c === null && !(u && o === 0) && (o -= e), l === null && (s += e);
			}
		}
		let d = r.nice || r.margin === null && c === null && l === null && !t.tight && (t.wantsZero || i === "log"), f = r.margin ?? (d || t.tight ? 0 : Po);
		if (f > 0) {
			let [e, t] = jo(i, r.logBase), n = e(o), a = e(s), d = a - n, p = c !== null || u && o === 0, m = l !== null || u && s === 0;
			p || (o = t(n - d * f)), m || (s = t(a + d * f));
		}
		if (d) {
			let [e, t] = Io(i, o, s);
			c === null && (o = e), l === null && (s = t);
		}
		return e.make({
			type: i,
			min: o,
			max: s,
			logBase: r.logBase,
			spec: r,
			empty: a,
			wantsZero: t.wantsZero
		});
	}
	static continuous(t, n, r, i) {
		return e.make({
			type: t,
			min: n,
			max: r,
			spec: i,
			logBase: i.logBase
		});
	}
	ticks(e) {
		e = Math.max(1, e);
		let t = this.spec;
		if (this.type === "category") return this.categories.map((e, n) => ({
			value: n,
			label: t.tickLabels !== null && t.tickValues === null && n < t.tickLabels.length ? t.tickLabels[n] : e,
			position: 0,
			isMajor: !0
		}));
		if (this.empty && t.tickValues === null) return [];
		if (t.tickValues !== null) {
			let e = this.labelFormatter(), n = [];
			for (let r = 0; r < t.tickValues.length; r++) {
				let i = t.tickValues[r];
				if (i < Math.min(this.min, this.max) - 1e-9 * Math.abs(this.max - this.min) || i > Math.max(this.min, this.max) + 1e-9 * Math.abs(this.max - this.min)) continue;
				let a = t.tickLabels !== null && r < t.tickLabels.length ? t.tickLabels[r] : e(i);
				n.push({
					value: i,
					label: a,
					position: 0,
					isMajor: !0
				});
			}
			return n;
		}
		if (t.tickStep !== null && t.tickStep > 0 && this.type !== "log") {
			let e = t.tickStep;
			if (this.type === "time") throw Error("Time axes are not drawn on this page.");
			let n = t.formatter ?? (t.format !== null && !wo(t.format) ? Co(t.format) : Lo(e)), r = [], i = Math.ceil(this.min / e - 1e-9) * e;
			for (let t = 0; t < 1e3; t++) {
				let a = i + t * e;
				if (a > this.max + e * 1e-9) break;
				Math.abs(a) < e * 1e-9 && (a = 0), r.push({
					value: a,
					label: n(a),
					position: 0,
					isMajor: !0
				});
			}
			return r;
		}
		if (this.type !== "linear") throw Error(`A ${this.type} axis is not drawn on this page.`);
		let n = Ha(this.min, this.max, e), r = t.formatter ?? Ka(this.min, this.max, e, t.format);
		return n.map((e) => ({
			value: e,
			label: r(e),
			position: 0,
			isMajor: !0
		}));
	}
	labelFormatter() {
		return this.spec.formatter === null ? this.spec.format === null ? xo : Co(this.spec.format) : this.spec.formatter;
	}
};
function Io(e, t, n) {
	if (e !== "linear") throw Error(`A ${e} axis is not drawn on this page.`);
	let r = Ga([t, n]);
	return [r[0], r[r.length - 1]];
}
function Lo(e) {
	let t = fo(e);
	return Co(`,.${Math.trunc(Math.min(t, 12))}f`);
}
//#endregion
//#region src/dhole/plot/contracts.ts
var Ro = class {
	constructor(e) {
		r(this, "layer", void 0), this.layer = e;
	}
	get frame() {
		return "cartesian";
	}
	get clipToPlot() {
		return !0;
	}
	train(e) {}
	addLegend(e) {}
	overhang(e) {
		return 0;
	}
}, zo = class {
	constructor(e, t, n, i) {
		r(this, "x", void 0), r(this, "y", void 0), r(this, "y2", void 0), r(this, "color", void 0), this.x = e, this.y = t, this.y2 = n, this.color = i;
	}
	yOf(e) {
		return e.secondaryAxis ? this.y2 : this.y;
	}
	valueAxisOf(e, t) {
		return t ? this.x : this.yOf(e);
	}
	categoryAxisOf(e, t) {
		return t ? this.yOf(e) : this.x;
	}
}, Bo = class {
	constructor() {
		r(this, "seen", /* @__PURE__ */ new Set()), r(this, "kind", null), r(this, "categories", []), r(this, "low", Infinity), r(this, "high", -Infinity), r(this, "title", null);
	}
	add(e) {
		if (e.kind === "text") {
			this.claim("text");
			for (let t of e.textsOf) this.seen.has(t) || (this.seen.add(t), this.categories.push(t));
		} else {
			this.claim("number");
			for (let t = 0; t < e.count; t++) this.addValue(e.position(t));
		}
		this.title === null && e.name.length > 0 && (this.title = e.name);
	}
	addCategory(e) {
		this.claim("text"), this.seen.has(e) || (this.seen.add(e), this.categories.push(e));
	}
	addValue(e) {
		this.claim("number"), Number.isFinite(e) && (e < this.low && (this.low = e), e > this.high && (this.high = e));
	}
	claim(e) {
		if (this.kind ?? (this.kind = e), this.kind !== e && (this.kind !== "number" || e !== "time") && (this.kind !== "time" || e !== "number")) throw Error(`A chart's colours were bound to ${To(this.kind)} and then to ${To(e)}; colour one chart by one kind of value.`);
	}
}, Vo = class {
	constructor(e, t, n) {
		r(this, "categorical", /* @__PURE__ */ new Map()), r(this, "spec", void 0), r(this, "categories", void 0), r(this, "title", void 0), r(this, "isContinuous", void 0), r(this, "hasCategories", void 0), r(this, "low", void 0), r(this, "high", void 0), this.spec = t, this.categories = e.categories, this.title = t.title ?? e.title;
		let i = t.palette ?? n.palette;
		e.categories.forEach((e, t) => this.categorical.set(e, i.at(t))), this.isContinuous = e.kind === "number";
		let a = t.min ?? (Number.isFinite(e.low) ? e.low : 0), o = t.max ?? (Number.isFinite(e.high) ? e.high : 1);
		a === o && (a -= .5, o += .5), this.low = a, this.high = o, this.hasCategories = e.kind === "text" && e.categories.length > 0;
	}
	forCategory(e) {
		return this.categorical.get(e) ?? {
			r: 128,
			g: 128,
			b: 128,
			a: 255
		};
	}
	forValue(e) {
		throw Error("Colouring by a number is not drawn on this page.");
	}
}, Ho = class {
	constructor(e) {
		r(this, "labels", /* @__PURE__ */ new Set()), r(this, "items", []), r(this, "colorBar", null), r(this, "colors", void 0), this.colors = e;
	}
	add(e, t, n) {
		e && !this.labels.has(e) && (this.labels.add(e), this.items.push({
			label: e,
			color: t,
			swatch: n
		}));
	}
	addSeriesCategories(e, t) {
		if (e.kind !== "text") this.colorBar = this.colors;
		else for (let n of e.distinctTexts()) this.add(n, this.colors.forCategory(n), t);
	}
	addCategories(e, t) {
		for (let n of e) this.add(n, this.colors.forCategory(n), t);
	}
}, Uo = class {
	constructor(e, t, n, i, a, o) {
		r(this, "centerX", void 0), r(this, "centerY", void 0), r(this, "radius", void 0), r(this, "spokes", void 0), r(this, "radial", void 0), r(this, "rings", void 0), this.centerX = e, this.centerY = t, this.radius = n, this.spokes = i, this.radial = a, this.rings = o;
	}
	angle(e) {
		return this.spokes.length === 0 ? 0 : e * 2 * Math.PI / this.spokes.length;
	}
	radiusOf(e) {
		return this.radial.max === this.radial.min ? 0 : Math.min(Math.max((e - this.radial.min) / (this.radial.max - this.radial.min), 0), 1.2) * this.radius;
	}
	point(e, t) {
		let n = this.angle(e), r = this.radiusOf(t);
		return {
			x: this.centerX + r * Math.sin(n),
			y: this.centerY - r * Math.cos(n)
		};
	}
}, Wo = class {
	constructor() {
		r(this, "seen", /* @__PURE__ */ new Set()), r(this, "spokes", []), r(this, "low", Infinity), r(this, "high", -Infinity);
	}
	addSpoke(e) {
		this.seen.has(e) || (this.seen.add(e), this.spokes.push(e));
	}
	addValue(e) {
		Number.isFinite(e) && (this.low = Math.min(this.low, e), this.high = Math.max(this.high, e));
	}
};
function Go(e) {
	return e;
}
function Ko(e, t) {
	let n = Go(e), r = t.secondaryAxis ? n.y2 : n.y;
	if (!r) throw Error("This layer needs axes, and its chart has none.");
	return r;
}
function qo(e) {
	let t = Go(e).x;
	if (!t) throw Error("This layer needs axes, and its chart has none.");
	return t;
}
function Jo(e, t, n = 1) {
	let r = e.deviceScale;
	if (r <= 0 || Number.isNaN(t)) return t;
	let i = t * r;
	return (Math.max(1, Math.round(n * r)) % 2 == 1 ? Math.floor(i) + .5 : Math.round(i)) / r;
}
var Q = {
	fill(e) {
		return {
			colour: e,
			style: "fill"
		};
	},
	stroke(e, t, n, r = !0) {
		return {
			colour: e,
			style: "stroke",
			strokeWidth: Math.max(.01, t),
			cap: r ? "round" : "butt",
			join: r ? "round" : "miter",
			dash: n && n.length > 1 ? n : void 0
		};
	},
	hairline(e, t) {
		return Q.stroke(e, t, null, !1);
	}
}, Yo = class {
	constructor() {
		r(this, "commands", []);
	}
	moveTo(e, t) {
		this.commands.push({
			verb: "M",
			x: e,
			y: t
		});
	}
	lineTo(e, t) {
		this.commands.push({
			verb: "L",
			x: e,
			y: t
		});
	}
	bezierCurveTo(e, t, n, r, i, a) {
		this.commands.push({
			verb: "C",
			x1: e,
			y1: t,
			x2: n,
			y2: r,
			x: i,
			y: a
		});
	}
	closePath() {
		this.commands.push({ verb: "Z" });
	}
	toPath(e = new B()) {
		for (let t of this.commands) t.verb === "M" ? e.moveTo(t.x, t.y) : t.verb === "L" ? e.lineTo(t.x, t.y) : t.verb === "C" ? e.cubicTo({
			x: t.x1,
			y: t.y1
		}, {
			x: t.x2,
			y: t.y2
		}, {
			x: t.x,
			y: t.y
		}) : e.close();
		return e;
	}
}, Xo = (e) => {
	let t, n = 0;
	return {
		lineStart() {
			n = 0;
		},
		lineEnd() {
			(t || t !== 0 && n === 1) && e.closePath(), t = 1 - t;
		},
		point(r, i) {
			switch (n) {
				case 0:
					n = 1, t ? e.lineTo(r, i) : e.moveTo(r, i);
					break;
				default: n === 1 && (n = 2), e.lineTo(r, i);
			}
		}
	};
};
function Zo(e) {
	return (t) => {
		let n, r = 0, i = e, a = NaN, o = NaN;
		return {
			lineStart() {
				a = o = NaN, r = 0;
			},
			lineEnd() {
				0 < i && i < 1 && r === 2 && t.lineTo(a, o), (n || n !== 0 && r === 1) && t.closePath(), n >= 0 && (i = 1 - i, n = 1 - n);
			},
			point(e, s) {
				switch (r) {
					case 0:
						r = 1, n ? t.lineTo(e, s) : t.moveTo(e, s);
						break;
					default: if (r === 1 && (r = 2), i <= 0) t.lineTo(a, s), t.lineTo(e, s);
					else {
						let n = a * (1 - i) + e * i;
						t.lineTo(n, o), t.lineTo(n, s);
					}
				}
				a = e, o = s;
			}
		};
	};
}
var Qo = Zo(.5), $o = Zo(1), es = Zo(0);
function ts(e) {
	return e < 0 ? -1 : 1;
}
var ns = (e) => {
	let t, n = 0, r = NaN, i = NaN, a = NaN, o = NaN, s = NaN, c = (e, t) => {
		let n = a - r, s = e - a, c = (o - i) / (n || 0), l = (t - o) / (s || 0), u = (c * s + l * n) / (n + s);
		return (ts(c) + ts(l)) * Math.min(Math.abs(c), Math.abs(l), .5 * Math.abs(u)) || 0;
	}, l = (e) => {
		let t = a - r;
		return t ? (3 * (o - i) / t - e) / 2 : e;
	}, u = (t, n) => {
		let s = (a - r) / 3;
		e.bezierCurveTo(r + s, i + s * t, a - s, o - s * n, a, o);
	};
	return {
		lineStart() {
			r = a = i = o = s = NaN, n = 0;
		},
		lineEnd() {
			switch (n) {
				case 2:
					e.lineTo(a, o);
					break;
				case 3: u(s, l(s));
			}
			(t || t !== 0 && n === 1) && e.closePath(), t = 1 - t;
		},
		point(d, f) {
			let p = NaN;
			if (d !== a || f !== o) {
				switch (n) {
					case 0:
						n = 1, t ? e.lineTo(d, f) : e.moveTo(d, f);
						break;
					case 1:
						n = 2;
						break;
					case 2:
						n = 3, p = c(d, f), u(l(p), p);
						break;
					default: p = c(d, f), u(s, p);
				}
				r = a, a = d, i = o, o = f, s = p;
			}
		}
	};
};
function rs(e, t, n, r, i, a) {
	let o = i(a), s = e.length, c = !1;
	for (let i = 0; i <= s; ++i) !(i < s && r(e[i])) === c && ((c = !c) ? o.lineStart() : o.lineEnd()), c && o.point(+t(e[i]), +n(e[i]));
}
var is = 2 * Math.PI, as = 1e-12;
function os(e, t, n) {
	let r = e.length, i = 0, a = Array(r), o = Array(r), s = Array(r), c = Math.min(is, Math.max(-is, is - 0));
	for (let n = 0; n < r; ++n) {
		a[n] = n;
		let r = o[n] = +t(e[n]);
		r > 0 && (i += r);
	}
	n || a.sort((e, t) => o[t] - o[e]);
	let l = i ? c / i : 0, u = 0;
	for (let t = 0; t < r; ++t) {
		let n = a[t], r = o[n], i = u + (r > 0 ? r * l : 0);
		s[n] = {
			data: e[n],
			index: t,
			value: r,
			startAngle: u,
			endAngle: i,
			padAngle: 0
		}, u = i;
	}
	return s;
}
function ss(e, t, n, r, i, a) {
	let o = n, s = r, c = i - Math.PI / 2, l = a - Math.PI / 2, u = Math.abs(l - c), d = l > c, f = new B(), p = (e) => e * 180 / Math.PI;
	s < o && ([o, s] = [s, o]);
	let m = (n, r, i, a) => {
		let o = i - r;
		a && o > 0 && (o -= is * Math.ceil(o / is)), !a && o < 0 && (o += is * Math.ceil(-o / is)), f.arcTo(cs(e, t, n), p(r), p(Math.abs(o) > is ? Math.sign(o) * is : o), !1);
	};
	return s > as ? u > is - as ? (f.moveTo(e + s * Math.cos(c), t + s * Math.sin(c)), m(s, c, l, !d), o > as && (f.moveTo(e + o * Math.cos(l), t + o * Math.sin(l)), m(o, l, c, d))) : (f.moveTo(e + s * Math.cos(c), t + s * Math.sin(c)), m(s, c, l, !d), o > as ? m(o, l, c, d) : f.lineTo(e, t)) : f.moveTo(e, t), f.close(), f;
}
function cs(e, t, n) {
	return new z(e - n, t - n, e + n, t + n);
}
//#endregion
//#region src/dhole/plot/layers/marks.ts
function ls(e) {
	switch (e) {
		case "smooth": return ns;
		case "step": return Qo;
		case "stepAfter": return $o;
		case "stepBefore": return es;
		case "spline": throw Error("A spline is not drawn on this page.");
		default: return Xo;
	}
}
function us(e, t) {
	switch (e) {
		case "dashed": return [t * 3 + 2, t * 2 + 2];
		case "dotted": return [.01, t * 2 + 1];
		case "dashDot": return [
			t * 3 + 2,
			t + 2,
			.01,
			t + 2
		];
		default: return null;
	}
}
function ds(e, t) {
	let n = new Yo();
	return rs(e, (e) => e.x, (e) => e.y, (e) => Number.isFinite(e.x) && Number.isFinite(e.y), ls(t), n), n;
}
function fs(e, t) {
	return ds(e, t).toPath();
}
function ps(e, t) {
	if (e.length <= Math.max(2e3, t * 4)) return e;
	for (let t = 1; t < e.length; t++) if (e[t].x < e[t - 1].x) return e;
	let n = [], r = 0;
	for (; r < e.length;) {
		let t = e[r];
		if (!Number.isFinite(t.x) || !Number.isFinite(t.y)) {
			n.push(t), r++;
			continue;
		}
		let i = Math.floor(t.x), a = r, o = t, s = t, c = t;
		for (; a < e.length && Number.isFinite(e[a].x) && Number.isFinite(e[a].y) && Math.floor(e[a].x) === i;) {
			let t = e[a];
			t.y < o.y && (o = t), t.y > s.y && (s = t), c = t, a++;
		}
		n.push(t), o.x <= s.x ? n.push(o, s) : n.push(s, o), n.push(c), r = a;
	}
	return n;
}
function ms(e, t, n, r, i, a, o, s) {
	if (!Number.isFinite(t) || !Number.isFinite(n) || a.a === 0) return;
	let c = i / 2;
	if (r === "circle" || r === "ring") r === "circle" && s > 0 && e.drawPath(new B().addCircle(t, n, c + s), Q.fill(o)), r === "circle" ? e.drawPath(new B().addCircle(t, n, c), Q.fill(a)) : e.drawPath(new B().addCircle(t, n, c - .75), Q.stroke(a, 1.5));
	else throw Error(`A ${r} point is not drawn on this page.`);
}
function hs(e, t, n, r, i) {
	let a = t.x - n.x, o = t.y - n.y, s = r.x - n.x, c = r.y - n.y, l = Math.hypot(a, o), u = Math.hypot(s, c), d = a / l, f = o / l, p = s / u, m = c / u, h = Math.acos(Math.min(1, Math.max(-1, d * p + f * m))), g = i / Math.tan(h / 2), _ = {
		x: n.x + d * g,
		y: n.y + f * g
	}, v = {
		x: n.x + p * g,
		y: n.y + m * g
	}, y = Math.hypot(d + p, f + m), b = i / Math.sin(h / 2), x = {
		x: n.x + (d + p) / y * b,
		y: n.y + (f + m) / y * b
	}, S = Math.atan2(_.y - x.y, _.x - x.x) * 180 / Math.PI, C = Math.atan2(v.y - x.y, v.x - x.x) * 180 / Math.PI - S;
	for (; C > 180;) C -= 360;
	for (; C < -180;) C += 360;
	e.lineTo(_.x, _.y), e.arcTo(new z(x.x - i, x.y - i, x.x + i, x.y + i), S, C, !1);
}
function gs(e, t, n) {
	let r = new B(), i = Math.min(n, Math.min(e.width, e.height) / 2);
	if (i <= .25) return r.addRect(e);
	let a = e.left, o = e.top, s = e.right, c = e.bottom, l = t === 0 || t === 3, u = t === 0 || t === 1, d = t === 1 || t === 2, f = t === 2 || t === 3, p = {
		x: a + (l ? i : 0),
		y: o
	};
	return r.moveTo(p.x, p.y), p = {
		x: s - (u ? i : 0),
		y: o
	}, r.lineTo(p.x, p.y), u && (hs(r, p, {
		x: s,
		y: o
	}, {
		x: s,
		y: o + i
	}, i), p = {
		x: s,
		y: o + i
	}), p = {
		x: s,
		y: c - (d ? i : 0)
	}, r.lineTo(p.x, p.y), d && (hs(r, p, {
		x: s,
		y: c
	}, {
		x: s - i,
		y: c
	}, i), p = {
		x: s - i,
		y: c
	}), p = {
		x: a + (f ? i : 0),
		y: c
	}, r.lineTo(p.x, p.y), f && (hs(r, p, {
		x: a,
		y: c
	}, {
		x: a,
		y: c - i
	}, i), p = {
		x: a,
		y: c - i
	}), p = {
		x: a,
		y: o + (l ? i : 0)
	}, r.lineTo(p.x, p.y), l && hs(r, p, {
		x: a,
		y: o
	}, {
		x: a + i,
		y: o
	}, i), r.close(), r;
}
function _s(e, t, n, r) {
	let i = Math.fround;
	return new z(i(Math.min(e, n)), i(Math.min(t, r)), i(Math.max(e, n)), i(Math.max(t, r)));
}
//#endregion
//#region src/dhole/plot/layers/lines.ts
var vs = class extends Ft {
	constructor(e, t) {
		super(), r(this, "x", void 0), r(this, "y", void 0), r(this, "shape", "straight"), r(this, "width", null), r(this, "dash", "solid"), r(this, "markers", !1), r(this, "markerShape", "circle"), r(this, "colorBy", null), r(this, "endLabel", !1), this.x = Z.of(e), this.y = Z.of(t);
	}
	plan(e) {
		return $.sameLength(this.x, this.y, "x", "y"), this.colorBy !== null && $.sameLength(this.x, this.colorBy, "x", "colour"), new ys(this, this.colorBy === null ? e.seriesColor(this) : {
			r: 0,
			g: 0,
			b: 0,
			a: 0
		});
	}
}, ys = class extends Ro {
	constructor(e, t) {
		super(e), r(this, "line", void 0), r(this, "color", void 0), this.line = e, this.color = t;
	}
	train(e) {
		e.x.add(this.line.x), e.yOf(this.line).add(this.line.y), this.line.colorBy !== null && e.color.add(this.line.colorBy);
	}
	draw(e) {
		let t = this.line, n = qo(e), r = Ko(e, t), i = t.width ?? e.theme.lineWidth;
		for (let { indices: a, color: o, name: s } of this.groups(e)) {
			let c = a.map((e) => ({
				x: Es(n, t.x, e),
				y: Es(r, t.y, e)
			})), l = ps(c, e.plot.width), u = Do(o, t.opacity), d = fs(l, t.shape);
			if (e.sink.drawPath(d, Q.stroke(u, i, us(t.dash, i))), t.markers && l.length === c.length) for (let n of c) ms(e.sink, n.x, n.y, t.markerShape, e.theme.pointSize, u, e.surface, e.theme.pointRing);
			if (t.endLabel && s) {
				let t = c.filter((e) => Number.isFinite(e.x) && Number.isFinite(e.y)), n = t[t.length - 1];
				n && e.text.draw(e.sink, s, n.x + 6, n.y, "dataLabel", e.theme.secondaryInk, "left");
			}
		}
	}
	groups(e) {
		let t = this.line;
		return t.colorBy === null ? [{
			indices: Array.from({ length: t.x.count }, (e, t) => t),
			color: this.color,
			name: t.label
		}] : Ds(t.colorBy).map(({ category: t, indices: n }) => ({
			indices: n,
			color: Go(e).colors.forCategory(t),
			name: t
		}));
	}
	addLegend(e) {
		let t = this.line.markers ? "lineAndPoint" : "line";
		this.line.colorBy === null ? e.add(this.line.label, this.color, t) : e.addSeriesCategories(this.line.colorBy, t);
	}
}, bs = class extends Ft {
	constructor(e, t) {
		super(), r(this, "x", void 0), r(this, "y", void 0), r(this, "shape", "circle"), r(this, "size", null), r(this, "colorBy", null), this.x = Z.of(e), this.y = Z.of(t);
	}
	plan(e) {
		return $.sameLength(this.x, this.y, "x", "y"), this.colorBy !== null && $.sameLength(this.x, this.colorBy, "x", "colour"), new xs(this, this.colorBy === null ? e.seriesColor(this) : {
			r: 0,
			g: 0,
			b: 0,
			a: 0
		});
	}
}, xs = class extends Ro {
	constructor(e, t) {
		super(e), r(this, "points", void 0), r(this, "color", void 0), this.points = e, this.color = t;
	}
	train(e) {
		e.x.add(this.points.x), e.yOf(this.points).add(this.points.y), this.points.colorBy !== null && e.color.add(this.points.colorBy);
	}
	draw(e) {
		let t = this.points, n = qo(e), r = Ko(e, t), i = e.theme.pointRing;
		for (let a = 0; a < t.x.count; a++) {
			let o = Es(n, t.x, a), s = Es(r, t.y, a);
			if (!Number.isFinite(o) || !Number.isFinite(s)) continue;
			let c = this.color;
			t.colorBy !== null && (c = t.colorBy.kind === "text" ? Go(e).colors.forCategory(t.colorBy.textsOf[a]) : Go(e).colors.forValue(t.colorBy.position(a)));
			let l = t.size ?? e.theme.pointSize;
			ms(e.sink, o, s, t.shape, l, Do(c, t.opacity), e.surface, i);
		}
	}
	addLegend(e) {
		this.points.colorBy === null ? e.add(this.points.label, this.color, "point") : e.addSeriesCategories(this.points.colorBy, "point");
	}
}, Ss = class extends Ft {
	constructor(e, t) {
		super(), r(this, "x", void 0), r(this, "y", void 0), r(this, "y0", null), r(this, "shape", "straight"), r(this, "colorBy", null), r(this, "stack", "stacked"), r(this, "outline", !0), r(this, "fillOpacity", null), this.x = Z.of(e), this.y = Z.of(t);
	}
	plan(e) {
		if ($.sameLength(this.x, this.y, "x", "y"), this.y0 !== null && $.sameLength(this.x, this.y0, "x", "baseline"), this.colorBy !== null && $.sameLength(this.x, this.colorBy, "x", "colour"), this.y.kind !== "number") throw Error("An area's heights must be numbers.");
		return new Cs(this, this.colorBy === null ? e.seriesColor(this) : {
			r: 0,
			g: 0,
			b: 0,
			a: 0
		});
	}
}, Cs = class extends Ro {
	constructor(e, t) {
		super(e), r(this, "area", void 0), r(this, "color", void 0), r(this, "stacking", void 0), this.area = e, this.color = t, this.stacking = e.colorBy === null ? null : Ts.pivot(e.x, e.y, e.colorBy, e.stack);
	}
	train(e) {
		let t = this.area, n = e.yOf(t);
		if (n.wantsZero = t.y0 === null || this.stacking !== null, this.stacking !== null) {
			for (let t of this.stacking.keys) e.x.addValue(t);
			e.x.claim(t.x.kind, t.x.name);
			for (let e of this.stacking.extent()) n.addValue(e);
			t.stack === "percent" && (n.preferredFormat = ".0%");
			for (let t of this.stacking.groups) e.color.addCategory(t);
			n.claim("number", t.y.name);
		} else e.x.add(t.x), n.add(t.y), t.y0 !== null && n.add(t.y0);
	}
	draw(e) {
		let t = this.area, n = qo(e), r = Ko(e, t), i = e.theme.lineWidth;
		if (this.stacking === null) {
			let a = t.x.count, o = [], s = [];
			for (let e = 0; e < a; e++) {
				let i = Es(n, t.x, e);
				o.push({
					x: i,
					y: Es(r, t.y, e)
				}), s.push({
					x: i,
					y: t.y0 === null ? r.map(ws(r)) : Es(r, t.y0, e)
				});
			}
			let c = (t.fillOpacity ?? e.theme.areaOpacity) * t.opacity;
			this.fillBand(e, o, s, Do(this.color, c)), t.outline && e.sink.drawPath(fs(o, t.shape), Q.stroke(Do(this.color, t.opacity), i));
			return;
		}
		let a = this.stacking, o = (t.fillOpacity ?? .85) * t.opacity;
		for (let i = 0; i < a.groups.length; i++) {
			let s = [], c = [];
			for (let e = 0; e < a.keys.length; e++) {
				let t = n.map(a.keys[e]), [o, l] = a.span(i, e);
				s.push({
					x: t,
					y: r.map(l)
				}), c.push({
					x: t,
					y: r.map(o)
				});
			}
			let l = Go(e).colors.forCategory(a.groups[i]);
			this.fillBand(e, s, c, Do(l, o)), t.outline && e.sink.drawPath(fs(s, t.shape), Q.stroke(e.surface, 1));
		}
	}
	fillBand(e, t, n, r) {
		let i = (e, t) => Number.isFinite(e.x) && Number.isFinite(e.y) && Number.isFinite(t.y), a = this.area.shape, o = 0;
		for (; o < t.length;) {
			for (; o < t.length && !i(t[o], n[o]);) o++;
			let s = o;
			for (; s < t.length && i(t[s], n[s]);) s++;
			if (s - o >= 2) {
				let i = fs(t.slice(o, s), a), c = ds(n.slice(o, s).reverse(), a === "stepAfter" ? "stepBefore" : a === "stepBefore" ? "stepAfter" : a), l = !0;
				for (let e of c.commands) e.verb === "M" ? (l && i.lineTo(e.x, e.y), l = !1) : e.verb === "L" ? i.lineTo(e.x, e.y) : e.verb === "C" && i.cubicTo({
					x: e.x1,
					y: e.y1
				}, {
					x: e.x2,
					y: e.y2
				}, {
					x: e.x,
					y: e.y
				});
				i.close(), e.sink.drawPath(i, Q.fill(r));
			}
			o = s;
		}
	}
	addLegend(e) {
		let t = this.area;
		this.stacking === null ? !t.outline && t.fillOpacity !== null ? e.add(t.label, {
			...this.color,
			a: Math.round(this.color.a * Math.min(Math.max(t.fillOpacity * t.opacity, 0), 1))
		}, "fill") : e.add(t.label, this.color, "fill") : e.addCategories(this.stacking.groups, "fill");
	}
};
function ws(e) {
	return e.type === "log" ? e.min : Math.min(Math.max(0, Math.min(e.min, e.max)), Math.max(e.min, e.max));
}
var Ts = class e {
	constructor(e, t, n, i) {
		r(this, "keys", void 0), r(this, "groups", void 0), r(this, "values", void 0), r(this, "spans", void 0), this.keys = e, this.groups = t, this.values = n, this.spans = t.map(() => e.map(() => [0, 0]));
		for (let r = 0; r < e.length; r++) {
			let e = 0;
			if (i === "percent") for (let i = 0; i < t.length; i++) e += Math.abs(n[i][r]);
			let a = 0, o = 0;
			for (let s = 0; s < t.length; s++) {
				let t = n[s][r];
				i === "percent" && (t = e === 0 ? 0 : t / e), i === "grouped" ? this.spans[s][r] = [0, t] : t >= 0 ? (this.spans[s][r] = [a, a + t], a += t) : (this.spans[s][r] = [o + t, o], o += t);
			}
		}
	}
	value(e, t) {
		return this.values[e][t];
	}
	span(e, t) {
		return this.spans[e][t];
	}
	*extent() {
		for (let e = 0; e < this.groups.length; e++) for (let t = 0; t < this.keys.length; t++) yield this.spans[e][t][0], yield this.spans[e][t][1];
	}
	static pivot(t, n, r, i) {
		if (t.kind === "text") throw Error("Stacked areas need numbers or times along x.");
		let a = r.distinctTexts(), o = [...new Set(Array.from({ length: t.count }, (e, n) => t.position(n)).filter(Number.isFinite))].sort((e, t) => e - t), s = new Map(o.map((e, t) => [e, t])), c = new Map(a.map((e, t) => [e, t])), l = a.map(() => o.map(() => 0));
		for (let e = 0; e < t.count; e++) {
			let i = t.position(e), a = n.numbersOf[e];
			Number.isFinite(i) && Number.isFinite(a) && (l[c.get(r.text(e))][s.get(i)] += a);
		}
		return new e(o, a, l, i);
	}
};
function Es(e, t, n) {
	return t.kind === "text" ? e.mapCategory(t.textsOf[n]) : e.map(t.position(n));
}
function Ds(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n = 0; n < e.count; n++) {
		let r = e.text(n), i = t.get(r);
		i || t.set(r, i = []), i.push(n);
	}
	return [...t].map(([e, t]) => ({
		category: e,
		indices: t
	}));
}
var $ = {
	sameLength(e, t, n, r) {
		if (e.count !== t.count) throw Error(`The ${n} values (${e.count}) and the ${r} values (${t.count}) must be as many as each other.`);
	},
	numbers(e, t) {
		if (e.kind !== "number") throw Error(`The ${t} must be numbers, not ${To(e.kind)}.`);
	}
}, Os = class extends Ft {
	constructor(e, t) {
		super(), r(this, "categories", void 0), r(this, "values", void 0), r(this, "hole", 0), r(this, "keepOrder", !1), r(this, "sliceLabels", "percent"), r(this, "centerText", null), this.categories = Z.ofTexts(e), this.values = Z.ofNumbers(t);
	}
	plan(e) {
		return $.sameLength(this.categories, this.values, "category", "value"), $.numbers(this.values, "slice sizes"), new ks(this);
	}
}, ks = class extends Ro {
	constructor(e) {
		super(e), r(this, "pie", void 0), r(this, "slices", []), r(this, "arcsCache", null), this.pie = e;
		let t = /* @__PURE__ */ new Map();
		for (let n = 0; n < e.categories.count; n++) {
			let r = e.values.numbersOf[n];
			if (!(r > 0)) continue;
			let i = e.categories.text(n);
			if (!i.trim()) continue;
			let a = t.get(i);
			a === void 0 ? (t.set(i, this.slices.length), this.slices.push({
				name: i,
				value: r
			})) : this.slices[a] = {
				name: i,
				value: this.slices[a].value + r
			};
		}
	}
	get frame() {
		return "free";
	}
	arcs() {
		return this.arcsCache ?? (this.arcsCache = os(this.slices, (e) => e.value, this.pie.keepOrder));
	}
	roundThePie() {
		return [...this.arcs()].sort((e, t) => e.index - t.index).map((e) => e.data.name);
	}
	train(e) {
		for (let t of this.roundThePie()) e.color.addCategory(t);
	}
	draw(e) {
		if (this.slices.length === 0) return;
		let t = this.pie, n = Go(e).colors, r = e.plot, i = e.text, a = t.sliceLabels === "none" ? 8 : i.lineHeight("dataLabel") * 2.2, o = Math.max(10, Math.min(r.width, r.height) / 2 - a), s = Math.min(Math.max(t.hole, 0), .95) * o, c = {
			x: r.midX,
			y: r.midY
		}, l = this.slices.reduce((e, t) => e + t.value, 0), u = this.arcs();
		for (let r of u) {
			let i = ss(c.x, c.y, s, o, r.startAngle, r.endAngle), a = Do(n.forCategory(r.data.name), t.opacity);
			e.sink.drawPath(i, Q.fill(a)), e.sink.drawPath(i, Q.stroke(e.surface, 2, null, !1));
		}
		for (let r of u) {
			let a = t.sliceLabels === "percent" ? So(r.data.value / l, ".0%") : t.sliceLabels === "value" ? xo(r.data.value) : t.sliceLabels === "name" ? r.data.name : t.sliceLabels === "nameAndPercent" ? `${r.data.name} ${So(r.data.value / l, ".0%")}` : "";
			if (a.length === 0) continue;
			let u = (r.startAngle + r.endAngle) / 2, d = Math.sin(u), f = -Math.cos(u), p = (s + o) / 2, m = i.measure(a, "dataLabel"), h = (r.endAngle - r.startAngle) * p, g = n.forCategory(r.data.name);
			if (h > m.width + 6 && o - s > m.height + 4) {
				i.draw(e.sink, a, c.x + d * p, c.y + f * p, "dataLabel", Ao(g, e.theme.ink, {
					r: 255,
					g: 255,
					b: 255,
					a: 255
				}), "center");
				continue;
			}
			let _ = {
				x: c.x + d * (o - 2),
				y: c.y + f * (o - 2)
			}, v = {
				x: c.x + d * (o + 10),
				y: c.y + f * (o + 10)
			};
			e.sink.drawLine(_.x, _.y, v.x, v.y, Q.stroke(e.theme.secondaryInk, 1)), i.draw(e.sink, a, v.x + (d >= 0 ? 3 : -3), v.y, "dataLabel", e.theme.secondaryInk, d >= 0 ? "left" : "right");
		}
		t.centerText && s > 0 && i.draw(e.sink, t.centerText, c.x, c.y, "chartTitle", e.theme.ink, "center");
	}
	addLegend(e) {
		e.addCategories(this.roundThePie(), "fill");
	}
}, As = class extends Ft {
	constructor(e, t) {
		super(), r(this, "spokes", void 0), r(this, "values", void 0), r(this, "fill", !0), r(this, "markers", !0), this.spokes = Z.ofTexts(e), this.values = Z.ofNumbers(t);
	}
	plan(e) {
		return $.sameLength(this.spokes, this.values, "spoke", "value"), $.numbers(this.values, "radar's values"), new js(this, e.seriesColor(this));
	}
}, js = class extends Ro {
	constructor(e, t) {
		super(e), r(this, "radar", void 0), r(this, "color", void 0), this.radar = e, this.color = t;
	}
	get frame() {
		return "polar";
	}
	get clipToPlot() {
		return !1;
	}
	trainPolar(e) {
		for (let t = 0; t < this.radar.spokes.count; t++) e.addSpoke(this.radar.spokes.text(t)), e.addValue(this.radar.values.numbersOf[t]);
	}
	draw(e) {
		let t = this.radar, n = Go(e).polar;
		if (!n) throw Error("A radar layer needs a radial chart.");
		let r = /* @__PURE__ */ new Map();
		for (let e = 0; e < t.spokes.count; e++) r.set(t.spokes.text(e), t.values.numbersOf[e]);
		let i = [];
		for (let e = 0; e < n.spokes.length; e++) {
			let t = r.get(n.spokes[e]) ?? n.radial.min;
			i.push(n.point(e, Number.isFinite(t) ? t : n.radial.min));
		}
		if (i.length === 0) return;
		let a = new B();
		i.forEach((e, t) => t === 0 ? a.moveTo(e.x, e.y) : a.lineTo(e.x, e.y)), a.close();
		let o = Do(this.color, t.opacity);
		if (t.fill && e.sink.drawPath(a, Q.fill(Do(this.color, e.theme.areaOpacity * 1.5 * t.opacity))), e.sink.drawPath(a, Q.stroke(o, e.theme.lineWidth)), t.markers) for (let t of i) ms(e.sink, t.x, t.y, "circle", e.theme.pointSize * .75, o, e.surface, e.theme.pointRing);
	}
	addLegend(e) {
		e.add(this.radar.label, this.color, "lineAndPoint");
	}
}, Ms = class extends Ft {
	constructor(e, t) {
		super(), r(this, "categories", void 0), r(this, "values", void 0), r(this, "colorBy", null), r(this, "mode", "grouped"), r(this, "horizontal", !1), r(this, "valueLabels", !1), r(this, "labelFormat", null), this.categories = e instanceof Z ? e : Z.ofTexts(e), this.values = Z.of(t);
	}
	plan(e) {
		return $.sameLength(this.categories, this.values, "category", "value"), $.numbers(this.values, "bar values"), this.colorBy !== null && $.sameLength(this.categories, this.colorBy, "category", "colour"), new Ns(this, this.colorBy === null ? e.seriesColor(this) : {
			r: 0,
			g: 0,
			b: 0,
			a: 0
		});
	}
}, Ns = class extends Ro {
	constructor(e, t) {
		super(e), r(this, "bars", void 0), r(this, "color", void 0), r(this, "categories", []), r(this, "groups", []), r(this, "values", void 0), r(this, "spans", void 0), this.bars = e, this.color = t;
		let n = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set();
		for (let t = 0; t < e.categories.count; t++) {
			let r = e.categories.text(t);
			n.has(r) || (n.add(r), this.categories.push(r));
			let a = e.colorBy?.text(t) ?? "";
			i.has(a) || (i.add(a), this.groups.push(a));
		}
		let a = new Map(this.categories.map((e, t) => [e, t])), o = new Map(this.groups.map((e, t) => [e, t]));
		this.values = this.groups.map(() => this.categories.map(() => 0));
		let s = this.groups.map(() => this.categories.map(() => !1));
		for (let t = 0; t < e.categories.count; t++) {
			let n = e.values.numbersOf[t], r = a.get(e.categories.text(t)), i = o.get(e.colorBy?.text(t) ?? "");
			Number.isFinite(n) && (this.values[i][r] += n, s[i][r] = !0);
		}
		let c = this.groups.length === 1 && e.mode === "grouped" ? "grouped" : e.mode;
		this.spans = this.groups.map(() => this.categories.map(() => [0, 0]));
		for (let e = 0; e < this.categories.length; e++) {
			let t = 0;
			for (let n = 0; n < this.groups.length; n++) t += Math.abs(this.values[n][e]);
			let n = 0, r = 0;
			for (let i = 0; i < this.groups.length; i++) {
				let a = this.values[i][e];
				c === "percent" && (a = t === 0 ? 0 : a / t), c === "grouped" ? this.spans[i][e] = s[i][e] ? [Math.min(0, a), Math.max(0, a)] : [NaN, NaN] : a >= 0 ? (this.spans[i][e] = [n, n + a], n += a) : (this.spans[i][e] = [r + a, r], r += a);
			}
		}
	}
	get stacked() {
		return this.bars.mode !== "grouped" && this.groups.length > 1;
	}
	train(e) {
		let t = this.bars, n = e.categoryAxisOf(t, t.horizontal), r = e.valueAxisOf(t, t.horizontal);
		for (let e of this.categories) n.addCategory(e);
		n.banded = !0, t.horizontal && (n.topDown = !0), r.claim("number", t.values.name), r.wantsZero = !0, t.mode === "percent" && this.groups.length > 1 && (r.preferredFormat = ".0%");
		let i = 0, a = 0;
		for (let e of this.spans) for (let [t, n] of e) r.addValue(t), r.addValue(n), Number.isFinite(t) && (i = Math.min(i, t)), Number.isFinite(n) && (a = Math.max(a, n));
		if (t.valueLabels && t.horizontal && !this.stacked && (r.addValue(a + (a - i) * .15), i < 0 && r.addValue(i - (a - i) * .15)), t.colorBy !== null) for (let t of this.groups) e.color.addCategory(t);
	}
	draw(e) {
		let t = this.bars, n = e.theme, r = t.horizontal ? Ko(e, t) : qo(e), i = t.horizontal ? qo(e) : Ko(e, t), a = n.barGap, o = r.bandwidth;
		o <= 0 && (o = Math.max(1, r.step * (1 - n.barPadding)));
		let s = this.groups.length, c = n.maxBarWidth > 0 ? n.maxBarWidth : Infinity;
		for (let t = 0; t < this.categories.length; t++) {
			let n = r.mapCategory(this.categories[t]);
			if (Number.isFinite(n)) {
				if (this.stacked) {
					let r = Math.min(o, c * 1.5), l = -1, u = -1;
					for (let e = 0; e < s; e++) {
						let [n, r] = this.spans[e][t];
						r > n && r > 0 && (l = e), r > n && n < 0 && u < 0 && (u = e);
					}
					for (let o = 0; o < s; o++) {
						let [s, c] = this.spans[o][t];
						if (!(c > s)) continue;
						let d = o === l || o === u;
						this.drawBar(e, i, n, r, s, c, this.fill(e, o), d, a / 2, o, t);
					}
				} else {
					let r = (o - a * (s - 1)) / s;
					r = Math.max(1, Math.min(r, c));
					let l = r * s + a * (s - 1);
					for (let o = 0; o < s; o++) {
						let [s, c] = this.spans[o][t];
						if (Number.isNaN(s)) continue;
						let u = -l / 2 + r / 2 + o * (r + a);
						this.drawBar(e, i, n + u, r, s, c, this.fill(e, o), !0, 0, o, t);
					}
				}
			}
		}
	}
	fill(e, t) {
		return Do(this.bars.colorBy === null ? this.color : Go(e).colors.forCategory(this.groups[t]), this.bars.opacity);
	}
	drawBar(e, t, n, r, i, a, o, s, c, l, u) {
		let d = this.bars, f = t.map(i), p = t.map(a);
		if (t.type === "log" && (i <= 0 && (f = t.rangeStart), !(a > 0)) || !Number.isFinite(f) || !Number.isFinite(p)) return;
		let m = a <= 0 && i < 0, h, g;
		if (d.horizontal ? (h = _s(Math.min(f, p), n - r / 2, Math.max(f, p), n + r / 2), h = new z(h.left + (c > 0 && i !== 0 ? c : 0), h.top, h.right - (c > 0 ? c : 0), h.bottom), g = m ? 3 : 1) : (h = _s(n - r / 2, Math.min(f, p), n + r / 2, Math.max(f, p)), h = new z(h.left, h.top + (c > 0 ? c : 0), h.right, h.bottom - (c > 0 && i !== 0 ? c : 0)), g = m ? 2 : 0), h.width <= 0 || h.height <= 0) return;
		let _ = s ? e.theme.barRadius : 0;
		if (e.sink.drawPath(gs(h, g, _), Q.fill(o)), !d.valueLabels) return;
		let v = this.values[l][u], y = d.labelFormat === null ? d.mode === "percent" && this.stacked ? So(a - i, ".0%") : xo(v) : So(v, d.labelFormat), b = e.text;
		if (this.stacked) {
			let t = b.measure(y, "dataLabel");
			t.width + 6 <= h.width && t.height + 4 <= h.height && b.draw(e.sink, y, h.midX, h.midY, "dataLabel", Ao(o, e.theme.ink, e.surface), "center");
		} else d.horizontal ? b.draw(e.sink, y, m ? h.left - 4 : h.right + 4, h.midY, "dataLabel", e.theme.secondaryInk, m ? "right" : "left") : b.draw(e.sink, y, h.midX, m ? h.bottom + 3 : h.top - 3, "dataLabel", e.theme.secondaryInk, m ? "top" : "bottom");
	}
	get clipToPlot() {
		return !this.bars.valueLabels;
	}
	overhang(e) {
		return this.bars.valueLabels && !this.bars.horizontal && !this.stacked ? e.lineHeight("dataLabel") + 4 : 0;
	}
	addLegend(e) {
		this.bars.colorBy === null ? e.add(this.bars.label, this.color, "fill") : e.addCategories(this.groups, "fill");
	}
}, Ps = class extends Ft {
	constructor(e, t, n) {
		super(), r(this, "x", void 0), r(this, "y", void 0), r(this, "text", void 0), r(this, "anchor", "above"), r(this, "offset", 4), r(this, "dots", !1), this.x = Z.ofNumbers(e), this.y = Z.ofNumbers(t), this.text = Z.ofTexts(n);
	}
	plan(e) {
		return $.sameLength(this.x, this.y, "x", "y"), $.sameLength(this.x, this.text, "x", "text"), new Fs(this);
	}
}, Fs = class extends Ro {
	constructor(e) {
		super(e), r(this, "labels", void 0), this.labels = e;
	}
	train(e) {
		e.x.add(this.labels.x), e.yOf(this.labels).add(this.labels.y);
	}
	get clipToPlot() {
		return !1;
	}
	draw(e) {
		let t = this.labels, n = qo(e), r = Ko(e, t), i = t.color ?? e.theme.ink, a = t.offset;
		for (let o = 0; o < t.x.count; o++) {
			let s = Es(n, t.x, o), c = Es(r, t.y, o);
			if (!Number.isFinite(s) || !Number.isFinite(c)) continue;
			t.dots && ms(e.sink, s, c, "circle", e.theme.pointSize * .75, i, e.surface, e.theme.pointRing);
			let [l, u, d] = t.anchor === "above" ? [
				0,
				-a,
				"bottom"
			] : t.anchor === "below" ? [
				0,
				a,
				"top"
			] : t.anchor === "left" ? [
				-a,
				0,
				"right"
			] : t.anchor === "right" ? [
				a,
				0,
				"left"
			] : [
				0,
				0,
				"center"
			];
			e.text.draw(e.sink, t.text.text(o), s + l, c + u, "dataLabel", Do(i, t.opacity), d);
		}
	}
}, Is = class {
	constructor(e, t, n, i, a, o, s) {
		r(this, "kind", void 0), r(this, "x", void 0), r(this, "y", void 0), r(this, "lower", void 0), r(this, "upper", void 0), r(this, "coefficients", void 0), r(this, "rSquared", void 0), this.kind = e, this.x = t, this.y = n, this.lower = i, this.upper = a, this.coefficients = o, this.rSquared = s;
	}
	get equation() {
		if (this.coefficients.length === 0) return "smooth fit";
		let e = [];
		for (let t = this.coefficients.length - 1; t >= 0; t--) {
			let n = this.coefficients[t], r = So(Math.abs(n), Math.abs(n) >= 100 ? ",.1f" : ".3~g"), i = t === 0 ? r : t === 1 ? r + "x" : r + "x" + [...String(t)].map((e) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[+e]).join("");
			e.push(e.length === 0 ? (n < 0 ? "−" : "") + i : (n < 0 ? " − " : " + ") + i);
		}
		return "y = " + e.join("");
	}
};
function Ls(e, t) {
	let n = Array(t + 1);
	n[0] = 1;
	for (let r = 1; r <= t; r++) n[r] = n[r - 1] * e;
	return n;
}
function Rs(e, t, n) {
	let r = e.length - 1, i = Array(r + 1).fill(0);
	for (let a = 0; a <= r; a++) {
		let r = e[a] / n ** +a;
		for (let e = 0; e <= a; e++) i[e] += r * zs(a, e) * (-t) ** +(a - e);
	}
	return i;
}
function zs(e, t) {
	let n = 1;
	for (let r = 1; r <= t; r++) n = n * (e - t + r) / r;
	return n;
}
function Bs(e) {
	let t = e.length, n = e.map((e) => [...e]), r = e.map((t, n) => e.map((e, t) => +(n === t)));
	for (let e = 0; e < t; e++) {
		let i = e;
		for (let r = e + 1; r < t; r++) Math.abs(n[r][e]) > Math.abs(n[i][e]) && (i = r);
		if (Math.abs(n[i][e]) < 1e-14) throw Error("The points do not determine a fit of that degree: there are too few distinct x values.");
		i !== e && ([n[e], n[i]] = [n[i], n[e]], [r[e], r[i]] = [r[i], r[e]]);
		let a = n[e][e];
		for (let i = 0; i < t; i++) n[e][i] /= a, r[e][i] /= a;
		for (let i = 0; i < t; i++) {
			if (i === e) continue;
			let a = n[i][e];
			if (a !== 0) for (let o = 0; o < t; o++) n[i][o] -= a * n[e][o], r[i][o] -= a * r[e][o];
		}
	}
	return r;
}
function Vs(e, t, n) {
	let r = Math.max(2, Math.ceil(n * e.length)), i = e.map(([e]) => Math.abs(e - t)).sort((e, t) => e - t), a = i[Math.min(r, i.length) - 1];
	a <= 0 && (a = 1e-12);
	let o = 0, s = 0, c = 0, l = 0, u = 0;
	for (let [n, r] of e) {
		let e = Math.abs(n - t) / a;
		if (e >= 1) continue;
		let i = (1 - e * e * e) ** 3;
		o += i, s += i * n, c += i * r, l += i * n * n, u += i * n * r;
	}
	if (o === 0) return NaN;
	let d = o * l - s * s;
	if (Math.abs(d) < 1e-12) return c / o;
	let f = (o * u - s * c) / d;
	return (c - f * s) / o + f * t;
}
function Hs(e) {
	let t = [
		12.706,
		4.303,
		3.182,
		2.776,
		2.571,
		2.447,
		2.365,
		2.306,
		2.262,
		2.228,
		2.201,
		2.179,
		2.16,
		2.145,
		2.131,
		2.12,
		2.11,
		2.101,
		2.093,
		2.086,
		2.08,
		2.074,
		2.069,
		2.064,
		2.06,
		2.056,
		2.052,
		2.048,
		2.045,
		2.042
	];
	if (e < 1) return NaN;
	if (e <= 30) return t[e - 1];
	let n = [
		[30, 2.042],
		[40, 2.021],
		[60, 2],
		[120, 1.98],
		[Infinity, 1.96]
	];
	for (let t = 0; t < n.length - 1; t++) if (e <= n[t + 1][0]) {
		let r = 1 / n[t][0], i = n[t + 1][0] === Infinity ? 0 : 1 / n[t + 1][0], a = (1 / e - r) / (i - r);
		return n[t][1] + (n[t + 1][1] - n[t][1]) * a;
	}
	return 1.96;
}
function Us(e, t, n = "linear", r = 2, i = .75, a = 100) {
	if (e.length !== t.length) throw Error(`There are ${e.length} x values and ${t.length} y values.`);
	let o = [];
	for (let n = 0; n < e.length; n++) Number.isFinite(e[n]) && Number.isFinite(t[n]) && o.push([e[n], t[n]]);
	o.sort((e, t) => e[0] - t[0]);
	let s = o.length;
	if (s < 2) throw Error("A trend needs at least two points.");
	let c = o[0][0], l = o[s - 1][0], u = Array.from({ length: a }, (e, t) => c + (l - c) * t / (a - 1));
	if (n === "smooth") return new Is(n, u, u.map((e) => Vs(o, e, Math.min(Math.max(i, .1), 1))), null, null, [], NaN);
	let d = n === "linear" ? 1 : Math.min(Math.max(r, 1), 6);
	if (s <= d) throw Error(`A degree-${d} fit needs more than ${d} points; there are ${s}.`);
	let f = o.reduce((e, t) => e + t[0], 0) / s, p = Math.max(1e-12, Math.max(...o.map((e) => Math.abs(e[0] - f)))), m = Array.from({ length: d + 1 }, () => Array(d + 1).fill(0)), h = Array(d + 1).fill(0);
	for (let [e, t] of o) {
		let n = Ls((e - f) / p, d);
		for (let e = 0; e <= d; e++) {
			h[e] += n[e] * t;
			for (let t = 0; t <= d; t++) m[e][t] += n[e] * n[t];
		}
	}
	let g = Bs(m), _ = Array(d + 1).fill(0);
	for (let e = 0; e <= d; e++) for (let t = 0; t <= d; t++) _[e] += g[e][t] * h[t];
	let v = (e) => {
		let t = Ls((e - f) / p, d), n = 0;
		for (let e = 0; e <= d; e++) n += _[e] * t[e];
		return n;
	}, y = o.reduce((e, t) => e + t[1], 0) / s, b = o.reduce((e, t) => e + (t[1] - v(t[0])) * (t[1] - v(t[0])), 0), x = o.reduce((e, t) => e + (t[1] - y) * (t[1] - y), 0), S = x === 0 ? 1 : 1 - b / x, C = u.map(v), w = null, T = null, ee = s - d - 1;
	if (ee > 0) {
		let e = Math.sqrt(b / ee), t = Hs(ee);
		w = Array(a), T = Array(a);
		for (let n = 0; n < a; n++) {
			let r = Ls((u[n] - f) / p, d), i = 0;
			for (let e = 0; e <= d; e++) for (let t = 0; t <= d; t++) i += r[e] * g[e][t] * r[t];
			let a = t * e * Math.sqrt(Math.max(0, i));
			w[n] = C[n] - a, T[n] = C[n] + a;
		}
	}
	return new Is(n, u, C, w, T, Rs(_, f, p), S);
}
//#endregion
//#region src/dhole/plot/layers/statistical-layers.ts
var Ws = class extends Ft {
	constructor(e, t) {
		super(), r(this, "x", void 0), r(this, "y", void 0), r(this, "kind", "linear"), r(this, "degree", 2), r(this, "span", .75), r(this, "confidenceBand", !0), r(this, "showEquation", !1), this.x = Z.ofNumbers(e), this.y = Z.ofNumbers(t);
	}
	fit() {
		return Us(this.x.numbersOf, this.y.numbersOf, this.kind, this.degree, this.span);
	}
	plan(e) {
		return $.sameLength(this.x, this.y, "x", "y"), $.numbers(this.x, "trend's x values"), $.numbers(this.y, "trend's y values"), new Gs(this, e.seriesColor(this), this.fit());
	}
}, Gs = class extends Ro {
	constructor(e, t, n) {
		super(e), r(this, "trendLine", void 0), r(this, "color", void 0), r(this, "fit", void 0), this.trendLine = e, this.color = t, this.fit = n;
	}
	train(e) {
		let t = this.trendLine, n = this.fit;
		e.x.claim("number", t.x.name);
		let r = e.yOf(t);
		r.claim("number", t.y.name);
		for (let t of n.x) e.x.addValue(t);
		for (let e of n.y) r.addValue(e);
		if (t.confidenceBand && n.lower !== null && n.upper !== null) {
			for (let e of n.lower) r.addValue(e);
			for (let e of n.upper) r.addValue(e);
		}
	}
	draw(e) {
		let t = this.trendLine, n = this.fit, r = qo(e), i = Ko(e, t), a = n.x.map((e, t) => ({
			x: r.map(e),
			y: i.map(n.y[t])
		}));
		if (t.confidenceBand && n.lower !== null && n.upper !== null) {
			let a = new B();
			for (let e = 0; e < n.x.length; e++) {
				let t = r.map(n.x[e]), o = i.map(n.upper[e]);
				e === 0 ? a.moveTo(t, o) : a.lineTo(t, o);
			}
			for (let e = n.x.length - 1; e >= 0; e--) a.lineTo(r.map(n.x[e]), i.map(n.lower[e]));
			a.close(), e.sink.drawPath(a, Q.fill(Do(this.color, .15 * t.opacity)));
		}
		if (e.sink.drawPath(fs(a, "straight"), Q.stroke(Do(this.color, t.opacity), e.theme.lineWidth)), t.showEquation && n.kind !== "smooth" && a.length > 0) {
			let t = `${n.equation}   R² = ${So(n.rSquared, ".3f")}`, r = e.text.bounds(t, e.plot.right - 6, e.plot.top + 6, "dataLabel", "topRight");
			e.sink.drawRect(r.inflate(4, 2), Q.fill(Do(e.surface, .85))), e.text.draw(e.sink, t, e.plot.right - 6, e.plot.top + 6, "dataLabel", e.theme.secondaryInk, "topRight");
		}
	}
	addLegend(e) {
		e.add(this.trendLine.label, this.color, "line");
	}
}, Ks = 4, qs = 10, Js = class e {
	constructor() {
		r(this, "domain", void 0), r(this, "horizontal", void 0), r(this, "side", void 0), r(this, "ticks", void 0), r(this, "labelAngle", 0), r(this, "labelEvery", 1), r(this, "showLabels", !0), r(this, "showTitle", !0), r(this, "drawTickMarks", !1), r(this, "band", 0), r(this, "overhangStart", 0), r(this, "overhangEnd", 0), r(this, "tickLength", 0), r(this, "isValueAxis", !1);
	}
	static defaultCount(e, t) {
		return Math.min(Math.max(Math.trunc(e / (t ? 80 : 45)), 2), 10);
	}
	static measure(t, n, r, i, a, o, s, c) {
		let l = t.spec;
		i = Math.max(i, 10);
		let u = t.type === "category", d = l.tickCount ?? e.defaultCount(i, n), f = t.ticks(d), p = a.lineHeight("tick"), m = l.labelAngle ?? 0, h = 1;
		if (s && n && f.length > 1) {
			if (!u && l.tickValues === null && l.tickStep === null && l.tickCount === null && l.labelAngle === null) for (; d > 2 && Ys(t, f, i, a, o);) {
				let e = f.length;
				for (; d > 2 && t.ticks(--d).length >= e;);
				f = t.ticks(d);
			}
			else if (l.labelAngle === null && Ys(t, f, i, a, o)) {
				let e = i / Math.max(1, f.length);
				e * Math.sin(Math.PI / 4) >= p + 2 ? m = -45 : (m = -90, e < p + 2 && (h = Math.ceil((p + 2) / e)));
			}
		} else if (s && !n && f.length > 1 && !u && l.tickValues === null && l.tickStep === null && l.tickCount === null) for (; d > 2 && i / Math.max(1, f.filter((e) => e.label.length > 0).length - 1) < p + 4;) {
			let e = f.length;
			for (; d > 2 && t.ticks(--d).length >= e;);
			f = t.ticks(d);
		}
		else if (s && !n && u && f.length > 1) {
			let e = i / Math.max(1, f.length);
			e < p + 1 && (h = Math.ceil((p + 1) / e));
		}
		let g = o.tickLength > 0 && !u && (n ? o.axisLines : !o.gridY || l.grid === !1), _ = g ? o.tickLength : 0, v = 0;
		s && f.forEach((e, t) => {
			if (t % h !== 0 || e.label.length === 0) return;
			let r = Pt.rotated(a.measure(e.label, "tick"), m);
			v = Math.max(v, n ? r.height : r.width);
		});
		let y = c && l.title ? a.lineHeight("axisTitle") + o.textGap : 0, b = _ + (v > 0 ? Ks + v : 0) + y;
		b > 0 && (b += 2);
		let x = 0, S = 0;
		if (s && f.length > 0 && m === 0) {
			let e = [...new Mo(t, 0, i, f, o.barPadding).ticks].sort((e, t) => e.position - t.position), r = e[0], s = e[e.length - 1], c = n ? a.measure(r.label, "tick").width / 2 : p / 2, l = n ? a.measure(s.label, "tick").width / 2 : p / 2;
			x = Math.max(0, c - r.position), S = Math.max(0, l - (i - s.position));
		}
		return Object.assign(new e(), {
			domain: t,
			horizontal: n,
			side: r,
			ticks: f,
			labelAngle: m,
			labelEvery: h,
			showLabels: s,
			showTitle: c,
			drawTickMarks: g,
			tickLength: _,
			band: b,
			overhangStart: x,
			overhangEnd: S
		});
	}
	scaleOver(e, t, n) {
		return new Mo(this.domain, e, t, this.ticks, n.barPadding);
	}
	draw(e, t, n, r) {
		let i = t.theme, a = t.text, o = this.domain.spec;
		if (!o.visible) return;
		let s = i.hairlineWidth;
		if (this.horizontal) {
			let c = this.side !== "top", l = c ? r.bottom : r.top, u = c ? 1 : -1;
			if (i.axisLines && !i.frame) {
				let n = Jo(t, l, s);
				e.drawLine(r.left, n, r.right, n, Q.hairline(i.axisLine, s));
			}
			if (this.drawTickMarks) for (let a of n.ticks) {
				let n = Jo(t, a.position, s);
				n < r.left - .5 || n > r.right + .5 || e.drawLine(n, l, n, l + u * (a.isMajor ? this.tickLength : this.tickLength / 2), Q.hairline(i.axisLine, s));
			}
			let d = this.tickLength + Ks, f = 0;
			if (this.showLabels) {
				let t = 0;
				for (let o of n.ticks) {
					if (t++ % this.labelEvery !== 0 || o.label.length === 0) continue;
					let n = o.position;
					if (n < r.left - 1 || n > r.right + 1) continue;
					let s = l + u * d;
					if (this.labelAngle === 0) a.draw(e, o.label, n, s, "tick", i.secondaryInk, c ? "top" : "bottom");
					else {
						let t = a.lineHeight("tick");
						c ? a.draw(e, o.label, n - (this.labelAngle === -90 ? t / 2 : t * .35), s, "tick", i.secondaryInk, "topRight", this.labelAngle) : a.draw(e, o.label, n, s, "tick", i.secondaryInk, "bottomLeft", this.labelAngle);
					}
					let p = Pt.rotated(a.measure(o.label, "tick"), this.labelAngle);
					f = Math.max(f, p.height);
				}
			}
			if (this.showTitle && o.title) {
				let t = l + u * (d + f + i.textGap);
				a.draw(e, o.title, (r.left + r.right) / 2, t, "axisTitle", i.secondaryInk, c ? "top" : "bottom");
			}
		} else {
			let c = this.side !== "right", l = c ? r.left : r.right, u = c ? -1 : 1, d = o.grid ?? (this.isValueAxis ? i.gridY : i.gridX);
			if (i.axisLines && !i.frame && (!d || this.domain.type === "category")) {
				let n = Jo(t, l, s);
				e.drawLine(n, r.top, n, r.bottom, Q.hairline(i.axisLine, s));
			}
			if (this.drawTickMarks) for (let a of n.ticks) {
				let n = Jo(t, a.position, s);
				n < r.top - .5 || n > r.bottom + .5 || e.drawLine(l, n, l + u * (a.isMajor ? this.tickLength : this.tickLength / 2), n, Q.hairline(i.axisLine, s));
			}
			let f = this.tickLength + Ks, p = 0;
			if (this.showLabels) {
				let t = 0;
				for (let o of n.ticks) {
					if (t++ % this.labelEvery !== 0 || o.label.length === 0) continue;
					let n = o.position;
					n < r.top - 1 || n > r.bottom + 1 || (a.draw(e, o.label, l + u * f, n, "tick", i.secondaryInk, c ? "right" : "left", this.labelAngle), p = Math.max(p, Pt.rotated(a.measure(o.label, "tick"), this.labelAngle).width));
				}
			}
			if (this.showTitle && o.title) {
				let t = l + u * (f + p + i.textGap), n = (r.top + r.bottom) / 2;
				a.draw(e, o.title, t, n, "axisTitle", i.secondaryInk, "bottom", c ? -90 : 90);
			}
		}
	}
	drawGrid(e, t, n, r) {
		let i = t.theme;
		if (!(this.domain.spec.grid ?? (this.isValueAxis ? i.gridY : i.gridX)) || this.domain.type === "category") return;
		let a = i.hairlineWidth;
		for (let o of n.ticks) {
			if (!o.isMajor) continue;
			let n = Jo(t, o.position, a);
			if (this.horizontal) {
				if (n < r.left - .5 || n > r.right + .5) continue;
				e.drawLine(n, r.top, n, r.bottom, Q.hairline(i.grid, a));
			} else {
				if (n < r.top - .5 || n > r.bottom + .5) continue;
				e.drawLine(r.left, n, r.right, n, Q.hairline(i.grid, a));
			}
		}
	}
	drawZero(e, t, n, r) {
		if (this.domain.type !== "linear" && this.domain.type !== "symlog" && this.domain.type !== "sqrt" || !(this.domain.min < 0 && this.domain.max > 0) || !this.domain.wantsZero) return;
		let i = t.theme.hairlineWidth, a = Jo(t, n.map(0), i);
		this.horizontal ? e.drawLine(a, r.top, a, r.bottom, Q.hairline(t.theme.axisLine, i)) : e.drawLine(r.left, a, r.right, a, Q.hairline(t.theme.axisLine, i));
	}
};
function Ys(e, t, n, r, i) {
	let a = new Mo(e, 0, n, t, i.barPadding).ticks.filter((e) => e.label.length > 0).map((e) => ({
		position: e.position,
		width: r.measure(e.label, "tick").width
	})).sort((e, t) => e.position - t.position);
	for (let e = 1; e < a.length; e++) if (a[e].position - a[e - 1].position < (a[e].width + a[e - 1].width) / 2 + qs) return !0;
	return !1;
}
//#endregion
//#region src/dhole/plot/legend-painter.ts
var Xs = 12, Zs = 18, Qs = 6, $s = 16, ec = 4, tc = 12, nc = class {
	constructor(e, t, n, i, a) {
		r(this, "theme", void 0), r(this, "text", void 0), r(this, "items", void 0), r(this, "bar", void 0), r(this, "title", void 0), this.theme = e, this.text = t, this.items = n, this.bar = i, this.title = a ?? i?.title ?? null;
	}
	get isEmpty() {
		return this.items.length === 0 && this.bar === null;
	}
	get titleBlock() {
		return this.title ? this.text.lineHeight("legendTitle") + ec : 0;
	}
	get rowHeight() {
		return Math.max(this.text.lineHeight("legend"), Xs);
	}
	perColumn(e) {
		return Math.max(1, Math.trunc((e - this.titleBlock + ec + .001) / (this.rowHeight + ec)));
	}
	columnHeight(e) {
		return this.titleBlock + e * this.rowHeight + (e - 1) * ec;
	}
	swatchWidth(e) {
		return e.swatch === "line" || e.swatch === "lineAndPoint" ? Zs : Xs;
	}
	entryWidth(e) {
		return this.swatchWidth(e) + Qs + this.text.measure(e.label, "legend").width;
	}
	measureColumn(e) {
		if (this.isEmpty) return {
			width: 0,
			height: 0
		};
		if (this.bar !== null) return this.measureBar(e);
		let t = this.title ? this.text.measure(this.title, "legendTitle").width : 0, n = this.perColumn(e), r = Math.ceil(this.items.length / n), i = 0;
		for (let e = 0; e < r; e++) {
			let t = Math.max(...this.items.slice(e * n, (e + 1) * n).map((e) => this.entryWidth(e)));
			i += t + (e > 0 ? $s : 0);
		}
		let a = Math.min(this.items.length, n);
		return {
			width: Math.max(i, t),
			height: this.columnHeight(a)
		};
	}
	measureRow(e) {
		if (this.isEmpty) return {
			width: 0,
			height: 0
		};
		if (this.bar !== null) {
			let t = this.text.lineHeight("tick");
			return {
				width: e,
				height: this.titleBlock + tc + 4 + t
			};
		}
		let t = this.flowRows(e).length;
		return {
			width: e,
			height: this.columnHeight(t)
		};
	}
	flowRows(e) {
		let t = [[]], n = 0;
		for (let r of this.items) {
			let i = this.entryWidth(r);
			t[t.length - 1].length > 0 && n + $s + i > e && (t.push([]), n = 0), n += (t[t.length - 1].length > 0 ? $s : 0) + i, t[t.length - 1].push(r);
		}
		return t;
	}
	measureBar(e) {
		let [t, n] = this.barTicks(), r = t.length === 0 ? 0 : Math.max(...t.map((e) => this.text.measure(n(e), "tick").width)), i = this.title ? this.text.measure(this.title, "legendTitle").width : 0, a = Math.min(e, 220);
		return {
			width: Math.max(16 + r, i),
			height: a
		};
	}
	barTicks() {
		let e = this.bar;
		return [Ha(e.low, e.high, 5), e.spec.format === null ? Ka(e.low, e.high, 5, null) : Co(e.spec.format)];
	}
	drawColumn(e, t) {
		let n = [], r = t.top;
		if (this.title && (this.text.draw(e, this.title, t.left, r, "legendTitle", this.theme.secondaryInk, "topLeft"), r += this.titleBlock), this.bar !== null) throw Error("A colour bar is not drawn on this page.");
		let i = this.perColumn(t.height), a = t.left;
		for (let t = 0; t < this.items.length; t += i) {
			let o = this.items.slice(t, t + i), s = Math.max(...o.map((e) => this.entryWidth(e))), c = r;
			for (let t of o) n.push(this.drawEntry(e, t, a, c)), c += this.rowHeight + ec;
			a += s + $s;
		}
		return n;
	}
	drawRows(e, t) {
		let n = [], r = t.top;
		if (this.title && (this.text.draw(e, this.title, t.left, r, "legendTitle", this.theme.secondaryInk, "topLeft"), r += this.titleBlock), this.bar !== null) throw Error("A colour bar is not drawn on this page.");
		for (let i of this.flowRows(t.width)) {
			let a = t.left;
			for (let t of i) n.push(this.drawEntry(e, t, a, r)), a += this.entryWidth(t) + $s;
			r += this.rowHeight + ec;
		}
		return n;
	}
	drawEntry(e, t, n, r) {
		let i = r + this.rowHeight / 2, a = this.swatchWidth(t);
		switch (t.swatch) {
			case "line":
				e.drawLine(n, i, n + a, i, Q.stroke(t.color, this.theme.lineWidth));
				break;
			case "lineAndPoint":
				e.drawLine(n, i, n + a, i, Q.stroke(t.color, this.theme.lineWidth)), e.drawPath(new B().addCircle(n + a / 2, i, this.theme.pointSize / 2), Q.fill(t.color));
				break;
			case "point":
				e.drawPath(new B().addCircle(n + Xs / 2, i, this.theme.pointSize / 2), Q.fill(t.color));
				break;
			default: e.drawPath(new B().addRoundRect(z.fromXYWH(n, i - Xs / 2, Xs, Xs), 2.5, 2.5), Q.fill(t.color));
		}
		let o = n + a + Qs;
		this.text.draw(e, t.label, o, i, "legend", this.theme.secondaryInk, "left");
		let s = this.text.measure(t.label, "legend").width;
		return {
			label: t.label,
			box: new z(n, r, o + s, r + this.rowHeight)
		};
	}
}, rc = (e) => e.trained, ic = (e) => e.chart.x ?? Fa, ac = (e) => e.chart.y ?? Fa, oc = (e) => e.chart.legend ?? Ia;
function sc(e, t) {
	let n = t.map((e) => new zo(new No(ic(e), "horizontal"), new No(ac(e), "vertical"), new No(e.chart.y2 ?? Fa, "second vertical"), new Bo()));
	t.forEach((e, t) => {
		for (let r of e.layers) r.train?.(n[t]);
	}), t.forEach((t, r) => {
		let i = n[r], a = null, o = null, s = null;
		t.frame === "cartesian" && (a = Fo.resolve(i.x, e.notes), o = Fo.resolve(i.y, e.notes), i.y2.used && (s = Fo.resolve(i.y2, e.notes)));
		let c = new Vo(i.color, t.chart.color ?? La, e.theme), l = new Ho(c);
		for (let e of t.layers) e.addLegend?.(l);
		let u = oc(t), d = u.items ?? l.items, f = d.length >= 2 || l.colorBar !== null, p = u.visible ?? f;
		t.legend = new nc(e.theme, e.text, p ? d : [], p ? l.colorBar : null, u.title), t.legendItems = d, t.legendVisible = p, t.trained = {
			training: i,
			x: a,
			y: o,
			y2: s,
			colors: c
		}, t.drawExtras = { colors: c };
	});
}
var cc = class e {
	constructor() {
		r(this, "cell", void 0), r(this, "xAxis", void 0), r(this, "yAxis", void 0), r(this, "y2Axis", null), r(this, "legend", null), r(this, "titleTop", 0), r(this, "plot", void 0), r(this, "inner", void 0), r(this, "planOf", void 0), r(this, "forcedLeft", null), r(this, "forcedBottom", null);
	}
	static measure(t, n, r, i, a, o, s = null, c = null) {
		let l = n.top, u = l;
		t.chart.title && (l += i.lineHeight("chartTitle") + r.textGap);
		let d = new z(n.left, l, n.right, n.bottom), f = null;
		if (!t.legend.isEmpty) {
			let e = r.textGap * 2;
			switch (oc(t).position) {
				case "right": {
					let n = t.legend.measureColumn(d.height);
					f = z.fromXYWH(d.right - n.width, d.top, n.width, n.height), d = new z(d.left, d.top, d.right - n.width - e, d.bottom);
					break;
				}
				case "left": {
					let n = t.legend.measureColumn(d.height);
					f = z.fromXYWH(d.left, d.top, n.width, n.height), d = new z(d.left + n.width + e, d.top, d.right, d.bottom);
					break;
				}
				case "top": {
					let n = t.legend.measureRow(d.width);
					f = z.fromXYWH(d.left, d.top, d.width, n.height), d = new z(d.left, d.top + n.height + e, d.right, d.bottom);
					break;
				}
				case "bottom": {
					let n = t.legend.measureRow(d.width);
					f = z.fromXYWH(d.left, d.bottom - n.height, d.width, n.height), d = new z(d.left, d.top, d.right, d.bottom - n.height - e);
					break;
				}
				default: {
					let e = t.legend.measureColumn(d.height / 2);
					f = z.fromXYWH(0, 0, e.width, e.height);
					break;
				}
			}
		}
		let p = Object.assign(new e(), {
			cell: n,
			inner: d,
			titleTop: u,
			legend: f,
			planOf: t,
			forcedLeft: s,
			forcedBottom: c
		});
		return p.fit(r, i, a, o), p;
	}
	fit(e, t, n, r) {
		let i = this.planOf, a = rc(i), o = a.x, s = a.y, c = o.spec, l = s.spec, u = c.visible, d = l.visible, f = c.side === "top" ? "top" : "bottom", p = l.side === "right" ? "right" : "left", m = a.training.y2.used, h = i.layers.length === 0 ? 0 : Math.max(...i.layers.map((e) => e.overhang?.(t) ?? 0)), g = this.inner.width * .8, _ = this.inner.height * .8, v, y, b = null, x = (e, t) => this.forcedLeft ?? Math.max(t, e.overhangStart), S = (e) => u ? this.forcedBottom ?? (n ? e.band : e.tickLength) : 0;
		for (let i = 0; i < 4; i++) {
			y = Js.measure(s, !1, p, _, t, e, d && r, d && r), b = m && a.y2 !== null ? Js.measure(a.y2, !1, "right", _, t, e, a.y2.spec.visible, a.y2.spec.visible) : null;
			let c = d ? y.band : 0, l = b?.band ?? 0;
			p === "right" && ([c, l] = [l, c]);
			let C = Math.max(10, this.inner.width - (this.forcedLeft ?? c) - l);
			v = Js.measure(o, !0, f, C, t, e, u && n, u && n), C = Math.max(10, this.inner.width - x(v, c) - Math.max(l, v.overhangEnd));
			let w = Math.max(h, y.overhangEnd), T = Math.max(10, this.inner.height - S(v) - w), ee = Math.abs(C - g) < .5 && Math.abs(T - _) < .5;
			if (g = C, _ = T, ee && i > 0) break;
		}
		let C = o.type !== "category" && s.type === "category";
		v.isValueAxis = C, y.isValueAxis = s.type !== "category" && !C, b !== null && (b.isValueAxis = !0), this.xAxis = v, this.yAxis = y, this.y2Axis = b;
		let w = d ? y.band : 0, T = b?.band ?? 0;
		p === "right" && ([w, T] = [T, w]);
		let ee = this.inner.left + x(v, w), te = this.inner.right - Math.max(T, v.overhangEnd), ne = this.inner.top + Math.max(h, y.overhangEnd), re = this.inner.bottom - S(v);
		if (f === "top") {
			let e = this.inner.bottom - re;
			ne = this.inner.top + e, re = this.inner.bottom - Math.max(h, y.overhangStart);
		}
		let E = new z(ee, ne, Math.max(ee + 10, te), Math.max(ne + 10, re));
		if (i.chart.equalAspect && o.type !== "category" && s.type !== "category") {
			let e = o.max - o.min, t = s.max - s.min;
			if (e > 0 && t > 0) {
				let n = Math.min(E.width / e, E.height / t), r = e * n, i = t * n;
				E = z.fromXYWH(E.left + (E.width - r) / 2, E.top + (E.height - i) / 2, r, i);
			}
		}
		if (this.plot = E, this.legend !== null) {
			let e = this.legend, t = oc(i).position;
			this.legend = t === "right" || t === "left" ? z.fromXYWH(e.left, E.top, e.width, e.height) : t === "top" || t === "bottom" ? z.fromXYWH(E.left, e.top, Math.max(10, this.cell.right - E.left), e.height) : qt(t, E, {
				width: e.width,
				height: e.height
			});
		}
	}
};
function lc(e, t, n, r) {
	for (let i of t.layers) {
		let t = e.sink.save();
		try {
			i.clipToPlot && e.sink.clipRect(r.inflate(2)), i.draw(n);
		} finally {
			e.sink.restoreToCount(t);
		}
	}
}
function uc(e, t, n) {
	let { sink: r, theme: i, text: a } = e, o = n.plot, s = n.xAxis.scaleOver(o.left, o.right, i), c = n.yAxis.scaleOver(o.bottom, o.top, i), l = n.y2Axis?.scaleOver(o.bottom, o.top, i) ?? null, u = e.context(t, o, {
		x: s,
		y: c,
		y2: l
	}), d = t.chart.plotBackground ?? i.plotBackground;
	if (d.a > 0 && r.drawRect(o, Q.fill(d)), n.xAxis.drawGrid(r, u, s, o), n.yAxis.drawGrid(r, u, c, o), t.layers.length === 0 && a.draw(r, "No data", o.midX, o.midY, "dataLabel", i.mutedInk, "center"), lc(e, t, u, o), n.xAxis.drawZero(r, u, s, o), n.yAxis.drawZero(r, u, c, o), i.frame) {
		let e = i.hairlineWidth, t = new z(Jo(u, o.left, e), Jo(u, o.top, e), Jo(u, o.right, e), Jo(u, o.bottom, e));
		r.drawRect(t, Q.hairline(i.axisLine, e));
	}
	n.xAxis.draw(r, u, s, o), n.yAxis.draw(r, u, c, o), n.y2Axis !== null && l !== null && n.y2Axis.draw(r, u, l, o), e.drawLegendAndTitle(t, n.cell, o, n.legend, n.titleTop);
}
function dc(e, t, n) {
	let { sink: r, theme: i, text: a } = e, { area: o, legend: s, titleTop: c } = e.reserve(t, n), l = new Wo();
	for (let e of t.layers) e.trainPolar?.(l);
	let u = ac(t), d = {
		...u,
		includeZero: u.includeZero ?? !0,
		nice: !0
	}, f = new No(d, "radial");
	f.addValue(l.low), f.addValue(l.high), f.wantsZero = !0;
	let p = Fo.resolve(f, e.notes), m = d.tickCount ?? 4;
	if (d.max === null && p.type === "linear") {
		let e = Ga([p.min, p.max], m);
		p = Fo.continuous("linear", e[0], e[e.length - 1], d);
	}
	let h = p.ticks(m), g = l.spokes.length === 0 ? 0 : Math.max(...l.spokes.map((e) => a.measure(e, "tick").width)), _ = a.lineHeight("tick"), v = Math.max(10, Math.min(o.width / 2 - g - 8, o.height / 2 - _ - 8)), y = new Uo(o.midX, o.midY, v, l.spokes, p, h), b = e.context(t, o, { polar: y }), x = i.hairlineWidth;
	for (let e of h) {
		if (e.value <= p.min) continue;
		let t = new B();
		for (let n = 0; n < Math.max(3, l.spokes.length); n++) {
			let r = l.spokes.length >= 3 ? y.point(n, e.value) : {
				x: y.centerX,
				y: y.centerY
			};
			n === 0 ? t.moveTo(r.x, r.y) : t.lineTo(r.x, r.y);
		}
		t.close(), l.spokes.length < 3 && (t = new B().addCircle(y.centerX, y.centerY, y.radiusOf(e.value))), r.drawPath(t, Q.hairline(i.grid, x));
	}
	for (let e = 0; e < l.spokes.length; e++) {
		let t = y.point(e, p.max);
		r.drawLine(y.centerX, y.centerY, t.x, t.y, Q.hairline(i.grid, x));
		let n = y.angle(e), o = y.centerX + (v + 8) * Math.sin(n), s = y.centerY - (v + 8) * Math.cos(n), c = Math.sin(n), u = Math.abs(c) < .2 ? Math.cos(n) > 0 ? "bottom" : "top" : c > 0 ? "left" : "right";
		a.draw(r, l.spokes[e], o, s, "tick", i.secondaryInk, u);
	}
	for (let e of h) {
		if (e.value <= p.min || !e.label) continue;
		let t = l.spokes.length >= 2 ? y.angle(.5) : Math.PI / 4, n = y.radiusOf(e.value) * (l.spokes.length >= 3 ? Math.cos(Math.PI / l.spokes.length) : 1);
		a.draw(r, e.label, y.centerX + n * Math.sin(t) + 2, y.centerY - n * Math.cos(t), "tick", i.mutedInk, "left");
	}
	for (let e of t.layers) e.draw(b);
	let S = z.fromCenter({
		x: y.centerX,
		y: y.centerY
	}, v * 2, v * 2);
	e.drawLegendAndTitle(t, n, S, s, c);
}
Ht({
	train: sc,
	draw(e, t, n) {
		t.frame === "polar" ? dc(e, t, n) : uc(e, t, cc.measure(t, n, e.theme, e.text, !0, !0));
	}
});
//#endregion
//#region src/dhole/kinds/charts.ts
var fc = (e) => e === 1 ? "" : "s", pc = (e) => Array.from({ length: e }, (e, t) => t + 1), mc = class extends Ze {
	constructor(...e) {
		super(...e), r(this, "slices", []), r(this, "hole", 0), r(this, "labels", "percent"), r(this, "keepOrder", !1), r(this, "centre", null);
	}
	get isEmpty() {
		return this.slices.length === 0;
	}
	build(e, t) {
		let n = new Os(this.slices.map((e) => e.name), this.slices.map((e) => e.value));
		n.hole = this.hole, n.keepOrder = this.keepOrder, n.sliceLabels = this.labels, n.centerText = this.hole > 0 ? this.centre : null;
		let r = this.slices.reduce((e, t) => e + t.value, 0);
		return {
			chart: Tc(n),
			naturalWidth: null,
			naturalHeight: null,
			summary: `A ${this.hole > 0 ? "donut" : "pie"} chart of ${this.slices.length} slice${fc(this.slices.length)} adding up to ${vo(r, 3, !1)}.`
		};
	}
}, hc = class extends $e {
	constructor(e) {
		super(e), r(this, "own", void 0), this.own = new mc(e.kind, e.kindLine), (e.kindWord === "donut" || e.kindWord === "doughnut" || e.kindWord === "ring") && (this.own.hole = .6);
	}
	get spec() {
		return this.own;
	}
	get settings() {
		let e = this.own;
		return [
			M(["hole", "donut"], (t) => {
				let n = De(t.text);
				if (n !== null) {
					e.hole = n ? .6 : 0;
					return;
				}
				let r = this.readNumber(t, !0);
				r !== null && (e.hole = Math.min(Math.max(r > 1 ? r / 100 : r, 0), .9));
			}),
			M([
				"labels",
				"show",
				"slices"
			], (t) => {
				let n = this.readChoice(t, "labels", [[
					"percent",
					"percentage",
					"share",
					"shares"
				], "percent"], [[
					"value",
					"values",
					"amount",
					"amounts"
				], "value"], [["name", "names"], "name"], [[
					"name and percent",
					"both",
					"all"
				], "nameAndPercent"], [[
					"none",
					"off",
					"nothing"
				], "none"]);
				n !== null && (e.labels = n);
			}),
			M(["order", "sort"], (t) => {
				let n = this.readChoice(t, "order", [[
					"size",
					"largest first",
					"biggest first",
					"value"
				], !1], [[
					"written",
					"as written",
					"given",
					"keep",
					"text"
				], !0]);
				n !== null && (e.keepOrder = n);
			}),
			M([
				"centre",
				"center",
				"middle",
				"total"
			], (t) => e.centre = this.text(t))
		];
	}
	content(e) {
		let t = e.content, { head: n, tail: r } = E(t);
		if (r !== null && k(n.text) === "slice") {
			let e = ie(r);
			e.length === 2 && (n = e[0], r = e[1]);
		}
		if (r === null || n.isEmpty) {
			this.problems.error(t, "NoData");
			return;
		}
		if (this.settingSlip(n, r)) return;
		let i = D(n, this.problems), a = this.readNumber(r);
		a !== null && (a <= 0 ? this.problems.warning(t, "SliceNotPositive", i) : this.own.slices.push({
			name: i,
			value: a
		})), this.unindent(e, (e) => this.content(e));
	}
	finish() {
		this.own.slices.length === 0 && this.problems.error(this.context.kindLine.content, "NoData");
	}
}, gc = class {
	constructor(e) {
		r(this, "name", void 0), r(this, "values", []), r(this, "points", []), r(this, "hue", null), this.name = e;
	}
}, _c = class e extends Ze {
	constructor(e, t) {
		super(e.kind, e.kindLine), r(this, "shape", void 0), r(this, "labels", null), r(this, "series", []), r(this, "xTitle", null), r(this, "yTitle", null), r(this, "yRange", null), r(this, "xRange", null), r(this, "stack", "grouped"), r(this, "horizontal", !1), r(this, "valueLabels", !1), r(this, "curve", "straight"), r(this, "markers", !1), r(this, "area", !1), r(this, "trend", !1), r(this, "connect", !1), this.shape = t;
	}
	get isEmpty() {
		return this.series.length === 0;
	}
	build(t, n) {
		let r = [], i, a = () => this.series.length === 0 ? 0 : Math.max(...this.series.map((e) => e.values.length));
		switch (this.shape) {
			case "bar":
				if (this.labels === null) {
					let e = new Ms(this.series.map((e) => e.name), this.series.map((e) => e.values[0] ?? 0));
					e.horizontal = this.horizontal, e.valueLabels = this.valueLabels, r.push(e), i = `A bar chart of ${this.series.length} bar${fc(this.series.length)}.`;
				} else {
					let e = [], t = [], n = [];
					for (let r of this.series) for (let i = 0; i < this.labels.length; i++) e.push(this.labels[i]), t.push(r.name), n.push(i < r.values.length ? r.values[i] : NaN);
					let a = new Ms(Z.ofTexts(e), n);
					a.colorBy = this.series.length > 1 ? Z.ofTexts(t) : null, a.mode = this.stack, a.horizontal = this.horizontal, a.valueLabels = this.valueLabels, r.push(a), i = `A bar chart of ${this.series.length} series over ${this.labels.length} label${fc(this.labels.length)}.`;
				}
				break;
			case "line": {
				let e = this.labels === null ? Z.ofNumbers(pc(a())) : Z.ofTexts(this.labels);
				for (let t of this.series) {
					let n = Array.from({ length: e.count }, (e, n) => n < t.values.length ? t.values[n] : NaN);
					if (this.area) {
						let i = new Ss(e, n);
						i.label = t.name, i.shape = this.curve, i.stack = this.stack, i.color = this.colour(t), r.push(i);
					} else {
						let i = new vs(e, n);
						i.label = t.name, i.shape = this.curve, i.markers = this.markers, i.color = this.colour(t), r.push(i);
					}
				}
				i = `A line chart of ${this.series.length} line${fc(this.series.length)} over ${e.count} point${fc(e.count)}.`;
				break;
			}
			case "xy": {
				let t = [], n = 0;
				for (let i of this.series) {
					if (i.points.length === 1 && i.values.length === 0 && e.isLabelledPoint(i)) {
						t.push({
							name: i.name,
							x: i.points[0].x,
							y: i.points[0].y
						});
						continue;
					}
					let a = i.points.map((e) => e.x), o = i.points.map((e) => e.y), s = this.colour(i) ?? this.theme.palette.at(n++);
					if (this.connect) {
						let e = new vs(a, o);
						e.label = i.name, e.markers = !0, e.color = s, r.push(e);
					} else {
						let e = new bs(a, o);
						e.label = i.name, e.color = s, r.push(e);
					}
					if (this.trend && a.length >= 2) {
						let e = new Ws(a, o);
						e.label = null, e.confidenceBand = !1, e.color = s, r.push(e);
					}
				}
				if (t.length > 0) {
					r.push(new bs(t.map((e) => e.x), t.map((e) => e.y)));
					let e = new Ps(t.map((e) => e.x), t.map((e) => e.y), t.map((e) => e.name));
					e.anchor = "right", e.offset = 8, r.push(e);
				}
				let a = this.series.reduce((e, t) => e + t.points.length, 0);
				i = `A scatter chart of ${a} point${fc(a)}${this.series.length - t.length > 1 ? ` in ${this.series.length - t.length} series` : ""}.`;
				break;
			}
			default: {
				let e = this.labels ?? pc(a()).map(String);
				for (let t of this.series) {
					let n = new As(e, e.map((e, n) => n < t.values.length ? t.values[n] : 0));
					n.label = t.name, n.color = this.colour(t), r.push(n);
				}
				i = `A radar chart of ${this.series.length} subject${fc(this.series.length)} on ${e.length} spoke${fc(e.length)}.`;
				break;
			}
		}
		let o = {
			layers: r,
			x: Fa,
			y: Fa
		}, s = this.horizontal && this.shape === "bar";
		if ((this.xTitle !== null || this.yTitle !== null) && (o = s ? {
			...o,
			x: {
				...o.x,
				title: this.yTitle
			},
			y: {
				...o.y,
				title: this.xTitle
			}
		} : {
			...o,
			x: {
				...o.x,
				title: this.xTitle
			},
			y: {
				...o.y,
				title: this.yTitle
			}
		}), this.yRange !== null) {
			let { low: e, high: t } = this.yRange;
			o = s ? {
				...o,
				x: {
					...o.x,
					min: e,
					max: t
				}
			} : {
				...o,
				y: {
					...o.y,
					min: e,
					max: t
				}
			};
		}
		return this.xRange !== null && (o = {
			...o,
			x: {
				...o.x,
				min: this.xRange.low,
				max: this.xRange.high
			}
		}), {
			chart: o,
			naturalWidth: null,
			naturalHeight: null,
			summary: i
		};
	}
	static isLabelledPoint(e) {
		return e.name.length > 0 && !e.name.toLowerCase().startsWith("series");
	}
	colour(e) {
		return e.hue === null ? null : e.hue.in(this.theme);
	}
}, vc = class e extends $e {
	constructor(e, t) {
		super(e), r(this, "own", void 0), r(this, "sawOne", !1), r(this, "sawMany", !1), r(this, "mixedAt", null), r(this, "lines", /* @__PURE__ */ new Map()), this.own = new _c(e, t);
	}
	get spec() {
		return this.own;
	}
	get settings() {
		let e = this.own, t = [
			M([
				"labels",
				"categories",
				"x labels",
				"spokes",
				"axes",
				"columns"
			], (t) => e.labels = ie(t).filter((e) => !e.isEmpty).map((e) => D(e, this.problems))),
			M([
				"x axis",
				"x title",
				"xaxis",
				"horizontal axis"
			], (t) => e.xTitle = this.text(t)),
			M([
				"y axis",
				"y title",
				"yaxis",
				"vertical axis"
			], (t) => e.yTitle = this.text(t)),
			M([
				"range",
				"y range",
				"scale"
			], (t) => e.yRange = this.readRange(t))
		];
		switch (e.shape) {
			case "bar":
				t.push(M(["stack", "stacked"], (t) => {
					let n = k(t.text);
					if (n === "percent" || n === "100" || n === "100percent" || n === "share") {
						e.stack = "percent";
						return;
					}
					let r = this.readSwitch(t);
					r !== null && (e.stack = r ? "stacked" : "grouped");
				})), t.push(M([
					"direction",
					"orientation",
					"bars"
				], (t) => {
					let n = this.readChoice(t, "direction", [[
						"up",
						"vertical",
						"columns",
						"column"
					], !1], [[
						"right",
						"horizontal",
						"across",
						"sideways",
						"rows"
					], !0]);
					n !== null && (e.horizontal = n);
				})), t.push(M([
					"values",
					"value labels",
					"numbers"
				], (t) => {
					let n = this.readSwitch(t);
					n !== null && (e.valueLabels = n);
				}));
				break;
			case "line":
				t.push(M([
					"shape",
					"curve",
					"lines"
				], (t) => {
					let n = this.readChoice(t, "shape", [["straight", "linear"], "straight"], [[
						"smooth",
						"curved",
						"round"
					], "smooth"], [[
						"step",
						"steps",
						"stepped"
					], "stepAfter"]);
					n !== null && (e.curve = n);
				})), t.push(M([
					"points",
					"markers",
					"dots"
				], (t) => {
					let n = this.readSwitch(t);
					n !== null && (e.markers = n);
				})), t.push(M([
					"area",
					"fill",
					"filled"
				], (t) => {
					let n = this.readSwitch(t);
					n !== null && (e.area = n);
				})), t.push(M(["stack", "stacked"], (t) => {
					let n = this.readSwitch(t);
					n !== null && (e.stack = n ? "stacked" : "grouped");
				}));
				break;
			case "xy": t.push(M(["x range"], (t) => e.xRange = this.readRange(t))), t.push(M([
				"trend",
				"fit",
				"trend line"
			], (t) => {
				let n = this.readSwitch(t);
				n !== null && (e.trend = n);
			})), t.push(M([
				"lines",
				"connect",
				"joined"
			], (t) => {
				let n = this.readSwitch(t);
				n !== null && (e.connect = n);
			}));
		}
		return t;
	}
	content(t) {
		let n = t.content, { head: r, tail: i } = E(n);
		if (i === null) {
			this.problems.error(n, "NoData");
			return;
		}
		if (this.settingSlip(r, i)) return;
		let a = O(r, this.problems), o = new gc(a.name);
		for (let e of a.attributes) {
			let t = W.hue(e.text);
			t === null ? this.unknownAttribute(e, new l("a series", "数据系列"), W.names) : o.hue = H.hue(t);
		}
		let s = i;
		if (this.own.shape === "xy" && s.text.includes("(")) for (let t of e.points(s)) {
			let e = bc(yc(t.text.trim(), "("), ")").split(",").map((e) => e.trim()), n = e.length === 2 ? Ce(e[0]) : NaN, r = e.length === 2 ? Ce(e[1]) : NaN;
			e.length === 2 && !Number.isNaN(n) && !Number.isNaN(r) ? o.points.push({
				x: n,
				y: r
			}) : this.problems.error(t, "PointNotPair", t.text.trim());
		}
		else {
			let t = ie(s);
			t.length === 1 && t[0].text.includes(" ") && (t = e.splitSpaces(t[0]));
			for (let e of t) {
				if (e.isEmpty) continue;
				let t = Ce(e.text);
				Number.isNaN(t) ? this.problems.error(e, "BadNumber", e.text) : o.values.push(t);
			}
			this.own.shape === "xy" && o.values.length === 2 && (o.points.push({
				x: o.values[0],
				y: o.values[1]
			}), o.values.length = 0);
		}
		o.values.length === 1 && (this.sawOne = !0), o.values.length > 1 && (this.sawMany = !0), this.sawOne && this.sawMany && this.mixedAt === null && (this.mixedAt = n), this.own.series.push(o), this.lines.set(o, n), this.unindent(t, (e) => this.content(e));
	}
	static points(e) {
		let t = [], n = -1;
		for (let r = 0; r < e.length; r++) e.at(r) === "(" ? n = r : e.at(r) === ")" && n >= 0 && (t.push(e.slice(n, r - n + 1)), n = -1);
		return t;
	}
	static splitSpaces(e) {
		let t = [], n = -1;
		for (let r = 0; r <= e.length; r++) {
			let a = r === e.length || i(e.at(r));
			!a && n < 0 ? n = r : a && n >= 0 && (t.push(e.slice(n, r - n)), n = -1);
		}
		return t;
	}
	finish() {
		let e = this.own;
		if (e.shape === "xy" && e.series.length === 2 && k(e.series[0].name) === "x" && k(e.series[1].name) === "y") {
			let [t, n] = e.series, r = [...t.values, ...t.points.flatMap((e) => [e.x, e.y])], i = [...n.values, ...n.points.flatMap((e) => [e.x, e.y])], a = new gc("Series");
			for (let e = 0; e < Math.min(r.length, i.length); e++) a.points.push({
				x: r[e],
				y: i[e]
			});
			e.series.length = 0, e.series.push(a);
		}
		if (e.series.length === 0) this.problems.error(this.context.kindLine.content, "NoData");
		else if (e.shape === "bar" && e.labels === null && this.sawMany && (e.labels = pc(Math.max(...e.series.map((e) => e.values.length))).map(String), this.sawOne && this.mixedAt !== null && this.problems.warning(this.mixedAt, "MixedSeries", e.kind.name)), e.labels !== null) {
			for (let t of e.series) if (t.values.length > 0 && t.values.length !== e.labels.length) {
				let n = this.lines.get(t);
				n === void 0 ? this.problems.warningAt(this.context.kindLine.number, 1, 1, "ValueCountMismatch", t.name, t.values.length, e.labels.length) : this.problems.warning(n, "ValueCountMismatch", t.name, t.values.length, e.labels.length);
			}
		}
	}
};
function yc(e, t) {
	let n = 0;
	for (; n < e.length && t.includes(e[n]);) n++;
	return e.slice(n);
}
function bc(e, t) {
	let n = e.length;
	for (; n > 0 && t.includes(e[n - 1]);) n--;
	return e.slice(0, n);
}
var xc = class extends Ze {
	constructor(...e) {
		super(...e), r(this, "xLow", ""), r(this, "xHigh", ""), r(this, "yLow", ""), r(this, "yHigh", ""), r(this, "names", [
			"",
			"",
			"",
			""
		]), r(this, "items", []), r(this, "low", 0), r(this, "high", 1);
	}
	build(e, t) {
		let n = wc.build(this, this.theme, t), r = new jn(n, "Quadrant chart", t.measurer);
		return r.label = this.title, {
			chart: Tc(r),
			naturalWidth: n.width,
			naturalHeight: n.height,
			summary: `A quadrant chart of ${this.items.length} point${fc(this.items.length)}.`
		};
	}
}, Sc = class e extends $e {
	constructor(e) {
		super(e), r(this, "own", void 0), r(this, "pending", []), this.own = new xc(e.kind, e.kindLine);
	}
	get spec() {
		return this.own;
	}
	get settings() {
		let t = this.own;
		return [
			M([
				"x axis",
				"x",
				"horizontal",
				"xaxis"
			], (n) => [t.xLow, t.xHigh] = e.ends(n)),
			M([
				"y axis",
				"y",
				"vertical",
				"yaxis"
			], (n) => [t.yLow, t.yHigh] = e.ends(n)),
			M([
				"top right",
				"quadrant 1",
				"quadrant1",
				"q1"
			], (e) => t.names[0] = this.text(e)),
			M([
				"top left",
				"quadrant 2",
				"quadrant2",
				"q2"
			], (e) => t.names[1] = this.text(e)),
			M([
				"bottom left",
				"quadrant 3",
				"quadrant3",
				"q3"
			], (e) => t.names[2] = this.text(e)),
			M([
				"bottom right",
				"quadrant 4",
				"quadrant4",
				"q4"
			], (e) => t.names[3] = this.text(e)),
			M(["range"], (e) => {
				let n = this.readRange(e);
				n !== null && (t.low = n.low, t.high = n.high);
			})
		];
	}
	static ends(t) {
		let n = t.text;
		for (let t of [
			"..",
			"-->",
			"->",
			"→",
			" to "
		]) {
			let r = n.toLowerCase().indexOf(t);
			if (r > 0) return [e.unquote(n.slice(0, r)), e.unquote(n.slice(r + t.length))];
		}
		return ["", e.unquote(n)];
	}
	static unquote(e) {
		return bc(yc(e.trim(), "\"“”"), "\"“”").trim();
	}
	content(e) {
		let t = e.content, { head: n, tail: r } = E(t), i = O(n, this.problems);
		if (r === null || i.name.length === 0) {
			this.problems.error(t, "PointNotPair", t.text);
			return;
		}
		if (this.settingSlip(n, r)) return;
		let a = bc(yc(r.text.trim(), "[("), "])").split(",").map((e) => e.trim()), o = a.length === 2 ? Ce(a[0]) : NaN, s = a.length === 2 ? Ce(a[1]) : NaN;
		if (a.length !== 2 || Number.isNaN(o) || Number.isNaN(s)) {
			this.problems.error(r, "PointNotPair", r.text);
			return;
		}
		let c = null;
		for (let e of i.attributes) {
			let t = W.hue(e.text);
			t === null ? this.unknownAttribute(e, new l("a point", "点"), W.names) : c = H.hue(t);
		}
		this.pending.push({
			where: t,
			name: i.name,
			x: o,
			y: s,
			hue: c
		});
	}
	finish() {
		let e = this.own;
		for (let { where: t, name: n, x: r, y: i, hue: a } of this.pending) (r < e.low || r > e.high || i < e.low || i > e.high) && this.problems.warning(t, "OutsideRange", n), e.items.push({
			name: n,
			x: Math.min(Math.max(r, e.low), e.high),
			y: Math.min(Math.max(i, e.low), e.high),
			hue: a
		});
	}
};
function Cc(e) {
	let t = e.fontSize / 11;
	return {
		label: 14 * t,
		small: 12.5 * t,
		heading: 14 * t
	};
}
var wc = {
	side: 440,
	build(e, t, n) {
		let r = wc.side, i = new kn(t.fontFamilies, n.measurer), a = Cc(t), o = new On(t.fontFamilies), s = i.measure("Ag", a.small, P.Normal).height + 12, c = z.fromXYWH(s, 0, r, r), l = r / 2, u = [
			[
				0,
				z.fromXYWH(c.left + l, c.top, l, l),
				0
			],
			[
				1,
				z.fromXYWH(c.left, c.top, l, l),
				1
			],
			[
				2,
				z.fromXYWH(c.left, c.top + l, l, l),
				2
			],
			[
				3,
				z.fromXYWH(c.left + l, c.top + l, l, l),
				3
			]
		];
		for (let [t, n, r] of u) o.add(U(new B().addRect(n), H.palette(t).washed(.09), null, 0)), e.names[r].length > 0 && o.add(i.centred(e.names[r], n.midX, n.top + 22, a.label, P.SemiBold, H.palette(t).deepened(.35), l - 24));
		let d = new B();
		d.addRect(c), d.moveTo(c.midX, c.top).lineTo(c.midX, c.bottom), d.moveTo(c.left, c.midY).lineTo(c.right, c.midY), o.add(U(d, null, H.of("axis"), 1.2));
		let f = c.bottom + 8;
		if (e.xLow.length > 0 && o.add(i.mark(e.xLow, c.left, f, a.small, P.Normal, H.of("secondary"))), e.xHigh.length > 0) {
			let t = i.mark(e.xHigh, 0, f, a.small, P.Normal, H.of("secondary"));
			o.add({
				...t,
				x: c.right - t.width
			});
		}
		if (e.yLow.length > 0) {
			let t = i.mark(e.yLow, 0, 0, a.small, P.Normal, H.of("secondary"));
			o.add({
				...t,
				x: c.left - 8 - t.height / 2 - t.width / 2,
				y: c.bottom - t.width / 2 - t.height / 2,
				rotation: -90
			});
		}
		if (e.yHigh.length > 0) {
			let t = i.mark(e.yHigh, 0, 0, a.small, P.Normal, H.of("secondary"));
			o.add({
				...t,
				x: c.left - 8 - t.height / 2 - t.width / 2,
				y: c.top + t.width / 2 - t.height / 2,
				rotation: -90
			});
		}
		let p = e.high - e.low;
		for (let t of e.items) {
			let n = c.left + (t.x - e.low) / p * r, s = c.bottom - (t.y - e.low) / p * r, l = t.hue ?? H.hue("accent");
			o.add(U(new B().addCircle(n, s, 6.5), l, H.of("background"), 2));
			let u = i.mark(t.name, 0, s - i.measure(t.name, a.small, P.Normal).height / 2, a.small, P.Normal, H.of("ink")), d = n + 12 + u.width > c.right - 4;
			o.add({
				...u,
				x: d ? n - 12 - u.width : n + 12
			});
		}
		return o.frame(12), o;
	}
};
function Tc(...e) {
	return { layers: e };
}
N("pie", (e) => new hc(e)), N("bar", (e) => new vc(e, "bar")), N("line", (e) => new vc(e, "line")), N("xy", (e) => new vc(e, "xy")), N("radar", (e) => new vc(e, "radar")), N("quadrant", (e) => new Sc(e));
//#endregion
//#region src/dhole/index.ts
var Ec = "0.2.0";
//#endregion
//#region src/dhole/browser.ts
vn();
//#endregion
export { ct as CanvasMeasurer, d as Chinese, ze as Dark, tn as DholeError, b as DholeProblem, u as English, Je as Kinds, Ie as Light, lt as MetricsMeasurer, an as check, vn as defineElement, rn as draw, tt as drawnKinds, qe as findTheme, gn as fontsReady, ht as getDefaultMeasurer, f as isChinese, on as kindWords, Ec as languageVersion, mn as problemsHtml, nn as read, hn as render, yn as renderAll, ln as renderSvg, gt as setDefaultMeasurer, Ge as themes, sn as toSvg, Re as withFont };

//# sourceMappingURL=dhole.esm.js.map