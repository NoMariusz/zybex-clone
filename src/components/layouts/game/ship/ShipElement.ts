import { CanvasElement } from "../../../rendering/interfaces";

export default class ShipElement implements CanvasElement {
    texture_offset = {
        x: 150,
        y: 600,
    };

    position = {
        x: 0,
        y: 0,
    };

    size = {
        width: 130,
        height: 84,
    };

    texture = "game_sprite";
}
