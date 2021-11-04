import { Position } from "../../../../../interfaces";
import { CanvasElement } from "../../../../../rendering/interfaces";

export default class DragonFlyElement implements CanvasElement {
    position: Position;
    texture_offset = {
        x: 600,
        y: 600,
    };
    size = {
        width: 60,
        height: 73,
    };
    texture = "game_sprite";
}
