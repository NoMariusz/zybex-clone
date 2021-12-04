import { Position } from "../../../../../interfaces";
import CanvasElement from "../../../../../rendering/CavnasElement";

export default class PhantomElement extends CanvasElement {
    position: Position;
    texture_offset = {
        x: 825,
        y: 600,
    };
    size = {
        width: 68,
        height: 84,
    };
}
