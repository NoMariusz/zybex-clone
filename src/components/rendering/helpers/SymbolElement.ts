import {
    NumberTypes,
    SMALL_SYMBOL_SIZE,
    SYMBOL_ELEMENT_HEIGHT,
    SYMBOL_ELEMENT_WIDTH,
} from "../../../constants";
import { Position } from "../../interfaces";
import { NUMBER_OFF } from "../../layouts/game/constants";
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

    numberType: NumberTypes;

    constructor(pos: Position, numberType: NumberTypes = NumberTypes.BigGreen) {
        this.position = pos;
        this.numberType = numberType;
        this.loadNumberType();
    }

    loadNumberType() {
        if (this.numberType == NumberTypes.SmallWhite) {
            this.size = {
                width: SMALL_SYMBOL_SIZE,
                height: SMALL_SYMBOL_SIZE,
            };
            this.texture = "game_sprite";
        }
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

        switch (this.numberType) {
            case NumberTypes.BigGreen:
                this.texture_offset = {
                    x: number * SYMBOL_ELEMENT_WIDTH,
                    y: 2700,
                };
                break;
            case NumberTypes.SmallWhite:
                this.texture_offset = NUMBER_OFF[number];
                break;
        }
    }

    private setStringValue(val: string) {
        if (!(val in symbolTextureData)) return;

        this.texture_offset = symbolTextureData[val];
    }
}
