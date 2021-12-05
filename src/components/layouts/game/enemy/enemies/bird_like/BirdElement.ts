import { Position } from "../../../../../interfaces";
import CanvasElement from "../../../../../rendering/CanvasElement";

export default class BirdElement extends CanvasElement {
    position: Position;
    texture_offset = {
        x: 665,
        y: 800,
    };
    size = {
        width: 56,
        height: 63,
    };
}
