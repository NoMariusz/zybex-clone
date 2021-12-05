import { CANVAS_WIDTH } from "../../../../constants";
import CanvasElement from "../../../rendering/CanvasElement";
import { BOARD_Y } from "../constants";

export default class BackgroundElement extends CanvasElement {
    texture_offset = {
        x: 4600, // position of black area at sprite sheet
        y: 0,
    };

    position = {
        x: 0,
        y: 0,
    };

    size = {
        width: CANVAS_WIDTH,
        height: BOARD_Y,
    };
}
