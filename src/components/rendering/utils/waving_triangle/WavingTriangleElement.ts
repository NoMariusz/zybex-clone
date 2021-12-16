import { Position } from "../../../interfaces";
import CanvasElement from "../../CanvasElement";
import { WAVING_TRIANGLE_WIDTH } from "../../constants";

export default class WavingTriangleElement extends CanvasElement {
    texture_offset = {
        x: 0,
        y: 7803,
    };

    size = {
        width: WAVING_TRIANGLE_WIDTH,
        height: 263,
    };

    position: Position;

    constructor(pos: Position, flipY = false) {
        super();

        this.position = pos;
        if (flipY) {
            this.texture_offset.y = 8855;
        }
    }
}
