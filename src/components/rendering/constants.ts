export enum TextureSpriteSheets {
    Main,
    BertolusLevel,
}

export const SYMBOL_ELEMENT_WIDTH = 60;
export const SYMBOL_ELEMENT_HEIGHT = 65;
export const SMALL_SYMBOL_SIZE = 35;

// enums with number/symbol types to their texture y offsets

export enum SymbolsTypes {
    Green = 6715,
    SmallWhiteNumber,
    BigGreenNumber = 6650,
}

export const WHITE_NUMBER_OFFSETS = [
    { x: 0, y: 350 },
    { x: 0, y: 400 },
    { x: 0, y: 450 },
    { x: 0, y: 500 },
    { x: 0, y: 550 },
    { x: 75, y: 350 },
    { x: 75, y: 400 },
    { x: 75, y: 450 },
    { x: 75, y: 500 },
    { x: 75, y: 550 },
];

export const ALPHABETIC_SYMBOLS_X: { [key: string]: number } = {
    ["?"]: 0,
    a: 60,
    b: 120,
    c: 180,
};
