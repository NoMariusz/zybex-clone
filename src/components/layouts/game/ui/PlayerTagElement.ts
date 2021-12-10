import { Position } from "../../../interfaces";
import CanvasElement from "../../../rendering/CanvasElement";
import { BOTTOM_UI_POS_Y, PlayerType, PLAYER_TAGS } from "../constants";

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

    constructor(playerType: PlayerType) {
        super();
        this.texture_offset = PLAYER_TAGS[playerType];
    }
}
