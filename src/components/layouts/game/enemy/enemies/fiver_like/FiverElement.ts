import { Position } from "../../../../../interfaces";
import { CanvasElement } from "../../../../../rendering/interfaces";

export default class FiverElement implements CanvasElement {
    position: Position;
    texture_offset = {
        x: 825,
        y: 800,
    };
    size = {
        width: 66,
        height: 74,
    };
    texture = "game_sprite";
}
