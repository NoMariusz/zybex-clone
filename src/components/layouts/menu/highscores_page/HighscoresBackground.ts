import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../../../constants";
import CanvasElement from "../../../rendering/CavnasElement";
import { TextureSpriteSheets } from "../../../rendering/constants";
import { MENU_SECTION_TEXTURE_Y_OFFSET } from "../constants";

export default class HighscoresBackground extends CanvasElement {
    position = {
        x: 0,
        y: 0,
    };

    texture_offset = {
        x: 0,
        y: CANVAS_HEIGHT + MENU_SECTION_TEXTURE_Y_OFFSET,
    };

    size = {
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
    };

    texture = TextureSpriteSheets.Main;

    flip = false;
}
