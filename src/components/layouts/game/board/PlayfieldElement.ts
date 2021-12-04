import CanvasElement from "../../../rendering/CavnasElement";
import { TextureSpriteSheets } from "../../../rendering/constants";
import {
    BOARD_HEIGHT,
    BOARD_WIDTH,
    BOARD_X,
    BOARD_Y,
    LEVEL_TEXTURE_SCALE,
} from "../constants";

export default class PlayfieldElement extends CanvasElement {
    texture_offset = {
        x: 0,
        y: 0,
    };

    position = {
        x: BOARD_X,
        y: BOARD_Y,
    };

    size = {
        width: BOARD_WIDTH,
        height: BOARD_HEIGHT,
    };

    texture_size = {
        width: BOARD_WIDTH * LEVEL_TEXTURE_SCALE,
        height: BOARD_HEIGHT * LEVEL_TEXTURE_SCALE,
    };

    texture = TextureSpriteSheets.BertolusLevel;

    flip = false;
}
