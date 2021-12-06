import { Position } from "./interfaces";
import SymbolElement from "./rendering/utils/SymbolElement";

export const sleep = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

export const safeChangeIndex = (
    baseValue: number,
    changeValue: number,
    maxValue: number
): number => {
    /**
     * Change value of index baseValue in that way, that value be looped on range from 0 to maxValue
     * So if increment index out of range, return first index value, that same with less than 0
     */
    const value = baseValue + changeValue;
    return value > maxValue ? 0 : value < 0 ? maxValue : value;
};

export const loadNumberToElements = (
    elements: SymbolElement[],
    value: number
) => {
    const elementsCount = elements.length;
    for (let idx = 0; idx < elementsCount; idx++) {
        const element = elements[idx];
        const divider = Math.pow(10, elementsCount - 1 - idx);
        const rest = Math.floor(value / divider);
        const num = rest % 10;
        element.changeSymbol(num);
    }
};

export const clampValue = (value: number, min = -1, max = 1) => {
    /* Calmps given value to be in range min to max */
    return Math.min(Math.max(value, min), max);
};

export const areEqual = (posA: Position, posB: Position) => {
    return posA.x == posB.x && posA.y == posB.y;
};
