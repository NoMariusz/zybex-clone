import { Position } from "../../../../../interfaces";
import CanvasElement from "../../../../../rendering/CavnasElement";

export default class ButterflyElement extends CanvasElement {
    position: Position;
    texture_offset = {
        x: 600,
        y: 700,
    };
    size = {
        width: 62,
        height: 75,
    };
}
