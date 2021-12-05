import { Position } from "../../../../../interfaces";
import CanvasElement from "../../../../../rendering/CanvasElement";
import { TextureSpriteSheets } from "../../../../../rendering/constants";
import { WormPatrs, WORM_PART_TO_TETURE_OFFSET } from "./wormData";

export default class CoinElement extends CanvasElement {
    position: Position;
    texture_offset = {
        x: 375,
        y: 600,
    };
    size = {
        width: 64,
        height: 71,
    };

    constructor(part: WormPatrs) {
        super();
        this.texture_offset = WORM_PART_TO_TETURE_OFFSET[part];
    }
}
