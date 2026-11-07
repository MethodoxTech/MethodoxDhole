import type { NamedHue } from "../rendering/tones";
/** The colour words every kind shares: the palette's hues by name, and the roles that stand for them. */
export declare const AttributeWords: {
    /** Colours by name, and good, bad and warn as the colours they read as. */
    hues: Map<string, NamedHue>;
    /** The hue a word names, or null. */
    hue(word: string): NamedHue | null;
    /** The colour words, for a hint. */
    names: readonly string[];
};
