import { Position } from "../../../../../interfaces";
import { CanvasElement } from "../../../../../rendering/interfaces";

export default class ButterflyElement implements CanvasElement {
    position: Position;
    texture_offset = {
        x: 600,
        y: 700,
    };
    size = {
        width: 62,
        height: 75,
    };
    texture = "game_sprite";
}
