import { Focusable, Position } from "../../../interfaces";
import CanvasElement from "../../../rendering/CanvasElement";
import { TextureSpriteSheets } from "../../../rendering/constants";
import { BOTTOM_UI_POS_Y, PLAYER_TAGS } from "../constants";

export default class PlayerTagElement extends CanvasElement {
    texture_offset: Position;

    position = {
        x: 0,
        y: BOTTOM_UI_POS_Y,
    };

    size = {
        width: 65,
        height: 40,
    };

    constructor(playerNum: number) {
        super();
        this.texture_offset = PLAYER_TAGS[playerNum - 1];
    }
}
