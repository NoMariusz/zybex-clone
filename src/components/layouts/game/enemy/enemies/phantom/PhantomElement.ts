import { Position } from "../../../../../interfaces";
import { CanvasElement } from "../../../../../rendering/interfaces";

export default class PhantomElement implements CanvasElement {
    position: Position;
    texture_offset = {
        x: 825,
        y: 600,
    };
    size = {
        width: 68,
        height: 84,
    };
    texture = "game_sprite";
}
