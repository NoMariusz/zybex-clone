import {
    SMALL_SYMBOL_SIZE,
    SymbolsTypes,
    SYMBOL_ELEMENT_HEIGHT,
    SYMBOL_ELEMENT_WIDTH,
    WHITE_NUMBER_OFFSETS,
    ALPHABETIC_SYMBOLS_X,
} from "../constants";
import { Position } from "../../interfaces";
import CanvasElement from "../CavnasElement";

export default class SymbolElement extends CanvasElement {
    texture_offset = {
        x: 0,
        y: 0,
    };

    position = {
        x: 0,
        y: 0,
    };

    size = {
        width: SYMBOL_ELEMENT_WIDTH,
        height: SYMBOL_ELEMENT_HEIGHT,
    };

    symbolType: SymbolsTypes;

    constructor(
        pos: Position,
        symbolType: SymbolsTypes = SymbolsTypes.BigGreenNumber
    ) {
        super();
        this.position = pos;
        this.symbolType = symbolType;
        this.loadNumberType();
    }

    loadNumberType() {
        if (this.symbolType == SymbolsTypes.SmallWhiteNumber) {
            this.size = {
                width: SMALL_SYMBOL_SIZE,
                height: SMALL_SYMBOL_SIZE,
            };
        }
    }

    changeSymbol(value: number | string) {
        switch (typeof value) {
            case "number":
                this.setNumberValue(value);
                break;
            case "string":
                this.setStringValue(value);
        }
    }

    private setNumberValue(number: number) {
        if (number < 0 || number > 9) {
            return;
        }

        switch (this.symbolType) {
            case SymbolsTypes.BigGreenNumber:
                this.texture_offset = {
                    x: number * SYMBOL_ELEMENT_WIDTH,
                    y: this.symbolType,
                };
                break;
            case SymbolsTypes.SmallWhiteNumber:
                this.texture_offset = WHITE_NUMBER_OFFSETS[number];
                break;
        }
    }

    private setStringValue(val: string) {
        if (!(val in ALPHABETIC_SYMBOLS_X)) return;

        this.texture_offset = {
            x: ALPHABETIC_SYMBOLS_X[val],
            y: this.symbolType,
        };
    }
}
