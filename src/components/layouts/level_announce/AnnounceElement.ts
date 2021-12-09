import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../../constants";
import CanvasElement from "../../rendering/CanvasElement";

export default class AnnounceElement extends CanvasElement {
    position = {
        x: 0,
        y: 0,
    };

    texture_offset = {
        x: 0,
        y: 1950,
    };

    size = {
        width: CANVAS_WIDTH,
        height: CANVAS_HEIGHT,
    };
}
