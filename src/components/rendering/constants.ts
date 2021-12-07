export enum TextureSpriteSheets {
    Main,
    BertolusLevel,
}

export const SYMBOL_ELEMENT_WIDTH = 60;
export const SYMBOL_ELEMENT_HEIGHT = 65;
export const SMALL_SYMBOL_SIZE = 35;

// enums with number/symbol types to their texture y offsets

export enum SymbolsTypes {
    SmallWhiteNumber,
    Green = 6715,
    GreenNumber = 6650,
    Chartreuse = 6779,
    ChartreuseNumber = 6843,
    Blue = 6907,
    BlueNumber = 6971,
    RedBase = 7035,
    RedBaseNumber = 7099,
    RedAnimationFrame1 = 7163,
    RedAnimationFrame1Number = 7227,
    RedAnimationFrame2 = 7291,
    RedAnimationFrame2Number = 7355,
    RedAnimationFrame3 = 7419,
    RedAnimationFrame3Number = 7483,
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
