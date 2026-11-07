export interface Vec2 {
    readonly x: number;
    readonly y: number;
}
export declare function vec(x: number, y: number): Vec2;
export declare const add: (a: Vec2, b: Vec2) => Vec2;
export declare const sub: (a: Vec2, b: Vec2) => Vec2;
export declare const mul: (a: Vec2, k: number) => Vec2;
export declare const lengthSquared: (a: Vec2) => number;
export declare const length: (a: Vec2) => number;
export declare function normalize(a: Vec2): Vec2;
export declare const distance: (a: Vec2, b: Vec2) => number;
/** A rectangle by its edges. */
export declare class RectF {
    readonly left: number;
    readonly top: number;
    readonly right: number;
    readonly bottom: number;
    constructor(left: number, top: number, right: number, bottom: number);
    static fromXYWH(x: number, y: number, width: number, height: number): RectF;
    static fromCenter(center: Vec2, width: number, height: number): RectF;
    static readonly empty: RectF;
    get width(): number;
    get height(): number;
    get midX(): number;
    get midY(): number;
    get center(): Vec2;
    get isEmpty(): boolean;
    inflate(dx: number, dy?: number): RectF;
    offset(dx: number, dy: number): RectF;
    contains(p: Vec2): boolean;
    intersectsWith(other: RectF): boolean;
    union(other: RectF): RectF;
    toString(): string;
}
/** A 2D affine transform: x' = a x + c y + e, y' = b x + d y + f. */
export interface Matrix {
    readonly a: number;
    readonly b: number;
    readonly c: number;
    readonly d: number;
    readonly e: number;
    readonly f: number;
}
export declare const identity: Matrix;
export declare function translation(dx: number, dy: number): Matrix;
export declare function scaling(sx: number, sy?: number): Matrix;
/** A rotation by `degrees`, clockwise on a page whose y runs down, about (cx, cy). */
export declare function rotationDegrees(degrees: number, cx?: number, cy?: number): Matrix;
/** `first` then `second`. */
export declare function multiply(first: Matrix, second: Matrix): Matrix;
export declare function apply(m: Matrix, p: Vec2): Vec2;
export declare function isIdentity(m: Matrix): boolean;
/** An outline of straight and curved pieces, in one or more figures. Arcs and quadratics are kept as cubics. */
export declare class VectorPath {
    private readonly segments;
    private current;
    private start;
    private open;
    get isEmpty(): boolean;
    moveTo(x: number | Vec2, y?: number): this;
    lineTo(x: number | Vec2, y?: number): this;
    cubicTo(c1: Vec2, c2: Vec2, p: Vec2): this;
    quadTo(c: Vec2, p: Vec2): this;
    close(): this;
    /**
     * An arc of the ellipse inscribed in `oval`, from `startAngle` through `sweepAngle` degrees - clockwise on a page whose y runs
     * down - joined to the current point by a line unless `forceMoveTo`, as Skia's arcTo draws one.
     */
    arcTo(oval: RectF, startAngle: number, sweepAngle: number, forceMoveTo: boolean): this;
    addRect(r: RectF): this;
    addRoundRect(r: RectF, rx: number, ry?: number): this;
    addOval(r: RectF): this;
    addCircle(cx: number, cy: number, radius: number): this;
    /** Another path's figures, after this one's. */
    addPath(other: VectorPath): this;
    /** The path moved by a transform. */
    transformed(m: Matrix): VectorPath;
    /** The smallest rectangle the outline lies in, curves measured at their extremes rather than their handles. */
    tightBounds(): RectF;
    /** The path as SVG's d attribute. */
    toSvg(): string;
    /** The points the path passes through, curves flattened: what a test checks a line's ends and course by. */
    points(stepsPerCurve?: number): Vec2[];
}
/** A number as a picture's coordinates are written: at most four decimals. */
export declare function fmt(v: number): string;
