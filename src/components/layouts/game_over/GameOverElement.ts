import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../../constants";
import CanvasElement from "../../rendering/CavnasElement";
import { TextureSpriteSheets } from "../../rendering/constants";

export default class GameOverElement extends CanvasElement {
    position = {
        x: 0,
        y: 0,
    };

    texture_offset = {
        x: 0,
        y: 1050,
    };

    size = {
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
    };
}
