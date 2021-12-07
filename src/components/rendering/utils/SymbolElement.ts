import {
    SMALL_SYMBOL_SIZE,
    SymbolsTypes,
    SYMBOL_ELEMENT_HEIGHT,
    SYMBOL_ELEMENT_WIDTH,
    WHITE_NUMBER_OFFSETS,
} from "../constants";
import { Position } from "../../interfaces";
import CanvasElement from "../CanvasElement";
import { alphabeticSymbols, alphabeticSymbolsX } from "./alphabeticSymbols";

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

    private symbolType: SymbolsTypes;

    constructor(
        pos: Position,
        symbolType: SymbolsTypes = SymbolsTypes.GreenNumber
    ) {
        super();
        this.position = pos;
        this.symbolType = symbolType;
        this.loadSize();
    }

    private loadSize() {
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
            case SymbolsTypes.SmallWhiteNumber:
                this.texture_offset = WHITE_NUMBER_OFFSETS[number];
                break;
            default:
                this.texture_offset = {
                    x: number * SYMBOL_ELEMENT_WIDTH,
                    y: this.symbolType,
                };
                break;
        }
    }

    private setStringValue(val: string) {
        if (!alphabeticSymbols.includes(val)) return;

        this.texture_offset = {
            x: alphabeticSymbolsX[val],
            y: this.symbolType,
        };
    }
}
