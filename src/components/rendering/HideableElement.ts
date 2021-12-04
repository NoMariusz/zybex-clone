import { Position, Size } from "../interfaces";
import CanvasElement from "./CavnasElement";
import { TextureSpriteSheets } from "./constants";

export default class HideableElement extends CanvasElement {
    position: Position;
    texture_offset: Position;
    texture = TextureSpriteSheets.Main;
    size: Size;
    flip: boolean;

    baseHeight: number;

    constructor(h: number) {
        super();
        this.baseHeight = h;
    }

    hide() {
        this.size.height = 0;
    }

    show() {
        this.size.height = this.baseHeight;
    }
}
