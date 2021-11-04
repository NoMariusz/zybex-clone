import { Position } from "../../../../../interfaces";
import { CanvasElement } from "../../../../../rendering/interfaces";

export default class BirdElement implements CanvasElement {
    position: Position;
    texture_offset = {
        x: 665,
        y: 800,
    };
    size = {
        width: 56,
        height: 63,
    };
    texture = "game_sprite";
}
