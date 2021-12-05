import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../../../constants";
import CanvasElement from "../../../rendering/CanvasElement";
import { TextureSpriteSheets } from "../../../rendering/constants";
import { MENU_SECTION_TEXTURE_Y_OFFSET } from "../constants";

export default class MainBackground extends CanvasElement {
    position = {
        x: 0,
        y: 0,
    };

    texture_offset = {
        x: 0,
        y: MENU_SECTION_TEXTURE_Y_OFFSET,
    };

    size = {
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
    };

    texture = TextureSpriteSheets.Main;

    flip = false;
}
