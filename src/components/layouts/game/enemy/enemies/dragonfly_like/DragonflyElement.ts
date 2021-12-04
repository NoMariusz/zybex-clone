import { Position } from "../../../../../interfaces";
import CanvasElement from "../../../../../rendering/CavnasElement";

export default class DragonFlyElement extends CanvasElement {
    position: Position;
    texture_offset = {
        x: 600,
        y: 600,
    };
    size = {
        width: 60,
        height: 73,
    };
}
