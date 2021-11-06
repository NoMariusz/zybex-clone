import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../../constants";
import { CanvasElement } from "../../rendering/interfaces";

export default class SummatyBackgroundElement implements CanvasElement {
    position = {
        x: 0,
        y: 0,
    };

    texture_offset = {
        x: 0,
        y: CANVAS_HEIGHT * 2,
    };

    size = {
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
    };

    texture = "screens_sprite";
}
