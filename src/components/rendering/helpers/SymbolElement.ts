import {
    SYMBOL_ELEMENT_HEIGHT,
    SYMBOL_ELEMENT_WIDTH,
} from "../../../constants";
import { Position } from "../../interfaces";
import { CanvasElement } from "../interfaces";
import symbolTextureData from "./symbolTextureData";

export default class SymbolElement implements CanvasElement {
    texture_offset = {
        x: 0,
        y: 2700,
    };

    position = {
        x: 0,
        y: 0,
    };

    size = {
        width: SYMBOL_ELEMENT_WIDTH,
        height: SYMBOL_ELEMENT_HEIGHT,
    };

    constructor(pos: Position) {
        this.position = pos;
    }

    texture = "screens_sprite";

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
        this.texture_offset = { x: number * SYMBOL_ELEMENT_WIDTH, y: 2700 };
    }

    private setStringValue(val: string) {
        if (!(val in symbolTextureData)) return;

        this.texture_offset = symbolTextureData[val];
    }
}
