import { SYMBOL_ELEMENT_WIDTH } from "../constants";

export const alphabeticSymbols: string[] = [];

export const alphabeticSymbolsX: { [key: string]: number } = {};

const generateAlphabeticSymbols = () => {
    /* create array with aplhabetic symbols */
    const alpha = Array.from(Array(26)).map((e, i) => i + 65);
    alphabeticSymbols.push("?", ...alpha.map((x) => String.fromCharCode(x)));
};

const generateAlphabeticSymbolsX = () => {
    /* populate alphabeticSymbolsX with alphabeticSymbols to his x positions
    on sprite sheet */
    for (let i = 0; i < alphabeticSymbols.length; i++) {
        const symbol = alphabeticSymbols[i];
        alphabeticSymbolsX[symbol] = i * SYMBOL_ELEMENT_WIDTH;
    }
};

generateAlphabeticSymbols();
generateAlphabeticSymbolsX();
